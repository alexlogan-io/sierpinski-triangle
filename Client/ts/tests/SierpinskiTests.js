"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jsdom-global/register");
var Sierpinski_1 = require("../Sierpinski");
var Consts_1 = require("../Consts");
var chai_1 = require("chai");
before(function () {
    this.jsdom = require('jsdom-global')('<div><div class="row"><div class="col-md-11"><div id="chart"></div></div><div class="col-md-1"><br /><button class="btn btn-default btn-block" id="resetBtn">Reset</button></div></div></div><footer id="footer"><p>&copy; 2017 - Alex Logan</p></footer>');
});
describe('Points string should contain correct values', function () {
    it("chould equal points string", function () {
        //arrange
        var cx = 600;
        var cy = 250;
        var r = 15;
        var pointsString = cx + "," + (cy - r) + " " + (cx - r * Consts_1.sin30) + ", " + (cy + r * Consts_1.cos30) + " " + (cx + r * Consts_1.sin30) + ", " + (cy + r * Consts_1.cos30);
        var sierpinksi = new Sierpinski_1.default();
        //act
        //console.log(sierpinksi);
        var result = sierpinksi.createPointsString(cx, cy, r);
        //assert
        chai_1.expect(result).to.equal(pointsString);
    });
});
describe('Process outer triangles increments number of iterations', function () {
    it('should increase number of iterations by 1', function () {
        //arange
        var sierpinksi = new Sierpinski_1.default();
        sierpinksi.initaliseCanvas();
        //act 
        var iterationsBefore = sierpinksi.currentIterations;
        sierpinksi.processOuterTriangles();
        var result = sierpinksi.currentIterations;
        //assert
        chai_1.expect(result).to.equal(iterationsBefore + 1);
    });
});
describe('Init zoom depth', function () {
    it('Should zoom to correct level', function () {
        //arange
        var sierpinksi = new Sierpinski_1.default();
        sierpinksi.initaliseCanvas();
        var iterations = 1;
        //act
        var initialZoomDepth = sierpinksi.zoomDepth;
        sierpinksi.initIterations(iterations);
        var result = sierpinksi.zoomDepth;
        //assert
        chai_1.expect(result).to.equal(initialZoomDepth + iterations);
    });
});
describe('Init current iterations', function () {
    it('should set current iterations to correct level', function () {
        //arange
        var sierpinksi = new Sierpinski_1.default();
        sierpinksi.initaliseCanvas();
        var iterations = 1;
        //act
        var initialIterations = sierpinksi.currentIterations;
        sierpinksi.initIterations(iterations);
        var result = sierpinksi.currentIterations;
        //assert
        chai_1.expect(result).to.equal(initialIterations + iterations);
    });
});
/*
describe('Reset zoom', () => {
    it('Should reset zoom to 0', () => {
        //arange
        let sierpinksi = new Sierpinksi();
        sierpinksi.initaliseCanvas();
        sierpinksi.initIterations(1);

        //act
        sierpinksi.reset();
        console.log(sierpinksi);
        const result = sierpinksi.zoomDepth;

        //assert
        expect(result).to.equal(0);
        
    });
});

describe('Reset current itertions', () => {
    it('Should reset iterations to 0', () => {
        //arange
        const sierpinksi = new Sierpinksi();
        sierpinksi.initaliseCanvas();
        sierpinksi.initIterations(1);

        //act
        sierpinksi.reset();
        const result = sierpinksi.currentIterations;

        //assert
        expect(result).to.equal(0);
    });
});
*/
after(function () {
    this.jsdom();
});
//# sourceMappingURL=SierpinskiTests.js.map