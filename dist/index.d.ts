export interface Ensurer<T> {
    ensureHasValue(): Ensurer<T>;
    ensure(func: (arg: T) => boolean): Ensurer<T>;
    ensure(func: (arg: T) => boolean, reason: string): Ensurer<T>;
}
export default function given<T>(arg: T, argName: string): Ensurer<T>;
