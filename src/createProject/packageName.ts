export default (defaultName: string) => {
  return {
    type: 'input',
    name: 'projectName',
    default: defaultName || '',
    message: '请输入项目名称'
  }
}
