import "@nivinjoseph/n-ext";
import  
{
    ArgumentException,
    ArgumentNullException,
    InvalidArgumentException,
    InvalidOperationException
} from "@nivinjoseph/n-exception";


export interface Ensurer<T>
{
    ensureHasValue(when?: boolean | (() => boolean)): this | never;
    ensure(func: (arg: T) => boolean): this | never;
    ensure(func: (arg: T) => boolean, reason: string): this | never;
    
    ensureWhen(when: boolean | (() => boolean), func: (arg: T) => boolean): this | never;
    ensureWhen(when: boolean | (() => boolean), func: (arg: T) => boolean, reason: string): this | never;
    
        // ensureIsString(): Ensurer<T>;
        // ensureIsNumber(): Ensurer<T>;
        // ensureIsBoolean(): Ensurer<T>;
        // ensureIsObject(): Ensurer<T>;
        // ensureIsFunction(): Ensurer<T>;
        // ensureIsArray(): Ensurer<T>;
        // ensureIsType(type: Function): Ensurer<T>;
        // ensureHasStructure(structure: object): Ensurer<T>;
}  

export interface StringEnsurer extends Ensurer<string>
{
    ensureIsString(when?: boolean | (() => boolean)): this | never;
    ensureIsEnum(enumType: object, when?: boolean | (() => boolean)): this | never;
}
export interface NumberEnsurer extends Ensurer<number>
{
    ensureIsNumber(when?: boolean | (() => boolean)): this | never;
    ensureIsEnum(enumType: object, when?: boolean | (() => boolean)): this | never;
}
export interface BooleanEnsurer extends Ensurer<boolean>
{
    ensureIsBoolean(when?: boolean | (() => boolean)): this | never;
}
export interface ArrayEnsurer<TItem> extends Ensurer<ReadonlyArray<TItem>>
{
    ensureIsArray(when?: boolean | (() => boolean)): this | never;
}
export interface FunctionEnsurer extends Ensurer<Function>
{
    ensureIsFunction(when?: boolean | (() => boolean)): this | never;
}
export interface ObjectEnsurer<T extends object> extends Ensurer<T>
{
    ensureIsObject(when?: boolean | (() => boolean)): this | never;
    ensureIsType(type: new (...args: Array<any>) => T, when?: boolean | (() => boolean)): this | never;
    ensureIsInstanceOf(type: Function & { prototype: T; }, when?: boolean | (() => boolean)): this | never;
    ensureHasStructure(structure: object, when?: boolean | (() => boolean)): this | never;
}


function given(arg: string, argName: string): StringEnsurer;
function given(arg: number, argName: string): NumberEnsurer;
function given(arg: boolean, argName: string): BooleanEnsurer;
function given<TItem>(arg: ReadonlyArray<TItem>, argName: string): ArrayEnsurer<TItem>;
function given(arg: Function, argName: string): FunctionEnsurer;
function given<T extends object>(arg: T, argName: string): ObjectEnsurer<T>;
function given<T, U extends Ensurer<T>>(arg: T, argName: string): U;
function given<T, U extends Ensurer<T>>(arg: T, argName: string): U
{
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (argName == null || argName.isEmptyOrWhiteSpace())
        throw new ArgumentNullException("argName");
    
    return new EnsurerInternal(arg, argName.trim()) as unknown as U;
}

export { given } ;


class EnsurerInternal<T> implements Ensurer<T>
{
    private readonly _arg: T;
    private readonly _argName: string;


    public constructor(arg: T, argName: string)
    {
        this._arg = arg;
        this._argName = argName;
    }

    public ensureHasValue(when?: boolean | (() => boolean)): this | never
    {
        if (!this._canExecute(when))
            return this;
        
        if (this._arg === null || this._arg === undefined)
            throw new ArgumentNullException(this._argName);
        
        if (typeof this._arg === "string" && (<string>this._arg).isEmptyOrWhiteSpace())
            throw new ArgumentException(this._argName, "string value cannot be empty or whitespace");    

        return this;
    }
    
    public ensureIsString(when?: boolean | (() => boolean)): this | never
    {
        if (!this._canExecute(when))
            return this;
        
        if (this._arg === null || this._arg === undefined)
            return this;
        
        if (typeof this._arg !== "string")
            throw new ArgumentException(this._argName, "must be string");
        
        return this;
    }
    
    public ensureIsNumber(when?: boolean | (() => boolean)): this | never
    {
        if (!this._canExecute(when))
            return this;
        
        if (this._arg === null || this._arg === undefined)
            return this;

        if (typeof this._arg !== "number")
            throw new ArgumentException(this._argName, "must be number");

        if (!this._isNumber(this._arg))
            throw new ArgumentException(this._argName, "must be number");
        
        return this;
    }
    
    public ensureIsEnum(enumType: object, when?: boolean | (() => boolean)): this | never
    {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (enumType == null || typeof enumType !== "object")
            throw new InvalidArgumentException("enumType");
        
        if (!this._canExecute(when))
            return this;
        
        if (this._arg === null || this._arg === undefined)
            return this;
        
        if (typeof this._arg !== "number" && typeof this._arg !== "string")
            throw new ArgumentException(this._argName, "must be a valid enum value");
        
        const values = this._getEnumValues(enumType);
        if (!values.contains(this._arg))
            throw new ArgumentException(this._argName, "is not a valid enum value");
        
        return this;
    }
    
    public ensureIsBoolean(when?: boolean | (() => boolean)): this | never
    {
        if (!this._canExecute(when))
            return this;
        
        if (this._arg === null || this._arg === undefined)
            return this;

        if (typeof this._arg !== "boolean")
            throw new ArgumentException(this._argName, "must be boolean");

        return this;
    }
    
    public ensureIsObject(when?: boolean | (() => boolean)): this | never
    {
        if (!this._canExecute(when))
            return this;
        
        if (this._arg === null || this._arg === undefined)
            return this;

        if (typeof this._arg !== "object")
            throw new ArgumentException(this._argName, "must be object");

        return this;
    }
    
    public ensureIsFunction(when?: boolean | (() => boolean)): this | never
    {
        if (!this._canExecute(when))
            return this;
        
        if (this._arg === null || this._arg === undefined)
            return this;

        if (typeof this._arg !== "function")
            throw new ArgumentException(this._argName, "must be function");

        return this;
    }
    
    public ensureIsArray(when?: boolean | (() => boolean)): this | never
    {
        if (!this._canExecute(when))
            return this;
        
        if (this._arg === null || this._arg === undefined)
            return this;

        if (!Array.isArray(this._arg))
            throw new ArgumentException(this._argName, "must be array");

        return this;
    }
    
    public ensureIsType(type: Function, when?: boolean | (() => boolean)): this | never
    {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (type === null || type === undefined)
            throw new ArgumentNullException("type");
        
        if (!this._canExecute(when))
            return this;
        
        if (this._arg == null || this._arg === undefined)
            return this;
        
        const typeName = (<Object>type).getTypeName();
        if ((<Object>this._arg).getTypeName() !== typeName)
            throw new ArgumentException(this._argName, `must be of type ${typeName}`);
        
        return this;
    }
    
    public ensureIsInstanceOf(type: Function, when?: boolean | (() => boolean)): this | never
    {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (type === null || type === undefined)
            throw new ArgumentNullException("type");
        
        if (!this._canExecute(when))
            return this;

        if (this._arg == null || this._arg === undefined)
            return this;

        if (!(this._arg instanceof type))
            throw new ArgumentException(this._argName, `must be instance of ${(<Object>type).getTypeName()}`);

        return this;
    }
    
    public ensureHasStructure(structure: object, when?: boolean | (() => boolean)): this | never
    {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (structure === null || structure === undefined)
            throw new ArgumentNullException("structure");
        
        if (!this._canExecute(when))
            return this;
        
        if (this._arg == null || this._arg === undefined)
            return this;
        
        this._ensureHasStructureInternal(this._arg, structure);
           
        return this;
    }

    public ensure(func: (arg: T) => boolean): this | never;   
    public ensure(func: (arg: T) => boolean, reason: string): this | never;
    public ensure(func: (arg: T) => boolean, reason?: string): this | never
    {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (func === null || func === undefined)
            throw new ArgumentNullException("func");    
        
        if (this._arg == null || this._arg === undefined)
            return this;
        
        if (!func(this._arg))
        {
            if (this._argName.toLowerCase() === "this")
                throw new InvalidOperationException(reason != null && !reason.isEmptyOrWhiteSpace() ? reason.trim() : "current operation on instance");

            throw reason != null && !reason.isEmptyOrWhiteSpace()
                ? new ArgumentException(this._argName, reason.trim())
                : new InvalidArgumentException(this._argName);
        }

        return this;
    }
    
    public ensureWhen(when: boolean | (() => boolean), func: (arg: T) => boolean): this | never;
    public ensureWhen(when: boolean | (() => boolean), func: (arg: T) => boolean, reason: string): this | never;
    public ensureWhen(when: boolean | (() => boolean), func: (arg: T) => boolean, reason?: string): this | never
    {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (when === null || when === undefined)
            throw new ArgumentNullException("when");
        
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (func === null || func === undefined)
            throw new ArgumentNullException("func");
            
        if (!this._canExecute(when))
            return this;

        if (this._arg == null || this._arg === undefined)
            return this;

        if (!func(this._arg))
        {
            if (this._argName.toLowerCase() === "this")
                throw new InvalidOperationException(reason != null && !reason.isEmptyOrWhiteSpace() ? reason.trim() : "current operation on instance");

            throw reason != null && !reason.isEmptyOrWhiteSpace()
                ? new ArgumentException(this._argName, reason.trim())
                : new InvalidArgumentException(this._argName);
        }

        return this;
    }
    
    private _canExecute(when?: boolean | (() => boolean)): boolean
    {
        let canExecute = true;

        if (when != null)
        {
            if (typeof when === "function")
                canExecute = when();
            else
                canExecute = !!when;
        }

        return canExecute;
    }
    
    private _ensureHasStructureInternal(arg: any, schema: any, parentName?: string): void
    {
        for (const key in schema)
        {
            const isOptional = key.endsWith("?");
            const name = isOptional ? key.substring(0, key.length - 1) : key;
            if (name.isEmptyOrWhiteSpace())
                throw new ArgumentException("structure", `invalid key specification '${key}'`);
            const fullName = parentName ? `${parentName}.${name}` : name;

            const typeInfo = schema[key];
            const typeName = this._getTypeNameInternal(typeInfo, fullName);

            const value = arg[name];
            if (value === null || value === undefined)
            {
                if (isOptional)
                    continue;

                throw new ArgumentException(this._argName, `is missing required property '${fullName}' of type '${typeName}'`);
            }

            this._ensureHasTypeInternal(typeName, typeInfo, fullName, value);
        }
    }

    private _getTypeNameInternal(typeInfo: any, fullName: string): string
    {
        const types = ["string", "boolean", "number", "object", "array"];

        if (typeInfo === null || typeInfo === undefined)
            throw new ArgumentException("structure", `null type specification for key '${fullName}'`);

        if (typeof typeInfo !== "string" && typeof typeInfo !== "object")
            throw new ArgumentException("structure", `invalid type specification '${typeInfo}' for key '${fullName}'`);

        const typeName = typeof typeInfo === "string" ? typeInfo.trim().toLowerCase() : Array.isArray(typeInfo) ? "array" : "object";
        if (types.every(t => t !== typeName))
            throw new ArgumentException("structure", `invalid type specification '${typeInfo}' for key '${fullName}'`);

        return typeName;
    }

    private _ensureHasTypeInternal(typeName: string, typeInfo: any, fullName: string, value: any): void
    {
        if (typeName === "object")
        {
            if (typeof typeInfo !== "string")
            {
                this._ensureHasStructureInternal(value, typeInfo, fullName);
            }
            else
            {
                if (typeof value !== typeName)
                    throw new ArgumentException(this._argName,
                        `invalid value of type '${typeof value}' for property '${fullName}' of type '${typeName}'`);
            }
        }
        else if (typeName === "array")
        {
            if (!Array.isArray(value))
                throw new ArgumentException(this._argName,
                    `invalid value of type '${typeof value}' for property '${fullName}' of type '${typeName}'`);

            if (typeof typeInfo !== "string")
            {
                const typeInfoArray = typeInfo as Array<any>;
                if (typeInfoArray.length > 0)
                {
                    const arrayTypeInfo = typeInfoArray[0];
                    const arrayTypeName = this._getTypeNameInternal(arrayTypeInfo, fullName);

                    value.forEach(t => this._ensureHasTypeInternal(arrayTypeName, arrayTypeInfo, fullName, t));
                }
            }
        }
        else
        {
            if (typeof value !== typeName)
                throw new ArgumentException(this._argName,
                    `invalid value of type '${typeof value}' for property '${fullName}' of type '${typeName}'`);
        }
    }
    
    private _isNumber(value: any): boolean
    {
        if (value == null)
            return false;
        
        value = (<object>value).toString().trim();
        if (value.length === 0)
            return false;
        const parsed = +(<object>value).toString().trim();
        return !isNaN(parsed) && isFinite(parsed);
    }

    private _getEnumValues(enumType: object): ReadonlyArray<string | number>
    {
        const keys = Object.keys(enumType);
        if (keys.length === 0)
            return [];

        if (this._isNumber(keys[0]))
            return keys.filter(t => this._isNumber(t)).map(t => +t);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return keys.map(t => (<any>enumType)[t]) as Array<string | number>;
    }
}