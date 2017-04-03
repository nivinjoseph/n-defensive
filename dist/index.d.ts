import "n-ext";
export interface Ensurer<T> {
    ensureHasValue(): Ensurer<T>;
    ensure(func: (arg: T) => boolean): Ensurer<T>;
    ensure(func: (arg: T) => boolean, reason: string): Ensurer<T>;
}
export declare function given<T>(arg: T, argName: string): Ensurer<T>;
