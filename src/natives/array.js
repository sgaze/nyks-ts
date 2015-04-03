Array.prototype.contains = function (item, from) {
    return this.indexOf(item, from) != -1;
};
Array.prototype.erase = function (item) {
    for (var i = this.length; i--;) {
        if (this[i] === item)
            this.splice(i, 1);
    }
    return this;
};
Array.each = function (arr, fn, bind) {
    for (var i = 0, l = arr.length; i < l; i++) {
        if (i in arr)
            fn.call(bind, arr[i], i, arr);
    }
};
Array.prototype.diff = function (a) {
    return this.filter(function (i) { return a.indexOf(i) < 0; });
};
var toStr = Object.prototype.toString;
var isCallable = function (fn) {
    return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
};
var toInteger = function (value) {
    var number = Number(value);
    if (isNaN(number)) {
        return 0;
    }
    if (number === 0 || !isFinite(number)) {
        return number;
    }
    return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
};
var maxSafeInteger = Math.pow(2, 53) - 1;
var toLength = function (value) {
    var len = toInteger(value);
    return Math.min(Math.max(len, 0), maxSafeInteger);
};
Array.from = function (arrayLike) {
    var C = this;
    var items = Object(arrayLike);
    if (arrayLike == null) {
        throw new TypeError("Array.from requires an array-like object - not null or undefined");
    }
    var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
    var T;
    if (typeof mapFn !== 'undefined') {
        if (!isCallable(mapFn)) {
            throw new TypeError('Array.from: when provided, the second argument must be a function');
        }
        if (arguments.length > 2) {
            T = arguments[2];
        }
    }
    var len = toLength(items.length);
    var Array;
    var A = isCallable(C) ? Object(new C(len)) : new Array(len);
    var k = 0;
    var kValue;
    while (k < len) {
        kValue = items[k];
        if (mapFn) {
            A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        }
        else {
            A[k] = kValue;
        }
        k += 1;
    }
    A.length = len;
    return A;
};
Array.prototype.shuffle = function () {
    for (var i = this.length; i && --i;) {
        var temp = this[i], r = Math.floor(Math.random() * (i + 1));
        this[i] = this[r];
        this[r] = temp;
    }
    return this;
};
