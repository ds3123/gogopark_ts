import React from "react" ;


/* @ 首頁  */
interface IIndex {

    Index_isLoading : boolean ;  // 首頁資料 _ 是否下載中

}

const initState = {

    Index_isLoading : true ,

} ;


const reducer_Index = ( state : IIndex = initState , action : any ) => {


    switch( action.type ){

        // # 設定 _ 首頁資料 _ 是否下載中
        case  "SET_INDEX_ISLOADING" :
            return {
                ...state ,
                Index_isLoading : action.Index_isLoading

            } ;

        default : return state ;

    }




} ;

export default reducer_Index ;
