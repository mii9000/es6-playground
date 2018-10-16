class BaseCustomer {
    constructor(){
    }
    
    get discount() { return this._discount; }
    set discount(value) { this._discount = value; }
    
}

Object.defineProperty(BaseCustomer.prototype, 'to_string', {
    value(arg1) {
        return arg1;
    }
});

class SpecialCustomer extends BaseCustomer {
    constructor(){
        super();
        this.discount = 10;
    }
}

class Order {
    get customer() { return this._customer; }
    set customer(value) { this._customer = value; }

    constructor(){

    }

    checkout(){
        return "checking out...";
    }

    static do() { 
        return true;
    }

    balance(value = 5) {
        return value <= 5 ? 5 : value;
    }
}

const business = {BaseCustomer, SpecialCustomer, Order}

export default business