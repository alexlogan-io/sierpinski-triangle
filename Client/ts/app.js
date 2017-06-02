"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
var d3 = require("d3");
var width = 1000;
var height = 1000;
var s = 800;
var sin30 = Math.pow(3, 1 / 2) / 2;
var cos30 = .5;
var svg;
var appendTriangle = function (cx, cy, r) {
    svg.append('polygon')
        .attr('cx', cx)
        .attr('cy', cy)
        .attr('r', r)
        .attr('class', 'outer')
        .attr('fill', 'black')
        .attr('points', (cx) + ',' + (cy - r) + ' ' +
        (cx - r * sin30) + ',' + (cy + r * cos30) + ' ' +
        (cx + r * sin30) + ',' + (cy + r * cos30));
};
var run = function () {
    d3.selectAll('.outer').each(function () {
        var t = d3.select(this);
        splitTriangle(this, Number(t.attr('cx')), Number(t.attr('cy')), Number(t.attr('r')));
    });
};
var init = function () {
    appendTriangle(width / 2, height * 2 / 3, s * 2 / 3);
    for (var i = 0; i < 5; i++) {
        run();
    }
};
var splitTriangle = function (triangle, cx, cy, r) {
    appendTriangle(cx, cy - r / 2, r / 2);
    appendTriangle(cx - r * sin30 / 2, cy + r * cos30 / 2, r / 2);
    appendTriangle(cx + r * sin30 / 2, cy + r * cos30 / 2, r / 2);
    //d3.select(triangle).attr('fill', 'white').on('click', () => { }).attr('class','inner');
    d3.select(triangle).remove();
};
var transform = function () {
    svg.attr("transform", d3.event.transform);
};
($(function () {
    svg = d3.select("#chart")
        .append("svg:svg")
        .attr("width", width)
        .attr("height", height)
        .attr("pointer-events", "all")
        .append('svg:g')
        .call(d3.zoom().on("zoom", transform))
        .append('svg:g');
    init();
    $('#runBtn').on('click', function () {
        run();
    });
}));
//# sourceMappingURL=app.js.map