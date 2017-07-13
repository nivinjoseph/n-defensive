import * as assert from "assert";
import { given } from "../src/index";
import "n-ext";
import { Exception, ArgumentException, ArgumentNullException } from "n-exception";

suite("Exceptions thrown", () =>
{
    let arg: any;
    let argName: any;
    let exceptionHappened: boolean;
    let exceptionType: string;
    let reason: any;

    setup(() =>
    {
        arg = null;
        argName = null;
        exceptionHappened = false;
        reason = null;
    });

    suite("given", () =>
    {
        test("should throw an ArgumentNullException if argName (second arg) is null", () => 
        {
            try 
            {
                given(arg, argName);
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.strictEqual(exceptionType, "ArgumentNullException");
        });

        test("should throw an ArgumentNullException if argName (second arg) is undefined", () =>
        {
            argName = undefined;
            try 
            {
                given(arg, argName);
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.strictEqual(exceptionType, "ArgumentNullException");
        });

        test("should throw an ArgumentNullException if argName (second arg) is an empty string", () =>
        {
            argName = "";
            try 
            {
                given(arg, argName);
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.strictEqual(exceptionType, "ArgumentNullException");
        });

        test("should throw an ArgumentNullException if argName (second arg) is an whitespace string", () =>
        {
            argName = "  ";
            try 
            {
                given(arg, argName);
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.strictEqual(exceptionType, "ArgumentNullException");
        });

        test("given should return an Ensurer object", () =>
        {
            let ensurer = given({}, "argName");
            try 
            {
                given(arg, argName);
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.ok(ensurer != null);
        });
    });

    suite("ensureHasValue", () =>     
    {
        test("should throw ArgumentNullException if arg is null", () =>
        {
            try 
            {
                given(arg, argName).ensureHasValue();
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.strictEqual(exceptionType, "ArgumentNullException");
        });

        test("should throw ArgumentNullException if arg is undefined", () =>
        {
            arg = undefined;
            try 
            {
                given(arg, argName).ensureHasValue();
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.strictEqual(exceptionType, "ArgumentNullException");
        });

        test("should not throw any exceptions if arg has value", () =>
        {
            arg = "arg";
            argName = "argName";
            try 
            {
                given(arg, argName).ensureHasValue();
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, false);
        });
    });

    suite("ensureIsString", () =>
    {
        test("should be fine if the value is string", () =>
        {
            let value = "foo";
            given(value, "value").ensureIsString();
            assert.ok(true);
        });

        test("should throw ArgumentException if the value is not string", () =>
        {
            try 
            {
                let value = {};
                given(value, "value").ensureIsString();
                assert.ok(false);
            }
            catch (error)
            {
                assert.ok(error instanceof ArgumentException);
            }
        });
    });

    suite("ensureIsNumber", () =>
    {
        test("should be fine if the value is number", () =>
        {
            let value = 55;
            given(value, "value").ensureIsNumber();
            assert.ok(true);
        });

        test("should throw ArgumentException if the value is not number", () =>
        {
            try 
            {
                let value = "5";
                given(value, "value").ensureIsNumber();
                assert.ok(false);
            }
            catch (error)
            {
                assert.ok(error instanceof ArgumentException);
            }
        });
    });

    suite("ensureIsBoolean", () =>
    {
        test("should be fine if the value is boolean", () =>
        {
            let value = false;
            given(value, "value").ensureIsBoolean();
            assert.ok(true);
        });

        test("should throw ArgumentException if the value is not boolean", () =>
        {
            try 
            {
                let value = "true";
                given(value, "value").ensureIsBoolean();
                assert.ok(false);
            }
            catch (error)
            {
                assert.ok(error instanceof ArgumentException);
            }
        });
    });

    suite("ensureIsObject", () =>
    {
        test("should be fine if the value is object", () =>
        {
            let value = {};
            given(value, "value").ensureIsObject();
            assert.ok(true);
        });

        test("should throw ArgumentException if the value is not object", () =>
        {
            try 
            {
                let value = "foo";
                given(value, "value").ensureIsObject();
                assert.ok(false);
            }
            catch (error)
            {
                assert.ok(error instanceof ArgumentException);
            }
        });
    });

    suite("ensureIsFunction", () =>
    {
        test("should be fine if the value is function", () =>
        {
            let value = () => "foo";
            given(value, "value").ensureIsFunction();
            assert.ok(true);
        });

        test("should throw ArgumentException if the value is not function", () =>
        {
            try 
            {
                let value = {};
                given(value, "value").ensureIsFunction();
                assert.ok(false);
            }
            catch (error)
            {
                assert.ok(error instanceof ArgumentException);
            }
        });
    });

    suite("ensureIsArray", () =>
    {
        test("should be fine if the value is array", () =>
        {
            let value = ["foo"];
            given(value, "value").ensureIsArray();
            assert.ok(true);
        });

        test("should throw ArgumentException if the value is not array", () =>
        {
            try 
            {
                let value = {};
                given(value, "value").ensureIsArray();
                assert.ok(false);
            }
            catch (error)
            {
                assert.ok(error instanceof ArgumentException);
            }
        });
    });

    suite("ensureIsType", () =>
    {
        class Foo { }
        class Bar { }


        test("should be fine if the value is of correct type", () =>
        {
            let value = new Foo();
            given(value, "value").ensureIsType(Foo);
            assert.ok(true);
        });

        test("should throw ArgumentException if the value is not string", () =>
        {
            try 
            {
                let value = new Bar();
                given(value, "value").ensureIsType(Foo);
                assert.ok(false);
            }
            catch (error)
            {
                assert.ok(error instanceof ArgumentException);
            }
        });
    });

    suite.only("ensureHasStructure", () =>
    {
        let obj = {
            strval: "foo",
            invalstrval: true,
            numval: 5,
            invalnumval: "7",
            boolval: false,
            invalboolval: "true",
            objval: {
                neststrval: "bar",
            }
        };

        let structure = {
            strval: "string",
            invalstrval: "boolean",
            numval: "number",
            invalnumval: "string",
            boolval: "boolean",
            invalboolval: "string",
            objval: {
                neststrval: "string"
            }
        };

        test("should successfully ensure object has structure", () =>
        {
            try 
            {
                given(obj, "obj").ensureHasStructure(structure);
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, false);
        });
        
        test("should successfully ensure nested objects have structure", () =>
        {
            let obj = {
                strval: "foo",
                invalstrval: true,
                numval: 5,
                invalnumval: "7",
                boolval: false,
                invalboolval: "true",
                objval: {
                    neststrval: "bar",
                    nestinvalstrval: false,
                    nestnumval: 6,
                    nestinvalnumval: "8",
                    nestboolval: true,
                    nestinvalboolval: "false",
                    nestobjval: {
                        neststrval: "buzz",
                        nestinvalstrval: false,
                        nestnumval: 6,
                        nestinvalnumval: "8",
                        nestboolval: true,
                        nestinvalboolval: "false",
                        nestobjval: {
                            neststrval: "foo",
                        }
                    }
                }
            };
            
            try 
            {
                given(obj, "obj").ensureHasStructure(structure);
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, false);
        });
        
        test("should throw ArgumentNullException if structure is null", () =>
        {
            let structure = null;
            
            try 
            {
                given(obj, "obj").ensureHasStructure(structure);
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.ok(exceptionType === "ArgumentNullException");
        });
        
        test("should throw ArgumentNullException if structure is undefined", () =>
        {
            let structure = undefined;

            try 
            {
                given(obj, "obj").ensureHasStructure(structure);
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.ok(exceptionType === "ArgumentNullException");
        });
        
        test("should throw ArgumentException if strval is not a string", () =>
        {
            let obj = {
                strval: 1,
                invalstrval: true,
                numval: 5,
                invalnumval: "7",
                boolval: false,
                invalboolval: "true",
                objval: {
                    neststrval: "bar",
                }
            };
            
            try 
            {
                given(obj, "obj").ensureHasStructure(structure);
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.ok(exceptionType === "ArgumentException");    
        });
        
        test("should throw ArgumentException if invalstrval is not a boolean", () =>
        {
            let obj = {
                strval: "foo",
                invalstrval: "not boolean",
                numval: 5,
                invalnumval: "7",
                boolval: false,
                invalboolval: "true",
                objval: {
                    neststrval: "bar",
                }
            };   
            try 
            {
                given(obj, "obj").ensureHasStructure(structure);
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.ok(exceptionType === "ArgumentException");
        });
        
        test("should throw ArgumentException if numval is not a number", () =>
        {
            let obj = {
                strval: "foo",
                invalstrval: true,
                numval: "5",
                invalnumval: "7",
                boolval: false,
                invalboolval: "true",
                objval: {
                    neststrval: "bar",
                }
            };
            try 
            {
                given(obj, "obj").ensureHasStructure(structure);
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.ok(exceptionType === "ArgumentException");
        });
        
        test("should throw ArgumentException if invalnumval is not a string", () =>
        {
            let obj = {
                strval: "foo",
                invalstrval: true,
                numval: 5,
                invalnumval: 7,
                boolval: false,
                invalboolval: "true",
                objval: {
                    neststrval: "bar",
                }
            };
            try 
            {
                given(obj, "obj").ensureHasStructure(structure);
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.ok(exceptionType === "ArgumentException");
        });
        
        test("should throw ArgumentException if boolval is not a boolean", () =>
        {
            let obj = {
                strval: "foo",
                invalstrval: true,
                numval: 5,
                invalnumval: "7",
                boolval: "false",
                invalboolval: "true",
                objval: {
                    neststrval: "bar",
                }
            };
            try 
            {
                given(obj, "obj").ensureHasStructure(structure);
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.ok(exceptionType === "ArgumentException");
        });
        
        test("should throw ArgumentException if invalboolval is not a string", () =>
        {
            let obj = {
                strval: "foo",
                invalstrval: true,
                numval: 5,
                invalnumval: "7",
                boolval: false,
                invalboolval: true,
                objval: {
                    neststrval: "bar",
                }
            };
            try 
            {
                given(obj, "obj").ensureHasStructure(structure);
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.ok(exceptionType === "ArgumentException");
        });
        
        test("should throw ArgumentException if objval is not an object", () =>
        {
            let obj = {
                strval: "foo",
                invalstrval: true,
                numval: 5,
                invalnumval: "7",
                boolval: false,
                invalboolval: "true",
                objval: "not an object"
            };
            try 
            {
                given(obj, "obj").ensureHasStructure(structure);
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.ok(exceptionType === "ArgumentException");
        });
        
        test("should successfully ensure object has structure if optional properties are empty", () =>
        {
            let obj = {
                strval: " ",
                invalstrval: " ",
                numval: " ",
                invalnumval: " ",
                boolval: " ",
                invalboolval: " ",
                objval: {
                    neststrval: " ",
                }
            };   
            let structure = {
                "strval?": "string",
                "invalstrval?": "boolean",
                "numval?": "number",
                "invalnumval?": "string",
                "boolval?": "boolean",
                "invalboolval?": "string",
                "objval?": {
                    neststrval: "string"
                }
            };
            
            try 
            {
                given(obj, "obj").ensureHasStructure(structure);
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, false);
        });
        
        test("should successfully ensure object has structure if optional properties have values", () =>
        {
            let obj = {
                strval: "foo",
                invalstrval: true,
                numval: 5,
                invalnumval: "7",
                boolval: false,
                invalboolval: "true",
                objval: {
                    neststrval: "bar",
                }
            };
            let structure = {
                "strval?": "string",
                "invalstrval?": "boolean",
                "numval?": "number",
                "invalnumval?": "string",
                "boolval?": "boolean",
                "invalboolval?": "string",
                "objval?": {
                    neststrval: "string"
                }
            };

            try 
            {
                given(obj, "obj").ensureHasStructure(structure);
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, false);
        });
    });

    suite("ensure", () =>
    {
        setup(() =>
        {
            arg = "arg";
            argName = "argName";
        });

        test("should throw ArgumentNullException if func is null", () =>
        {
            try 
            {
                given(arg, argName).ensure(null, "reason");
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.strictEqual(exceptionType, "ArgumentNullException");
        });

        test("should throw ArgumentNullException if func is undefined", () =>
        {
            try 
            {
                given(arg, argName).ensure(undefined, "reason");
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.strictEqual(exceptionType, "ArgumentNullException");
        });

        test("should throw InvalidArgumentException if func returns false", () =>
        {
            try 
            {
                given(arg, argName).ensure(arg => false);
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.strictEqual(exceptionType, "InvalidArgumentException");
        });

        test("should not throw any exceptions if the func returns true", () =>
        {
            try 
            {
                given(arg, argName).ensure(arg => true, "reason");
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, false);
        });
    });

    suite("ensure with reason", () =>
    {
        setup(() =>
        {
            arg = "arg";
            argName = "argName";
        });

        test("should throw InvalidArgumentException if func returns false and reason is null", () =>
        {
            try 
            {
                given(arg, argName).ensure(arg => false, reason);
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.strictEqual(exceptionType, "InvalidArgumentException");
        });

        test("should throw InvalidArgumentException if func returns false and reason is undefined", () =>
        {
            reason = undefined;
            try 
            {
                given(arg, argName).ensure(arg => false, reason);
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.strictEqual(exceptionType, "InvalidArgumentException");
        });

        test("should throw InvalidArgumentException if func returns false and reason is empty string", () =>
        {
            reason = "";
            try 
            {
                given(arg, argName).ensure(arg => false, reason);
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.strictEqual(exceptionType, "InvalidArgumentException");
        });

        test("should throw InvalidArgumentException if func returns false and reason is whitespace string", () =>
        {
            reason = "  ";
            try 
            {
                given(arg, argName).ensure(arg => false, reason);
            }
            catch (exp)
            {
                exceptionHappened = true;
                exceptionType = (<Object>exp).getTypeName();
            }
            assert.strictEqual(exceptionHappened, true);
            assert.strictEqual(exceptionType, "InvalidArgumentException");
        });

        test("should throw ArgumentException if func returns false and reason is a valid string", () =>
        {
            reason = "reason";
            try 
            {
                given(arg, argName).ensure(arg => false, reason);
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