"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function objectMap(object, mapFn, arg) {
    return Object.keys(object).reduce((result, key) => {
        result[key] = mapFn(object[key], key);
        return result;
    }, arg);
}
exports.objectMap = objectMap;
function objectForEach(object, fn) {
    Object.keys(object).forEach(key => {
        fn(object[key], key, object);
    });
}
exports.objectForEach = objectForEach;
//# sourceMappingURL=object.helpers.js.map