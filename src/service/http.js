import axios from 'axios';
import baseURL from './api';
import qs from 'qs';
import * as dd from 'dingtalk-jsapi';
export const IPportal = baseURL.portal;
export const IPcas = baseURL.cas;
export const IPadmin = (axios.defaults.baseURL = baseURL.admin);


// 计算url
function getUrl(url) { // 获取IP地址
    let part = url.split('//')
    let port = part[1].split('/')
    return `${port[1]}`
}

export const fetch = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        dd.ready(function () {
            dd.runtime.permission.requestAuthCode({
                corpId: 'ding987bfd433a256d77', // 企业id
                onSuccess: function (info) {
                    let code = info.code // 通过该免登授权码可以获取用户身份
                    console.log(params, 'params');
                    axios
                        .get(url, {
                            params: Object.assign(params, { code })
                        })
                        .then(response => {
                            resolve(response.data);
                        })
                        .catch(err => {
                            reject(err);
                        });
                }
            });
        });

    });
};

export const post = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        dd.ready(function () {
            dd.runtime.permission.requestAuthCode({
                corpId: 'ding987bfd433a256d77', // 企业id
                onSuccess: function (info) {
                    let code = info.code
                    const paramsUrl = `${url}?${qs.stringify(Object.assign(data, { code }))}`
                    axios
                        .post(
                        paramsUrl,
                        qs.stringify(data, {
                            arrayFormat: 'repeat'
                        })
                        )
                        .then(response => {
                            resolve(response.data);
                        })
                        .catch(err => {
                            reject(err);
                        });
                }
            });
        });
    });
};

export const patch = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        axios
            .patch(
            url,
            qs.stringify(data, {
                arrayFormat: 'repeat'
            })
            )
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export const put = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        axios
            .put(url, qs.stringify(data))
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export const postConfig = (url, data = {}, config) => {
    return new Promise((resolve, reject) => {
        axios
            .post(url, data, config)
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
};
