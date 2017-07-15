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
        // in* = invalid type
        // ne* = null || undefined
        // op* = optional
        // nes* = nested
        
        let obj: any = {
            strVal: "foo", // good
            inStrVal: true, // bad
            neStrVal: null, // bad
            
            opStrVal: "bar", // good
            opInStrVal: 5, // bad
            opNeStrVal: null, // good
            
            numVal: 5, // good
            inNumVal: "7", // bad
            neNumVal: null, // bad
            
            opNumVal: 6, // good
            opInNumVal: "6", // bad
            opNeNumVal: null, // good
            
            boolVal: false, // good
            inBoolVal: "true", // bad
            neBoolVal: null, // bad

            opBoolVal: true, // good
            opInBoolVal: "false", // bad
            opNeBoolVal: null, // good
            
            objVal: {}, // good
            inObjVal: "true", // bad
            neObjVal: null, // bad

            opObjVal: {}, // good
            opInObjVal: "false", // bad
            opNeObjVal: null, // good
            
            nesObjVal: { // good at top level
                strVal: "foo",
                inStrVal: true,
                neStrVal: null,

                opStrVal: "bar",
                opInStrVal: 5,
                opNeStrVal: null,

                numVal: 5,
                inNumVal: "7",
                neNumVal: null,

                opNumVal: 6,
                opInNumVal: "6",
                opNeNumVal: null,

                boolVal: false,
                inBoolVal: "true",
                neBoolVal: null,

                opBoolVal: true,
                opInBoolVal: "false",
                opNeBoolVal: null,

                objVal: {},
                inObjVal: "true",
                neObjVal: null,

                opObjVal: {},
                opInObjVal: "false",
                opNeObjVal: null
            },
            inNesObjVal: 4, // bad
            neNesObjVal: null, // bad
            
            opNesObjVal: {  // good at top level
                strVal: "foo",
                inStrVal: true,
                neStrVal: null,

                opStrVal: "bar",
                opInStrVal: 5,
                opNeStrVal: null,

                numVal: 5,
                inNumVal: "7",
                neNumVal: null,

                opNumVal: 6,
                opInNumVal: "6",
                opNeNumVal: null,

                boolVal: false,
                inBoolVal: "true",
                neBoolVal: null,

                opBoolVal: true,
                opInBoolVal: "false",
                opNeBoolVal: null,

                objVal: {},
                inObjVal: "true",
                neObjVal: null,

                opObjVal: {},
                opInObjVal: "false",
                opNeObjVal: null
            },
            opInNesObjVal: false, // bad
            opNeNesObjVal: null // good
        };
        
        test("should throw ArgumentNullException if structure is null", () =>
        {
            let structure: any = null;
            
            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentNullException");
        });

        test("should throw ArgumentNullException if structure is undefined", () =>
        {
            let structure: any = undefined;
            
            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentNullException");
        });
        
        test("should throw ArgumentException if structure has invalid type information", () =>
        {
            let structure = {
                strVal: "sting",
            };
            
            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });
        
        // string
        test("should be fine given valid string value", () =>
        {
            let structure = {
                strVal: "string",
            };
            
            given(obj, "obj").ensureHasStructure(structure);
            
            assert.ok(true);
        });
        
        test("should throw ArgumentException given invalid string value", () =>
        {
            let structure = {
                inStrVal: "string"
            };
            
            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });
        
        test("should throw ArgumentException given non-existant string value", () =>
        {
            let structure: any = {
                neStrVal: "string"
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });
        
        // optional string
        test("should be fine given optional valid string value", () =>
        {
            let structure = {
                "opStrVal?": "string",
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        test("should throw ArgumentException given optional invalid string value", () =>
        {
            let structure = {
                "opInStrVal?": "string"
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        test("should be fine given optional non-existant string value", () =>
        {
            let structure: any = {
                "opNeStrVal?": "string"
            };

            given(obj, "obj").ensureHasStructure(structure);
            
            assert.ok(true);
        });
        
        // number
        test("should be fine given valid number value", () =>
        {
            let structure = {
                numVal: "number",
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        test("should throw ArgumentException given invalid number value", () =>
        {
            let structure = {
                inNumVal: "number"
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        test("should throw ArgumentException given non-existant number value", () =>
        {
            let structure: any = {
                neNumVal: "number"
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        // optional number
        test("should be fine given optional valid number value", () =>
        {
            let structure = {
                "opNumVal?": "number",
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        test("should throw ArgumentException given optional invalid number value", () =>
        {
            let structure = {
                "opInNumVal?": "number"
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        test("should be fine given optional non-existant number value", () =>
        {
            let structure: any = {
                "opNeNumVal?": "number"
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        }); 
        
        // boolean
        test("should be fine given valid boolean value", () =>
        {
            let structure = {
                boolVal: "boolean",
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        test("should throw ArgumentException given invalid boolean value", () =>
        {
            let structure = {
                inBoolVal: "boolean"
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        test("should throw ArgumentException given non-existant boolean value", () =>
        {
            let structure: any = {
                neBoolVal: "boolean"
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        // optional boolean
        test("should be fine given optional valid boolean value", () =>
        {
            let structure = {
                "opBoolVal?": "boolean",
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        test("should throw ArgumentException given optional invalid boolean value", () =>
        {
            let structure = {
                "opInBoolVal?": "boolean"
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        test("should be fine given optional non-existant boolean value", () =>
        {
            let structure: any = {
                "opNeBoolVal?": "boolean"
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });
        
        // object
        test("should be fine given valid object value", () =>
        {
            let structure = {
                objVal: "object",
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        test("should throw ArgumentException given invalid object value", () =>
        {
            let structure = {
                inObjVal: "object"
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        test("should throw ArgumentException given non-existant object value", () =>
        {
            let structure: any = {
                neObjVal: "object"
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        // optional object
        test("should be fine given optional valid object value", () =>
        {
            let structure = {
                "opObjVal?": "object",
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        test("should throw ArgumentException given optional invalid object value", () =>
        {
            let structure = {
                "opInObjVal?": "object"
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        test("should be fine given optional non-existant object value", () =>
        {
            let structure: any = {
                "opNeObjVal?": "object"
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });
        

        // test("should successfully ensure object has structure", () =>
        // {
        //     try 
        //     {
        //         given(obj, "obj").ensureHasStructure(structure);
        //     }
        //     catch (exp)
        //     {
        //         exceptionHappened = true;
        //         exceptionType = (<Object>exp).getTypeName();
        //     }
        //     assert.strictEqual(exceptionHappened, false);
        // });
        
        // test("should successfully ensure nested objects have structure", () =>
        // {
        //     let obj = {
        //         strval: "foo",
        //         invalstrval: true,
        //         numval: 5,
        //         invalnumval: "7",
        //         boolval: false,
        //         invalboolval: "true",
        //         objval: {
        //             neststrval: "bar",
        //             nestinvalstrval: false,
        //             nestnumval: 6,
        //             nestinvalnumval: "8",
        //             nestboolval: true,
        //             nestinvalboolval: "false",
        //             nestobjval: {
        //                 neststrval: "buzz",
        //                 nestinvalstrval: false,
        //                 nestnumval: 6,
        //                 nestinvalnumval: "8",
        //                 nestboolval: true,
        //                 nestinvalboolval: "false",
        //                 nestobjval: {
        //                     neststrval: "foo",
        //                 }
        //             }
        //         }
        //     };
            
        //     try 
        //     {
        //         given(obj, "obj").ensureHasStructure(structure);
        //     }
        //     catch (exp)
        //     {
        //         exceptionHappened = true;
        //         exceptionType = (<Object>exp).getTypeName();
        //     }
        //     assert.strictEqual(exceptionHappened, false);
        // });
        
        
        
        // test("should throw ArgumentException if strval is not a string", () =>
        // {
        //     let obj = {
        //         strval: 1,
        //         invalstrval: true,
        //         numval: 5,
        //         invalnumval: "7",
        //         boolval: false,
        //         invalboolval: "true",
        //         objval: {
        //             neststrval: "bar",
        //         }
        //     };
            
        //     try 
        //     {
        //         given(obj, "obj").ensureHasStructure(structure);
        //     }
        //     catch (exp)
        //     {
        //         exceptionHappened = true;
        //         exceptionType = (<Object>exp).getTypeName();
        //     }
        //     assert.strictEqual(exceptionHappened, true);
        //     assert.ok(exceptionType === "ArgumentException");    
        // });
        
        // test("should throw ArgumentException if invalstrval is not a boolean", () =>
        // {
        //     let obj = {
        //         strval: "foo",
        //         invalstrval: "not boolean",
        //         numval: 5,
        //         invalnumval: "7",
        //         boolval: false,
        //         invalboolval: "true",
        //         objval: {
        //             neststrval: "bar",
        //         }
        //     };   
        //     try 
        //     {
        //         given(obj, "obj").ensureHasStructure(structure);
        //     }
        //     catch (exp)
        //     {
        //         exceptionHappened = true;
        //         exceptionType = (<Object>exp).getTypeName();
        //     }
        //     assert.strictEqual(exceptionHappened, true);
        //     assert.ok(exceptionType === "ArgumentException");
        // });
        
        // test("should throw ArgumentException if numval is not a number", () =>
        // {
        //     let obj = {
        //         strval: "foo",
        //         invalstrval: true,
        //         numval: "5",
        //         invalnumval: "7",
        //         boolval: false,
        //         invalboolval: "true",
        //         objval: {
        //             neststrval: "bar",
        //         }
        //     };
        //     try 
        //     {
        //         given(obj, "obj").ensureHasStructure(structure);
        //     }
        //     catch (exp)
        //     {
        //         exceptionHappened = true;
        //         exceptionType = (<Object>exp).getTypeName();
        //     }
        //     assert.strictEqual(exceptionHappened, true);
        //     assert.ok(exceptionType === "ArgumentException");
        // });
        
        // test("should throw ArgumentException if invalnumval is not a string", () =>
        // {
        //     let obj = {
        //         strval: "foo",
        //         invalstrval: true,
        //         numval: 5,
        //         invalnumval: 7,
        //         boolval: false,
        //         invalboolval: "true",
        //         objval: {
        //             neststrval: "bar",
        //         }
        //     };
        //     try 
        //     {
        //         given(obj, "obj").ensureHasStructure(structure);
        //     }
        //     catch (exp)
        //     {
        //         exceptionHappened = true;
        //         exceptionType = (<Object>exp).getTypeName();
        //     }
        //     assert.strictEqual(exceptionHappened, true);
        //     assert.ok(exceptionType === "ArgumentException");
        // });
        
        // test("should throw ArgumentException if boolval is not a boolean", () =>
        // {
        //     let obj = {
        //         strval: "foo",
        //         invalstrval: true,
        //         numval: 5,
        //         invalnumval: "7",
        //         boolval: "false",
        //         invalboolval: "true",
        //         objval: {
        //             neststrval: "bar",
        //         }
        //     };
        //     try 
        //     {
        //         given(obj, "obj").ensureHasStructure(structure);
        //     }
        //     catch (exp)
        //     {
        //         exceptionHappened = true;
        //         exceptionType = (<Object>exp).getTypeName();
        //     }
        //     assert.strictEqual(exceptionHappened, true);
        //     assert.ok(exceptionType === "ArgumentException");
        // });
        
        // test("should throw ArgumentException if invalboolval is not a string", () =>
        // {
        //     let obj = {
        //         strval: "foo",
        //         invalstrval: true,
        //         numval: 5,
        //         invalnumval: "7",
        //         boolval: false,
        //         invalboolval: true,
        //         objval: {
        //             neststrval: "bar",
        //         }
        //     };
        //     try 
        //     {
        //         given(obj, "obj").ensureHasStructure(structure);
        //     }
        //     catch (exp)
        //     {
        //         exceptionHappened = true;
        //         exceptionType = (<Object>exp).getTypeName();
        //     }
        //     assert.strictEqual(exceptionHappened, true);
        //     assert.ok(exceptionType === "ArgumentException");
        // });
        
        // test("should throw ArgumentException if objval is not an object", () =>
        // {
        //     let obj = {
        //         strval: "foo",
        //         invalstrval: true,
        //         numval: 5,
        //         invalnumval: "7",
        //         boolval: false,
        //         invalboolval: "true",
        //         objval: "not an object"
        //     };
        //     try 
        //     {
        //         given(obj, "obj").ensureHasStructure(structure);
        //     }
        //     catch (exp)
        //     {
        //         exceptionHappened = true;
        //         exceptionType = (<Object>exp).getTypeName();
        //     }
        //     assert.strictEqual(exceptionHappened, true);
        //     assert.ok(exceptionType === "ArgumentException");
        // });
        
        // test("should successfully ensure object has structure if optional properties are empty", () =>
        // {
        //     let obj = {
        //         strval: " ",
        //         invalstrval: " ",
        //         numval: " ",
        //         invalnumval: " ",
        //         boolval: " ",
        //         invalboolval: " ",
        //         objval: {
        //             neststrval: " ",
        //         }
        //     };   
        //     let structure = {
        //         "strval?": "string",
        //         "invalstrval?": "boolean",
        //         "numval?": "number",
        //         "invalnumval?": "string",
        //         "boolval?": "boolean",
        //         "invalboolval?": "string",
        //         "objval?": {
        //             neststrval: "string"
        //         }
        //     };
            
        //     try 
        //     {
        //         given(obj, "obj").ensureHasStructure(structure);
        //     }
        //     catch (exp)
        //     {
        //         exceptionHappened = true;
        //         exceptionType = (<Object>exp).getTypeName();
        //     }
        //     assert.strictEqual(exceptionHappened, false);
        // });
        
        // test("should successfully ensure object has structure if optional properties have values", () =>
        // {
        //     let obj = {
        //         strval: "foo",
        //         invalstrval: true,
        //         numval: 5,
        //         invalnumval: "7",
        //         boolval: false,
        //         invalboolval: "true",
        //         objval: {
        //             neststrval: "bar",
        //         }
        //     };
        //     let structure = {
        //         "strval?": "string",
        //         "invalstrval?": "boolean",
        //         "numval?": "number",
        //         "invalnumval?": "string",
        //         "boolval?": "boolean",
        //         "invalboolval?": "string",
        //         "objval?": {
        //             neststrval: "string"
        //         }
        //     };

        //     try 
        //     {
        //         given(obj, "obj").ensureHasStructure(structure);
        //     }
        //     catch (exp)
        //     {
        //         exceptionHappened = true;
        //         exceptionType = (<Object>exp).getTypeName();
        //     }
        //     assert.strictEqual(exceptionHappened, false);
        // });
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