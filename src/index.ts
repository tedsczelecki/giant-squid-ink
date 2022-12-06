#!/usr/bin/env node

import { addEndpoint } from './commands/add-endpoint';
import { addPackage } from './commands/add-package';

const app = require('commander').version('1.0.0');

switch (process.argv[2]) {
  case 'add-package':
    app.action(addPackage).parse(process.argv);
    break;
  case 'add-endpoint':
    app.action(addEndpoint).parse(process.argv);
    break;
}
