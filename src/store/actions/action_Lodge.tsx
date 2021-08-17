
import React from "react" ;
import { Dispatch } from "redux";


// # 設定 _ 該房間，是否在選定的時間內，已被使用
// export const set_Is_Room_InUse = ( bool : boolean ) => {
//
//     return ( dispatch : Dispatch ) => {
//
//         dispatch({
//             type          : "SET_IS_ROOM_INUSE" ,
//             is_Room_InUse : bool
//         }) ;
//
//     } ;
//
// } ;



// # 設定 _ 住宿頁資料 _ 是否下載中
export const set_Lodge_isLoading = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type            : "SET_LODGE_ISLOADING" ,
            Lodge_isLoading : bool
        }) ;

    } ;

} ;




// # 設定 _ 所選擇房型、日期區間 : 住宿價格總計
export const set_Current_Lodge_Price_Sum = ( price_Sum  : number ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type                    : "SET_CURRENT_LODGE_PRICE_SUM" ,
            current_Lodge_Price_Sum : price_Sum
        }) ;

    } ;

} ;



