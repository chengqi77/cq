import env from '../../build/env';
// let productionUrl = 'http://132.232.142.46:8101';
let productionUrl = 'http://192.168.1.248:8082/out-user-sys-background/';
 let developmentUrl = 'http://192.168.1.248:8082/out-user-sys-background/';

//  let productionUrl = 'http://192.168.2.222:8081/agentApi';
//  let developmentUrl = 'http://192.168.2.222:8081/agentApi';

// let developmentUrl = 'http://admin.biteast.pro:8081/agentApi';
const baseURL = {
    // portal系统服务器地址
    portal: env === 'development' ?
        productionUrl : productionUrl,
    cas: env === 'development' ?
        productionUrl : productionUrl,
    // admin服务器地址
    admin: env === 'development' ?
        developmentUrl : productionUrl
};
export default baseURL;