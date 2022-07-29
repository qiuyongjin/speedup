import fs from "fs-extra";
import c from "picocolors";
import {PROJECT_DIR} from "../utils/filePath";
import createController from "./createController";
import {paramCase, pascalCase} from "change-case";
import createService from "./createService";

let moduleName = ''
let moduleDir = ''

interface INestjsActionOption {
  remove: boolean,
  module: string,
}

function createModuleDir() {
  console.log(moduleDir)
  // 判断模块是否存在
  if (fs.pathExistsSync(moduleDir)) {
    console.log(c.red(`${moduleName} 模块已存在`))
    return false
  }
  console.log('正在创建模块...')
  // 创建 xxx.controller.ts 文件
  createController(moduleDir, moduleName)
  // 创建 xxx.module.ts 文件
  // fs.ensureFileSync(`${moduleDir}/${moduleName}.module.ts`)
  // 创建 xxx.service.ts 文件
  createService(moduleDir, moduleName)

  createDto()
  createEntities(moduleDir)
  return true
}

// 创建dto文件
function createDto() {
  fs.ensureFileSync(`${moduleDir}/dto/create-${moduleName}.dto.ts`)
  fs.ensureFileSync(`${moduleDir}/dto/update-${moduleName}.dto.ts`)
}

function createEntities(moduleDir: string) {
  fs.ensureFileSync(`${moduleDir}/entities/${moduleName}.entity.ts`)
}

export default async function nestjsAction(options: INestjsActionOption) {
  const {module} = options
  // 判断目录是否操作
  moduleName = pascalCase(module)
  moduleDir = `${PROJECT_DIR}/src/modules/${paramCase(moduleName)}`
  if (createModuleDir()) {
    console.log('模块创建完成')
  }
}
