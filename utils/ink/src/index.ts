#!/usr/bin/env node

const app = require("commander");
const { addModule } = require("./commands/add-module");

switch (process.argv[2]) {
  case "add-module":
    app.version("1.0.0").action(addModule).parse(process.argv);
    break;
}
