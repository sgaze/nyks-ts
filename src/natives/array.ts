/**
 * Created by m.ourir on 03/04/2015.
 */
interface ArrayConstructor{
    from(arrayLike : any) : any;
    each(arr: any, fn , bind?: any) : void ;
}

interface Array<T>{
    contains(item, from ?: number ) : boolean ;
    diff(a : Array<T>) : Array<T> ;
    shuffle() ;
    erase(itm) ;
}

Array.prototype.contains= function(item, from){
    return this.indexOf(item, from) != -1;
}

Array.prototype.erase = function(item){
    for (var i = this.length; i--;){
        if (this[i] === item) this.splice(i, 1);
    }
    return this;
}

Array.each = function(arr , fn , bind?){
    for (var i = 0, l = arr.length; i < l; i++){
        if (i in arr) fn.call(bind, arr[i], i , arr);
    }

}


Array.prototype.diff = function(a) {
    return this.filter(function(i) { return a.indexOf(i) < 0;} );
}


// Production steps of ECMA-262, Edition 6, 22.1.2.1
// Reference: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.from

var toStr = Object.prototype.toString;
var isCallable = function (fn) {
    return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
};
var toInteger = function (value) {
    var number = Number(value);
    if (isNaN(number)) { return 0; }
    if (number === 0 || !isFinite(number)) { return number; }
    return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
};
var maxSafeInteger = Math.pow(2, 53) - 1;
var toLength = function (value) {
    var len = toInteger(value);
    return Math.min(Math.max(len, 0), maxSafeInteger);
};

Array.from = function(arrayLike/*, mapFn, thisArg */) {
    // 1. Let C be the this value.
    var C : any = this;

    // 2. Let items be ToObject(arrayLike).
    var items : any= Object(arrayLike);

    // 3. ReturnIfAbrupt(items).
    if (arrayLike == null) {
        throw new TypeError("Array.from requires an array-like object - not null or undefined");
    }

    // 4. If mapfn is undefined, then let mapping be false.
    var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
    var T;
    if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
            throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
            T = arguments[2];
        }
    }

    // 10. Let lenValue be Get(items, "length").
    // 11. Let len be ToLength(lenValue).
    var len = toLength(items.length);

    var Array : any ;

    // 13. If IsConstructor(C) is true, then
    // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
    // 14. a. Else, Let A be ArrayCreate(len).
    var A : any= isCallable(C) ? Object(new C(len)) : new Array(len);

    // 16. Let k be 0.
    var k = 0;
    // 17. Repeat, while k < len… (also steps a - h)
    var kValue;
    while (k < len) {
        kValue = items[k];
        if (mapFn) {
            A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
            A[k] = kValue;
        }
        k += 1;
    }
    // 18. Let putStatus be Put(A, "length", len, true).
    A.length = len;
    // 20. Return A.
    return A;
};

Array.prototype.shuffle = function(){
    for (var i = this.length; i && --i;){
        var temp = this[i], r = Math.floor(Math.random() * ( i + 1 ));
        this[i] = this[r];
        this[r] = temp;
    }
    return this;
};