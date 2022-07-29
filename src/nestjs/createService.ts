import fs from "fs-extra";
import ejs from "ejs";
import {CLI_DIR} from "../utils/filePath";
import {formatCode} from "../utils";
import {paramCase} from "change-case";

// 创建 xxx.service.ts 文件
export default (moduleDir: string, moduleName: string) => {
  const content = fs.readFileSync(`${CLI_DIR}/src/nestjs/ejs/service.ejs`)
  const data = {
    moduleName
  }
  const processedCode = ejs.render(content.toString(), data)
  const formatFile = formatCode(processedCode)
  const serviceFilePath = `${moduleDir}/${paramCase(moduleName)}.service.ts`
  fs.ensureFileSync(serviceFilePath)
  fs.writeFileSync(serviceFilePath, formatFile)
}
