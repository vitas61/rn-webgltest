"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function groupBy(xs, key) {
    return xs.reduce((rv, x) => {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
}
exports.groupBy = groupBy;
//# sourceMappingURL=group.helpers.js.map