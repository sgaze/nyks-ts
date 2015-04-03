String.uniqueID = function () {
    var UID = Date.now();
    return (UID++).toString(36);
};
String.prototype.startsWith = function (str) {
    return (this.indexOf(str) === 0);
};
String.prototype.stripStart = function (start) {
    return this.startsWith(start) ? this.substr(start.length) : this.toString();
};
String.prototype.endsWith = function (str) {
    return str ? this.substr(-str.length) == str : true;
};
