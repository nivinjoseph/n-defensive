import "@nivinjoseph/n-ext";
export interface Ensurer<T> {
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
}
export interface StringEnsurer extends Ensurer<string> {
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
export interface NumberEnsurer extends Ensurer<number> {
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
export interface BooleanEnsurer extends Ensurer<boolean> {
    /**
     * Ensures the value is a boolean
     * @param when - Optional condition to check before validation
     * @throws {ArgumentException} When value is not a boolean
     * @returns The current BooleanEnsurer instance for chaining
     */
    ensureIsBoolean(when?: boolean | (() => boolean)): this | never;
}
export interface ArrayEnsurer<TItem> extends Ensurer<ReadonlyArray<TItem>> {
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
export interface FunctionEnsurer extends Ensurer<Function> {
    /**
     * Ensures the value is a function
     * @param when - Optional condition to check before validation
     * @throws {ArgumentException} When value is not a function
     * @returns The current FunctionEnsurer instance for chaining
     */
    ensureIsFunction(when?: boolean | (() => boolean)): this | never;
}
type PrimitiveTypeInfo = "string" | "boolean" | "number" | "function" | "array" | "object" | "any";
type ConstructorTypeInfo = new (...args: Array<any>) => object;
type ComplexTypeInfo = Record<string, PrimitiveTypeInfo | ConstructorTypeInfo | ArrayTypeInfo | NestedComplexTypeInfo>;
interface NestedComplexTypeInfo extends Record<string, PrimitiveTypeInfo | ConstructorTypeInfo | ArrayTypeInfo | ComplexTypeInfo> {
}
type ArrayTypeInfo = Array<PrimitiveTypeInfo | ConstructorTypeInfo | NestedComplexTypeInfo>;
export type TypeStructure = NestedComplexTypeInfo;
export interface ObjectEnsurer<T extends object> extends Ensurer<T> {
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
    ensureIsInstanceOf(type: Function & {
        prototype: T;
    }, when?: boolean | (() => boolean)): this | never;
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
     *
     * // With a constructor — validates the value is an instance of the class (via instanceof)
     * class Address { street!: string; city!: string; }
     * const personWithAddressClass = {
     *   name: "string",
     *   address: Address,           // must be an Address instance
     *   "pets?": [Animal]           // optional array of Animal instances
     * };
     * given({ name: "John", address: new Address() }, "person")
     *   .ensureHasStructure(personWithAddressClass); // passes
     * ```
     */
    ensureHasStructure(structure: TypeStructure, when?: boolean | (() => boolean)): this | never;
}
type Nullable<T> = T | null | undefined;
type CondUnionNullable<T> = NonNullable<Nullable<T>>;
/**
 * Creates an Ensurer instance for a given value
 * @param arg - The value to ensure
 * @param argName - The name of the argument for error messages
 * @returns An appropriate Ensurer instance based on the value type
 * @throws {ArgumentNullException} When argName is null or empty
 */
declare function given<T>(arg: T, argName: string): T extends CondUnionNullable<string> ? StringEnsurer : T extends CondUnionNullable<number> ? NumberEnsurer : T extends CondUnionNullable<boolean> ? BooleanEnsurer : T extends CondUnionNullable<ReadonlyArray<infer U>> ? ArrayEnsurer<U> : T extends CondUnionNullable<Function> ? FunctionEnsurer : T extends CondUnionNullable<object> ? ObjectEnsurer<T> : never;
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
declare function ensureExhaustiveCheck(value: never): never;
export { given, ensureExhaustiveCheck };
//# sourceMappingURL=index.d.ts.map