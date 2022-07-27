import {createPage, removePage} from "./page";
import {createComponent, removeComponent} from "./component";

interface IUniAppActionOption {
  remove: boolean,
  componentName?: string,
  pageName?: string,
}

export default async function uniappAction(options: IUniAppActionOption) {
  const {pageName, componentName, remove} = options

  // 移除页面或者组件操作
  if (remove) {
    pageName && removePage(pageName)
    // 创建组件
    componentName && removeComponent(componentName)
  } else {
    // 创建组件
    componentName && await createComponent(componentName)
    // 创建页面，并且注册路由
    pageName && await createPage(pageName)
  }
}
