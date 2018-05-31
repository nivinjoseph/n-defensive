import * as assert from "assert";
import { given } from "../src/index";
import "@nivinjoseph/n-ext";
import { Exception, ArgumentException, ArgumentNullException } from "@nivinjoseph/n-exception";

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
        
        test("should throw ArgumentException if arg is empty string", () =>
        {
            arg = "";
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
            assert.strictEqual(exceptionHappened, true);
            assert.strictEqual(exceptionType, "ArgumentException");
        });
        
        test("should throw ArgumentException if arg is whitespace string", () =>
        {
            arg = "   ";
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
            assert.strictEqual(exceptionHappened, true);
            assert.strictEqual(exceptionType, "ArgumentException");
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
        class Foo2 extends Foo { }    


        test("should be fine if the value is of correct type", () =>
        {
            let value = new Foo();
            given(value, "value").ensureIsType(Foo);
            assert.ok(true);
        });
        
        test("should be fine if value is subclass of type", () =>
        {
            let value = new Foo2();
            given(value, "value").ensureIsType(Foo);
            assert.ok(true);
        });
        
        test("should throw ArgumentException if the value is not of correct type", () =>
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

        test("should throw ArgumentException if the value is superclass of type", () =>
        {
            try 
            {
                let value = new Foo();
                given(value, "value").ensureIsType(Foo2);
                assert.ok(false);
            }
            catch (error)
            {
                assert.ok(error instanceof ArgumentException);
            }
        });
    });

    suite("ensureHasStructure", () =>
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
            
            arrayVal: [1, 2, 3], // good
            inArrayVal: true, // bad
            neArrayVal: null, // bad
            
            opArrayVal: ["trey", "charlene"], // good
            opInArrayVal: { }, // bad
            opNeArrayVal: null, // good
            
            typedArrayVal: [1, 2, 3], // good
            inTypedArrayVal: [1, 2, 3], // bad
            neTypedArrayVal: null, // bad

            opTypedArrayVal: ["trey", "charlene"], // good
            opInTypedArrayVal: [{}, {}], // bad
            opNeTypedArrayVal: null, // good
            
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
                opNeObjVal: null,
                
                arrayVal: [1, 2, 3],
                inArrayVal: true,
                neArrayVal: null,

                opArrayVal: ["trey", "charlene"],
                opInArrayVal: {},
                opNeArrayVal: null,
            }
        };
        
        test("should be fine if arg is null", () =>
        {
            let arg = null;
            let structure = {};
            
            given(arg, "arg").ensureHasStructure(structure);
            
            assert.ok(true);
        });
        
        test("should be fine if arg is undefined", () =>
        {
            let arg = undefined;
            let structure = {};

            given(arg, "arg").ensureHasStructure(structure);
            
            assert.ok(true);
        });
        
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
        
        // array
        test("should be fine given valid array value", () =>
        {
            let structure = {
                arrayVal: "array",
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        test("should throw ArgumentException given invalid array value", () =>
        {
            let structure = {
                inArrayVal: "array"
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        test("should throw ArgumentException given non-existant array value", () =>
        {
            let structure: any = {
                neArrayVal: "array"
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        // optional array
        test("should be fine given optional valid array value", () =>
        {
            let structure = {
                "opArrayVal?": "array",
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        test("should throw ArgumentException given optional invalid array value", () =>
        {
            let structure = {
                "opInArrayVal?": "array"
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        test("should be fine given optional non-existant array value", () =>
        {
            let structure: any = {
                "opNeArrayVal?": "array"
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });
        
        // typed array
        test("should be fine given valid typed array value", () =>
        {
            let structure = {
                typedArrayVal: ["number"],
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        test("should throw ArgumentException given invalid typed array value", () =>
        {
            let structure = {
                inTypedArrayVal: ["boolean"]
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        test("should throw ArgumentException given non-existant typed array value", () =>
        {
            let structure: any = {
                neTypedArrayVal: ["object"]
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        // optional array
        test("should be fine given optional valid typed array value", () =>
        {
            let structure = {
                "opTypedArrayVal?": ["string"],
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        test("should throw ArgumentException given optional invalid typed array value", () =>
        {
            let structure = {
                "opInTypedArrayVal?": ["number"]
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        test("should be fine given optional non-existant typed array value", () =>
        {
            let structure: any = {
                "opNeTypedArrayVal?": ["array"]
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
        
        test("should be fine given valid object value and object literal notation", () =>
        {
            let structure = {
                objVal: {},
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
        
        test("should be fine given optional valid object value and object literal notation", () =>
        {
            let structure = {
                "opObjVal?": {},
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
        
        // nested
        test("should throw ArgumentException if structure has invalid type information", () =>
        {
            let structure = {
                nesObjVal: {
                    strVal: "sting"
                }
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        // nested string
        test("should be fine given valid nested string value", () =>
        {
            let structure: any = {
                strVal: "string",
            };
            
            structure = {
                nesObjVal: structure
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        test("should throw ArgumentException given nested invalid string value", () =>
        {
            let structure: any = {
                inStrVal: "string"
            };
            
            structure = {
                nesObjVal: structure
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        test("should throw ArgumentException given nested non-existant string value", () =>
        {
            let structure: any = {
                neStrVal: "string"
            };
            
            structure = {
                nesObjVal: structure
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        // optional string
        test("should be fine given nested optional valid string value", () =>
        {
            let structure: any = {
                "opStrVal?": "string",
            };
            
            structure = {
                nesObjVal: structure
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        test("should throw ArgumentException given nested optional invalid string value", () =>
        {
            let structure: any = {
                "opInStrVal?": "string"
            };
            
            structure = {
                nesObjVal: structure
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        test("should be fine given nested optional non-existant string value", () =>
        {
            let structure: any = {
                "opNeStrVal?": "string"
            };
            
            structure = {
                nesObjVal: structure
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        // number
        test("should be fine given nested valid number value", () =>
        {
            let structure: any = {
                numVal: "number",
            };
            
            structure = {
                nesObjVal: structure
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        test("should throw ArgumentException given nested invalid number value", () =>
        {
            let structure: any = {
                inNumVal: "number"
            };
            
            structure = {
                nesObjVal: structure
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        test("should throw ArgumentException given nested non-existant number value", () =>
        {
            let structure: any = {
                neNumVal: "number"
            };
            
            structure = {
                nesObjVal: structure
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        // optional number
        test("should be fine given nested optional valid number value", () =>
        {
            let structure: any = {
                "opNumVal?": "number",
            };
            
            structure = {
                nesObjVal: structure
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        test("should throw ArgumentException given nested optional invalid number value", () =>
        {
            let structure: any = {
                "opInNumVal?": "number"
            };
            
            structure = {
                nesObjVal: structure
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        test("should be fine given nested optional non-existant number value", () =>
        {
            let structure: any = {
                "opNeNumVal?": "number"
            };
            
            structure = {
                nesObjVal: structure
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        // boolean
        test("should be fine given nested valid boolean value", () =>
        {
            let structure: any = {
                boolVal: "boolean",
            };
            
            structure = {
                nesObjVal: structure
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        test("should throw ArgumentException given nested invalid boolean value", () =>
        {
            let structure: any = {
                inBoolVal: "boolean"
            };
            
            structure = {
                nesObjVal: structure
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        test("should throw ArgumentException given nested non-existant boolean value", () =>
        {
            let structure: any = {
                neBoolVal: "boolean"
            };
            
            structure = {
                nesObjVal: structure
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        // optional boolean
        test("should be fine given nested optional valid boolean value", () =>
        {
            let structure: any = {
                "opBoolVal?": "boolean",
            };
            
            structure = {
                nesObjVal: structure
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        test("should throw ArgumentException given nested optional invalid boolean value", () =>
        {
            let structure: any = {
                "opInBoolVal?": "boolean"
            };
            
            structure = {
                nesObjVal: structure
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        test("should be fine given nested optional non-existant boolean value", () =>
        {
            let structure: any = {
                "opNeBoolVal?": "boolean"
            };
            
            structure = {
                nesObjVal: structure
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        // object
        test("should be fine given nested valid object value", () =>
        {
            let structure: any = {
                objVal: "object",
            };
            
            structure = {
                nesObjVal: structure
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        test("should be fine given nested valid object value and object literal notation", () =>
        {
            let structure: any = {
                objVal: {},
            };
            
            structure = {
                nesObjVal: structure
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        test("should throw ArgumentException given nested invalid object value", () =>
        {
            let structure: any = {
                inObjVal: "object"
            };
            
            structure = {
                nesObjVal: structure
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        test("should throw ArgumentException given nested non-existant object value", () =>
        {
            let structure: any = {
                neObjVal: "object"
            };
            
            structure = {
                nesObjVal: structure
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        // optional object
        test("should be fine given nested optional valid object value", () =>
        {
            let structure: any = {
                "opObjVal?": "object",
            };
            
            structure = {
                nesObjVal: structure
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        test("should be fine given nested optional valid object value and object literal notation", () =>
        {
            let structure: any = {
                "opObjVal?": {},
            };
            
            structure = {
                nesObjVal: structure
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        test("should throw ArgumentException given nested optional invalid object value", () =>
        {
            let structure: any = {
                "opInObjVal?": "object"
            };
            
            structure = {
                nesObjVal: structure
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        test("should be fine given nested optional non-existant object value", () =>
        {
            let structure: any = {
                "opNeObjVal?": "object"
            };
            
            structure = {
                nesObjVal: structure
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
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