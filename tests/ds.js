import assert from "../src/utils.js";

describe('Maps', function () {   
    it('Map basic functionality', function () {
        const map = new Map();
        map.set(1, "One");
        map.set(2, "Two");
        map.set(2);

        //key exists
        assert(map.get(1) === "One");
        //value was overriden above for key 2
        assert(map.get(2) === undefined);
        //key 3 does not exist
        assert(map.get(3) === undefined);
        
        map.delete(1);
        //key 1 was deleted
        assert(map.get(1) === undefined);

        map.set({ data : ""}, "data");
        //even if complex objects can be used as key
        //since they point to different objects, doesnt work
        assert(map.get({ data : ""}) === undefined);

        const bs = { data : ""};
        map.set(bs, "data");
        //even if complex objects can be used as key
        //since they point to different objects, doesnt work
        assert(map.get(bs) === "data");

        const key = Symbol("key");
        map.set(key, "data");
        assert(map.get(key) === "data");

        //iteration 1
        // map.forEach((v, k) => console.log(`${k.toString()} : ${v}`));

        // //iteration 2
        // for (const [key, value] of map) {
        //     console.log(`${key.toString()} : ${value}`);
        // }

        // //iteration 3
        // console.log(Array.from(map.keys()).forEach(x => console.log(x)));

        // //iteration 4
        // console.log(Array.from(map.entries()).forEach(x => console.log(x)));
    
        const clonedMap = new Map(map);
        assert(clonedMap !== map);   

        const map1 = new Map([[1, "One"]]);
        const map2 = new Map().set(2, "Two");
        const mergedMap = new Map([...map1, ...map2]);
        assert(mergedMap.size === 2);      
    });
});

describe('WeakMaps', function() {
    it('WeakMaps basic functionality', function(){
        const weakMap = new WeakMap();
        let key = { key : 1 }
        weakMap.set(key, "sdsd");
        assert(weakMap.has(key));
        key = null;
        assert(!weakMap.has(key))
    });
});

describe('Sets', function(){
    it('Sets basic functionality', function(){
        const set = new Set();
        const empty = { data : "data" };
        set.add(1);
        set.add(1);
        set.add(2);
        set.add({ data: "" });
        set.add({ data: "" });
        set.add(empty);
        set.add(empty);
        assert(set.size === 5);

        const anotherSet = new Set([1,1,1, null]);
        assert(anotherSet.size === 2);
    });
});

describe('WeakSets', function(){
    it('WeakSet basic functionality', function(){
        const ws = new WeakSet();
        const window = {};
        const foo = {};
        
        ws.add(window);
        ws.add(foo);

        assert(ws.has(window)); // true
        assert(ws.has(foo));    // true
        
        ws.delete(window); // removes window from the set
        assert(!ws.has(window));    // false, window has been removed  
       
        //reference to different data
        ws.add({ data : "" });
        ws.add({ data : "" });
        assert(!ws.has({ data : "" }));

        //only object type allowed
        try {
            ws.add(1);
        } catch (error) {
            assert(error instanceof TypeError);
        }

        ws.add(function() { console.log("hi!") });
    });
});