import fs from "fs-extra";
import ejs from "ejs";
import {CLI_DIR} from "../utils/filePath";
import {formatCode} from "../utils";
import {paramCase} from "change-case";

// 创建 xxx.controller.ts 文件
export default (moduleDir: string, moduleName: string) => {
  const content = fs.readFileSync(`${CLI_DIR}/src/nestjs/controller.ejs`)
  const data = {
    moduleName
  }
  const processedCode = ejs.render(content.toString(), data)
  const formatFile = formatCode(processedCode)
  const controllerFilePath = `${moduleDir}/${paramCase(moduleName)}.controller.ts`
  fs.ensureFileSync(controllerFilePath)
  fs.writeFileSync(controllerFilePath, formatFile)
}
