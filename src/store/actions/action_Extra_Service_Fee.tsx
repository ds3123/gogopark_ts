
import React from "react" ;
import { Dispatch } from "redux";


// # 設定 _ 接送費
export const set_PickupFee = ( price : number | string ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type  : "SET_PICKUP_FEE" ,
            price : price
        }) ;

    } ;

} ;