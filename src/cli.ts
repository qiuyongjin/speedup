import {program} from "commander";
import process from "process";
import {version} from '../package.json'
import createProject from "./createProject";
import uniappAction from "./uniapp";

program
  .version(version)

/**
 * 创建项目
 */
program
  .command('create <project-name>')
  .description('创建新项目')
  .action((projectName: string) => createProject(projectName))

/**
 * uniapp 相关操作
 * -p: 创建页面的名称，会自动注册路由
 * -c: 创建组件的名称
 * -r: 是否移除页面（会自动移除路由）或组件
 */
program
  .command('uniapp')
  .option('-p,--page-name <page-name>', '页面名称')
  .option('-c,--component-name <component-name>', '组件名称')
  .option('-r,--remove', '是否移除页面或者组件', false)
  .description('uniapp 相关操作')
  .action((options) => uniappAction(options))

program.parse(process.argv)
