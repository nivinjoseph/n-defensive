import "@nivinjoseph/n-ext";
export interface Ensurer<T> {
    ensureHasValue(when?: boolean | (() => boolean)): this;
    ensure(func: (arg: T) => boolean): this;
    ensure(func: (arg: T) => boolean, reason: string): this;
    ensureWhen(when: boolean | (() => boolean), func: (arg: T) => boolean): this;
    ensureWhen(when: boolean | (() => boolean), func: (arg: T) => boolean, reason: string): this;
}
export interface StringEnsurer extends Ensurer<string> {
    ensureIsString(when?: boolean | (() => boolean)): this;
    ensureIsEnum(enumType: object, when?: boolean | (() => boolean)): this;
}
export interface NumberEnsurer extends Ensurer<number> {
    ensureIsNumber(when?: boolean | (() => boolean)): this;
    ensureIsEnum(enumType: object, when?: boolean | (() => boolean)): this;
}
export interface BooleanEnsurer extends Ensurer<boolean> {
    ensureIsBoolean(when?: boolean | (() => boolean)): this;
}
export interface ArrayEnsurer<TItem> extends Ensurer<ReadonlyArray<TItem>> {
    ensureIsArray(when?: boolean | (() => boolean)): this;
}
export interface FunctionEnsurer extends Ensurer<Function> {
    ensureIsFunction(when?: boolean | (() => boolean)): this;
}
export interface ObjectEnsurer<T extends object> extends Ensurer<T> {
    ensureIsObject(when?: boolean | (() => boolean)): this;
    ensureIsType(type: new (...args: any[]) => T, when?: boolean | (() => boolean)): this;
    ensureIsInstanceOf(type: Function & {
        prototype: T;
    }, when?: boolean | (() => boolean)): this;
    ensureHasStructure(structure: object, when?: boolean | (() => boolean)): this;
}
declare function given(arg: string, argName: string): StringEnsurer;
declare function given(arg: number, argName: string): NumberEnsurer;
declare function given(arg: boolean, argName: string): BooleanEnsurer;
declare function given<TItem>(arg: ReadonlyArray<TItem>, argName: string): ArrayEnsurer<TItem>;
declare function given(arg: Function, argName: string): FunctionEnsurer;
declare function given<T extends object>(arg: T, argName: string): ObjectEnsurer<T>;
declare function given<T, U extends Ensurer<T>>(arg: T, argName: string): U;
export { given };
