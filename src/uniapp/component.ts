import fs from 'fs-extra'
import c from 'picocolors'
import {CLI_DIR, PROJECT_DIR} from '../utils/filePath'
import {hyphenate} from '../utils'

const COMPONENTS_TEMPLATE_PATH = `${CLI_DIR}/template/uniapp/component`
const COMPONENTS_PATH = `${PROJECT_DIR}/src/components`
let COMPONENT_NAME = ''

export async function createComponent(componentName: string) {
  COMPONENT_NAME = componentName.replace(/^\S/, s => s.toUpperCase())
  const componentFilePath = `${COMPONENTS_PATH}/${COMPONENT_NAME}/${COMPONENT_NAME}.vue`
  // 确保目录存在
  fs.ensureDirSync(`${COMPONENTS_PATH}/${COMPONENT_NAME}`)
  if (fs.pathExistsSync(componentFilePath)) {
    console.log(c.red(`组件已存在: ${componentFilePath}`))
    return
  }
  const template = fs.readFileSync(COMPONENTS_TEMPLATE_PATH, 'utf-8')
    .replaceAll('{{component-name}}', hyphenate(componentName))
  fs.writeFileSync(componentFilePath, template)
  console.log(`组件创建完成: ${componentFilePath}`)
}

// 移除组件
export function removeComponent(componentName: string) {
  COMPONENT_NAME = componentName.replace(/^\S/, s => s.toUpperCase())
  const componentFilePath = `${COMPONENTS_PATH}/${COMPONENT_NAME}`
  fs.removeSync(componentFilePath)
  console.log(`已移除 ${COMPONENT_NAME} 组件`)
}
