import b from "../src/business.js";
import assert from "../src/utils.js";

describe('Arbitrary', () => {
    it('Extension methods on a Object', () => {
        const cus1 = new b.BaseCustomer();
        assert(cus1.to_string('cus 1') === 'cus 1');

        const cus2 = new b.BaseCustomer();
        assert(cus2.to_string('cus 2') === 'cus 2');
    });
});