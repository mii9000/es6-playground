const info = (value) => {
    console.info(value);
}

const error = (value) => {
    console.error(value);
}

export default function assert(condition) {
    chai.expect(condition).to.be.true;
}

var changeValue = 'try to change value';

export {error, info, changeValue};

info("executing utlils.js due to being -> import 'utils.js'");