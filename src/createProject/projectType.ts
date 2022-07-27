import projectTypeList from "./projectTypeList";

export default () => {
  return {
    type: 'list',
    name: 'projectType',
    message: '请选择项目类型',
    choices: projectTypeList
  }
}
