import request from '../utils/request'

// 请求 首页列表 数据
const reqHomeFilterList = () => {
  return request( {
    method: 'get',
    url: 'static/data/homeFilterList.json'
  }) ;
}

// 请求 首页列表 数据
const reqPersonList = () => {
  return request( {
    method: 'get',
    url: '/data/personList.json'
  }) ;
}

const reqDeptPersonList = () => {
  return request( {
    method: 'get',
    url: '/data/deptPerList.json'
  }) ;
}

const reqSearchPersonList = () => {
  return request( {
    method: 'get',
    url: '/data/searchPersonList.json'
  }) ;
}

const searchUser = () => {
  return request({
    method: 'get',
    url: ''
  })
}

export default {
  searchUser,
  reqHomeFilterList,
  reqPersonList,
  reqDeptPersonList,
  reqSearchPersonList
}
