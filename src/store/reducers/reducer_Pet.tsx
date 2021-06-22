

import React from "react" ;


/* @ 寵物頁  */

interface ICustomer {

    Pet_isLoading : boolean ; // 客戶頁資料 _ 是否下載中

}

const initState = {

    Pet_isLoading : true ,

} ;


const reducer_Pet = ( state : ICustomer = initState , action : any ) => {


    switch( action.type ){

        // # 設定 _ 寵物頁資料 _ 是否下載中
        case  "SET_PET_ISLOADING" : return { ...state , Pet_isLoading : action.Pet_isLoading } ;

        default : return state ;

    }



} ;

export default reducer_Pet ;
