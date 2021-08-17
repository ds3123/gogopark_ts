import React from "react" ;


/* @ 洗美頁  */

interface IService {

    Service_isLoading           : boolean ; // 洗美頁資料 _ 是否下載中
    current_Create_Service_Type : string ;  // 目前新增 _ 服務付費類別 ( Ex. 初次洗澡優惠、單次洗澡、單次美容 )

}

const initState = {

    Service_isLoading           : true ,
    current_Create_Service_Type : ''

} ;


const reducer_Customer = ( state : IService = initState , action : any ) => {


    switch( action.type ){

        // # 設定 _ 洗美頁資料 : 是否下載中
        case  "SET_SERVICE_ISLOADING" : return { ...state , Service_isLoading : action.Service_isLoading } ;

        // # 設定 _ 目前新增 : 服務類別 ( Ex. 初次洗澡、單次洗澡、包月洗澡 ... )
        case  "SET_CURRENT_CREATE_SERVICE_TYPE" : return { ...state , current_Create_Service_Type : action.serviceType } ;

        default : return state ;

    }




} ;

export default reducer_Customer ;
