import { promises as fs } from "fs";
import { join } from "path";
import YAML from "yaml";

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
  const packageJsonFilepath = join(path, "package.json");
  const newPackage = require(packageJsonFilepath);
  newPackage.name = `${scope ? `${scope}/` : ""}${name}`;
  await fs.writeFile(
    packageJsonFilepath,
    JSON.stringify(newPackage, null, 2),
    "utf-8"
  );
};

export const updateServerlessService = async ({
  name,
  path,
}: Omit<UpdatePackageJsonName, "scope">) => {
  const slsFilepath = join(path, "serverless.yml");
  const sls = await fs.readFile(slsFilepath, "utf8");
  const yml = YAML.parse(sls);
  yml.service = name;
  await fs.writeFile(slsFilepath, YAML.stringify(yml));
};
