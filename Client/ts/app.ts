import * as $ from 'jquery';
import * as d3 from 'd3';
import Sierpinski from './Sierpinski';
import '../css/site.css';

($(function () {

    const spnski = new Sierpinski();
    spnski.initaliseCanvas();
    spnski.initIterations(5);

    $('#resetBtn').on('click', () => {
        spnski.reset();
    });
}));