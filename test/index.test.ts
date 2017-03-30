import * as assert from "assert";
import given from "../src/index";
import "n-ext";
import { Exception, ArgumentException, ArgumentNullException} from "n-exception";

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