
import React from "react" ;
import { Dispatch } from "redux";
import axios from "utils/axios";



/* @ 寵物頁  */


// # 設定 _ 寵物頁資料 _ 是否下載中
export const set_Pet_isLoading = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type          : "SET_PET_ISLOADING" ,
            Pet_isLoading : bool
        }) ;

    } ;

} ;