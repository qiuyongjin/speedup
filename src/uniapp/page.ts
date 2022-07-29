import fs from 'fs-extra'
import c from 'picocolors'
import inquirer from 'inquirer'
import {toHyphenate} from '../utils'
import {
  CLI_DIR,
  PROJECT_DIR,
  UNIAPP_PAGES_JSON_TEMPLATE,
  UNIAPP_PAGES_JSON
} from '../filePath'

const PAGE_DIR = '/src/pages/'
const pagesJsonFilePath = PROJECT_DIR + '/src/pages.json'
let PAGE_NAME = ''

interface IRouteItem {
  path: string
}

// 注册页面路由
function updatePagesJsonFile() {
  // pages.json 文件不存在
  if (!fs.pathExistsSync(pagesJsonFilePath)) {
    inquirer.prompt({
      type: 'confirm',
      name: 'isCreatePagesJson',
      message: `pages.json 文件不存在是否创建？`,
    }).then(({isCreatePagesJson}) => {
      if (isCreatePagesJson) {
        console.log('创建 pages.json 文件')
        fs.copySync(UNIAPP_PAGES_JSON_TEMPLATE, UNIAPP_PAGES_JSON)
        fn()
      }
    }).catch(error => {
      console.log(c.red(error))
    })
  } else {
    fn()
  }


  function fn() {
    const pagesJsonContent = fs.readJsonSync(pagesJsonFilePath)
    const {pages} = pagesJsonContent
    const path = `pages/${PAGE_NAME}/index`
    const pagePathIndex = pages.findIndex((page: IRouteItem) => page.path === path)
    // pages.json 已注册了页面路由
    if (pagePathIndex > -1) {
      console.log(c.red(`${PAGE_NAME} 页面路由已存在`))
      return
    }
    // 添加路由
    pages.push({
      'path': `pages/${PAGE_NAME}/index`,
      'style': {
        'navigationBarTitleText': `${PAGE_NAME}`
      }
    })
    pagesJsonContent['pages'] = pages
    fs.writeJsonSync(pagesJsonFilePath, pagesJsonContent, {spaces: 2})
    console.log('页面路由注册成功')
  }
}

function setPageName(pageName: string) {
  PAGE_NAME = pageName
}

// 创建页面
export async function createPage(pageName: string) {
  setPageName(pageName)
  const pageDir = `${PROJECT_DIR}${PAGE_DIR}${PAGE_NAME}`
  const file = `${pageDir}/index.vue`
  // if file existed.
  if (fs.pathExistsSync(file)) {
    console.log(c.red('页面文件已存在: ') + file)
    return
  }
  fs.mkdirpSync(pageDir)
  const templatePage = fs.readFileSync(`${CLI_DIR}/template/uniapp/page`, 'utf8').replaceAll('{{page-name}}', toHyphenate(PAGE_NAME))
  fs.writeFileSync(file, templatePage)
  console.log(`创建页面完成：${file}`)
  updatePagesJsonFile()
}

// 移除 pages.json 中注册的路由
function removePagesRoute() {
  if (!fs.pathExistsSync(pagesJsonFilePath)) return
  const pagesContent = fs.readJsonSync(pagesJsonFilePath)
  const {pages} = pagesContent
  const path = `pages/${PAGE_NAME}/index`
  const pagePathIndex = pages.findIndex((page: IRouteItem) => page.path === path)
  if (pagePathIndex < 0) {
    return
  }
  pages.splice(pagePathIndex, 1)
  pagesContent['pages'] = pages
  fs.writeJsonSync(pagesJsonFilePath, pagesContent, {spaces: 2})
}

// 移除 pages 文件中的页面目录
export function removePage(pageName: string) {
  setPageName(pageName)
  const pageDir = `${PROJECT_DIR}${PAGE_DIR}${PAGE_NAME}`
  fs.removeSync(pageDir)
  removePagesRoute()
  console.log(`页面文件和路由移除成功: ${PAGE_NAME}`)
}
