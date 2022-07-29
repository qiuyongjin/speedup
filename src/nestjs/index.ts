import fs from "fs-extra";
import c from "picocolors";
import {PROJECT_DIR} from "../utils/filePath";
import createController from "./createController";
import {paramCase, pascalCase} from "change-case";
import createService from "./createService";
import createModule from "./createModule";
import createEntity from "./createEntity";
import createDto from "./createDto";

let moduleName = ''
let moduleDir = ''

interface INestjsActionOption {
  remove: boolean,
  module: string,
}

function createModuleDir() {
  // 判断模块是否存在
  if (fs.pathExistsSync(moduleDir)) {
    console.log(c.red(`${moduleName} 模块已存在`))
    return false
  }
  console.log(`【${moduleName}】:${c.cyan('正在创建模块')}`)
  // 创建 xxx.controller.ts 文件
  createController(moduleDir, moduleName)
  // 创建 xxx.module.ts 文件
  createModule(moduleDir, moduleName)
  // 创建 xxx.service.ts 文件
  createService(moduleDir, moduleName)

// 创建dto文件
  createDto(moduleDir, moduleName)
  createEntity(moduleDir, moduleName)
  return true
}


export default async function nestjsAction(options: INestjsActionOption) {
  const {module} = options
  // 判断目录是否操作
  moduleName = pascalCase(module)
  moduleDir = `${PROJECT_DIR}/src/modules/${paramCase(moduleName)}`
  if (createModuleDir()) {
    console.log(`【${moduleName}】:${c.cyan('模块创建完成')}`)
    console.log(c.cyan(moduleDir))
  }
}
