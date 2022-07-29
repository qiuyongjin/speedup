import {dirname, resolve} from 'path'
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 当前执行命令的目录
const CLI_DIR = resolve(__dirname, '..')
const PROJECT_DIR = process.cwd()
// 在项目中的 pages.json 文件路径
const UNIAPP_PAGES_JSON = PROJECT_DIR + '/src/pages.json'
// uniapp pages.json 模板文件路径
const UNIAPP_PAGES_JSON_TEMPLATE = getUniappTemplatePathByFileName('pages.json')

// 按文件名获取 Uniapp 模板路径
function getUniappTemplatePathByFileName(fileName: string) {
  return CLI_DIR + '/template/uniapp/' + fileName
}

export {
  CLI_DIR,
  PROJECT_DIR,
  UNIAPP_PAGES_JSON,
  UNIAPP_PAGES_JSON_TEMPLATE
}
