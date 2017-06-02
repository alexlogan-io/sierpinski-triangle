"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
var Sierpinski_1 = require("./Sierpinski");
require("../css/site.css");
($(function () {
    var spnski = new Sierpinski_1.default();
    $('#runBtn').on('click', function () {
        spnski.processOuterTriangles();
    });
}));
//# sourceMappingURL=app.js.map