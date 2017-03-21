"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var n_exception_1 = require("n-exception");
function given(arg, argName) {
    return new EnsurerInternal(arg, argName);
}
exports.default = given;
var EnsurerInternal = (function () {
    function EnsurerInternal(arg, argName) {
        this._arg = arg;
        this._argName = argName;
    }
    EnsurerInternal.prototype.ensureHasValue = function () {
        if (this._arg == null || this._arg === undefined)
            throw new n_exception_1.ArgumentNullException(this._argName);
        return this;
    };
    EnsurerInternal.prototype.ensure = function (func, reason) {
        if (!func(this._arg)) {
            if (reason != null && reason.trim().length > 0)
                throw new n_exception_1.ArgumentException(this._argName, reason.trim());
            throw new n_exception_1.InvalidArgumentException(this._argName);
        }
        return this;
    };
    return EnsurerInternal;
}());
//export {given as default, Ensurer}; 
//# sourceMappingURL=index.js.map