"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("n-ext");
const n_exception_1 = require("n-exception");
function given(arg, argName) {
    if (argName == null || argName.isEmptyOrWhiteSpace())
        throw new n_exception_1.ArgumentNullException("argName");
    return new EnsurerInternal(arg, argName);
}
exports.given = given;
class EnsurerInternal {
    constructor(arg, argName) {
        this._arg = arg;
        this._argName = argName;
    }
    ensureHasValue() {
        if (this._arg == null || this._arg === undefined)
            throw new n_exception_1.ArgumentNullException(this._argName);
        return this;
    }
    ensure(func, reason) {
        if (func == null)
            throw new n_exception_1.ArgumentNullException("func");
        if (!func(this._arg)) {
            if (reason != null && !reason.isEmptyOrWhiteSpace())
                throw new n_exception_1.ArgumentException(this._argName, reason.trim());
            throw new n_exception_1.InvalidArgumentException(this._argName);
        }
        return this;
    }
}
//# sourceMappingURL=index.js.map