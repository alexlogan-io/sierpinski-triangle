import * as $ from 'jquery';
import * as d3 from 'd3';

const width  = 	1000
const height = 	1000;
const s =  800; 	

const sin30 = Math.pow(3,1/2)/2;
const cos30 = .5;

let svg;

const appendTriangle = (cx, cy, r) => {
    svg.append('polygon')
        .attr('cx', cx)
        .attr('cy', cy)
        .attr('r', r)
        .attr('class','outer')
        .attr('fill', 'black')
		.attr('points', (cx) + ',' + (cy-r) + ' ' + 
						(cx-r*sin30) + ',' + (cy + r*cos30) + ' ' +
						(cx+r*sin30) + ',' + (cy + r*cos30))
}

const run = () => {
    d3.selectAll('.outer').each(function () {
        let t = d3.select(this);
        splitTriangle(this, Number(t.attr('cx')), Number(t.attr('cy')), Number(t.attr('r')));
    });
}

const init = () => {
    appendTriangle(width / 2, height * 2 / 3, s * 2 / 3)

    for (var i = 0; i < 5; i++) {
        run();
    }
}

const splitTriangle = (triangle, cx, cy, r) => {
    appendTriangle(cx, cy - r / 2, r / 2);
    appendTriangle(cx - r * sin30 / 2, cy + r * cos30 / 2, r / 2);
    appendTriangle(cx + r * sin30 / 2, cy + r * cos30 / 2, r / 2);

    //d3.select(triangle).attr('fill', 'white').on('click', () => { }).attr('class','inner');
    d3.select(triangle).remove();
}

const transform = () =>{
	svg.attr("transform", d3.event.transform)     
}

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

    $('#runBtn').on('click', () => {
        run();
    })
	
}));