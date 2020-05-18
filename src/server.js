"use strict";
exports.__esModule = true;
var express_1 = require("express");
var app = express_1["default"]();
app.get("/", function (req, res) { return res.json({ message: "Hello world!" }); });
app.listen(3333, function () {
    console.log("Listing port 3333 \u231A");
});
