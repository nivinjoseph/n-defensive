import "@nivinjoseph/n-ext";
export interface Ensurer<T> {
    ensureHasValue(): this;
    ensure(func: (arg: T) => boolean): this;
    ensure(func: (arg: T) => boolean, reason: string): this;
}
export interface StringEnsurer extends Ensurer<string> {
    ensureIsString(): this;
}
export interface NumberEnsurer extends Ensurer<number> {
    ensureIsNumber(): this;
}
export interface BooleanEnsurer extends Ensurer<boolean> {
    ensureIsBoolean(): this;
}
export interface ArrayEnsurer extends Ensurer<Array<any>> {
    ensureIsArray(): this;
}
export interface FunctionEnsurer extends Ensurer<Function> {
    ensureIsFunction(): this;
}
export interface ObjectEnsurer extends Ensurer<object> {
    ensureIsObject(): this;
    ensureIsType(type: Function): this;
    ensureHasStructure(structure: object): this;
}
declare function given(arg: string, argName: string): StringEnsurer;
declare function given(arg: number, argName: string): NumberEnsurer;
declare function given(arg: boolean, argName: string): BooleanEnsurer;
declare function given(arg: Array<any>, argName: string): ArrayEnsurer;
declare function given(arg: Function, argName: string): FunctionEnsurer;
declare function given(arg: object, argName: string): ObjectEnsurer;
declare function given<T, U extends Ensurer<T>>(arg: T, argName: string): U;
export { given };
