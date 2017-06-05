"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var $ = require("jquery");
var Sierpinski_1 = require("./Sierpinski");
require("../css/site.css");
($(function () {
    var spnski = new Sierpinski_1.default();
    spnski.initaliseCanvas();
    spnski.initIterations(5);
    $('#resetBtn').on('click', function () {
        spnski.reset();
        spnski.initaliseCanvas();
        spnski.initIterations(5);
    });
}));
//# sourceMappingURL=app.js.map