import * as assert from "assert";
import { given } from "../src/index";
import "@nivinjoseph/n-ext";
import { Exception, ArgumentException } from "@nivinjoseph/n-exception";

suite("Exceptions thrown", () =>
{
    // let arg: any;
    // let argName: any;
    let exceptionHappened: boolean;
    let exceptionType: string;
    let reason: any;

    setup(() =>
    {
        // arg = null;
        // argName = null;
        exceptionHappened = false;
        reason = null;
    });

    suite("given", () =>
    {
        test("should throw an ArgumentNullException if argName (second arg) is null", () => 
        {   
            try 
            {
                given(null, null as any);
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
            // argName = undefined;
            try 
            {
                given(null, undefined as any);
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
            // argName = "";
            try 
            {
                given(null, "");
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
            // argName = "  ";
            try 
            {
                given(null, "  ");
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
            const ensurer = given({}, "argName");
            // try 
            // {
            //     given(arg, argName);
            // }
            // catch (exp)
            // {
            //     exceptionHappened = true;
            //     exceptionType = (<Object>exp).getTypeName();
            // }
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            assert.ok(ensurer != null);
        });
    });

    suite("ensureHasValue", () =>     
    {
        test("should throw ArgumentNullException if arg is null", () =>
        {
            try 
            {
                given(null, "argName").ensureHasValue();
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
            // arg = undefined;
            try 
            {
                given(undefined, "argName").ensureHasValue();
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
        
        test("should throw ArgumentException if arg is whitespace string", () =>
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

        test("should not throw any exceptions if arg has value", () =>
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

    suite("ensureIsString", () =>
    {
        // TODO: check this
        
        test("should be fine if the value is string", () =>
        {
            const value = "foo";
            given(value, "value").ensureIsString();
            assert.ok(true);
        });

        test("should throw ArgumentException if the value is not string", () =>
        {
            try 
            {
                const value: string = {} as any;
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
            const value = 55;
            given(value, "value").ensureIsNumber();
            assert.ok(true);
        });

        test("should throw ArgumentException if the value is not number", () =>
        {
            try 
            {
                const value: number = "5" as any;
                given(value, "value").ensureIsNumber();
                assert.ok(false);
            }
            catch (error)
            {
                assert.ok(error instanceof ArgumentException);
            }
        });
        
        test("should throw ArgumentException if the value evaluates to NaN", () =>
        {
            try 
            {
                const value: number = (undefined as any) + 1;
                // console.log(value);
                given(value, "value").ensureIsNumber();
                assert.ok(false);
            }
            catch (error)
            {
                assert.ok(error instanceof ArgumentException);
            }
        });
    });
    
    suite("ensureIsEnum", () =>
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
        
        test("should work", () =>
        {
            
            const validNumArg = Foo.bar;
            const invalidNumArg = 5;
            let numExpThrown = false;
            
            const validStringArg = "my foo";
            const invalidStringArg = "my bruh";
            let stringExpThrown = false;
            
            given(validNumArg, "validNumArg").ensureHasValue().ensureIsNumber().ensureIsEnum(Foo);
            try 
            {
                given(invalidNumArg, "invalidNumArg").ensureHasValue().ensureIsNumber().ensureIsEnum(Foo);    
            }
            catch (error)
            {
                numExpThrown = true;
            }          
            assert.ok(numExpThrown);
            
            given(validStringArg, "validStringArg").ensureHasValue().ensureIsString().ensureIsEnum(Bar);
            try
            {    
                given(invalidStringArg, "invalidStringArg").ensureHasValue().ensureIsString().ensureIsEnum(Bar);   
            }
            catch (error)
            {
                stringExpThrown = true;
            }
            assert.ok(stringExpThrown);
        });
    });

    suite("ensureIsBoolean", () =>
    {
        test("should be fine if the value is boolean", () =>
        {
            const value = false;
            given(value, "value").ensureIsBoolean();
            assert.ok(true);
        });

        test("should throw ArgumentException if the value is not boolean", () =>
        {
            try 
            {
                const value: boolean = "true" as any;
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
            const value = {};
            given(value, "value").ensureIsObject();
            assert.ok(true);
        });

        test("should throw ArgumentException if the value is not object", () =>
        {
            try 
            {
                const value: object = "foo" as any;
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
            const value = (): string => "foo";
            given(value, "value").ensureIsFunction();
            assert.ok(true);
        });

        test("should throw ArgumentException if the value is not function", () =>
        {
            try 
            {
                const value: Function = {} as any;
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
            const value = ["foo"];
            given(value, "value").ensureIsArray();
            assert.ok(true);
        });

        test("should throw ArgumentException if the value is not array", () =>
        {
            try 
            {
                const value: Array<any> = {} as any;
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
        class Bar
        { 
            public baz: string;
            public constructor()
            {
                this.baz = "I am baz";
            }
        }
        class Foo2 extends Foo { }    


        test("should be fine if the value is of correct type", () =>
        {
            const value = new Foo();
            given(value, "value").ensureIsType(Foo);
            assert.ok(true);
        });
        
        test("should throw exception if value is subclass of type", () =>
        {
            try 
            {
                const value = new Foo2();
                given(value, "value").ensureIsType(Foo);
                assert.ok(false);    
            }
            catch (error)
            {
                assert.ok(error instanceof ArgumentException);
            }
        });
        
        test("should throw ArgumentException if the value is not of correct type", () =>
        {
            try 
            {
                const value = new Bar();
                given(value, "value").ensureIsType(Foo as any);
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
                const value = new Foo();
                given(value, "value").ensureIsType(Foo2);
                assert.ok(false);
            }
            catch (error)
            {
                assert.ok(error instanceof ArgumentException);
            }
        });
    });
    
    suite("ensureIsInstanceOf", () =>
    {
        class Foo { }
        class Bar
        {
            public baz: string;
            public constructor()
            {
                this.baz = "I am baz";
            }
        }
        class Foo2 extends Foo { }


        test("should be fine if the value is of correct type", () =>
        {
            const value = new Foo();
            given(value, "value").ensureIsInstanceOf(Foo);
            assert.ok(true);
        });

        test("should be fine if value is subclass of type", () =>
        {
            const value = new Foo2();
            given(value, "value").ensureIsInstanceOf(Foo);
            assert.ok(true);
        });

        test("should throw ArgumentException if the value is not of correct type", () =>
        {
            try 
            {
                const value = new Bar();
                given(value, "value").ensureIsInstanceOf(Foo as any);
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
                const value = new Foo();
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
        
        const obj: object = {
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
                opNeArrayVal: null
            }
        };
        
        test("should be fine if arg is null", () =>
        {
            const arg: object = null as any;
            const structure = {};
            
            given(arg, "arg").ensureHasStructure(structure);
            
            assert.ok(true);
        });
        
        test("should be fine if arg is undefined", () =>
        {
            const arg: object = undefined as any;
            const structure = {};

            given(arg, "arg").ensureHasStructure(structure);
            
            assert.ok(true);
        });
        
        test("should throw ArgumentNullException if structure is null", () =>
        {
            const structure: any = null;
            
            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentNullException");
        });

        test("should throw ArgumentNullException if structure is undefined", () =>
        {
            const structure: any = undefined;
            
            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentNullException");
        });
        
        test("should throw ArgumentException if structure has invalid type information", () =>
        {
            const structure = {
                strVal: "sting"
            };
            
            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });
        
        // string
        test("should be fine given valid string value", () =>
        {
            const structure = {
                strVal: "string"
            };
            
            given(obj, "obj").ensureHasStructure(structure);
            
            assert.ok(true);
        });
        
        test("should throw ArgumentException given invalid string value", () =>
        {
            const structure = {
                inStrVal: "string"
            };
            
            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });
        
        test("should throw ArgumentException given non-existant string value", () =>
        {
            const structure: any = {
                neStrVal: "string"
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });
        
        // optional string
        test("should be fine given optional valid string value", () =>
        {
            const structure = {
                "opStrVal?": "string"
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        test("should throw ArgumentException given optional invalid string value", () =>
        {
            const structure = {
                "opInStrVal?": "string"
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        test("should be fine given optional non-existant string value", () =>
        {
            const structure: any = {
                "opNeStrVal?": "string"
            };

            given(obj, "obj").ensureHasStructure(structure);
            
            assert.ok(true);
        });
        
        // number
        test("should be fine given valid number value", () =>
        {
            const structure = {
                numVal: "number"
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        test("should throw ArgumentException given invalid number value", () =>
        {
            const structure = {
                inNumVal: "number"
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        test("should throw ArgumentException given non-existant number value", () =>
        {
            const structure: any = {
                neNumVal: "number"
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        // optional number
        test("should be fine given optional valid number value", () =>
        {
            const structure = {
                "opNumVal?": "number"
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        test("should throw ArgumentException given optional invalid number value", () =>
        {
            const structure = {
                "opInNumVal?": "number"
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        test("should be fine given optional non-existant number value", () =>
        {
            const structure: any = {
                "opNeNumVal?": "number"
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        }); 
        
        // boolean
        test("should be fine given valid boolean value", () =>
        {
            const structure = {
                boolVal: "boolean"
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        test("should throw ArgumentException given invalid boolean value", () =>
        {
            const structure = {
                inBoolVal: "boolean"
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        test("should throw ArgumentException given non-existant boolean value", () =>
        {
            const structure: any = {
                neBoolVal: "boolean"
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        // optional boolean
        test("should be fine given optional valid boolean value", () =>
        {
            const structure = {
                "opBoolVal?": "boolean"
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        test("should throw ArgumentException given optional invalid boolean value", () =>
        {
            const structure = {
                "opInBoolVal?": "boolean"
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        test("should be fine given optional non-existant boolean value", () =>
        {
            const structure: any = {
                "opNeBoolVal?": "boolean"
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });
        
        // array
        test("should be fine given valid array value", () =>
        {
            const structure = {
                arrayVal: "array"
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        test("should throw ArgumentException given invalid array value", () =>
        {
            const structure = {
                inArrayVal: "array"
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        test("should throw ArgumentException given non-existant array value", () =>
        {
            const structure: any = {
                neArrayVal: "array"
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        // optional array
        test("should be fine given optional valid array value", () =>
        {
            const structure = {
                "opArrayVal?": "array"
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        test("should throw ArgumentException given optional invalid array value", () =>
        {
            const structure = {
                "opInArrayVal?": "array"
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        test("should be fine given optional non-existant array value", () =>
        {
            const structure: any = {
                "opNeArrayVal?": "array"
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });
        
        // typed array
        test("should be fine given valid typed array value", () =>
        {
            const structure = {
                typedArrayVal: ["number"]
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        test("should throw ArgumentException given invalid typed array value", () =>
        {
            const structure = {
                inTypedArrayVal: ["boolean"]
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        test("should throw ArgumentException given non-existant typed array value", () =>
        {
            const structure: any = {
                neTypedArrayVal: ["object"]
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        // optional array
        test("should be fine given optional valid typed array value", () =>
        {
            const structure = {
                "opTypedArrayVal?": ["string"]
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        test("should throw ArgumentException given optional invalid typed array value", () =>
        {
            const structure = {
                "opInTypedArrayVal?": ["number"]
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        test("should be fine given optional non-existant typed array value", () =>
        {
            const structure: any = {
                "opNeTypedArrayVal?": ["array"]
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });
        
        // object
        test("should be fine given valid object value", () =>
        {
            const structure = {
                objVal: "object"
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });
        
        test("should be fine given valid object value and object literal notation", () =>
        {
            const structure = {
                objVal: {}
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        test("should throw ArgumentException given invalid object value", () =>
        {
            const structure = {
                inObjVal: "object"
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        test("should throw ArgumentException given non-existant object value", () =>
        {
            const structure: any = {
                neObjVal: "object"
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        // optional object
        test("should be fine given optional valid object value", () =>
        {
            const structure = {
                "opObjVal?": "object"
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });
        
        test("should be fine given optional valid object value and object literal notation", () =>
        {
            const structure = {
                "opObjVal?": {}
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });

        test("should throw ArgumentException given optional invalid object value", () =>
        {
            const structure = {
                "opInObjVal?": "object"
            };

            assert.throws(() => given(obj, "obj").ensureHasStructure(structure),
                (exp: Exception) => exp.name === "ArgumentException");
        });

        test("should be fine given optional non-existant object value", () =>
        {
            const structure: any = {
                "opNeObjVal?": "object"
            };

            given(obj, "obj").ensureHasStructure(structure);

            assert.ok(true);
        });
        
        // nested
        test("should throw ArgumentException if structure has invalid type information", () =>
        {
            const structure = {
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
                strVal: "string"
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
                "opStrVal?": "string"
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
                numVal: "number"
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
                "opNumVal?": "number"
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
                boolVal: "boolean"
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
                "opBoolVal?": "boolean"
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
                objVal: "object"
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
                objVal: {}
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
                "opObjVal?": "object"
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
                "opObjVal?": {}
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
        const arg = "arg";
        const argName = "argName";
        
        setup(() =>
        {
            // arg = "arg";
            // argName = "argName";
        });

        test("should throw ArgumentNullException if func is null", () =>
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

        test("should throw ArgumentNullException if func is undefined", () =>
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

        test("should throw InvalidArgumentException if func returns false", () =>
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

        test("should not throw any exceptions if the func returns true", () =>
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

    suite("ensure with reason", () =>
    {
        const arg = "arg";
        const argName = "argName";
        
        // setup(() =>
        // {
            
        // });

        test("should throw InvalidArgumentException if func returns false and reason is null", () =>
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

        test("should throw InvalidArgumentException if func returns false and reason is undefined", () =>
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

        test("should throw InvalidArgumentException if func returns false and reason is empty string", () =>
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

        test("should throw InvalidArgumentException if func returns false and reason is whitespace string", () =>
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

        test("should throw ArgumentException if func returns false and reason is a valid string", () =>
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