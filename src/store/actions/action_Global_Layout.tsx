
import React from "react" ;
import { Dispatch } from "redux";




// # 開啟 / 關閉  _ 右側滑動面版
export const set_Side_Panel = ( is_Open : boolean , component : null | JSX.Element , props : any ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({

            type      : "SET_SIDE_PANEL" ,
            is_Open   : is_Open ,
            component : component ,
            props     : props

        }) ;

    } ;

} ;