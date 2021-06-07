
import React from "react" ;
import {Dispatch} from "redux";


// 新增 _ 客戶
export const create_Customer = ( payload : any ) => {

    return ( dispatch : Dispatch ) => {

             dispatch({

                type      : "CREATE_CUSTOMER" ,
                payload   : payload

             }) ;

         } ;

} ;