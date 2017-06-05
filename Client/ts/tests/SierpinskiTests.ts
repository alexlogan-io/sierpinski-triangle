import 'jsdom-global/register'
import Sierpinksi from '../Sierpinski';
import {sin30, cos30} from '../Consts';
import {expect} from 'chai';

before(function () {
  this.jsdom = require('jsdom-global')('<div><div class="row"><div class="col-md-11"><div id="chart"></div></div><div class="col-md-1"><br /><button class="btn btn-default btn-block" id="resetBtn">Reset</button></div></div></div><footer id="footer"><p>&copy; 2017 - Alex Logan</p></footer>');
})

describe('Points string should contain correct values', () => {
    it("chould equal points string", () => {
        //arrange
        const cx = 600;
        const cy = 250;
        const r = 15;

        const pointsString = `${cx},${cy - r} ${cx - r * sin30}, ${cy + r * cos30} ${cx + r * sin30}, ${cy + r * cos30}`
        const sierpinksi = new Sierpinksi();

        //act
        //console.log(sierpinksi);
        const result = sierpinksi.createPointsString(cx,cy,r);

        //assert
        expect(result).to.equal(pointsString);
    });
});

describe('Process outer triangles increments number of iterations', () => {
    it('should increase number of iterations by 1', () => {
        //arange
        const sierpinksi = new Sierpinksi();
        sierpinksi.initaliseCanvas();

        //act 
        const iterationsBefore = sierpinksi.currentIterations;
        sierpinksi.processOuterTriangles();
        const result = sierpinksi.currentIterations;

        //assert
        expect(result).to.equal(iterationsBefore + 1);
    });
});

describe('Init zoom depth', () => {
    it('Should zoom to correct level', () => {
        //arange
        const sierpinksi = new Sierpinksi();
        sierpinksi.initaliseCanvas();
        const iterations = 1;

        //act
        const initialZoomDepth = sierpinksi.zoomDepth;
        sierpinksi.initIterations(iterations );
        const result = sierpinksi.zoomDepth;

        //assert
        expect(result).to.equal(initialZoomDepth + iterations);
    });
});

describe('Init current iterations', () => {
    it('should set current iterations to correct level', () => {
        //arange
        const sierpinksi = new Sierpinksi();
        sierpinksi.initaliseCanvas();
        const iterations = 1;

        //act
        const initialIterations = sierpinksi.currentIterations;
        sierpinksi.initIterations(iterations);
        const result = sierpinksi.currentIterations;

        //assert
        expect(result).to.equal(initialIterations + iterations);
    });
});

/*
describe('Reset zoom', () => {
    it('Should reset zoom to 0', () => {
        //arange
        let sierpinksi = new Sierpinksi();
        sierpinksi.initaliseCanvas();
        sierpinksi.initIterations(1);

        //act
        sierpinksi.reset();
        console.log(sierpinksi);
        const result = sierpinksi.zoomDepth;

        //assert
        expect(result).to.equal(0);
        
    });
});

describe('Reset current itertions', () => {
    it('Should reset iterations to 0', () => {
        //arange
        const sierpinksi = new Sierpinksi();
        sierpinksi.initaliseCanvas();
        sierpinksi.initIterations(1);

        //act
        sierpinksi.reset();
        const result = sierpinksi.currentIterations;

        //assert
        expect(result).to.equal(0);
    });
});
*/

after(function () {
  this.jsdom()
})