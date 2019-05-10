import axios from 'axios';
import baseURL from './api';
import qs from 'qs';
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
        axios
            .get(url, {
                params: params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export const post = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        const paramsUrl =  `${url}?${qs.stringify(data)}`
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
