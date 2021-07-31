
import React from "react" ;
import { Dispatch } from "redux";


// @ 自訂 _ 表單驗證邏輯



// # 設定 _ 因 "包月洗澡" 條件不符，導致表單無效
export const set_Invalid_To_Month_Bath = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type                  : "SET_INVALID_TO_MONTH_BATH" ,
            invalid_To_Month_Bath : bool
        }) ;

    } ;

} ;
