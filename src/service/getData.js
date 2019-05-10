import { IPcas, IPportal, fetch, post, put, postConfig } from './http.js';

// export const BASICURL = IPadmin;
// export const uploadPic = data => post('', data);

// getUserInfo
export const demandCardSave = (data) => post('/demandCard/save', data);


export const getmemberAccount = (data) => fetch('member/find/agent/account', data);

//获取需求列表
export const getDemandList = (params) => fetch('demandCard/getList', params);
