import b from '../src/business.js';
import assert from "../src/utils.js";

describe('Classes', function () {
    it('BaseCustomer should have discount set to', function () {
        const baseCustomer = new b.BaseCustomer();
        chai.expect(baseCustomer.discount === undefined).to.be.true;
    });

    it('SpecialCustomer should have discount set to 10', function () {
        const specialCustomer = new b.SpecialCustomer();
        chai.expect(specialCustomer.discount === 10).to.be.true;
    });

    it('BaseCustomer is instance of SpecialCustomer', function () {
        chai.expect(new b.SpecialCustomer() instanceof b.BaseCustomer).to.be.true;
    });

    it('BaseCustomer is prototype of SpecialCustomer', function () {
        chai.expect(b.BaseCustomer.isPrototypeOf(b.SpecialCustomer)).to.be.true;
    });

    it('Object is prototype of BaseCustomer', function () {
        chai.expect(new b.BaseCustomer() instanceof Object).to.be.true;
    });

    it('Object is prototype of SpecialCustomer', function () {
        chai.expect(new b.SpecialCustomer() instanceof Object).to.be.true;
    });

    it('__proto__(instance) equal to prototype(constructor function)', function () {        
        chai.expect(b.SpecialCustomer.prototype === new b.SpecialCustomer().__proto__).to.be.true;
    });

    it('Order prototype will have the properties', function () {        
        chai.expect(b.Order.prototype.hasOwnProperty('customer')).to.be.true;
    });

    it('Order prototype will have the methods', function () {        
        chai.expect(b.Order.prototype.hasOwnProperty('checkout')).to.be.true;
        chai.expect(new b.Order().checkout instanceof Function).to.be.true;
    });

    it('Order will have the static members', function () {        
        chai.expect(b.Order.hasOwnProperty('do')).to.be.true;
        chai.expect(b.Order.do instanceof Function).to.be.true;
    });

    it('for...in NOT SOLVED', function(){
        /*
        - for...in used on instances
        - Object.keys() on object types
        */
        const obj = new b.BaseCustomer();
        assert(obj instanceof b.BaseCustomer)
        console.log({a: "sdsd"});
    
        for (const prop in obj) {
          console.log(`obj.${prop} = ${obj[prop]}`);
        }
        console.log(Object.keys(new b.BaseCustomer()));
    });
});