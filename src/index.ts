import "@nivinjoseph/n-ext";
import  
{
    ArgumentException,
    ArgumentNullException,
    InvalidArgumentException,
} from "@nivinjoseph/n-exception";

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
    ensureHasStructure(structure: object): Ensurer<T>;
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
        
        if (typeof (this._arg) === "string" && (<string>this._arg).isEmptyOrWhiteSpace())
            throw new ArgumentException(this._argName, "string value cannot be empty or whitespace");    

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
    
    public ensureHasStructure(structure: object): Ensurer<T>
    {
        if (structure === null || structure === undefined)
            throw new ArgumentNullException("structure");
        
        if (this._arg == null || this._arg === undefined)
            return this;
        
        this.ensureHasStructureInternal(this._arg, structure);
           
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