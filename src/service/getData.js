import { IPcas, IPportal, fetch, post, put, postConfig } from './http.js';

// export const BASICURL = IPadmin;
// export const uploadPic = data => post('', data);

// getUserInfo
export const demandCardSave = (data) => post('/demandCard/save', data);


export const getById = (id) => fetch(`/demandCard/getById?id=${id}`);
// http://127.0.0.1:8082/out-user-sys-background

export const serialNumber = (id) => fetch(`/demandCard/getSerialNums?serialNumber=${id}`);

export const getmemberAccount = (data) => fetch('member/find/agent/account', data);

//获取需求列表
export const getDemandList = (params) => fetch('demandCard/getList', params);
