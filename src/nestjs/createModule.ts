import fs from "fs-extra";
import ejs from "ejs";
import {CLI_DIR} from "../filePath";
import {formatCode} from "../utils";
import {camelCase, paramCase} from "change-case";

// 创建 xxx.module.ts 文件
export default (moduleDir: string, moduleName: string) => {
  const content = fs.readFileSync(`${CLI_DIR}/template/ejs/nestjs/module.ejs`)
  const data = {
    moduleName,
    // 参数风格 xxx-xxx
    moduleNameOfParam: paramCase(moduleName),
    // 驼峰风格 xxxXxx
    moduleNameOfCamel: camelCase(moduleName)
  }
  const processedCode = ejs.render(content.toString(), data)
  const formatFile = formatCode(processedCode)
  const controllerFilePath = `${moduleDir}/${paramCase(moduleName)}.module.ts`
  fs.ensureFileSync(controllerFilePath)
  fs.writeFileSync(controllerFilePath, formatFile)
}
