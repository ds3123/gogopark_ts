
import React from "react" ;
import { Dispatch } from "redux";


// # 設定 _ 基礎 : 共計價格
export const set_BasicSumPrice = ( price : number | string ) => {

    return ( dispatch : Dispatch ) => {

                                        dispatch({
                                                           type  : "SET_BASIC_SUM_PRICE" ,
                                                           price : price
                                                         }) ;

                                      } ;

} ;
