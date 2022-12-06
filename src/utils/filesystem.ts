import { promises as fs } from 'fs';
import { join } from 'path';
import YAML from 'yaml';
import { cleanPath } from './helpers';

const shell = require('shelljs');

type UpdatePackageJsonName = {
  name: string;
  path: string;
  scope: string;
};
export const updatePackageJsonName = async ({
  name,
  path,
  scope,
}: UpdatePackageJsonName) => {
  const packageJsonFilepath = join(path, 'package.json');
  const newPackage = require(packageJsonFilepath);
  newPackage.name = `${scope ? `${scope}/` : ''}${name}`;
  await fs.writeFile(
    packageJsonFilepath,
    JSON.stringify(newPackage, null, 2),
    'utf-8',
  );
};

export const updateServerlessService = async ({
  name,
  path,
}: Omit<UpdatePackageJsonName, 'scope'>) => {
  const slsFilepath = join(path, 'serverless.yml');
  const sls = await fs.readFile(slsFilepath, 'utf8');
  const yml = YAML.parse(sls);
  yml.service = name;
  await fs.writeFile(slsFilepath, YAML.stringify(yml));
};

type CopyTemplate = {
  endpointPath: string;
  templatePath: string;
};

export const copyTemplate = async ({
  endpointPath,
  templatePath,
}: CopyTemplate) => {
  console.log(endpointPath, templatePath);
  const cwd = shell.exec('pwd').trim();

  const templateData = await fs.readFile(templatePath, 'utf8');
  const fullEndpointPath = cleanPath(`${cwd}/src/endpoints/${endpointPath}.ts`);
  const pathParts = fullEndpointPath.split('/');
  shell.exec(`mkdir -p ${pathParts.slice(0, -1).join('/')}`);
  await fs.writeFile(fullEndpointPath, templateData, 'utf8');
};

type AddServerlessEndpoint = {
  cors: boolean;
  endpointPath: string;
  method: string;
};

export const addServerlessEndpoint = async ({
  cors,
  endpointPath,
  method,
}: AddServerlessEndpoint) => {
  const cwd = shell.exec('pwd').trim();
  const packageJsonFilepath = join(cwd, 'package.json');
  const endpointPathParts = endpointPath.split('/');
  const endpointName = endpointPathParts.slice(-1)[0];
  const slsFilepath = join(cwd, 'serverless.yml');
  const sls = await fs.readFile(slsFilepath, 'utf8');
  const yml = YAML.parse(sls);

  console.log('cors', cors, method);

  yml.functions[endpointName] = {
    handler: cleanPath(`dist/endpoints/${endpointPath}.handler`),
    package: {
      patterns: [cleanPath(`dist/endpoints/${endpointPath}.js`)],
    },
    events: [
      {
        http: {
          path: cleanPath(`/${endpointPath}`),
          method,
          ...(cors ? { cors: true } : null),
        },
      },
    ],
  };

  await fs.writeFile(slsFilepath, YAML.stringify(yml));
};
