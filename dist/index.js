"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.given = void 0;
require("@nivinjoseph/n-ext");
const n_exception_1 = require("@nivinjoseph/n-exception");
function given(arg, argName) {
    if (argName == null || argName.isEmptyOrWhiteSpace())
        throw new n_exception_1.ArgumentNullException("argName");
    return new EnsurerInternal(arg, argName.trim());
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
        if (typeof (this._arg) === "string" && this._arg.isEmptyOrWhiteSpace())
            throw new n_exception_1.ArgumentException(this._argName, "string value cannot be empty or whitespace");
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
        if (!this.isNumber(this._arg))
            throw new n_exception_1.ArgumentException(this._argName, "must be number");
        return this;
    }
    ensureIsEnum(enumType) {
        if (enumType == null || typeof (enumType) !== "object")
            throw new n_exception_1.InvalidArgumentException("enumType");
        if (this._arg === null || this._arg === undefined)
            return this;
        if (typeof (this._arg) !== "number" && typeof (this._arg) !== "string")
            throw new n_exception_1.ArgumentException(this._argName, "must be a valid enum value");
        const values = this.getEnumValues(enumType);
        if (!values.contains(this._arg))
            throw new n_exception_1.ArgumentException(this._argName, "is not a valid enum value");
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
        const typeName = type.getTypeName();
        if (this._arg.getTypeName() !== typeName)
            throw new n_exception_1.ArgumentException(this._argName, `must be of type ${typeName}`);
        return this;
    }
    ensureIsInstanceOf(type) {
        if (type === null || type === undefined)
            throw new n_exception_1.ArgumentNullException("type");
        if (this._arg == null || this._arg === undefined)
            return this;
        if (!(this._arg instanceof type))
            throw new n_exception_1.ArgumentException(this._argName, `must be instance of ${type.getTypeName()}`);
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
    ensure(func, reason) {
        if (func === null || func === undefined)
            throw new n_exception_1.ArgumentNullException("func");
        if (this._arg == null || this._arg === undefined)
            return this;
        if (!func(this._arg)) {
            if (this._argName.toLowerCase() === "this")
                throw new n_exception_1.InvalidOperationException(reason != null && !reason.isEmptyOrWhiteSpace() ? reason.trim() : "current operation on instance");
            throw reason != null && !reason.isEmptyOrWhiteSpace()
                ? new n_exception_1.ArgumentException(this._argName, reason.trim())
                : new n_exception_1.InvalidArgumentException(this._argName);
        }
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
    isNumber(value) {
        if (value == null)
            return false;
        value = value.toString().trim();
        if (value.length === 0)
            return false;
        let parsed = +value.toString().trim();
        return !isNaN(parsed) && isFinite(parsed);
    }
    getEnumValues(enumType) {
        const keys = Object.keys(enumType);
        if (keys.length === 0)
            return [];
        if (this.isNumber(keys[0]))
            return keys.filter(t => this.isNumber(t)).map(t => +t);
        return keys.map(t => enumType[t]);
    }
}
//# sourceMappingURL=index.js.map