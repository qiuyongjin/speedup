import fs from "fs-extra";
import ejs from "ejs";
import {CLI_DIR} from "../filePath";
import {formatCode} from "../utils";
import {paramCase, snakeCase} from "change-case";

// 创建 create.xxx.dto.ts 文件
export default (moduleDir: string, moduleName: string) => {
  const createContent = fs.readFileSync(`${CLI_DIR}/template/ejs/nestjs/create.dto.ejs`)
  const updateContent = fs.readFileSync(`${CLI_DIR}/template/ejs/nestjs/update.dto.ejs`)
  const data = {
    moduleName,
    fileName: paramCase(moduleName),
    tableName: snakeCase(moduleName)
  }
  const createProcessedCode = ejs.render(createContent.toString(), data)
  const updateProcessedCode = ejs.render(updateContent.toString(), data)

  const createFormatFile = formatCode(createProcessedCode)
  const updateFormatFile = formatCode(updateProcessedCode)

  const createFilePath = `${moduleDir}/dto/create-${paramCase(moduleName)}.dto.ts`
  const updateFilePath = `${moduleDir}/dto/update-${paramCase(moduleName)}.dto.ts`

  fs.ensureFileSync(createFilePath)
  fs.ensureFileSync(updateFilePath)

  fs.writeFileSync(createFilePath, createFormatFile)
  fs.writeFileSync(updateFilePath, updateFormatFile)
}
