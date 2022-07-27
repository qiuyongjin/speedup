import * as path from "path";
import ora from "ora";
import clone from "git-clone";
import c from "picocolors";

export function hyphenate(str: string) {
  return str.replace(/\B([A-Z])/g, '-$1').toLowerCase()
}

function getRootPath(packageName: string): string {
  return path.resolve(process.cwd(), packageName)
}

export function downloadTemplate(repository: string, projectName: string) {
  const loading = ora('正在创建项目').start()
  return new Promise((resolve, reject) => {
    const repo = `git@github.com:${repository}.git`
    const path = getRootPath(projectName)
    clone(repo, path, {shallow: true}, function (err: any) {
      if (err) {
        loading.fail(c.red('模版下载失败，请重试'))
        reject(err)
      } else {
        loading.succeed()
        console.log('')
        console.log(`cd ${projectName}`)
        console.log(`pnpm install`)
        console.log('')
        resolve('ok')
      }
    })
  })
}

export {
  getRootPath
}
