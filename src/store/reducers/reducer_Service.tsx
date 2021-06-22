import React from "react" ;


/* @ 洗美頁  */

interface ICustomer {

    Service_isLoading : boolean ; // 洗美頁資料 _ 是否下載中

}

const initState = {

    Service_isLoading : true ,

} ;


const reducer_Customer = ( state : ICustomer = initState , action : any ) => {


    switch( action.type ){

        // # 設定 _ 洗美頁資料 _ 是否下載中
        case  "SET_SERVICE_ISLOADING" : return { ...state , Service_isLoading : action.Service_isLoading } ;

        default : return state ;

    }




} ;

export default reducer_Customer ;
