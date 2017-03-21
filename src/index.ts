import  
{
    ApplicationException,
    ArgumentException,
    ArgumentNullException,
    InvalidArgumentException,
    InvalidOperationException
} from "n-exception";

export interface Ensurer<T>
{
    ensureHasValue(): Ensurer<T>;
    ensure(func: (arg: T) => boolean): Ensurer<T>;
    ensure(func: (arg: T) => boolean, reason: string): Ensurer<T>;
}  

export default function given<T>(arg: T, argName: string): Ensurer<T>
{
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
        if (this._arg == null || this._arg === undefined)
            throw new ArgumentNullException(this._argName);

        return this;
    }

    public ensure(func: (arg: T) => boolean): Ensurer<T>;
    public ensure(func: (arg: T) => boolean, reason: string): Ensurer<T>;
    public ensure(func: (arg: T) => boolean, reason?: string): Ensurer<T>
    {
        if (!func(this._arg))
        {
            if (reason != null && reason.trim().length > 0)
                throw new ArgumentException(this._argName, reason.trim());

            throw new InvalidArgumentException(this._argName);
        }

        return this;
    }
}