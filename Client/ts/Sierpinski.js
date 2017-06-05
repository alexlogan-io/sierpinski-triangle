"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d3 = require("d3");
var Consts_1 = require("./Consts");
var Sierpinski = (function () {
    function Sierpinski() {
        var _this = this;
        this.newTriangle = function (cx, cy, r, color) {
            _this.svg.append('polygon')
                .attr('cx', cx)
                .attr('cy', cy)
                .attr('r', r)
                .attr('class', 'outer')
                .attr('fill', color)
                .attr('points', _this.createPointsString(cx, cy, r));
        };
        this.createPointsString = function (cx, cy, r) {
            //top point, left and right points calculated using trig 
            return cx + "," + (cy - r) + " " + (cx - r * Consts_1.sin30) + ", " + (cy + r * Consts_1.cos30) + " " + (cx + r * Consts_1.sin30) + ", " + (cy + r * Consts_1.cos30);
        };
        this.processOuterTriangles = function () {
            var self = _this;
            d3.selectAll('.outer').each(function () {
                var t = d3.select(this);
                self.splitTriangle(this, Number(t.attr('cx')), Number(t.attr('cy')), Number(t.attr('r')));
            });
            _this.currentIterations += 1;
        };
        this.splitTriangle = function (triangle, cx, cy, r) {
            _this.newTriangle(cx, cy - r / 2, r / 2, 'blue'); //top triangle
            _this.newTriangle(cx - r * Consts_1.sin30 / 2, cy + r * Consts_1.cos30 / 2, r / 2, 'green'); //left
            _this.newTriangle(cx + r * Consts_1.sin30 / 2, cy + r * Consts_1.cos30 / 2, r / 2, 'red'); //right
            d3.select(triangle).remove();
        };
        this.initIterations = function (iterations) {
            _this.newTriangle(_this.width / 2, _this.height * 2 / 3, _this.triangleHeight * 2 / 3, 'black');
            for (var i = 0; i < iterations; i++) {
                _this.zoomDepth += 1;
                _this.processOuterTriangles();
            }
        };
        this.transform = function () {
            if (d3.event.sourceEvent.type === "wheel") {
                //doesn't work in chrome yet...'
                if (d3.event.sourceEvent.deltaY < 0) {
                    _this.zoomDepth += 1;
                }
                else if (d3.event.sourceEvent.deltaY > 0) {
                    _this.zoomDepth += -1;
                }
                _this.compareZoomAndIterate();
            }
            _this.svg.attr("transform", d3.event.transform);
        };
        this.compareZoomAndIterate = function () {
            if (_this.zoomDepth > _this.currentIterations) {
                _this.processOuterTriangles();
            }
        };
        this.reset = function () {
            console.log(_this);
            _this.zoomDepth = 0;
            _this.currentIterations = 0;
            d3.select("#chart").selectAll('*').remove();
        };
        this.initaliseCanvas = function () {
            _this.svg = d3.select("#chart")
                .append("svg:svg")
                .attr("width", _this.width)
                .attr("height", _this.height)
                .attr("pointer-events", "all")
                .append('svg:g')
                .call(d3.zoom().on("zoom", _this.transform))
                .append('svg:g');
            _this.svg.append('svg:rect')
                .attr('width', _this.width)
                .attr('height', _this.height)
                .attr('fill', 'white');
        };
        this.width = document.getElementById('chart').offsetWidth;
        this.height = window.innerHeight - document.getElementById('footer').offsetHeight - 50; //-30 to negate navbar
        this.triangleHeight = Math.min(this.height, this.width);
        this.zoomDepth = 0;
        this.currentIterations = 0;
    }
    return Sierpinski;
}());
exports.default = Sierpinski;
//# sourceMappingURL=Sierpinski.js.map