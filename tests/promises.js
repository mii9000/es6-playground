import http, {errAsync, success} from "../src/http.js";
import b from "../src/business.js";
import assert from "../src/utils.js";

const {BaseCustomer} = b;
const fail = (msg = 'should not execute') => chai.expect(true, msg).to.be.false;
const pass = (msg) => chai.expect(true, msg).to.be.true;

describe('Promises', function () {   
    it('should get a BaseCustomer', function () {
        const tester = (x) => {
            chai.expect(x).to.eql({data : new BaseCustomer()});
        };
        return http().then(tester);
    });

    it('should be an error', function () {
        return errAsync()
        .then(fail)
        .catch(x => assert(x === "ERROR!!!")) //only the first catch handler will execute
        .catch(fail);
    });

    it('Promise.all should succeed', function(){
        return Promise.all([success, http()])
        .then(values => {
            chai.expect(values[0]).to.be.equal('success!');
            chai.expect(values[1]).to.eql({data : new b.BaseCustomer()});
        })
        .catch(fail)
        .catch(fail)
        .finally(pass) //all finally handlers will get executed
        .finally(pass);
    });

    it('Promise.all should fail', function(){
        return Promise.all([errAsync(), http()])
        .then(fail)
        .catch(err => assert(err === "ERROR!!!"))
        .catch(fail);
    });
});