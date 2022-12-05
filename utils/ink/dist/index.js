#!/usr/bin/env node
"use strict";
var app = require("commander");
var addModule = require("./commands/add-module").addModule;
switch (process.argv[2]) {
    case "add-module":
        app.version("1.0.0").action(addModule).parse(process.argv);
        break;
}
