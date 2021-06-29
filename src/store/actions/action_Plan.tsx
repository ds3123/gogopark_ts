

import React from "react" ;
import { Dispatch } from "redux";


/* @ 方案 */

// # 設定 _ 目前所使用的方案類型
export const set_current_plan_type = ( type : string ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type              : "SET_CURRENT_PLAN_TYPE" ,
            current_Plan_Type : type
        }) ;

    } ;

} ;


// # 設定 _ 包月洗澡價格
export const set_month_bath_price = ( price : number | string ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type             : "SET_MONTH_BATH_PRICE" ,
            Month_Bath_Price : price
        }) ;

    } ;

} ;

// # 設定 _ 包月美容價格
export const set_month_beauty_price = ( price : number | string ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type               : "SET_MONTH_BEAUTY_PRICE" ,
            Month_Beauty_Price : price
        }) ;

    } ;

} ;

// # 設定 _ 住宿券價格
export const set_lodge_coupon_price = ( price : number | string ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type               : "SET_LODGE_COUPON_PRICE" ,
            Lodge_Coupon_Price : price
        }) ;

    } ;

} ;
