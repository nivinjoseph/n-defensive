"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../src/index");
require("n-ext");
suite("replace me with something", function () {
    test("replace me with something else", function () {
        var val = "cc";
        index_1.default(val, "val").ensureHasValue().ensure(function (t) { return !t.isEmptyOrWhiteSpace(); });
    });
});
//# sourceMappingURL=index.test.js.map