/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = vendor_bf232075a28b6b634232;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var d3 = __webpack_require__(6);
var Consts_1 = __webpack_require__(4);
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
            _this.newTriangle(cx, cy - r / 2, r / 2, 'black'); //top triangle
            _this.newTriangle(cx - r * Consts_1.sin30 / 2, cy + r * Consts_1.cos30 / 2, r / 2, 'black'); //left
            _this.newTriangle(cx + r * Consts_1.sin30 / 2, cy + r * Consts_1.cos30 / 2, r / 2, 'black'); //right
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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(18);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.sin30 = Math.pow(3, 1 / 2) / 2;
exports.cos30 = 0.5;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var $ = __webpack_require__(3);
var Sierpinski_1 = __webpack_require__(1);
__webpack_require__(2);
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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(3);

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map