var page = div();
page.innerHTML = Main;
class Renderer {
    PARTICLE_COUNT = 150;
    PARTICLE_RADIUS = 6;
    MAX_ROTATION_ANGLE = Math.PI / 60;
    TRANSLATION_COUNT = 500;
    constructor(strategy) {
        if (strategy) {
            this.init(strategy);
        }

    }

    init(strategy) {
        this.setParameters(strategy);
        this.createParticles();
        this.setupFigure();
        this.reconstructMethod();
        this.bindEvent();
        this.drawFigure();
    }
    setParameters(strategy) {

        this.container = page;
        var offset = getScreenPosition(this.container);
        this.width = offset.width;
        this.height = offset.height;
        var canvas = this.canvas = document.querySelector('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = this.canvas.getContext('2d');

        this.center = { x: this.width / 2, y: this.height / 2 };

        this.rotationX = this.MAX_ROTATION_ANGLE;
        this.rotationY = this.MAX_ROTATION_ANGLE;
        this.strategyIndex = 0;
        this.translationCount = 0;
        this.theta = 0;

        this.strategies = strategy.getStrategies();
        this.particles = [];
    }
    createParticles() {
        for (var i = 0; i < this.PARTICLE_COUNT; i++) {
            this.particles.push(new Partice(this.center));
        }
    }
    reconstructMethod() {
        this.setupFigure = this.setupFigure.bind(this);
        this.drawFigure = this.drawFigure.bind(this);
        this.changeAngle = this.changeAngle.bind(this);
    }
    bindEvent() {
        on('click')(this.container, this.setupFigure);
        on('mousemove')(this.container, this.changeAngle);
    }
    changeAngle(event) {
        var offset = getScreenPosition(this.container),
            x = event.clientX - offset.left,
            y = event.clientY - offset.top;

        this.rotationX = (this.center.y - y) / this.center.y * this.MAX_ROTATION_ANGLE;
        this.rotationY = (this.center.x - x) / this.center.x * this.MAX_ROTATION_ANGLE;
    }
    setupFigure() {
        for (var i = 0, length = this.particles.length; i < length; i++) {
            this.particles[i].setAxis(this.strategies[this.strategyIndex]());
        }
        if (++this.strategyIndex == this.strategies.length) {
            this.strategyIndex = 0;
        }
        this.translationCount = 0;
    }
    drawFigure() {
        requestAnimationFrame(this.drawFigure);
        analyser.getFloatTimeDomainData(arr);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (var cx = 0, dx = this.particles.length; cx < dx; cx++) {
            var axis = this.particles[cx].getAxis2D(this.theta);

            this.context.beginPath();
            this.context.fillStyle = axis.color;
            this.context.arc(axis.x + (axis.x - this.center.x) * (arr[cx % arr.length])  | 0, axis.y + (axis.y - this.center.y) * (arr[cx % arr.length])  | 0, this.PARTICLE_RADIUS, 0, Math.PI * 2);
            this.context.fill();
        }
        // console.log(this.context);
        this.theta++;
        this.theta %= 360;

        for (var cx = 0, dx = this.particles.length; cx < dx; cx++) {
            this.particles[cx].rotateX(this.rotationX);
            this.particles[cx].rotateY(this.rotationY);
        }
        this.translationCount++;
        this.translationCount %= this.TRANSLATION_COUNT;

        if (this.translationCount == 0) {
            this.setupFigure();
        }
    }
};
class Strategy {
    SCATTER_RADIUS = 200;
    CONE_ASPECT_RATIO = 5;
    RING_COUNT = 5;
    constructor() {

    }

    getStrategies() {
        var strategies = [];

        for (var i in this) {
            if (this[i] === this.getStrategies || typeof this[i] != 'function') {
                continue;
            }
            strategies.push(this[i].bind(this));
        }
        return strategies;
    }
    createSphere() {
        var cosTheta = Math.random() * 2 - 1,
            sinTheta = Math.sqrt(1 - cosTheta * cosTheta),
            phi = Math.random() * 2 * Math.PI;

        return {
            x: this.SCATTER_RADIUS * sinTheta * Math.cos(phi),
            y: this.SCATTER_RADIUS * sinTheta * Math.sin(phi),
            z: this.SCATTER_RADIUS * cosTheta,
            hue: Math.round(phi / Math.PI * 30)
        };
    }
    createTorus() {
        var theta = Math.random() * Math.PI * 2,
            x = this.SCATTER_RADIUS + this.SCATTER_RADIUS / 6 * Math.cos(theta),
            y = this.SCATTER_RADIUS / 6 * Math.sin(theta),
            phi = Math.random() * Math.PI * 2;

        return {
            x: x * Math.cos(phi),
            y: y,
            z: x * Math.sin(phi),
            hue: Math.round(phi / Math.PI * 30)
        };
    }
    createCone() {
        var status = Math.random() > 1 / 3,
            x,
            y,
            phi = Math.random() * Math.PI * 2,
            rate = Math.tan(30 / 180 * Math.PI) / this.CONE_ASPECT_RATIO;

        if (status) {
            y = this.SCATTER_RADIUS * (1 - Math.random() * 2);
            x = (this.SCATTER_RADIUS - y) * rate;
        } else {
            y = -this.SCATTER_RADIUS;
            x = this.SCATTER_RADIUS * 2 * rate * Math.random();
        }
        return {
            x: x * Math.cos(phi),
            y: y,
            z: x * Math.sin(phi),
            hue: Math.round(phi / Math.PI * 30)
        };
    }
    createVase() {
        var theta = Math.random() * Math.PI,
            x = Math.abs(this.SCATTER_RADIUS * Math.cos(theta) / 2) + this.SCATTER_RADIUS / 8,
            y = this.SCATTER_RADIUS * Math.cos(theta) * 1.2,
            phi = Math.random() * Math.PI * 2;

        return {
            x: x * Math.cos(phi),
            y: y,
            z: x * Math.sin(phi),
            hue: Math.round(phi / Math.PI * 30)
        };
    }
};
class Partice {
    constructor(center) {
        this.center = center;
        this.init();
    }
    SPRING = 0.01;
    FRICTION = 0.9;
    FOCUS_POSITION = 300;
    COLOR = 'hsl(%hue, 100%, 70%)';
    init() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.vx = 0;
        this.vy = 0;
        this.vz = 0;
        this.color;
    }
    setAxis(axis) {
        this.translating = true;
        this.nextX = axis.x;
        this.nextY = axis.y;
        this.nextZ = axis.z;
        this.hue = axis.hue;
    }
    rotateX(angle) {
        var sin = Math.sin(angle),
            cos = Math.cos(angle),
            nextY = this.nextY * cos - this.nextZ * sin,
            nextZ = this.nextZ * cos + this.nextY * sin,
            y = this.y * cos - this.z * sin,
            z = this.z * cos + this.y * sin;

        this.nextY = nextY;
        this.nextZ = nextZ;
        this.y = y;
        this.z = z;
    }
    rotateY(angle) {
        var sin = Math.sin(angle),
            cos = Math.cos(angle),
            nextX = this.nextX * cos - this.nextZ * sin,
            nextZ = this.nextZ * cos + this.nextX * sin,
            x = this.x * cos - this.z * sin,
            z = this.z * cos + this.x * sin;

        this.nextX = nextX;
        this.nextZ = nextZ;
        this.x = x;
        this.z = z;
    }
    rotateZ(angle) {
        var sin = Math.sin(angle),
            cos = Math.cos(angle),
            nextX = this.nextX * cos - this.nextY * sin,
            nextY = this.nextY * cos + this.nextX * sin,
            x = this.x * cos - this.y * sin,
            y = this.y * cos + this.x * sin;

        this.nextX = nextX;
        this.nextY = nextY;
        this.x = x;
        this.y = y;
    }
    getAxis3D() {
        this.vx += (this.nextX - this.x) * this.SPRING;
        this.vy += (this.nextY - this.y) * this.SPRING;
        this.vz += (this.nextZ - this.z) * this.SPRING;

        this.vx *= this.FRICTION;
        this.vy *= this.FRICTION;
        this.vz *= this.FRICTION;

        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;

        return { x: this.x, y: this.y, z: this.z };
    }
    getAxis2D(theta) {
        var axis = this.getAxis3D(),
            scale = this.FOCUS_POSITION / (this.FOCUS_POSITION + axis.z);

        return { x: this.center.x + axis.x * scale, y: this.center.y - axis.y * scale, color: this.COLOR.replace('%hue', this.hue + theta) };
    }

}

function play(url) {
    var AudioContext = window.mozAudioContext || window.webkitAudioContext || window.AudioContext;
    if (!AudioContext) {
        alert("error", "不支持的浏览器！");
        throw "不支持的浏览器";
    }
    var xhr = cross("get", url).done(function () {
        console.log(xhr.response);
        audioContext.decodeAudioData(xhr.response, function (buffer) {
            var source = audioContext.createBufferSource();
            source.buffer = buffer;
            source.connect(analyser);
            analyser.connect(gainNode);
            gainNode.connect(audioContext.destination);

            source.start ? source.start(0) : source.noteOn(0);
        }, alert.bind("error"))
    });
    xhr.responseType = "arraybuffer";
}

var audioContext = new AudioContext;
var gainNode = audioContext.createGain ? audioContext.createGain() : audioContext.createGainNode();
var analyser = audioContext.createAnalyser();
analyser.fftSize = 512;
var arr = new Float32Array(analyser.frequencyBinCount);
var arrFloat = new Float32Array(analyser.frequencyBinCount);
var seeAudio = function () {
    var canvas = document.querySelector("canvas");
    canvas.width = page.offsetWidth;
    canvas.height = page.offsetHeight;
    var context = canvas.getContext("2d");
    context.strokeStyle = "#ffffff";
    var run = function () {
        requestAnimationFrame(run);
        analyser.getFloatTimeDomainData(arrFloat);
        view$audio(context, arrFloat);
    }
    requestAnimationFrame(run);

}
once("append")(page, function () {
    seeAudio();
    // new Renderer(new Strategy);
});
render(page, { gainNode });
function main() {
    play("http://fs.open.kugou.com/ef34b2e46b9d7e8b2199c4943d2eb81c/5c830a93/G073/M04/17/11/iQ0DAFePd5OIBXTgAA98qfjcK2YAAAacACmTFkAD3zB338.m4a");
    return page;
}