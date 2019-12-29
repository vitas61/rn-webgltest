"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
class BaseStore {
    constructor(initialState) {
        this._state$ = new rxjs_1.BehaviorSubject(initialState);
    }
    get state() {
        return this._state$.getValue();
    }
    setState(nextState) {
        this._state$.next(nextState);
    }
}
exports.BaseStore = BaseStore;
//# sourceMappingURL=base-store.js.map