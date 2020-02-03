import "@nivinjoseph/n-ext";
export interface Ensurer<T> {
    ensureHasValue(): this;
    ensure(func: (arg: T) => boolean): this;
    ensure(func: (arg: T) => boolean, reason: string): this;
}
export interface StringEnsurer extends Ensurer<string> {
    ensureIsString(): this;
    ensureIsEnum(enumType: object): this;
}
export interface NumberEnsurer extends Ensurer<number> {
    ensureIsNumber(): this;
    ensureIsEnum(enumType: object): this;
}
export interface BooleanEnsurer extends Ensurer<boolean> {
    ensureIsBoolean(): this;
}
export interface ArrayEnsurer<TItem> extends Ensurer<ReadonlyArray<TItem>> {
    ensureIsArray(): this;
}
export interface FunctionEnsurer extends Ensurer<Function> {
    ensureIsFunction(): this;
}
export interface ObjectEnsurer<T extends object> extends Ensurer<T> {
    ensureIsObject(): this;
    ensureIsType(type: new (...args: any[]) => T): this;
    ensureIsInstanceOf<U extends T>(type: new (...args: any[]) => U): this;
    ensureHasStructure(structure: object): this;
}
declare function given(arg: string, argName: string): StringEnsurer;
declare function given(arg: number, argName: string): NumberEnsurer;
declare function given(arg: boolean, argName: string): BooleanEnsurer;
declare function given<TItem>(arg: ReadonlyArray<TItem>, argName: string): ArrayEnsurer<TItem>;
declare function given(arg: Function, argName: string): FunctionEnsurer;
declare function given<T extends object>(arg: T, argName: string): ObjectEnsurer<T>;
declare function given<T, U extends Ensurer<T>>(arg: T, argName: string): U;
export { given };
