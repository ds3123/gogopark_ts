
import React from "react" ;
import { Dispatch } from "redux";
import axios from "utils/axios";


/* @ 洗美頁  */

// # 設定 _ 洗美頁資料 _ 是否下載中
export const set_Service_isLoading = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type              : "SET_SERVICE_ISLOADING" ,
                    Service_isLoading : bool
                }) ;

           } ;

} ;



// # 設定 _ 目前新增 : 服務類別 ( Ex. 初次洗澡、單次洗澡、包月洗澡 ... )
export const set_Current_Create_Service_Type = ( serviceType : string ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type        : "SET_CURRENT_CREATE_SERVICE_TYPE" ,
            serviceType : serviceType
        }) ;

    } ;

} ;

