import {
  updatePackageJsonName,
  updateServerlessService,
} from "../utils/filesystem";

const inquirer = require("inquirer");
const shell = require("shelljs");

export const addModule = async () => {
  let defaultScope = "";
  const cwd = shell.exec("pwd").trim();
  try {
    const pkg = require(`${cwd}/package.json`);
    defaultScope = pkg.name.split("/")[0];
  } catch (e) {
    console.error("ERR?", e);
  }

  const scopeMessage = `Namespace [${defaultScope}]:`;

  const { scope } = await inquirer.prompt([
    { type: "input", name: "scope", message: scopeMessage },
  ]);
  const { name } = await inquirer.prompt([
    { type: "input", name: "name", message: "Package name:" },
  ]);
  const { path } = await inquirer.prompt([
    { type: "input", name: "path", message: "Package location [./packages]:" },
  ]);

  const resolvedScope = scope || defaultScope;
  const resolvedName = name;
  const resolvedPath = path || `${cwd}/packages`;

  const newModulePath = `${resolvedPath}/${resolvedName}`;

  shell.exec(`mkdir -p ${newModulePath}`);
  shell.exec(
    `git clone git@github.com:tedsczelecki/typescript-serverless-boilerplate.git ${newModulePath}`
  );
  shell.exec(`rm -rf ${newModulePath}/.git`);

  await updatePackageJsonName({
    path: newModulePath,
    name: resolvedName,
    scope: resolvedScope,
  });

  await updateServerlessService({
    path: newModulePath,
    name: resolvedName,
  });
};
