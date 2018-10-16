import assert from "../src/utils.js";

describe('Spread', () => {

    it('spread and destructing', function () {
        const [a, b] = [...[1, 2]];
        assert(a === 1);
        assert(b === 2);
    });

    it('in combination with rest and destructing', function () {
        const [, a, b, ...rest] = [...[0, 1, 2, 3, 4, 5]];
        assert(a === 1);
        assert(b === 2);
        chai.expect(rest).to.be.eql([3, 4, 5]);
    });

    it('spreading into the rest', function () {
        const [...rest] = [...[1, 2, 3, 4, 5]];
        chai.expect(rest).to.be.eql([1, 2, 3, 4, 5]);
    });

    it('prefix with `...` to spread as function params', function () {
        const magicNumbers = [1, 2];
        const fn = (magicA, magicB) => {
            assert(magicNumbers[0] === magicA);
            assert(magicNumbers[1] === magicB);
        };
        fn(...magicNumbers);
    });

    it('pass an array of numbers to Math.max()', function () {
        const max = Math.max(...[23, 0, 42, 4]);
        assert(max === 42);
    });

    it('simply spread each char of a string', function () {
        const [a, b] = [...'ab'];
        assert(a === 'a');
        assert(b === 'b');
    });

    it('extracts each array item', function () {
        const [c, a, b] = ['a', ...'12'];
        assert(a === '1');
        assert(b === '2');
    });

    it('works anywhere inside an array (must not be last)', function () {
        const letters = ['a', ...'bcd', 'e', 'f'];
        assert(letters.length === 6);
    });

    it('dont confuse with the rest operator', function () {
        const [...rest] = [...'1234', ...'5'];
        chai.expect(rest).to.be.eql(['1', '2', '3', '4', '5']);
    });

    it('passed as function parameter', function () {
        const max = Math.max(...[1, 2, 3, 4, 5]);
        assert(max === 5);
    });
});
