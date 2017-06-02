"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d3 = require("d3");
var Consts_1 = require("./Consts");
var Sierpinski = (function () {
    function Sierpinski() {
        var _this = this;
        this.newTriangle = function (cx, cy, r) {
            _this.svg.append('polygon')
                .attr('cx', cx)
                .attr('cy', cy)
                .attr('r', r)
                .attr('class', 'outer')
                .attr('fill', 'black')
                .attr('points', (cx) + ',' + (cy - r) + ' ' +
                (cx - r * Consts_1.sin30) + ',' + (cy + r * Consts_1.cos30) + ' ' +
                (cx + r * Consts_1.sin30) + ',' + (cy + r * Consts_1.cos30));
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
            _this.newTriangle(cx, cy - r / 2, r / 2);
            _this.newTriangle(cx - r * Consts_1.sin30 / 2, cy + r * Consts_1.cos30 / 2, r / 2);
            _this.newTriangle(cx + r * Consts_1.sin30 / 2, cy + r * Consts_1.cos30 / 2, r / 2);
            //d3.select(triangle).attr('fill', 'white').on('click', () => { }).attr('class','inner');
            d3.select(triangle).remove();
        };
        this.init = function () {
            _this.newTriangle(_this.width / 2, _this.height * 2 / 3, _this.triangleHeight * 2 / 3);
            for (var i = 0; i < 5; i++) {
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
                if (_this.zoomDepth > _this.currentIterations) {
                    _this.processOuterTriangles();
                }
            }
            _this.svg.attr("transform", d3.event.transform);
        };
        this.width = 1000;
        this.height = 1000;
        this.triangleHeight = 800;
        this.zoomDepth = 0;
        this.currentIterations = 0;
        this.svg = d3.select("#chart")
            .append("svg:svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("pointer-events", "all")
            .append('svg:g')
            .call(d3.zoom().on("zoom", this.transform))
            .append('svg:g');
        this.init();
    }
    return Sierpinski;
}());
exports.default = Sierpinski;
//# sourceMappingURL=Sierpinski.js.map