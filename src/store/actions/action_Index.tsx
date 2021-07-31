
import React from "react" ;
import { Dispatch } from "redux";


// # 設定 _ 首頁資料 _ 是否下載中
export const set_Index_isLoading = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type            : "SET_INDEX_ISLOADING" ,
                    Index_isLoading : bool
                }) ;

           } ;

} ;


// # 設定 _ 首頁詳細模式 ( 展開所有統計資料 )
export const set_Detail_Mode = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type           : "SET_DETAIL_MODE" ,
                    is_Detail_Mode : bool
                }) ;

           } ;

} ;



