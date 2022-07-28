import {tryRequire} from "./utils";
import {program} from "commander";
import {version} from "../package.json";
import createProject from "./createProject";
import uniappAction from "./uniapp";
import process from "process";

function init() {
  program
    .version(version)

  /**
   * 创建项目
   */
  program
    .command('create <project-name>')
    .description('创建新项目')
    .option('-r,--repository <repository>', '项目模板仓库，举例：qiuyongjin/template-npm')
    .action((projectName, options) => createProject({projectName, ...options}))

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
}

function loadConfig(config: any) {
  const {command} = config
  command.map((item: any) => {
    program
      .command(item.cmd)
      .description(item.description)
      // .option(item.option[0].flags)
      .action((testValue) => item.action(testValue))
  })
}

async function speedup(rootDir: string) {
  init()
  const extend = process.env["SPEEDUP_EXTEND"]
  if (extend) {
    const buildConfig: any = tryRequire(extend, rootDir) || {}
    loadConfig(buildConfig)
  } else {
    console.log(`没有指定功能扩展！！！`)
  }
  program.parse(process.argv)
}

export {
  speedup
}
