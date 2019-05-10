import request from '../utils/request'


// 获取用户列表
const getUserList = (params) => {
    return request({
      method: 'get',
      url: 'http://192.168.1.7:8082/out-user-sys-background/user/getUserList',
      params: params
    })
}

export default {
    getUserList
}