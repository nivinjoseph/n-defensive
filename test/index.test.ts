import * as assert from "assert";
import given from "../src/index";
import "n-ext";

suite("replace me with something", () =>
{
    test("replace me with something else", () =>
    {
        let val = "";
        
        given(val, "val").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
    });
});