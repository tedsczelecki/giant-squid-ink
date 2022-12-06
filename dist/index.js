#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var add_endpoint_1 = require("./commands/add-endpoint");
var add_package_1 = require("./commands/add-package");
var app = require('commander').version('1.0.0');
switch (process.argv[2]) {
    case 'add-package':
        app.action(add_package_1.addPackage).parse(process.argv);
        break;
    case 'add-endpoint':
        app.action(add_endpoint_1.addEndpoint).parse(process.argv);
        break;
}
