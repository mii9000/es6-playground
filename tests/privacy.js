import assert, { changeValue } from "../src/utils.js";

const asdasd = () => {
    console.log("!!!!", this);
};
asdasd();

describe('Privacy', () => {

    it('Private Members', () => {
        //if this class is made as a module (own .js file)
        //then these wont be exported
        const name = Symbol('name'),
        method = Symbol('method');

        class Secret {
            get name() { return this[name]; }
            set name(value) { 
                if(value.length > 3) {
                    this[name] = value;
                } 
            }

            constructor() {
                this[name] = '';
            }

            public(){
                return this[method]("can execute now");
            }

            [method](a = "private method not available on instance"){
                return a;
            }
        }

        const sec1 = new Secret();
        sec1.name = "sec1";
        const sec2 = new Secret();
        sec2.name = "sec2";
        const sec3 = new Secret();
        sec3.name = "sec3";
        sec3.name = 's';        

        assert(sec1.name === "sec1");
        assert(sec2.name === "sec2");
        assert(sec3.name === "sec3");
        
        try {
            sec1.method('sdsd');
        } catch (error) {
            assert(error instanceof TypeError);
        }

        assert(sec1.public() === 'can execute now');
    });

    it('Try to change exported values', () => {
        try {
            changeValue = "value is changed";
        } catch (error) {
            assert(error instanceof TypeError);
        }
    });

    it('ES5 Class', () => {
        var Person = (function(){
            function Person(){
                this.name = 'John';
                this.method = function(){
                    return this.name;
                }
            }

            Person.prototype.protoMethod = function(){
                return this.name;
            };

            return Person;
        }());

        var person1 = new Person();
        assert(person1.method() === "John");
        assert(person1.protoMethod() === "John");
        assert(Person.prototype.protoMethod() === undefined);
        try {
            Person.method();
        } catch (error) {
            assert(error instanceof TypeError);
        }
    });

    it('setTimeout Exp', () => {
        const fn = () => {
            console.log('timeout');
        };

        setTimeout(fn, 100);
        setTimeout(fn(), 1000000);
    });

    it('void 0 === undefined', () => {
        assert(void 0 === undefined);
    });

    it('Sorting', () => {
        const arrayNum = [2,1,45,24,6,0],
        arrayString = ['b', 'd', 'c', 'a'],
        arrayObj = [
            { name : "John", age : 10 },
            { name : "Jane", age : 12 },
            { name : "Ibrahim", age : 2 }
        ],
        sort = (a, b, order = 'asc') => {
            var nameA = a.toUpperCase(); // ignore upper and lowercase
            var nameB = b.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return order === 'asc' ? -1 : 1;
            }
            if (nameA > nameB) {
              return order === 'asc' ?  1 : -1;
            }
          
            // names must be equal
            return 0;         
        };

        //doesn't work?
        //console.log(array.sort());

        // console.log(arrayNum.sort((a, b) => a - b));
        // console.log(arrayNum.sort((a, b) => b - a));

        // console.log(arrayString.sort(sort));
        // console.log(arrayString.sort((a, b) => sort(a, b, 'desc')));

        // console.log(arrayObj.sort((a, b) => a.age - b.age));
        // console.log(arrayObj.sort((a, b) => b.age - a.age));
    });

    it('Conversion', () => {
        /*
        Array to Map
        Array to Set
        Object to Map
        Object to Set
        */

        const array = [2, 3, 1, 5, 2],
        obj = { a : 1, b : "name", c : true };

        const mapFromArray = array.reduce((acc, num) => acc.set(num), new Map());
        // console.log(mapFromArray);

        const setFromArray = array.reduce((acc, num) => acc.add(num), new Set());
        // console.log(setFromArray);

        const arrayToObjectArray = [2,4,6,8].map(v => ({ even: v, odd: v + 1 }));
    });

    it('Arrow Functions', () => {
        function fn(){
            console.log("fn method result : ", this.name);
        };
        const obj = {
            name : "obj",
            fn: function(){ console.log(this.name); },
            arrow: () => { 
                console.log(this); 
            },
            arrowFn: function(){
                const ss = () => {
                    console.log(this);
                };
                ss();
            }
        }
        const newObj = {
            name: "new obj"
        };

        // obj.fn();
        obj.fn.bind(newObj);

        // obj.arrow();
        // obj.arrow.call(newObj);

        function Person() {
            //var that = this;
            this.age = 0;
            console.log("outside", this);
          
            setInterval(() => {
              // The callback refers to the `that` variable of which
              // the value is the expected object.
              console.log("inside", this);
              this.age++;
            }, 1000);
          }  
    });
});