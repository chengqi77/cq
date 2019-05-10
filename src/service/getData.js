import { IPcas, IPportal, fetch, post, put, postConfig } from './http.js';

// export const BASICURL = IPadmin;
// export const uploadPic = data => post('', data);

// getUserInfo
export const demandCardSave = (data) => post('/demandCard/save?',data);


export const getmemberAccount = (data) => fetch('member/find/agent/account',data);
