"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@nivinjoseph/n-ext");
const n_exception_1 = require("@nivinjoseph/n-exception");
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
        for (let key in schema) {
            let isOptional = key.endsWith("?");
            let name = isOptional ? key.substring(0, key.length - 1) : key;
            if (name.isEmptyOrWhiteSpace())
                throw new n_exception_1.ArgumentException("structure", `invalid key specification '${key}'`);
            let fullName = parentName ? `${parentName}.${name}` : name;
            const typeInfo = schema[key];
            const typeName = this.getTypeNameInternal(typeInfo, fullName);
            const value = arg[name];
            if (value === null || value === undefined) {
                if (isOptional)
                    continue;
                throw new n_exception_1.ArgumentException(this._argName, `is missing required property '${fullName}' of type '${typeName}'`);
            }
            this.ensureHasTypeInternal(typeName, typeInfo, fullName, value);
        }
    }
    getTypeNameInternal(typeInfo, fullName) {
        let types = ["string", "boolean", "number", "object", "array"];
        if (typeInfo === null || typeInfo === undefined)
            throw new n_exception_1.ArgumentException("structure", `null type specification for key '${fullName}'`);
        if (typeof (typeInfo) !== "string" && typeof (typeInfo) !== "object")
            throw new n_exception_1.ArgumentException("structure", `invalid type specification '${typeInfo}' for key '${fullName}'`);
        const typeName = typeof (typeInfo) === "string" ? typeInfo.trim().toLowerCase() : Array.isArray(typeInfo) ? "array" : "object";
        if (types.every(t => t !== typeName))
            throw new n_exception_1.ArgumentException("structure", `invalid type specification '${typeInfo}' for key '${fullName}'`);
        return typeName;
    }
    ensureHasTypeInternal(typeName, typeInfo, fullName, value) {
        if (typeName === "object") {
            if (typeof (typeInfo) !== "string") {
                this.ensureHasStructureInternal(value, typeInfo, fullName);
            }
            else {
                if (typeof (value) !== typeName)
                    throw new n_exception_1.ArgumentException(this._argName, `invalid value of type '${typeof (value)}' for property '${fullName}' of type '${typeName}'`);
            }
        }
        else if (typeName === "array") {
            if (!Array.isArray(value))
                throw new n_exception_1.ArgumentException(this._argName, `invalid value of type '${typeof (value)}' for property '${fullName}' of type '${typeName}'`);
            if (typeof (typeInfo) !== "string") {
                const typeInfoArray = typeInfo;
                if (typeInfoArray.length > 0) {
                    const arrayTypeInfo = typeInfoArray[0];
                    const arrayTypeName = this.getTypeNameInternal(arrayTypeInfo, fullName);
                    value.forEach(t => this.ensureHasTypeInternal(arrayTypeName, arrayTypeInfo, fullName, t));
                }
            }
        }
        else {
            if (typeof (value) !== typeName)
                throw new n_exception_1.ArgumentException(this._argName, `invalid value of type '${typeof (value)}' for property '${fullName}' of type '${typeName}'`);
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