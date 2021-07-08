

import React from "react" ;
import { Dispatch } from "redux";


// @ 管理區

// # 設定 _ 目前須點選的第 2 標籤
export const set_Current_Second_Tab = ( tab : string ) => {

    return ( dispatch : Dispatch ) => {

            dispatch({
                type               : "SET_CURRENT_SECOND_TAB" ,
                Current_Second_Tab : tab
            }) ;

    } ;

} ;
