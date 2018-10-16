import assert from "../src/utils.js";

describe('Rest', () => {
    
    it('must be the last parameter', () => {
      const fn = (...rest) => {
        chai.expect([1, 2]).to.be.eql(rest);
      };
      fn(1, 2);
    });
    
    it('can be used to get all other parameters', () => {
      const fn = (firstParam, secondParam, ...rest) => {
        assert(firstParam === null);
        assert(secondParam === 2);
        chai.expect([3,4]).to.be.eql(rest);
      };
      fn(null, 2, 3, 4);
    });
    
    it('makes `arguments` obsolete', () => {
      const fn = (...args) => {
        chai.expect([42, 'twenty three', 'win']).to.be.eql(args);
      };
      fn(42, 'twenty three', 'win');
    });
      
    it('destructing with ...rest', () => {
        const fn = (...args) => args;
        const [firstArg, ...rest] = fn(1, 2, 3);
        assert(firstArg === 1);
        chai.expect([2, 3]).to.be.eql(rest);

        const [first, ...all] = [1, 2, 3, 4];
        assert(first === 1);
        chai.expect([2, 3, 4]).to.be.eql(all);

        const [, , ...remain] = [1, 2, 3, 4];
        chai.expect([3, 4]).to.be.eql(remain);
    });

  });
  