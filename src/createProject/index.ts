import fs from "fs-extra";
import questions from "./questions";
import {red} from "picocolors";
import {downloadTemplate, getRootPath} from "../utils";


/**
 * 创建项目
 * @param name {string} 项目名称
 */
async function createProject(name: string) {
  const answer = await questions(name)
  const {projectName} = answer
  if (fs.pathExistsSync(getRootPath(projectName))) {
    console.log(red(`${projectName} 文件夹已存在！！！`))
    return
  }
  // 克隆项目
  downloadTemplate('qiuyongjin/template-npm', projectName).catch(error => {
    console.log(red(error.message))
  })
// 2. 创建 index.js
// 3. 创建 package.json
// 4. 安装依赖
}

export default createProject
