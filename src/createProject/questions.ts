import inquirer from "inquirer";
import packageName from "./packageName";
import projectType from "./projectType";

export default (defaultName: string) => {
  return inquirer.prompt([
    packageName(defaultName),
    projectType()
    // port(),
    // middleware(),
  ]);
};

