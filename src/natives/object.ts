interface ObjectConstructor{
    erase(object : Object , key) ;
    merge(object1 :Object , object2:Object) : any;
    each(object : Object, fn, bind?) ;
    getLength(object : Object) : number ;
    filter(object, fn, bind?)
}


Object.filter = function(object, fn, bind){
    var results = {};
    for (var key in object){
        var value = object[key];
        if (Object.prototype.hasOwnProperty.call(object, key) && fn.call(bind, value, key, object)) results[key] = value;
    }
    return results;
};


Object.getLength= function(object){
    return Object.keys(object).length;
};

Object.each = function(object, fn, bind?) {
    for (var key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) fn.call(bind, object[key], key, object);
    }
};

Object.erase = function(object, key){
    if (Object.prototype.hasOwnProperty.call(object, key)) delete object[key];
    return object;
};


Object.merge = function(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    for (var attrname in obj1) {
        if (obj2.hasOwnProperty(attrname) && typeof(obj2[attrname]) === 'object' && typeof(obj1[attrname]) === 'object' ) {
            obj3[attrname] = Object.merge(obj1[attrname] , obj2[attrname]) ;
        }
    }
    return obj3;
}
