import * as assert from "assert";
import given from "../src/index";
import "n-ext";
import { Exception, ArgumentException, ArgumentNullException } from "n-exception";

suite("Replace me", () =>
{
    suite("given", () =>
    {
        let arg: string;
        let argName: any;
        let exceptionHappend: boolean;
        let exceptionType: string;
        
        setup(() =>
        {
            arg = "arg";
            argName = null;
            exceptionHappend = false;
            exceptionType

            try 
            {
                given(arg, argName);
            }
            catch (exp)
            {
                exceptionHappend = true;
                exceptionType = (<Object>exp).getTypeName();
            } 
        });
        
        test("should throw an ArgumentNullException if argName (second arg) is null", () => 
        {
            
            
            assert.strictEqual(exceptionHappend, true);
            assert.strictEqual(exceptionType, "ArgumentNullException");
        });
        
        test("should throw an ArgumentNullException if argName (second arg) is undefined");
        test("should throw an ArgumentNullException if argName (second arg) is an empty string");
        test("should throw an ArgumentNullException if argName (second arg) is an whitespace string");
        test("given should return an Ensurer object");
    });
    
    suite("ensureHasValue", () => 
    {
        test("should throw ArgumentNullException if arg is null");
        test("should throw ArgumentNullException if arg is undefined");
        test("should not throw any exceptions if arg has value");
    });
    
    suite("ensure", () =>
    {
        test("should throw ArgumentNullException if func is null");
        test("should throw ArgumentNullException if func is undefined");
        test("should throw InvalidArgumentException if func returns false");
        test("should not throw any exceptions if the func returns true");
    });
    
    suite("ensure with reason", () =>
    {
        test("should throw ArgumentException if func returns false and reason is null");
        test("should throw ArgumentException if func returns false and reason is undefined");
        test("should throw ArgumentException if func returns false and reason is empty string");
        test("should throw ArgumentException if func returns false and reason is whitespace string");
        test("should throw InvalidArgumentException if func returns false and reason is a valid string");
    });
});