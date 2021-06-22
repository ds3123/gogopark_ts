
/*
*
* 實體化 axios 模組 --> 作為使用 axios 時，重複的配置
*
*/


import _axios from 'axios';

// Heroku 安裝的 CorsAnywhere 套件網域 ( 為解決 Laravel 部署在 Heroku 上產生的 CORS 跨域問題  )
const cors = 'https://ds-proxy-cors.herokuapp.com/' ;

const axios = baseURL => {

    const instance = _axios.create({

        baseURL : baseURL || 'http://localhost/Laravel_Projects/gogopark/public/index.php/api' ,
        // baseURL : `${ cors }https://ds-gogopark.herokuapp.com/public/index.php/api` ,   // Heroku 空間
        timeout : 5000  // ( 原先為 1000ms --> 設長點，避免出現錯誤 : Error: timeout of 1000ms exceeded )

    });

    return instance ;

};


// 不同狀況回傳 :
export { axios };         // 有參數 --> 使用
export default axios();   // 無參數 --> 預設直接