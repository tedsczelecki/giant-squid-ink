import { addServerlessEndpoint, copyTemplate } from '../utils/filesystem';
import path from 'path';

const inquirer = require('inquirer');
const shell = require('shelljs');

export const addEndpoint = async () => {
  const cwd = shell.exec('pwd').trim();
  const defaultMethod = 'get';
  const defaultCors = 'y';
  let cors = defaultCors;

  const { endpoint } = await inquirer.prompt([
    { type: 'input', name: 'endpoint', message: 'Endpoint path:' },
  ]);

  const { method } = await inquirer.prompt([
    {
      type: 'input',
      name: 'method',
      message: `Endpoint http method [${defaultMethod}]:`,
    },
  ]);

  if (method === 'post') {
    const { cors: answeredCors } = await inquirer.prompt([
      { type: 'input', name: 'cors', message: `Enable cors [${cors}]:` },
    ]);

    cors = answeredCors || defaultCors;
  }

  await copyTemplate({
    endpointPath: endpoint,
    templatePath: path.join(
      __dirname,
      '../../templates/new-endpoint-handler.ts',
    ),
  });

  console.log('CORS', cors, method);

  await addServerlessEndpoint({
    cors: cors === 'y',
    endpointPath: endpoint,
    method: method ?? defaultMethod,
  });
};
