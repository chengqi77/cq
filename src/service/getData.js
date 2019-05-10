import { IPcas, IPportal, fetch, post, put, postConfig } from './http.js';

// export const BASICURL = IPadmin;
// export const uploadPic = data => post('', data);

// 新建需求单
export const demandCardSave = (data) => post('/demandCard/save', data);

//需求列表详情
export const getById = (id) => fetch(`/demandCard/getById?id=${id}`);
// http://127.0.0.1:8082/out-user-sys-background
//需求号搜索
export const serialNumber = (data) => fetch('/demandCard/getSerialNums',data);

export const getmemberAccount = (data) => fetch('member/find/agent/account', data);

//获取需求列表
export const getDemandList = (params) => fetch('demandCard/getList', params);
