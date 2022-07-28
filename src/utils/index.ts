import * as path from "path";
import ora from "ora";
// @ts-ignore
import download from "download-git-repo";
import c from "picocolors";
import jiti from 'jiti'

export function tryRequire(id: string, rootDir: string = process.cwd()) {
  const _require = jiti(rootDir, {interopDefault: true})
  try {
    return _require(id)
  } catch (err: any) {
    if (err.code !== 'MODULE_NOT_FOUND') {
      console.error(`Error trying import ${id} from ${rootDir}`, err)
    }
    return {}
  }
}

export function hyphenate(str: string) {
  return str.replace(/\B([A-Z])/g, '-$1').toLowerCase()
}

function getRootPath(packageName: string): string {
  return path.resolve(process.cwd(), packageName)
}

export function downloadTemplate(repository: string, projectName: string) {
  const loading = ora('正在创建项目').start()
  return new Promise((resolve, reject) => {
    const path = getRootPath(projectName)
    download(repository, path, (err: any) => {
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
