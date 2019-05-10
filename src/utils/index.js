/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}
export function delHtmlTag(str)
{
    //去掉所有的html标记
    return str.replace(/<[^>]+>/g,"");
}
export function delBrTag(str)
{
    //去掉所有的html标记
    return str.replace(/<br(\s)*\/>/g,"");
}