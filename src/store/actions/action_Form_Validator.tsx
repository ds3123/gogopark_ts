
import React from "react" ;
import { Dispatch } from "redux";


// @ 自訂 _ 表單驗證邏輯



// # 設定 _ 因方案 ( 包月洗澡、包月美容 ) 條件不符，導致表單無效
export const set_Invalid_To_Plan = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type            : "SET_INVALID_TO_PLAN" ,
            invalid_To_Plan : bool
        }) ;

    } ;

} ;

