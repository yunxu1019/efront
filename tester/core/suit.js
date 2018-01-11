function Suit(parent) {
    this.tests = [];
    this.suits = [];
    this.children = [];
    this.countOnly = 0;
    this.countTest = 0;
    this.countSuit = 0;
    this.countSkip = 0;
}
var currentSuit = null;
var root = null;
Suit.prototype = null;
var process_timer = 0;
function describe(label, func) {
    var suit = new Suit(this);
    if (!root) root = suit, process_timer = setTimeout(function () {
        root.run();
        root = null;
    });
    suit.name = label;
    suit.root = root;
    if (currentSuit) {
        suit.parent = currentSuit;
        currentSuit.suits.push(suit);
        currentSuit.children.push(suit);
        currentSuit.countSuit++;
    }
    suit.tests = [];
    suit.run = function () {
        if (suit.skip) return console.info(`skiped suit marked as skip: ${label}`);
        if (suit.only) {
            console.info(`run suit marked as only: ${label}`);
        } else if (this.parent && this.parent.countOnly) return;
        currentSuit = suit;
        func();
        currentSuit = null;
        this.children.forEach(e => e.run());
    };
    return suit;
}
function Test(parent) {
}
Test.prototype = null;
function test(label, func) {
    var suit = new Test();
    if (!root) root = suit, process_timer = setTimeout(function () {
        suit.run();
        root = null;
    });
    suit.name = label;
    suit.root = root;
    if (currentSuit) {
        suit.parent = currentSuit;
        currentSuit.tests.push(suit);
        currentSuit.children.push(suit);
        currentSuit.countTest++;
    }
    suit.tests = [];
    suit.run = function () {
        if (this.skip) return console.info(`skiped test marked as skip: ${label}`);
        if (this.only) {
            console.info(`run test marked as only: ${label}`);
        } else if (this.parent && this.parent.countOnly) return;
        try {
            func();
        } catch (e) {
            console.error(String(e));
        }
    };
    return suit;
}

var extend = function (f) {
    f.skip = function () {
        var r = f.apply(null, arguments);
        r.skip = true;
        currentSuit && currentSuit.countSkip++;
        return r;
    };
    f.only = function () {
        var r = f.apply(null, arguments);
        r.only = true;
        currentSuit && currentSuit.countOnly++;
        return r;
    };
};

extend(Suit);
extend(Test);

Object.assign(exports, {
    describe,
    it: test
});