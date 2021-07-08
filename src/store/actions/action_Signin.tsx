
import React from "react" ;
import { Dispatch } from "redux";


// # 設定 _ 登入成功的帳號資料
export const set_Signin_Data = ( data : any ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type        : "SET_SIGNIN_DATA" ,
            Signin_Data : data
        }) ;

    } ;

} ;
