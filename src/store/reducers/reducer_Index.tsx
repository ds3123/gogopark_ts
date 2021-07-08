import React from "react" ;


/* @ 首頁  */
interface IIndex {

    Index_isLoading : boolean ;  // 首頁資料 _ 是否下載中
    is_Detail_Mode  : boolean ;  // 首頁詳細模式 ( 展開所有統計資料 )
}

const initState = {

    Index_isLoading : true ,
    is_Detail_Mode  : false ,

} ;


const reducer_Index = ( state : IIndex = initState , action : any ) => {

    switch( action.type ){

        // # 設定 _ 首頁資料 _ 是否下載中
        case  "SET_INDEX_ISLOADING" : return { ...state , Index_isLoading : action.Index_isLoading } ;

        // # 設定 _ 首頁詳細模式 ( 展開所有統計資料 )
        case  "SET_DETAIL_MODE" : return { ...state , is_Detail_Mode : action.is_Detail_Mode } ;

        default : return state ;

    }

} ;

export default reducer_Index ;
