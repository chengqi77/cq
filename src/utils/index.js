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
  str = str || ''
    //去掉所有的html标记
    return str.replace(/<[^>]+>/g,"");
}
export function delBrTag(str)
{str = str || ''
    //去掉所有的html标记
    return str.replace(/<br(\s)*\/>/g,"");
}

export function split(str='',n)
{
    const s = String(str);
    if(s.length > n){
      return s.substring(0,n);
    }else{
      return s;
    }
}