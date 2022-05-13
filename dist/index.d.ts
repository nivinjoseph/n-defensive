import "@nivinjoseph/n-ext";
export interface Ensurer<T> {
    ensureHasValue(when?: boolean | (() => boolean)): this | never;
    ensure(func: (arg: T) => boolean): this | never;
    ensure(func: (arg: T) => boolean, reason: string): this | never;
    ensureWhen(when: boolean | (() => boolean), func: (arg: T) => boolean): this | never;
    ensureWhen(when: boolean | (() => boolean), func: (arg: T) => boolean, reason: string): this | never;
}
export interface StringEnsurer extends Ensurer<string> {
    ensureIsString(when?: boolean | (() => boolean)): this | never;
    ensureIsEnum(enumType: object, when?: boolean | (() => boolean)): this | never;
}
export interface NumberEnsurer extends Ensurer<number> {
    ensureIsNumber(when?: boolean | (() => boolean)): this | never;
    ensureIsEnum(enumType: object, when?: boolean | (() => boolean)): this | never;
}
export interface BooleanEnsurer extends Ensurer<boolean> {
    ensureIsBoolean(when?: boolean | (() => boolean)): this | never;
}
export interface ArrayEnsurer<TItem> extends Ensurer<ReadonlyArray<TItem>> {
    ensureIsArray(when?: boolean | (() => boolean)): this | never;
}
export interface FunctionEnsurer extends Ensurer<Function> {
    ensureIsFunction(when?: boolean | (() => boolean)): this | never;
}
export interface ObjectEnsurer<T extends object> extends Ensurer<T> {
    ensureIsObject(when?: boolean | (() => boolean)): this | never;
    ensureIsType(type: new (...args: any[]) => T, when?: boolean | (() => boolean)): this | never;
    ensureIsInstanceOf(type: Function & {
        prototype: T;
    }, when?: boolean | (() => boolean)): this | never;
    ensureHasStructure(structure: object, when?: boolean | (() => boolean)): this | never;
}
declare function given(arg: string, argName: string): StringEnsurer;
declare function given(arg: number, argName: string): NumberEnsurer;
declare function given(arg: boolean, argName: string): BooleanEnsurer;
declare function given<TItem>(arg: ReadonlyArray<TItem>, argName: string): ArrayEnsurer<TItem>;
declare function given(arg: Function, argName: string): FunctionEnsurer;
declare function given<T extends object>(arg: T, argName: string): ObjectEnsurer<T>;
declare function given<T, U extends Ensurer<T>>(arg: T, argName: string): U;
export { given };
