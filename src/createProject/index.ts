import fs from "fs-extra";
import questions from "./questions";
import c from "picocolors";
import {downloadTemplate, getRootPath} from "../utils";

interface ICreateProjectOptions {
  projectName: string
  repository?: string
}

/**
 * 创建项目
 * @param options
 */
async function createProject(options: ICreateProjectOptions) {
  const answer = await questions(options.projectName)
  const {projectName} = answer
  if (fs.pathExistsSync(getRootPath(projectName))) {
    console.log(c.red(`${projectName} 文件夹已存在！！！`))
    return
  }
  // 克隆项目
  const repository = options.repository || 'qiuyongjin/template-npm'
  downloadTemplate(repository, projectName).catch(error => {
    console.log(c.red(error.message))
  })
// 2. 创建 index.js
// 3. 创建 package.json
// 4. 安装依赖
}

export default createProject
