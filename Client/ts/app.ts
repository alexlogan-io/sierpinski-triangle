import * as $ from 'jquery';
import * as d3 from 'd3';
import Sierpinski from './Sierpinski';

($(function () {

    const spnski = new Sierpinski();

    $('#runBtn').on('click', () => {
        spnski.processOuterTriangles();
    })
	
}));