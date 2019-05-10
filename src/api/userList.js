import request from '../utils/request'


// 获取用户列表
const getUserList = (params) => {
    return request({
      method: 'get',
      url: '/user/getUserList',
      params: params
    })
}

export default {
    getUserList
}