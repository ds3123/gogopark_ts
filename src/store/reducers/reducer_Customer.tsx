import React from "react" ;


/* @ 客戶頁  */

interface ICustomer {

   // # 資料庫 _ 是否已有該客戶紀錄
   IsExisting_Customer   : boolean ;

   Current_Customer_Pets : any[] ;   // 目前 _ 客戶的所有寵物
   Customer_isLoading    : boolean ; // 客戶頁資料 _ 是否下載中

}

const initState = {

    IsExisting_Customer    : false ,

    Current_Customer_Pets  : [] ,
    Customer_isLoading     : true ,

} ;


const reducer_Customer = ( state : ICustomer = initState , action : any ) => {


    switch( action.type ){

        // # 設定 _ 是否已存在 : 客戶
        case  "SET_IS_EXISTING_CUSTOMER" : return { ...state , IsExisting_Customer : action.bool } ;

        // # 設定 _ 目前客戶的所有寵物
        case  "GET_CURRENT_CUSTOMER_PETS" : return { ...state , Current_Customer_Pets : action.cus_Pets } ;

        // # 設定 _ 客戶頁資料 _ 是否下載中
        case  "SET_CUSTOMER_ISLOADING" : return { ...state , Customer_isLoading : action.Customer_isLoading } ;

        default : return state ;

    }




} ;

export default reducer_Customer ;
