import '../src/utils.js';
import React, {Prop} from "../src/file1.js";

describe('Import/Export', function () {
    it('import statements get hoisted to top', function () {
        assert(info instanceof Function);
        assert(error instanceof Function);
    });

    it('mixed default export', function(){
        chai.expect(React === "React").to.be.true;
        chai.expect(Prop === 'Prop').to.be.true;
    });
});

import assert, {info,error} from '../src/utils.js';

describe('Import/Export', function () {   
    it('functions from utils are available', function () {
        assert(info instanceof Function);
        assert(error instanceof Function);
    });
});