import "n-ext";
export interface Ensurer<T> {
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
export declare function given<T>(arg: T, argName: string): Ensurer<T>;
