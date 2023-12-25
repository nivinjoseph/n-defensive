import { ArgumentNullException } from "@nivinjoseph/n-exception";
import assert from "node:assert";
import { before, beforeEach, describe, test } from "node:test";
import { given } from "../src/index.js";


await describe("General", async () =>
{
    // let arg: any;
    // let argName: any;
    let exceptionHappened: boolean;
    let exceptionType: string;
    let reason: any;

    beforeEach(() =>
    {
        // arg = null;
        // argName = null;
        exceptionHappened = false;
        reason = null;
    });

    await describe("given", async () =>
    {
        await test("should throw an ArgumentNullException if argName (second arg) is null", () => 
        {
            assert.throws(() =>
            {
                given(null, null as any);
            }, ArgumentNullException);
        });

        await test("should throw an ArgumentNullException if argName (second arg) is undefined", () =>
        {
            assert.throws(() =>
            {
                given(null, undefined as any);
            }, ArgumentNullException);
        });

        await test("should throw an ArgumentNullException if argName (second arg) is an empty string", () =>
        {
            assert.throws(() =>
            {
                given(null, "");
            }, ArgumentNullException);
        });

        await test("should throw an ArgumentNullException if argName (second arg) is an whitespace string", () =>
        {
            assert.throws(() =>
            {
                given(null, "  ");
            }, ArgumentNullException);
        });

        await test("given should return an Ensurer object", () =>
        {
            const ensurer = given({}, "argName");

            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            assert.ok(ensurer != null);
        });
    });

    await describe("ensureHasValue", async () =>     
    {
        await test("should throw ArgumentNullException if arg is null", () =>
        {
            try 
            {
                given(null as any, "argName").ensureHasValue();
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.strictEqual(exceptionType, "ArgumentNullException");
        });

        await test("should throw ArgumentNullException if arg is undefined", () =>
        {
            // arg = undefined;
            try 
            {
                given(undefined as any, "argName").ensureHasValue();
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.strictEqual(exceptionType, "ArgumentNullException");
        });

        await test("should throw ArgumentException if arg is empty string", () =>
        {
            // arg = "";
            // argName = "argName";
            try 
            {
                given("", "argName").ensureHasValue();
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.strictEqual(exceptionType, "ArgumentException");
        });

        await test("should throw ArgumentException if arg is whitespace string", () =>
        {
            // arg = "   ";
            // argName = "argName";
            try 
            {
                given("   ", "argName").ensureHasValue();
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.strictEqual(exceptionType, "ArgumentException");
        });

        await test("should not throw any exceptions if arg has value", () =>
        {
            // arg = "arg";
            // argName = "argName";
            try 
            {
                given("arg", "argName").ensureHasValue();
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, false);
        });
    });

    await describe("ensure", async () =>
    {
        const arg = "arg";
        const argName = "argName";

        before(() =>
        {
            // arg = "arg";
            // argName = "argName";
        });

        await test("should throw ArgumentNullException if func is null", async () =>
        {
            try 
            {
                given(arg, argName).ensure(null as any, "reason");
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.strictEqual(exceptionType, "ArgumentNullException");
        });

        await test("should throw ArgumentNullException if func is undefined", () =>
        {
            try 
            {
                given(arg, argName).ensure(undefined as any, "reason");
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.strictEqual(exceptionType, "ArgumentNullException");
        });

        await test("should throw InvalidArgumentException if func returns false", () =>
        {
            try 
            {
                given(arg, argName)
                    .ensure(_arg => false);
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.strictEqual(exceptionType, "InvalidArgumentException");
        });

        await test("should not throw any exceptions if the func returns true", () =>
        {
            try 
            {
                given(arg, argName)
                    .ensure(_arg => true, "reason");
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, false);
        });
    });

    await describe("ensure with reason", async () =>
    {
        const arg = "arg";
        const argName = "argName";

        // setup(() =>
        // {

        // });

        await test("should throw InvalidArgumentException if func returns false and reason is null", () =>
        {
            try 
            {
                given(arg, argName).ensure(_arg => false, reason);
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.strictEqual(exceptionType, "InvalidArgumentException");
        });

        await test("should throw InvalidArgumentException if func returns false and reason is undefined", () =>
        {
            reason = undefined;
            try 
            {
                given(arg, argName).ensure(_arg => false, reason);
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.strictEqual(exceptionType, "InvalidArgumentException");
        });

        await test("should throw InvalidArgumentException if func returns false and reason is empty string", () =>
        {
            reason = "";
            try 
            {
                given(arg, argName).ensure(_arg => false, reason);
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.strictEqual(exceptionType, "InvalidArgumentException");
        });

        await test("should throw InvalidArgumentException if func returns false and reason is whitespace string", () =>
        {
            reason = "  ";
            try 
            {
                given(arg, argName).ensure(_arg => false, reason);
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.strictEqual(exceptionType, "InvalidArgumentException");
        });

        await test("should throw ArgumentException if func returns false and reason is a valid string", () =>
        {
            reason = "reason";
            try 
            {
                given(arg, argName).ensure(_ => false, reason);
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.strictEqual(exceptionType, "ArgumentException");
        });
    });
});