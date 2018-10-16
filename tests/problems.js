import assert from "../src/utils.js";

describe('Problems', function () {
    it('Find length of longest continous sub array for sum k - Sol 1', function () {
        const fn = (array, sum) => {
            let len = 0, currentSum = 0;
            for (let i = 0; i < array.length; i++) {
                const element = array[i];

                if ((currentSum + element) <= sum) {
                    currentSum += element;
                    len++;
                } else {
                    currentSum = element;
                }
            }
            return len;
        };

        assert(fn([4, 1, 2, 1, 0, 1], 4) === 4);
        assert(fn([1, 2, 3, 4], 3) === 2);
        assert(fn([-2, 0, 1, 3, 2], 4) === 5);
        assert(fn([1, 1, 0, 0, 1], 1) === 3);

        /*
        The key to this solution was to move forward and incrementing a Length
        counter and pausing it when non-complient element was encountered
        */
    });

    it('Find length of longest continous sub array for sum k - Sol 2', function () {
        const fn = (array, sum) => {
            let j = 0, currentSum = 0, container = [];
            const pushSubArr = (arr, i, el) => {
                if (arr[i] === undefined) {
                    arr.push([]);
                }
                arr[i].push(el);
            };
            for (let i = 0; i < array.length; i++) {
                const element = array[i];

                if ((currentSum + element) <= sum) {
                    currentSum += element;
                    pushSubArr(container, j, element);
                } else {
                    j++;
                    pushSubArr(container, j, element);
                    currentSum = element;
                }
            }
            return container.reduce((acc, curr) => curr.length > acc ? curr.length : acc, 0);
        };

        assert(fn([4, 1, 2, 1, 0, 1], 4) === 4);
        assert(fn([1, 2, 3, 4], 3) === 2);
        assert(fn([-2, 0, 1, 3, 2], 4) === 5);
        assert(fn([1, 1, 0, 0, 1], 1) === 3);
    });

    it('Reverse an array - Sol 1', function () {
        const fn = (array) => {
            const lastIndex = array.length - 1,
                center = Math.floor(array.length / 2),
                swap = (a, b, array) => {
                    const temp = array[b];
                    array[b] = array[a];
                    array[a] = temp;
                };

            for (let i = 0; i < center; i++) {
                swap(i, lastIndex - i, array);
            }
            return array;
        };

        chai.expect(fn([1, 2, 3, 4])).to.be.eql([4, 3, 2, 1]);
        chai.expect(fn([1, 2, 3])).to.be.eql([3, 2, 1]);
        chai.expect(fn(['a', 'b', 'c'])).to.be.eql(['c', 'b', 'a']);
    });

    it('Reverse an array - Sol 2', function () {
        const fn = (array) => {
            if (array.length === 1) return array;
            const last = array.pop();
            return [last, ...fn(array)];
        };

        chai.expect(fn([1, 2, 3, 4])).to.be.eql([4, 3, 2, 1]);
        chai.expect(fn([1, 2, 3])).to.be.eql([3, 2, 1]);
        chai.expect(fn(['a', 'b', 'c'])).to.be.eql(['c', 'b', 'a']);
    });

    it('FizzBuzz', function () {
        const fn = (array) => {
            return array.map(v => {
                const fizz = v % 3 === 0, buzz = v % 5 === 0;
                if (fizz && buzz) return 'FizzBuzz';
                if (fizz) return 'Fizz';
                if (buzz) return 'Buzz';
                return v;
            });
        };

        chai.expect((fn([1, 2, 3, 4, 5, 15]))).to.be.eql([1, 2, 'Fizz', 4, 'Buzz', 'FizzBuzz']);
    });

    it('Fibionacci', function () {
        const fn = (num) => {
            const result = [];
            for (let i = 0; i < num; i++) {
                if (i === 0) {
                    result.push(0);
                } else if (i === 1) {
                    result.push(1);
                } else {
                    result.push(result[i - 1] + result[i - 2])
                }
            }
            return result;
        };

        chai.expect(fn(10)).to.be.eql([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
    });

    it('Factorial', function(){
        const fn = (num) => {
            if(num === 0) return 1;
            return num * fn(num - 1);
        };

        assert(fn(5) === 120);
        assert(fn(3) === 6);
    });

    it('Binary Search', function(){
        const fn = (array, target) => {
            const search = (start, end) => {
                const center = Math.floor((start + end) / 2),
                guess = array[center];
                if(guess === target){
                    return center;
                } else if (target > guess) {
                    return search(center + 1, end);
                } else {
                    return search(start, end - 1);
                }
            };
            return search(0, array.length - 1);
        };

        assert(fn([1,2,3,4,5,6,7], 6) === 5);
        assert(fn([1,2,3,4,5,6,7,8,9], 2) === 1);
    });

    it('Anagram', function(){
        const fn = (source, target) => {
            if(source.length !== target.length) return false;
            
            const sourceMap = new Map();
            
            [...source].forEach(v => {
                if(sourceMap.has(v)){
                    const existingValue = sourceMap.get(v);
                    sourceMap.set(v, existingValue + 1);
                } else {
                    sourceMap.set(v, 1);
                }
            });

            [...target].forEach(v => {
                if(sourceMap.has(v)) {
                    const existingValue = sourceMap.get(v),
                    decrement = existingValue - 1;
                    if(decrement === 0) {
                        sourceMap.delete(v);
                    } else {                        
                        sourceMap.set(v, decrement);
                    }
                }
            });

            return sourceMap.size === 0;
        };

        assert(fn('acer', 'race'));
        assert(fn('txt', 'txt'));
        assert(fn('abbc', 'cabb'));
        assert(!fn('abc', 'cbd'));
    });
});