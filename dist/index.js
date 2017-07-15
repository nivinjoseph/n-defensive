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
        if (this._arg === null || this._arg === undefined)
            throw new n_exception_1.ArgumentNullException(this._argName);
        return this;
    }
    ensureIsString() {
        if (this._arg === null || this._arg === undefined)
            return this;
        if (typeof (this._arg) !== "string")
            throw new n_exception_1.ArgumentException(this._argName, "must be string");
        return this;
    }
    ensureIsNumber() {
        if (this._arg === null || this._arg === undefined)
            return this;
        if (typeof (this._arg) !== "number")
            throw new n_exception_1.ArgumentException(this._argName, "must be number");
        return this;
    }
    ensureIsBoolean() {
        if (this._arg === null || this._arg === undefined)
            return this;
        if (typeof (this._arg) !== "boolean")
            throw new n_exception_1.ArgumentException(this._argName, "must be boolean");
        return this;
    }
    ensureIsObject() {
        if (this._arg === null || this._arg === undefined)
            return this;
        if (typeof (this._arg) !== "object")
            throw new n_exception_1.ArgumentException(this._argName, "must be object");
        return this;
    }
    ensureIsFunction() {
        if (this._arg === null || this._arg === undefined)
            return this;
        if (typeof (this._arg) !== "function")
            throw new n_exception_1.ArgumentException(this._argName, "must be function");
        return this;
    }
    ensureIsArray() {
        if (this._arg === null || this._arg === undefined)
            return this;
        if (!Array.isArray(this._arg))
            throw new n_exception_1.ArgumentException(this._argName, "must be array");
        return this;
    }
    ensureIsType(type) {
        if (type === null || type === undefined)
            throw new n_exception_1.ArgumentNullException("type");
        if (this._arg == null || this._arg === undefined)
            return this;
        if (!(this._arg instanceof type))
            throw new n_exception_1.ArgumentException(this._argName, `must be ${type.getTypeName()}`);
        return this;
    }
    ensureHasStructure(structure) {
        if (structure === null || structure === undefined)
            throw new n_exception_1.ArgumentNullException("structure");
        if (this._arg == null || this._arg === undefined)
            return this;
        this.ensureHasStructureInternal(this._arg, structure);
        return this;
    }
    ensureHasStructureInternal(arg, schema, parentName) {
        let types = ["string", "boolean", "number", "object"];
        for (let key in schema) {
            let isOptional = key.endsWith("?");
            let name = isOptional ? key.substring(0, key.length - 1) : key;
            if (name.isEmptyOrWhiteSpace())
                throw new n_exception_1.ArgumentException("structure", `invalid key specification '${key}'`);
            let fullName = parentName ? `${parentName}.${name}` : name;
            let type = schema[key];
            type = typeof (type) === "string" ? type.trim().toLowerCase() : "object";
            if (types.every(t => t !== type))
                throw new n_exception_1.ArgumentException("structure", `invalid type specification '${type}' for key '${fullName}'`);
            let value = arg[name];
            if (value === null || value === undefined) {
                if (isOptional)
                    continue;
                throw new n_exception_1.ArgumentException(this._argName, `is missing required property '${fullName}' of type '${type}'`);
            }
            if (type === "object" && typeof (schema[key]) !== "string") {
                this.ensureHasStructureInternal(value, schema[key], fullName);
            }
            else {
                if (typeof (value) !== type)
                    throw new n_exception_1.ArgumentException(this._argName, `invalid value of type '${typeof (value)}' for property '${fullName}' of type '${type}'`);
            }
        }
    }
    ensure(func, reason) {
        if (func === null || func === undefined)
            throw new n_exception_1.ArgumentNullException("func");
        if (this._arg == null || this._arg === undefined)
            return this;
        if (!func(this._arg)) {
            if (reason != null && !reason.isEmptyOrWhiteSpace())
                throw new n_exception_1.ArgumentException(this._argName, reason.trim());
            throw new n_exception_1.InvalidArgumentException(this._argName);
        }
        return this;
    }
}
//# sourceMappingURL=index.js.map