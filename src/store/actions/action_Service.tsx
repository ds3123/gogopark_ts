
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
