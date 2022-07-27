import {program} from "commander";
import process from "process";
import {version} from '../package.json'
import createProject from "./createProject";

program
  .version(version)

/**
 * 创建项目
 */
program
  .command('create <project-name>')
  .description('创建新项目')
  .action((projectName: string) => createProject(projectName))

program.parse(process.argv)
