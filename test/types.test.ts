import { ArgumentException } from "@nivinjoseph/n-exception";
import assert from "node:assert";
import { describe, test } from "node:test";
import { given } from "../src/index.js";
import { Bar, Foo, Zax } from "./helpers.js";


await describe("Types", async () =>
{
    await describe("ensureIsString", async () =>
    {
        await test("should be fine if the value is string", () =>
        {
            [null, undefined, "", "  ", " bar ", "foo"]
                .forEach(value =>
                {
                    assert.doesNotThrow(() =>
                    {
                        given(value, "value").ensureIsString();
                    }, value as string);
                });

        });

        await test("should throw ArgumentException if the value is not string", () =>
        {
            [1, 2.2, true, false, {}, new Object(), new Bar(), (): void => console.log("none")]
                .forEach(value =>
                {
                    assert.throws(() =>
                    {
                        given(value as string, "value").ensureIsString();
                    }, ArgumentException, typeof value);
                });
        });
    });

    await describe("ensureIsNumber", async () =>
    {
        await test("should be fine if the value is number", () =>
        {
            [null, undefined, -5, -6.70, 0, 1, 2.6783]
                .forEach(value =>
                {
                    assert.doesNotThrow(() =>
                    {
                        given(value, "value").ensureIsNumber();
                    }, value as unknown as string);
                });
        });

        await test("should throw ArgumentException if the value is not number", () =>
        {
            ["", "  ", "dd ", true, false, {}, new Object(), new Bar(), (): void => console.log("none")]
                .forEach((value) =>
                {
                    assert.throws(() =>
                    {
                        given(value as number, "value").ensureIsNumber();
                    }, ArgumentException, typeof value);
                });
        });

        await test("should throw ArgumentException if the value evaluates to NaN", () =>
        {
            const value: number = (undefined as any) + 1;
            if (!isNaN(value))
                assert.ok(false, "not nan");

            assert.throws(() =>
            {
                given(value, "value").ensureIsNumber();
            }, ArgumentException);
        });
    });

    await describe("ensureIsEnum", async () =>
    {
        enum Foo
        {
            bar = 0,
            baz = 2,
            maa = "something",
            ano = 3
        }

        enum Bar
        {
            foo = "my foo",
            baz = "my baz"
        }

        await test("Valid num arg should not throw exception", () =>
        {
            [null, undefined, Foo.bar]
                .forEach(value =>
                {
                    assert.doesNotThrow(() =>
                    {
                        given(value, "value").ensureIsEnum(Foo);
                    }, value as string);
                });
        });

        await test("Invalid num arg should throw exception", () =>
        {
            [5, "foo", Number.NaN]
                .forEach(value =>
                {
                    assert.throws(() =>
                    {
                        given(value, "value").ensureIsEnum(Foo);
                    }, ArgumentException, typeof value);
                });

        });

        await test("Valid string arg should not throw exception", () =>
        {
            [null, undefined, "my foo"].forEach(value =>
            {
                assert.doesNotThrow(() =>
                {
                    given(value, "value").ensureIsEnum(Bar);
                });
            });
        });

        await test("Invalid string arg should throw exception", () =>
        {
            ["my bruh", "", "  ", 5].forEach(value =>
            {
                assert.throws(() =>
                {
                    given(value, "value").ensureIsEnum(Bar);
                }, ArgumentException);
            });
        });
    });

    await describe("ensureIsBoolean", async () =>
    {
        await test("should be fine if the value is boolean", () =>
        {
            [null, undefined, true, false]
                .forEach(value =>
                {
                    assert.doesNotThrow(() =>
                    {
                        given(value, "value").ensureIsBoolean();
                    }, value as unknown as string);
                });
        });

        await test("should throw ArgumentException if the value is not boolean", () =>
        {
            ["", "  ", "dd ", -5, -6.78, 0, 1, 3, 4.500, {}, new Object(), (): void => console.log("none")]
                .forEach(value =>
                {
                    assert.throws(() =>
                    {
                        given(value as boolean, "value").ensureIsBoolean();
                    }, ArgumentException, typeof value);
                });
        });
    });

    await describe("ensureIsObject", async () =>
    {
        await test("should be fine if the value is object", () =>
        {
            [null, undefined, {}, new Object(), new Number(), new String(), new Foo(), new Bar(), new Zax()]
                .forEach(value =>
                {
                    assert.doesNotThrow(() =>
                    {
                        given(value, "value").ensureIsObject();
                    }, value as string);
                });
        });

        await test("should throw ArgumentException if the value is not object", () =>
        {
            ["", "  ", "dd ", -1, -2.5, 0, 3, 4.500, true, false, (): void => console.log("none")]
                .forEach(value =>
                {
                    assert.throws(() =>
                    {
                        given(value as object, "value").ensureIsObject();
                    }, typeof value);
                });
        });
    });

    await describe("ensureIsFunction", async () =>
    {
        await test("should be fine if the value is function", () =>
        {
            [null, undefined, (): void => console.log("none"), function (): void { console.log("none"); }, function foo(): void { console.log("none"); }]
                .forEach(value =>
                {
                    assert.doesNotThrow(() =>
                    {
                        given(value, "value").ensureIsFunction();
                    });
                });
        });

        await test("should throw ArgumentException if the value is not function", () =>
        {
            ["", "  ", "dd ", -5, -6.78, 0, 1, 3, 4.500, {}, new Object(), new Bar(), new Zax()]
                .forEach(value =>
                {
                    assert.throws(() =>
                    {
                        given(value as Function, "value").ensureIsFunction();
                    }, typeof value);
                });
        });
    });

    await describe("ensureIsArray", async () =>
    {
        await test("should be fine if the value is array", () =>
        {
            [null, undefined, ["foo", "bar"], [], [0], [""], [1, new Foo()]]
                .forEach(value =>
                {
                    assert.doesNotThrow(() =>
                    {
                        given(value, "value").ensureIsArray();
                    });
                });
        });

        await test("should throw ArgumentException if the value is not array", () =>
        {
            ["", "  ", "dd ", -5, -6.78, 0, 1, 3, 4.500, {}, new Object(), new Bar(), new Zax(), (): void => console.log("none")]
                .forEach(value =>
                {
                    assert.throws(() =>
                    {
                        given(value as Array<any>, "value").ensureIsArray();
                    }, ArgumentException);
                });
        });
    });

    await describe("ensureIsNotEmpty [Array]", async () =>
    {
        await test("should be fine if the array is not empty", () =>
        {
            assert.doesNotThrow(() =>
            {
                const value = [0];
                given(value, "value").ensureIsNotEmpty();
            });
        });

        await test("should throw ArgumentException if the array is empty", () =>
        {
            assert.throws(() =>
            {
                const value = new Array<any>();
                given(value, "value").ensureIsNotEmpty();
            }, ArgumentException);
        });
    });

    await describe("ensureIsType", async () =>
    {
        await test("should be fine if the value is of correct type", () =>
        {
            const value = new Bar();
            given(value, "value").ensureIsType(Bar);
            assert.ok(true);
        });

        await test("should throw exception if value is subclass of type", () =>
        {
            assert.throws(() =>
            {
                const value = new Bar();
                given(value, "value").ensureIsType(Foo);
            }, ArgumentException);
        });

        await test("should throw ArgumentException if the value is not of correct type", () =>
        {
            assert.throws(() =>
            {
                const value = new Bar();
                given(value, "value").ensureIsType(Zax);
            }, ArgumentException);
        });

        await test("should throw ArgumentException if the value is superclass of type", () =>
        {
            assert.throws(() =>
            {
                const value = new Foo();
                given(value, "value").ensureIsType(Bar);
            }, ArgumentException);
        });
    });

    await describe("ensureIsInstanceOf", async () =>
    {
        await test("should be fine if the value is of correct type", () =>
        {
            assert.doesNotThrow(() =>
            {
                const value = new Foo();
                given(value, "value").ensureIsInstanceOf(Foo);
            });
        });

        await test("should be fine if value is subclass of type", () =>
        {
            assert.doesNotThrow(() =>
            {
                const value = new Bar();
                given(value, "value").ensureIsInstanceOf(Foo);
            });
        });

        await test("should throw ArgumentException if the value is not of correct type", () =>
        {
            assert.throws(() =>
            {
                const value = new Bar();
                given(value, "value").ensureIsInstanceOf(Zax);
            }, ArgumentException);
        });

        await test("should throw ArgumentException if the value is superclass of type", () =>
        {
            assert.throws(() =>
            {
                const value = new Foo();
                given(value, "value").ensureIsInstanceOf(Bar);
            }, ArgumentException);
        });
    });
});