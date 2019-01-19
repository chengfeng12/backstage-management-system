// 格式化地址
export function param2Obj (url) {
  // console.log('格式化地址==========')
  // console.log(url)
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  // 是为了把传递的数据给切割成一个对象，去掉不相关的字符
  return JSON.parse(
    // decodeURIComponent 表示给定编码的统一资源标识符（URI）组件的解码版本的新字符串。
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  )
}
