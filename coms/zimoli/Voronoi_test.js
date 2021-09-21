
var VoronoiDemo = {
    voronoi: new Voronoi(),
    diagram: null,
    margin: 0.1,
    canvas: null,
    bbox: { xl: 0, xr: 800, yt: 0, yb: 600 },
    sites: [],
    timeoutDelay: 100,

    init: function (canvas) {
        this.canvas = canvas;
        this.randomSites(100, true);
    },

    clearSites: function () {
        this.compute([]);
    },

    randomSites: function (n, clear) {
        var sites = [];
        if (!clear) {
            sites = this.sites.slice(0);
        }
        // create vertices
        var xmargin = this.canvas.width * this.margin,
            ymargin = this.canvas.height * this.margin,
            xo = xmargin,
            dx = this.canvas.width - xmargin * 2,
            yo = ymargin,
            dy = this.canvas.height - ymargin * 2;
        for (var i = 0; i < n; i++) {
            sites.push({ x: self.Math.round((xo + self.Math.random() * dx) * 10) / 10, y: self.Math.round((yo + self.Math.random() * dy) * 10) / 10 });
        }
        this.compute(sites);
        // relax sites
        if (this.timeout) {
            clearTimeout(this.timeout)
            this.timeout = null;
        }
        var me = this;
        this.timeout = setTimeout(function () {
            me.relaxSites();
        }, this.timeoutDelay);
    },

    relaxSites: function () {
        if (!this.diagram) { return; }
        var cells = this.diagram.cells,
            iCell = cells.length,
            cell,
            site, sites = [],
            again = false,
            rn, dist;
        var p = 1 / iCell * 0.1;
        while (iCell--) {
            cell = cells[iCell];
            rn = Math.random();
            // probability of apoptosis
            if (rn < p) {
                continue;
            }
            site = this.cellCentroid(cell);
            dist = this.distance(site, cell.site);
            again = again || dist > 1;
            // don't relax too fast
            if (dist > 2) {
                site.x = (site.x + cell.site.x) / 2;
                site.y = (site.y + cell.site.y) / 2;
            }
            // probability of mytosis
            if (rn > (1 - p)) {
                dist /= 2;
                sites.push({
                    x: site.x + (site.x - cell.site.x) / dist,
                    y: site.y + (site.y - cell.site.y) / dist,
                });
            }
            sites.push(site);
        }
        this.compute(sites);
        if (again) {
            var me = this;
            this.timeout = setTimeout(function () {
                me.relaxSites();
            }, this.timeoutDelay);
        }
    },

    distance: function (a, b) {
        var dx = a.x - b.x,
            dy = a.y - b.y;
        return Math.sqrt(dx * dx + dy * dy);
    },

    cellArea: function (cell) {
        var area = 0,
            halfedges = cell.halfedges,
            iHalfedge = halfedges.length,
            halfedge,
            p1, p2;
        while (iHalfedge--) {
            halfedge = halfedges[iHalfedge];
            p1 = halfedge.getStartpoint();
            p2 = halfedge.getEndpoint();
            area += p1.x * p2.y;
            area -= p1.y * p2.x;
        }
        area /= 2;
        return area;
    },

    cellCentroid: function (cell) {
        var x = 0, y = 0,
            halfedges = cell.halfedges,
            iHalfedge = halfedges.length,
            halfedge,
            v, p1, p2;
        while (iHalfedge--) {
            halfedge = halfedges[iHalfedge];
            p1 = halfedge.getStartpoint();
            p2 = halfedge.getEndpoint();
            v = p1.x * p2.y - p2.x * p1.y;
            x += (p1.x + p2.x) * v;
            y += (p1.y + p2.y) * v;
        }
        v = this.cellArea(cell) * 6;
        return { x: x / v, y: y / v };
    },

    compute: function (sites) {
        this.sites = sites;
        this.voronoi.recycle(this.diagram);
        this.diagram = this.voronoi.compute(sites, this.bbox);
        this.updateStats();
        this.render();
    },

    updateStats: function () {
        if (!this.diagram) { return; }
        var e = document.getElementById('voronoiStats');
        if (!e) { return; }
        e.innerHTML = '(' + this.diagram.cells.length + ' Voronoi cells computed from ' + this.diagram.cells.length + ' Voronoi sites in ' + this.diagram.execTime + ' ms &ndash; rendering <i>not</i> included)';
    },

    render: function () {
        var ctx = this.canvas.getContext('2d');
        // background
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.strokeStyle = '#888';
        ctx.stroke();
        // voronoi
        if (!this.diagram) { return; }
        // edges
        ctx.beginPath();
        ctx.strokeStyle = '#000';
        var edges = this.diagram.edges,
            iEdge = edges.length,
            edge, v;
        while (iEdge--) {
            edge = edges[iEdge];
            v = edge.va;
            ctx.moveTo(v.x, v.y);
            v = edge.vb;
            ctx.lineTo(v.x, v.y);
        }
        ctx.stroke();
        // sites
        ctx.beginPath();
        ctx.fillStyle = '#44f';
        var sites = this.sites,
            iSite = sites.length;
        while (iSite--) {
            v = sites[iSite];
            ctx.rect(v.x - 2 / 3, v.y - 2 / 3, 2, 2);
        }
        ctx.fill();
    },
};
function main() {
    var page = document.createElement("canvas");
    VoronoiDemo.init(page);
    return page;
}