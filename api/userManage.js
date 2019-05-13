import request from '../utils/request'

const reqDeptListFn = () => {
  return request({
    method: 'get',
    url: 'static/data/deptList.json'
  })
}

// 获取人员的合计信息
const getTotalPersonnelNum = () => {
  return request({
    method: 'get',
    url: '/user/getUserNum',
    // url: 'static/data/total.json',
  })
}

// 获取下级部门信息
const getXjDeptListAndUser = (params) => {
  return request({
    method: 'get',
    url: 'dept/getXjDeptListAndUser',
    // url: 'data/filter.json',
    params: params
  })
}

// 获取上级部门信息
const getSjDeptListAndUser = (params) => {
  return request({
    method: 'get',
    url: 'dept/getSjDeptListAndUser',
    params: params
  })
}

export default {
  reqDeptListFn,
  getTotalPersonnelNum,
  getXjDeptListAndUser,
  getSjDeptListAndUser
}
