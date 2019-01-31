import "@nivinjoseph/n-ext";
export interface Ensurer<T> {
    ensureHasValue(): Ensurer<T>;
    ensure(func: (arg: T) => boolean): Ensurer<T>;
    ensure(func: (arg: T) => boolean, reason: string): Ensurer<T>;
}
export interface StringEnsurer extends Ensurer<string> {
    ensureIsString(): StringEnsurer;
}
export interface NumberEnsurer extends Ensurer<number> {
    ensureIsNumber(): NumberEnsurer;
}
export interface BooleanEnsurer extends Ensurer<boolean> {
    ensureIsBoolean(): BooleanEnsurer;
}
export interface ArrayEnsurer extends Ensurer<Array<any>> {
    ensureIsArray(): ArrayEnsurer;
}
export interface FunctionEnsurer extends Ensurer<Function> {
    ensureIsFunction(): FunctionEnsurer;
}
export interface ObjectEnsurer extends Ensurer<object> {
    ensureIsObject(): ObjectEnsurer;
    ensureIsType(type: Function): ObjectEnsurer;
    ensureHasStructure(structure: object): ObjectEnsurer;
}
declare function given(arg: string, argName: string): StringEnsurer;
declare function given(arg: number, argName: string): NumberEnsurer;
declare function given(arg: boolean, argName: string): BooleanEnsurer;
declare function given(arg: Array<any>, argName: string): ArrayEnsurer;
declare function given(arg: Function, argName: string): FunctionEnsurer;
declare function given(arg: object, argName: string): ObjectEnsurer;
declare function given<T, U extends Ensurer<T>>(arg: T, argName: string): U;
export { given };
