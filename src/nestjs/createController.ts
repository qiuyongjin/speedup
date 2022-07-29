import fs from "fs-extra";
import ejs from "ejs";
import {CLI_DIR} from "../utils/filePath";
import {formatCode} from "../utils";
import {paramCase, camelCase} from "change-case";

// 创建 xxx.controller.ts 文件
export default (moduleDir: string, moduleName: string) => {
  const content = fs.readFileSync(`${CLI_DIR}/src/nestjs/ejs/controller.ejs`)
  const data = {
    moduleName,
    // 参数风格 xx-xx
    moduleNameOfParam: paramCase(moduleName),
    // 驼峰风格 XxXx
    moduleNameOfCamel: camelCase(moduleName)
  }
  const processedCode = ejs.render(content.toString(), data)
  const formatFile = formatCode(processedCode)
  const controllerFilePath = `${moduleDir}/${paramCase(moduleName)}.controller.ts`
  fs.ensureFileSync(controllerFilePath)
  fs.writeFileSync(controllerFilePath, formatFile)
}
