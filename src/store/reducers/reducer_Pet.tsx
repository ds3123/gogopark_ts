
import React from "react" ;


/* @ 寵物頁  */
interface ICustomer {

    IsExisting_Pet : boolean ; // 資料庫 _ 是否已有該寵物紀錄
    Pet_isLoading  : boolean ; // 客戶頁資料 _ 是否下載中

}

const initState = {

    IsExisting_Pet : false ,
    Pet_isLoading  : true ,

} ;


const reducer_Pet = ( state : ICustomer = initState , action : any ) => {

    switch( action.type ){

        // # 設定 _ 是否 : 資料庫已存在寵物
        case  "SET_IS_EXISTING_PET" : return { ...state , IsExisting_Pet : action.IsExisting_Pet } ;

        // # 設定 _ 寵物頁資料 _ 是否下載中
        case  "SET_PET_ISLOADING" : return { ...state , Pet_isLoading : action.Pet_isLoading } ;

        default : return state ;

    }


} ;

export default reducer_Pet ;
