import React from "react" ;


/* @ 住宿  */
interface ILodge {

   Lodge_isLoading         : boolean ; // 住宿頁資料 _ 是否下載中

   current_Lodge_Price_Sum : number ; // 所選擇房型、日期區間 : 住宿價格總計



}

const initState = {

    Lodge_isLoading         : true ,

    current_Lodge_Price_Sum : 0 ,

} ;


const reducer_Lodge = ( state : ILodge = initState , action : any ) => {


    switch( action.type ){

        // // # 設定 _ 該房間，是否在選定的時間內，已被使用
        // case  "SET_IS_ROOM_INUSE" : return { ...state , is_Room_InUse : action.is_Room_InUse } ;

        // # 設定 _ 住宿頁資料 : 是否下載中
        case  "SET_LODGE_ISLOADING" : return { ...state , Lodge_isLoading : action.Lodge_isLoading } ;

        // 設定 _ 所選擇房型、日期區間 : 住宿價格總計
        case  "SET_CURRENT_LODGE_PRICE_SUM" : return { ...state , current_Lodge_Price_Sum : action.current_Lodge_Price_Sum } ;

        default : return state ;

    }




} ;

export default reducer_Lodge ;
