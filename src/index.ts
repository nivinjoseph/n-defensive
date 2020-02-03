import "@nivinjoseph/n-ext";
import  
{
    ArgumentException,
    ArgumentNullException,
    InvalidArgumentException,
    InvalidOperationException,
} from "@nivinjoseph/n-exception";


export interface Ensurer<T>
{
    ensureHasValue(): this;
    ensure(func: (arg: T) => boolean): this;
    ensure(func: (arg: T) => boolean, reason: string): this;
    
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
    ensureIsString(): this;
    ensureIsEnum(enumType: object): this;
}
export interface NumberEnsurer extends Ensurer<number>
{
    ensureIsNumber(): this;
    ensureIsEnum(enumType: object): this;
}
export interface BooleanEnsurer extends Ensurer<boolean>
{
    ensureIsBoolean(): this;
}
export interface ArrayEnsurer<TItem> extends Ensurer<ReadonlyArray<TItem>>
{
    ensureIsArray(): this;
}
export interface FunctionEnsurer extends Ensurer<Function>
{
    ensureIsFunction(): this;
}
export interface ObjectEnsurer<T extends object> extends Ensurer<T>
{
    ensureIsObject(): this;
    ensureIsType(type: new (...args: any[]) => T): this;
    ensureIsInstanceOf<U extends T>(type: new (...args: any[]) => T | U): this;
    ensureHasStructure(structure: object): this;
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
    if (argName == null || argName.isEmptyOrWhiteSpace())
        throw new ArgumentNullException("argName");
    
    return new EnsurerInternal(arg, argName.trim()) as any;
}

export { given } ;


class EnsurerInternal<T> implements Ensurer<T>
{
    private _arg: T;
    private _argName: string;


    constructor(arg: T, argName: string)
    {
        this._arg = arg;
        this._argName = argName;
    }

    public ensureHasValue(): this
    {
        if (this._arg === null || this._arg === undefined)
            throw new ArgumentNullException(this._argName);
        
        if (typeof (this._arg) === "string" && (<string>this._arg).isEmptyOrWhiteSpace())
            throw new ArgumentException(this._argName, "string value cannot be empty or whitespace");    

        return this;
    }
    
    public ensureIsString(): this
    {
        if (this._arg === null || this._arg === undefined)
            return this;
        
        if (typeof (this._arg) !== "string")
            throw new ArgumentException(this._argName, "must be string");
        
        return this;
    }
    
    public ensureIsNumber(): this
    {
        if (this._arg === null || this._arg === undefined)
            return this;

        if (typeof (this._arg) !== "number")
            throw new ArgumentException(this._argName, "must be number");

        return this;
    }
    
    public ensureIsEnum(enumType: object): this
    {
        if (enumType == null || typeof (enumType) !== "object")
            throw new InvalidArgumentException("enumType");
        
        if (this._arg === null || this._arg === undefined)
            return this;
        
        if (typeof (this._arg) !== "number" && typeof(this._arg) !== "string")
            throw new ArgumentException(this._argName, "must be a valid enum value");
        
        const values = this.getEnumValues(enumType);
        if (!values.contains(this._arg))
            throw new ArgumentException(this._argName, "is not a valid enum value");
        
        return this;
    }
    
    public ensureIsBoolean(): this
    {
        if (this._arg === null || this._arg === undefined)
            return this;

        if (typeof (this._arg) !== "boolean")
            throw new ArgumentException(this._argName, "must be boolean");

        return this;
    }
    
    public ensureIsObject(): this
    {
        if (this._arg === null || this._arg === undefined)
            return this;

        if (typeof (this._arg) !== "object")
            throw new ArgumentException(this._argName, "must be object");

        return this;
    }
    
    public ensureIsFunction(): this
    {
        if (this._arg === null || this._arg === undefined)
            return this;

        if (typeof (this._arg) !== "function")
            throw new ArgumentException(this._argName, "must be function");

        return this;
    }
    
    public ensureIsArray(): this
    {
        if (this._arg === null || this._arg === undefined)
            return this;

        if (!Array.isArray(this._arg))
            throw new ArgumentException(this._argName, "must be array");

        return this;
    }
    
    public ensureIsType(type: Function): this
    {
        if (type === null || type === undefined)
            throw new ArgumentNullException("type");
        
        if (this._arg == null || this._arg === undefined)
            return this;
        
        const typeName = (<Object>type).getTypeName();
        if ((<Object>this._arg).getTypeName() !== typeName)
            throw new ArgumentException(this._argName, `must be of type ${typeName}`);
        
        return this;
    }
    
    public ensureIsInstanceOf(type: Function): this
    {
        if (type === null || type === undefined)
            throw new ArgumentNullException("type");

        if (this._arg == null || this._arg === undefined)
            return this;

        if (!(this._arg instanceof type))
            throw new ArgumentException(this._argName, `must be instance of ${(<Object>type).getTypeName()}`);

        return this;
    }
    
    public ensureHasStructure(structure: object): this
    {
        if (structure === null || structure === undefined)
            throw new ArgumentNullException("structure");
        
        if (this._arg == null || this._arg === undefined)
            return this;
        
        this.ensureHasStructureInternal(this._arg, structure);
           
        return this;
    }

    public ensure(func: (arg: T) => boolean): this;   
    public ensure(func: (arg: T) => boolean, reason: string): this;
    public ensure(func: (arg: T) => boolean, reason?: string): this
    {
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
    
    
    private ensureHasStructureInternal(arg: any, schema: any, parentName?: string)
    {
        for (let key in schema)
        {
            let isOptional = key.endsWith("?");
            let name = isOptional ? key.substring(0, key.length - 1) : key;
            if (name.isEmptyOrWhiteSpace())
                throw new ArgumentException("structure", `invalid key specification '${key}'`);
            let fullName = parentName ? `${parentName}.${name}` : name;

            const typeInfo = schema[key];
            const typeName = this.getTypeNameInternal(typeInfo, fullName);

            const value = arg[name];
            if (value === null || value === undefined)
            {
                if (isOptional)
                    continue;

                throw new ArgumentException(this._argName, `is missing required property '${fullName}' of type '${typeName}'`);
            }

            this.ensureHasTypeInternal(typeName, typeInfo, fullName, value);
        }
    }

    private getTypeNameInternal(typeInfo: any, fullName: string): string
    {
        let types = ["string", "boolean", "number", "object", "array"];

        if (typeInfo === null || typeInfo === undefined)
            throw new ArgumentException("structure", `null type specification for key '${fullName}'`);

        if (typeof (typeInfo) !== "string" && typeof (typeInfo) !== "object")
            throw new ArgumentException("structure", `invalid type specification '${typeInfo}' for key '${fullName}'`);

        const typeName = typeof (typeInfo) === "string" ? typeInfo.trim().toLowerCase() : Array.isArray(typeInfo) ? "array" : "object";
        if (types.every(t => t !== typeName))
            throw new ArgumentException("structure", `invalid type specification '${typeInfo}' for key '${fullName}'`);

        return typeName;
    }

    private ensureHasTypeInternal(typeName: string, typeInfo: any, fullName: string, value: any): void
    {
        if (typeName === "object")
        {
            if (typeof (typeInfo) !== "string")
            {
                this.ensureHasStructureInternal(value, typeInfo, fullName);
            }
            else
            {
                if (typeof (value) !== typeName)
                    throw new ArgumentException(this._argName,
                        `invalid value of type '${typeof (value)}' for property '${fullName}' of type '${typeName}'`);
            }
        }
        else if (typeName === "array")
        {
            if (!Array.isArray(value))
                throw new ArgumentException(this._argName,
                    `invalid value of type '${typeof (value)}' for property '${fullName}' of type '${typeName}'`);

            if (typeof (typeInfo) !== "string")
            {
                const typeInfoArray = typeInfo as Array<any>;
                if (typeInfoArray.length > 0)
                {
                    const arrayTypeInfo = typeInfoArray[0];
                    const arrayTypeName = this.getTypeNameInternal(arrayTypeInfo, fullName);

                    (<Array<any>>value).forEach(t => this.ensureHasTypeInternal(arrayTypeName, arrayTypeInfo, fullName, t));
                }
            }
        }
        else
        {
            if (typeof (value) !== typeName)
                throw new ArgumentException(this._argName,
                    `invalid value of type '${typeof (value)}' for property '${fullName}' of type '${typeName}'`);
        }
    }
    
    private isNumber(value: any): boolean
    {
        if (value == null)
            return false;
        
        value = value.toString().trim();
        if (value.length === 0)
            return false;
        let parsed = +value.toString().trim();
        return !isNaN(parsed) && isFinite(parsed);
    }

    private getEnumValues(enumType: object): ReadonlyArray<any>
    {
        const keys = Object.keys(enumType);
        if (keys.length === 0)
            return [];

        if (this.isNumber(keys[0]))
            return keys.filter(t => this.isNumber(t)).map(t => +t);

        return keys.map(t => (<any>enumType)[t]);
    }
}