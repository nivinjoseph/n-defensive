import "n-ext";
import  
{
    ArgumentException,
    ArgumentNullException,
    InvalidArgumentException,
} from "n-exception";

export interface Ensurer<T>
{
    ensureHasValue(): Ensurer<T>;
    ensureIsString(): Ensurer<T>;
    ensureIsNumber(): Ensurer<T>;
    ensureIsBoolean(): Ensurer<T>;
    ensureIsObject(): Ensurer<T>;
    ensureIsFunction(): Ensurer<T>;
    ensureIsArray(): Ensurer<T>;
    ensureIsType(type: Function): Ensurer<T>;
    ensure(func: (arg: T) => boolean): Ensurer<T>;
    ensure(func: (arg: T) => boolean, reason: string): Ensurer<T>;
}  

export function given<T>(arg: T, argName: string): Ensurer<T>
{
    if (argName == null || argName.isEmptyOrWhiteSpace())
        throw new ArgumentNullException("argName");
    
    return new EnsurerInternal(arg, argName);
}

class EnsurerInternal<T> implements Ensurer<T>
{
    private _arg: T;
    private _argName: string;


    constructor(arg: T, argName: string)
    {
        this._arg = arg;
        this._argName = argName;
    }

    public ensureHasValue(): Ensurer<T>
    {
        if (this._arg === null || this._arg === undefined)
            throw new ArgumentNullException(this._argName);

        return this;
    }
    
    public ensureIsString(): Ensurer<T>
    {
        if (this._arg === null || this._arg === undefined)
            return this;
        
        if (typeof (this._arg) !== "string")
            throw new ArgumentException(this._argName, "must be string");
        
        return this;
    }
    
    public ensureIsNumber(): Ensurer<T>
    {
        if (this._arg === null || this._arg === undefined)
            return this;

        if (typeof (this._arg) !== "number")
            throw new ArgumentException(this._argName, "must be number");

        return this;
    }
    
    public ensureIsBoolean(): Ensurer<T>
    {
        if (this._arg === null || this._arg === undefined)
            return this;

        if (typeof (this._arg) !== "boolean")
            throw new ArgumentException(this._argName, "must be boolean");

        return this;
    }
    
    public ensureIsObject(): Ensurer<T>
    {
        if (this._arg === null || this._arg === undefined)
            return this;

        if (typeof (this._arg) !== "object")
            throw new ArgumentException(this._argName, "must be object");

        return this;
    }
    
    public ensureIsFunction(): Ensurer<T>
    {
        if (this._arg === null || this._arg === undefined)
            return this;

        if (typeof (this._arg) !== "function")
            throw new ArgumentException(this._argName, "must be function");

        return this;
    }
    
    public ensureIsArray(): Ensurer<T>
    {
        if (this._arg === null || this._arg === undefined)
            return this;

        if (!Array.isArray(this._arg))
            throw new ArgumentException(this._argName, "must be array");

        return this;
    }
    
    public ensureIsType(type: Function): Ensurer<T>
    {
        if (type === null || type === undefined)
            throw new ArgumentNullException("type");
        
        if (this._arg == null || this._arg === undefined)
            return this;
        
        if (!(this._arg instanceof type))
            throw new ArgumentException(this._argName, `must be ${(<Object>type).getTypeName()}`);
        
        return this;
    }

    public ensure(func: (arg: T) => boolean): Ensurer<T>;   
    public ensure(func: (arg: T) => boolean, reason: string): Ensurer<T>;
    public ensure(func: (arg: T) => boolean, reason?: string): Ensurer<T>
    {
        if (func === null || func === undefined)
            throw new ArgumentNullException("func");    
        
        if (this._arg == null || this._arg === undefined)
            return this;
        
        if (!func(this._arg))
        {
            if (reason != null && !reason.isEmptyOrWhiteSpace())
                throw new ArgumentException(this._argName, reason.trim());

            throw new InvalidArgumentException(this._argName);
        }

        return this;
    }
}