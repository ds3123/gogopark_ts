
/*
*
* 實體化 axios 模組 --> 作為使用 axios 時，重複的配置
*
*/


import _axios from 'axios';

const axios = baseURL => {

    const instance = _axios.create({

        //baseURL : baseURL || 'http://localhost:3001',
        //baseURL : baseURL || 'http://localhost/API/gogopark/api',
        baseURL : baseURL || 'http://localhost/Laravel_Projects/gogopark/public/index.php/api' ,
        timeout : 3000  // ( 原先為 1000ms --> 設長點，避免出現錯誤 : Error: timeout of 1000ms exceeded )

    });

    return instance ;

};


// 不同狀況回傳 :
export { axios };         // 有參數 --> 使用
export default axios();   // 無參數 --> 預設直接