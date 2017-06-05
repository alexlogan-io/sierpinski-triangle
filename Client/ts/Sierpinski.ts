import * as d3 from "d3";
import { sin30, cos30 } from "./Consts";

export default class Sierpinski {
    svg: d3.Selection<any,any,any,any>;
    width: number;
    height: number;
    triangleHeight: number;

    zoomDepth: number;
    currentIterations: number;

    constructor() {
        this.width = document.getElementById('chart').offsetWidth;
        this.height = window.innerHeight - document.getElementById('footer').offsetHeight - 50; //-30 to negate navbar
        this.triangleHeight = Math.min(this.height, this.width);
        this.zoomDepth = 0;
        this.currentIterations = 0;
    }

    newTriangle = (cx: number, cy: number, r: number) => {
        this.svg.append('polygon')
            .attr('cx', cx)
            .attr('cy', cy)
            .attr('r', r)
            .attr('class', 'outer')
            .attr('fill', 'black')
            .attr('points', this.createPointsString(cx,cy,r));
    }

    createPointsString = (cx: number, cy: number, r: number) => {
        //top point, left and right points calculated using trig 
        return `${cx},${cy - r} ${cx - r * sin30}, ${cy + r * cos30} ${cx + r * sin30}, ${cy + r * cos30}`;
    }

    processOuterTriangles = () => {
        const self = this;

        d3.selectAll('.outer').each(function () {
            let t = d3.select(this);
            self.splitTriangle(this, Number(t.attr('cx')), Number(t.attr('cy')), Number(t.attr('r')));
        });

        this.currentIterations += 1;
    }

    splitTriangle = (triangle: d3.BaseType, cx: number, cy: number, r: number) => {
        this.newTriangle(cx, cy - r / 2, r / 2);
        this.newTriangle(cx - r * sin30 / 2, cy + r * cos30 / 2, r / 2);
        this.newTriangle(cx + r * sin30 / 2, cy + r * cos30 / 2, r / 2);

        d3.select(triangle).remove();
    }

    initIterations = (iterations: number) => {
        this.newTriangle(this.width / 2, this.height * 2 / 3, this.triangleHeight * 2 / 3)

        for (var i = 0; i < iterations; i++) {
            this.zoomDepth += 1;
            this.processOuterTriangles();
        }
    }

    transform = () => {
        if (d3.event.sourceEvent.type === "wheel") {
            //doesn't work in chrome yet...'
            if (d3.event.sourceEvent.deltaY < 0) {
                this.zoomDepth += 1;
            } else if (d3.event.sourceEvent.deltaY > 0) {
                this.zoomDepth += -1;
            }
            this.compareZoomAndIterate();
        }
        this.svg.attr("transform", d3.event.transform)
    }

    compareZoomAndIterate = () => {
        if (this.zoomDepth > this.currentIterations) {
            this.processOuterTriangles();
        }
    }

    reset = () => {
        this.zoomDepth = 0;
        this.currentIterations = 0;

        d3.select("#chart").selectAll('*').remove();
    }

    initaliseCanvas = () => {
        this.svg = d3.select("#chart")
            .append("svg:svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("pointer-events", "all")
            .append('svg:g')
            .call(d3.zoom().on("zoom", this.transform))
            .append('svg:g');

        this.svg.append('svg:rect')
            .attr('width', this.width)
            .attr('height', this.height)
            .attr('fill', 'white');
    }
}
