import "@nivinjoseph/n-ext";
import  
{
    ApplicationException,
    ArgumentException,
    ArgumentNullException,
    InvalidArgumentException,
    InvalidOperationException
} from "@nivinjoseph/n-exception";


export interface Ensurer<T>
{
    /**
     * Ensures the value is not null, undefined, or empty string
     * @param when - Optional condition to check before validation
     * @throws {ArgumentNullException} When value is null or undefined
     * @throws {ArgumentException} When value is an empty string
     * @returns The current Ensurer instance for chaining
     */
    ensureHasValue(when?: boolean | (() => boolean)): this | never;

    /**
     * Ensures the value meets a custom validation condition
     * @param func - Validation function that returns true if valid
     * @param reason - Optional reason for validation failure
     * @throws {InvalidArgumentException} When validation fails
     * @returns The current Ensurer instance for chaining
     */
    ensure(func: (arg: T) => boolean): this | never;
    ensure(func: (arg: T) => boolean, reason: string): this | never;

    /**
     * Ensures the value meets a custom validation condition when a condition is true
     * @param when - Condition to check before validation
     * @param func - Validation function that returns true if valid
     * @param reason - Optional reason for validation failure
     * @throws {InvalidArgumentException} When validation fails
     * @returns The current Ensurer instance for chaining
     */
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
    /**
     * Ensures the value is a string
     * @param when - Optional condition to check before validation
     * @throws {ArgumentException} When value is not a string
     * @returns The current StringEnsurer instance for chaining
     */
    ensureIsString(when?: boolean | (() => boolean)): this | never;

    /**
     * Ensures the value is a valid enum value
     * @param enumType - The enum type to validate against
     * @param when - Optional condition to check before validation
     * @throws {ArgumentException} When value is not a valid enum value
     * @returns The current StringEnsurer instance for chaining
     * @example
     * ```typescript
     * enum Color { Red = "RED", Green = "GREEN", Blue = "BLUE" }
     * given("RED", "color").ensureIsEnum(Color) // passes
     * given("YELLOW", "color").ensureIsEnum(Color) // throws
     * ```
     */
    ensureIsEnum(enumType: object, when?: boolean | (() => boolean)): this | never;
}
export interface NumberEnsurer extends Ensurer<number>
{
    /**
     * Ensures the value is a number
     * @param when - Optional condition to check before validation
     * @throws {ArgumentException} When value is not a number
     * @returns The current NumberEnsurer instance for chaining
     */
    ensureIsNumber(when?: boolean | (() => boolean)): this | never;

    /**
     * Ensures the value is a valid enum value
     * @param enumType - The enum type to validate against
     * @param when - Optional condition to check before validation
     * @throws {ArgumentException} When value is not a valid enum value
     * @returns The current NumberEnsurer instance for chaining
     * @example
     * ```typescript
     * enum Status { Active = 1, Inactive = 0 }
     * given(1, "status").ensureIsEnum(Status) // passes
     * given(2, "status").ensureIsEnum(Status) // throws
     * ```
     */
    ensureIsEnum(enumType: object, when?: boolean | (() => boolean)): this | never;
}
export interface BooleanEnsurer extends Ensurer<boolean>
{
    /**
     * Ensures the value is a boolean
     * @param when - Optional condition to check before validation
     * @throws {ArgumentException} When value is not a boolean
     * @returns The current BooleanEnsurer instance for chaining
     */
    ensureIsBoolean(when?: boolean | (() => boolean)): this | never;
}
export interface ArrayEnsurer<TItem> extends Ensurer<ReadonlyArray<TItem>>
{
    /**
     * Ensures the value is an array
     * @param when - Optional condition to check before validation
     * @throws {ArgumentException} When value is not an array
     * @returns The current ArrayEnsurer instance for chaining
     */
    ensureIsArray(when?: boolean | (() => boolean)): this | never;

    /**
     * Ensures the array is not empty (has at least one element)
     * @param when - Optional condition to check before validation
     * @throws {ArgumentException} When array is empty
     * @returns The current ArrayEnsurer instance for chaining
     * @example
     * ```typescript
     * given([1, 2, 3], "numbers").ensureIsNotEmpty() // passes
     * given([], "emptyArray").ensureIsNotEmpty() // throws
     * 
     * // With conditional check
     * given([], "maybeEmpty").ensureIsNotEmpty(() => shouldCheck) // only validates if shouldCheck is true
     * ```
     */
    ensureIsNotEmpty(when?: boolean | (() => boolean)): this | never;
}
export interface FunctionEnsurer extends Ensurer<Function>
{
    /**
     * Ensures the value is a function
     * @param when - Optional condition to check before validation
     * @throws {ArgumentException} When value is not a function
     * @returns The current FunctionEnsurer instance for chaining
     */
    ensureIsFunction(when?: boolean | (() => boolean)): this | never;
}

type PrimitiveTypeInfo = "string" | "boolean" | "number" | "function" | "array" | "object" | "any";
type ComplexTypeInfo = Record<string, PrimitiveTypeInfo | ArrayTypeInfo | NestedComplexTypeInfo>;
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NestedComplexTypeInfo extends Record<string, PrimitiveTypeInfo | ArrayTypeInfo | ComplexTypeInfo> { }
type ArrayTypeInfo = Array<PrimitiveTypeInfo | NestedComplexTypeInfo>;
export type TypeStructure = NestedComplexTypeInfo;


export interface ObjectEnsurer<T extends object> extends Ensurer<T>
{
    /**
     * Ensures the value is an object
     * @param when - Optional condition to check before validation
     * @throws {ArgumentException} When value is not an object
     * @returns The current ObjectEnsurer instance for chaining
     * @example
     * ```typescript
     * given({ name: "John" }, "person").ensureIsObject() // passes
     * given("not an object", "value").ensureIsObject() // throws
     * ```
     */
    ensureIsObject(when?: boolean | (() => boolean)): this | never;

    /**
     * Ensures the value is of a specific type
     * @param type - The type to validate against
     * @param when - Optional condition to check before validation
     * @throws {ArgumentException} When value is not of the specified type
     * @returns The current ObjectEnsurer instance for chaining
     * @example
     * ```typescript
     * class Person { name: string; }
     * given(new Person(), "person").ensureIsType(Person) // passes
     * given({ name: "John" }, "person").ensureIsType(Person) // throws
     * ```
     */
    ensureIsType(type: new (...args: Array<any>) => T, when?: boolean | (() => boolean)): this | never;

    /**
     * Ensures the value is an instance of a specific type
     * @param type - The type to validate against
     * @param when - Optional condition to check before validation
     * @throws {ArgumentException} When value is not an instance of the specified type
     * @returns The current ObjectEnsurer instance for chaining
     * @example
     * ```typescript
     * class Animal { }
     * class Dog extends Animal { }
     * given(new Dog(), "pet").ensureIsInstanceOf(Animal) // passes
     * given(new Animal(), "pet").ensureIsInstanceOf(Dog) // throws
     * ```
     */
    ensureIsInstanceOf(type: Function & { prototype: T; }, when?: boolean | (() => boolean)): this | never;

    /**
     * Ensures the value has a specific structure
     * @param structure - The structure to validate against
     * @param when - Optional condition to check before validation
     * @throws {ArgumentException} When value does not match the specified structure
     * @returns The current ObjectEnsurer instance for chaining
     * @example
     * ```typescript
     * // Basic structure validation
     * const personStructure = {
     *   name: "string",
     *   age: "number",
     *   address: {
     *     street: "string",
     *     city: "string"
     *   }
     * };
     * 
     * given({ 
     *   name: "John", 
     *   age: 30, 
     *   address: { 
     *     street: "Main", 
     *     city: "NY" 
     *   } 
     * }, "person").ensureHasStructure(personStructure); // passes
     * 
     * // With optional fields
     * const personStructureWithOptional = {
     *   name: "string",
     *   age: "number",
     *   address: {
     *     street: "string",
     *     city: "string",
     *     "zipCode?": "string"  // Optional field
     *   },
     *   "middleName?": "string",  // Optional field
     *   "nicknames?": ["string"]  // Optional array of strings
     * };
     * 
     * // All these are valid:
     * given({ 
     *   name: "John", 
     *   age: 30, 
     *   address: { 
     *     street: "Main", 
     *     city: "NY" 
     *   } 
     * }, "person").ensureHasStructure(personStructureWithOptional); // passes
     * 
     * given({ 
     *   name: "John", 
     *   age: 30, 
     *   address: { 
     *     street: "Main", 
     *     city: "NY",
     *     zipCode: "10001"
     *   },
     *   middleName: "James",
     *   nicknames: ["Johnny", "J"]
     * }, "person").ensureHasStructure(personStructureWithOptional); // passes
     * 
     * // With conditional check
     * const shouldValidate = true;
     * given({ name: "John" }, "person")
     *   .ensureHasStructure(personStructure, () => shouldValidate); // only validates if shouldValidate is true
     * ```
     */
    ensureHasStructure(structure: TypeStructure, when?: boolean | (() => boolean)): this | never;
}


// function given(arg: string, argName: string): StringEnsurer;
// function given(arg: number, argName: string): NumberEnsurer;
// function given(arg: boolean, argName: string): BooleanEnsurer;
// function given<TItem>(arg: ReadonlyArray<TItem>, argName: string): ArrayEnsurer<TItem>;
// function given(arg: Function, argName: string): FunctionEnsurer;
// function given<T extends object>(arg: T, argName: string): ObjectEnsurer<T>;
// function given<T, U extends Ensurer<T>>(arg: T, argName: string): U;
// function given<T, U extends Ensurer<T>>(arg: T, argName: string): U
// {
//     // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
//     if (argName == null || argName.isEmptyOrWhiteSpace())
//         throw new ArgumentNullException("argName");

//     return new EnsurerInternal(arg, argName.trim()) as unknown as U;
// }

// type NullableString = string | null | undefined;
// type CondUnionStringType = NonNullable<NullableString>;

// type NullableNumber = number | null | undefined;
// type CondUnionNumberType = NonNullable<NullableNumber>;

// type NullableBoolean = boolean | null | undefined;
// type CondUnionBooleanType = NonNullable<NullableBoolean>;

// type NullableArray = Array<any> | null | undefined;
// type CondUnionArrayType = NonNullable<NullableArray>;

type Nullable<T> = T | null | undefined;
type CondUnionNullable<T> = NonNullable<Nullable<T>>;

/**
 * Creates an Ensurer instance for a given value
 * @param arg - The value to ensure
 * @param argName - The name of the argument for error messages
 * @returns An appropriate Ensurer instance based on the value type
 * @throws {ArgumentNullException} When argName is null or empty
 */
function given<T>(arg: T, argName: string)
    : T extends CondUnionNullable<string> ? StringEnsurer
    : T extends CondUnionNullable<number> ? NumberEnsurer
    : T extends CondUnionNullable<boolean> ? BooleanEnsurer
    : T extends CondUnionNullable<ReadonlyArray<infer U>> ? ArrayEnsurer<U>
    : T extends CondUnionNullable<Function> ? FunctionEnsurer
    : T extends CondUnionNullable<object> ? ObjectEnsurer<T>
    : never
{
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (argName == null || argName.isEmptyOrWhiteSpace())
        throw new ArgumentNullException("argName");

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return new EnsurerInternal(arg, argName.trim()) as any;
}

/**
 * Ensures exhaustive type checking in switch statements
 * @param value - The value that should be of type never
 * @throws {ApplicationException} When the value is not of type never
 * @example
 * ```typescript
 * type Status = "active" | "inactive" | "pending";
 * 
 * function handleStatus(status: Status): string {
 *   switch (status) {
 *     case "active":
 *       return "User is active";
 *     case "inactive":
 *       return "User is inactive";
 *     case "pending":
 *       return "User is pending";
 *     default:
 *       // This ensures we've handled all possible cases
 *       // If we add a new status to the type, TypeScript will error here
 *       return ensureExhaustiveCheck(status);
 *   }
 * }
 * 
 * // Example with enum
 * enum Color {
 *   Red = "RED",
 *   Green = "GREEN",
 *   Blue = "BLUE"
 * }
 * 
 * function getColorHex(color: Color): string {
 *   switch (color) {
 *     case Color.Red:
 *       return "#FF0000";
 *     case Color.Green:
 *       return "#00FF00";
 *     case Color.Blue:
 *       return "#0000FF";
 *     default:
 *       // Ensures we've handled all enum values
 *       return ensureExhaustiveCheck(color);
 *   }
 * }
 * ```
 */
function ensureExhaustiveCheck(value: never): never
{
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    throw new ApplicationException(`This should not happen; value: ${value ?? "NONE"}`);
}

export { given, ensureExhaustiveCheck };


class EnsurerInternal<T>
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

        // this._ensureHasValue(this._arg);

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

    public ensureIsNotEmpty(when?: boolean | (() => boolean)): this | never
    {
        if (!this._canExecute(when))
            return this;

        if (this._arg === null || this._arg === undefined)
            return this;

        if (!Array.isArray(this._arg))
            throw new ArgumentException(this._argName, "must be array");

        if (this._arg.isEmpty)
            throw new ArgumentException(this._argName, "must not be empty");

        return this;
    }

    public ensureIsType(type: Function, when?: boolean | (() => boolean)): this | never
    {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (type === null || type === undefined)
            throw new ArgumentNullException("type");

        if (!this._canExecute(when))
            return this;

        if (this._arg === null || this._arg === undefined)
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

        if (this._arg === null || this._arg === undefined)
            return this;

        if (!(this._arg instanceof type))
            throw new ArgumentException(this._argName, `must be instance of ${(<Object>type).getTypeName()}`);

        return this;
    }

    public ensureHasStructure(structure: Record<string, TypeStructure>,
        when?: boolean | (() => boolean)): this | never
    {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (structure === null || structure === undefined)
            throw new ArgumentNullException("structure");

        if (!this._canExecute(when))
            return this;

        if (this._arg === null || this._arg === undefined)
            return this;

        this._ensureHasStructure(this._arg, structure);

        return this;
    }

    public ensure(func: (arg: T) => boolean): this | never;
    public ensure(func: (arg: T) => boolean, reason: string): this | never;
    public ensure(func: (arg: T) => boolean, reason?: string): this | never
    {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (func === null || func === undefined)
            throw new ArgumentNullException("func");

        if (this._arg === null || this._arg === undefined)
            return this;

        let result;
        try 
        {
            result = func(this._arg);
        }
        catch (error)
        {
            throw new InvalidArgumentException(this._argName, error as Error);
        }

        if (!result)
        {
            if (this._argName.toLowerCase() === "this")
                throw new InvalidOperationException(reason != null && reason.isNotEmptyOrWhiteSpace() ? reason.trim() : "current operation on instance");

            throw reason != null && reason.isNotEmptyOrWhiteSpace()
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

        if (this._arg === null || this._arg === undefined)
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

    // private _ensureHasValue(value: T): asserts value is NonNullable<T>
    // {
    //     if (value === null || value === undefined)
    //         throw new ArgumentNullException(this._argName);

    //     if (typeof value === "string" && (<string>value).isEmptyOrWhiteSpace())
    //         throw new ArgumentException(this._argName, "string value cannot be empty or whitespace");
    // }

    private _ensureHasStructure<U extends string | Function | object | Array<U>>(arg: any, schema: Record<string, U>, parentName?: string): void
    {
        for (const key in schema)
        {
            const isOptional = key.endsWith("?");
            const name = isOptional ? key.substring(0, key.length - 1) : key;
            if (name.isEmptyOrWhiteSpace())
                throw new ArgumentException("structure", `invalid key specification '${key}'`);
            const fullName = parentName ? `${parentName}.${name}` : name;

            const typeInfo = schema[key];
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (typeInfo === null || typeInfo === undefined)
                throw new ArgumentException("structure", `null type specification for key '${fullName}'`);

            if (typeof typeInfo !== "string" && typeof typeInfo !== "function" && typeof typeInfo !== "object")
                throw new ArgumentException("structure", `invalid type specification '${typeInfo}' for key '${fullName}'`);

            const value = arg[name];
            if (value === null || value === undefined)
            {
                if (isOptional)
                    continue;

                if (typeInfo === "any")
                    continue;

                throw new ArgumentException(this._argName, `is missing required property '${fullName}'`);
            }


            if (typeof typeInfo === "string")
            {
                if (typeInfo.isEmptyOrWhiteSpace())
                    throw new ArgumentException("structure", `invalid type specification '${typeInfo}' for key '${fullName}'`);

                const typeName = typeInfo.trim().toLowerCase();

                const types = ["string", "boolean", "number", "function", "array", "object", "any"];
                if (!types.contains(typeName))
                    throw new ArgumentException("structure", `invalid type specification '${typeInfo}' for key '${fullName}'`);

                if (typeName === "array")
                {
                    if (!Array.isArray(value))
                        throw new ArgumentException(this._argName,
                            `invalid value of type '${typeof value}' for property '${fullName}' of type '${typeName}'`);

                    continue;
                }

                if (typeName === "any")
                    continue;

                if (typeof value !== typeName)
                    throw new ArgumentException(this._argName,
                        `invalid value of type '${typeof value}' for property '${fullName}' of type '${typeName}'`);

                continue;
            }

            if (typeof typeInfo === "function")
            {
                if (!(value instanceof typeInfo))
                    throw new ArgumentException(this._argName, `invalid value of type '${(<Object>value).getTypeName()}' for property '${fullName}' of type '${(<Object>typeInfo).getTypeName()}'`);

                continue;
            }

            if (Array.isArray(typeInfo))
            {
                if (!Array.isArray(value))
                    throw new ArgumentException(this._argName,
                        `invalid value of type '${typeof value}' for property '${fullName}' of type 'array'`);

                if (typeInfo.isEmpty)
                    continue;

                if (typeInfo.length > 1)
                    throw new ArgumentException("structure", `invalid type specification '${typeInfo}' for key '${fullName}'`);

                const arrayTypeInfo = typeInfo[0];

                if (arrayTypeInfo === "any")
                    continue;

                const arrayArg: Record<string, any> = {};
                const arraySchema: Record<string, any> = {};
                value.forEach((val, index) =>
                {
                    arrayArg[index.toString()] = val;
                    arraySchema[index.toString()] = arrayTypeInfo;
                });

                this._ensureHasStructure(arrayArg, arraySchema, fullName);

                continue;
            }

            if (typeof typeInfo === "object")
            {
                if (typeof value !== "object")
                    throw new ArgumentException(this._argName,
                        `invalid value of type '${(<Object>value).getTypeName()}' for property '${fullName}' of type '{}'`);

                this._ensureHasStructure(value, typeInfo as Record<string, U>, fullName);

                continue;
            }

            throw new ArgumentException("structure", `invalid type specification '${typeInfo}' for key '${fullName}'`);
        }
    }

    // private _getTypeName(typeInfo: any, fullName: string): string
    // {
    //     const types = ["string", "boolean", "number", "object", "array"];

    //     if (typeInfo === null || typeInfo === undefined)
    //         throw new ArgumentException("structure", `null type specification for key '${fullName}'`);

    //     if (typeof typeInfo !== "string" && typeof typeInfo !== "object")
    //         throw new ArgumentException("structure", `invalid type specification '${typeInfo}' for key '${fullName}'`);

    //     const typeName = typeof typeInfo === "string" ? typeInfo.trim().toLowerCase() : Array.isArray(typeInfo) ? "array" : "object";
    //     if (types.every(t => t !== typeName))
    //         throw new ArgumentException("structure", `invalid type specification '${typeInfo}' for key '${fullName}'`);

    //     return typeName;
    // }

    // private _ensureHasTypeInternal(typeName: string, typeInfo: any, fullName: string, value: any): void
    // {
    //     if (typeName === "object")
    //     {
    //         if (typeof typeInfo !== "string")
    //         {
    //             this._ensureHasStructure(value, typeInfo, fullName);
    //         }
    //         else
    //         {
    //             if (typeof value !== typeName)
    //                 throw new ArgumentException(this._argName,
    //                     `invalid value of type '${typeof value}' for property '${fullName}' of type '${typeName}'`);
    //         }
    //     }
    //     else if (typeName === "array")
    //     {
    //         if (!Array.isArray(value))
    //             throw new ArgumentException(this._argName,
    //                 `invalid value of type '${typeof value}' for property '${fullName}' of type '${typeName}'`);

    //         if (typeof typeInfo !== "string")
    //         {
    //             const typeInfoArray = typeInfo as Array<any>;
    //             if (typeInfoArray.length > 0)
    //             {
    //                 const arrayTypeInfo = typeInfoArray[0];
    //                 const arrayTypeName = this._getTypeName(arrayTypeInfo, fullName);

    //                 value.forEach(t => this._ensureHasTypeInternal(arrayTypeName, arrayTypeInfo, fullName, t));
    //             }
    //         }
    //     }
    //     else
    //     {
    //         if (typeof value !== typeName)
    //             throw new ArgumentException(this._argName,
    //                 `invalid value of type '${typeof value}' for property '${fullName}' of type '${typeName}'`);
    //     }
    // }

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