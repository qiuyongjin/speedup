import fs from "fs-extra";
import ejs from "ejs";
import {CLI_DIR} from "../utils/filePath";
import {formatCode} from "../utils";
import {paramCase, snakeCase} from "change-case";

// 创建 xxx.entity.ts 文件
export default (moduleDir: string, moduleName: string) => {
  const content = fs.readFileSync(`${CLI_DIR}/src/nestjs/ejs/entity.ejs`)
  const data = {
    moduleName,
    tableName: snakeCase(moduleName)
  }
  const processedCode = ejs.render(content.toString(), data)
  const formatFile = formatCode(processedCode)
  const serviceFilePath = `${moduleDir}/entities/${paramCase(moduleName)}.entity.ts`
  fs.ensureFileSync(serviceFilePath)
  fs.writeFileSync(serviceFilePath, formatFile)
}
