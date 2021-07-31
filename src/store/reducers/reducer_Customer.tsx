import React from "react" ;


/* @ 客戶頁  */

interface ICustomer {

   IsExisting_Customer    : boolean ; // 資料庫 _ 是否已有該客戶紀錄

   IsQuerying_Customer_ID : boolean ; // 是否正在輸入 _ 身分證字號欄位

   Has_Bath_Records       : boolean ; // 客戶 _ 是否有洗澡單紀錄 ( 資料表 : bath )   for 判斷是否為 "初次洗澡"
   Customer_Plans_Records : any[] ;   // 客戶 _ 方案與其使用紀錄

   Current_Customer_Pets  : any[] ;   // 目前 _ 客戶的所有寵物
   Customer_isLoading     : boolean ; // 客戶頁資料 _ 是否下載中

}

const initState = {

    IsExisting_Customer    : false ,

    IsQuerying_Customer_ID : false ,
    Has_Bath_Records       : false ,
    Customer_Plans_Records : [] ,

    Current_Customer_Pets  : [] ,
    Customer_isLoading     : true ,

} ;


const reducer_Customer = ( state : ICustomer = initState , action : any ) => {


    switch( action.type ){

        // # 設定 _ 是否已存在 : 客戶
        case  "SET_IS_EXISTING_CUSTOMER" : return { ...state , IsExisting_Customer : action.bool } ;

        // # 設定 _ 是否正在輸入 _ 身分證字號欄位
        case  "SET_IS_QUERYING_CUSTOMER_ID" : return { ...state , IsQuerying_Customer_ID : action.bool } ;

        // # 設定 _ 該客戶，是否有洗澡單紀錄 ( for 判斷是否為 "初次洗澡" )
        case  "SET_HAS_BATH_RECORDS" : return { ...state , Has_Bath_Records : action.bool } ;

        // # 設定 _ 該客戶，是否有購買方案，如 : 包月洗澡、美容 ( for 決定 _ 是否能使用、還可以使用幾次 )
        case  "SET_CUSTOMER_PLANS_RECORDS" : return { ...state , Customer_Plans_Records : action.Customer_Plans_Records } ;

        // # 取得 _ 目前客戶的所有寵物 ( 依照身分證字號 )
        case  "GET_CURRENT_CUSTOMER_PETS" : return { ...state , Current_Customer_Pets : action.cus_Pets } ;

        // # 設定 _ 目前客戶的所有寵物
        case  "SET_CURRENT_CUSTOMER_PETS" : return { ...state , Current_Customer_Pets : action.cus_Pets } ;

        // # 設定 _ 客戶頁資料 _ 是否下載中
        case  "SET_CUSTOMER_ISLOADING" : return { ...state , Customer_isLoading : action.Customer_isLoading } ;

        default : return state ;

    }

} ;

export default reducer_Customer ;
