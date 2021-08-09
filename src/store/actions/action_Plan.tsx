

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


// # 設定 _ 目前所選擇方案 : 價錢小計
export const set_Current_Plan_Price = ( price : number | string ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type               : "SET_CURRENT_PLAN_PRICE" ,
            current_Plan_Price : price
        }) ;

    } ;

} ;


// # 設定 _ 自訂 加 / 減 金額 ( for 包月洗澡、包月美容 )
export const set_Self_Adjust_Amount = ( price : number ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type               : "SET_SELF_ADJUST_AMOUNT" ,
                    self_Adjust_Amount : price
                }) ;

           } ;

} ;


// # 設定 _ 接送費 ( for 包月洗澡、包月美容 )
export const set_Service_Pickup_Fee = ( price : number ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type               : "SET_SERVICE_PICKUP_FEE" ,
            service_Pickup_Fee : price
        }) ;

    } ;

} ;



// 設定 _ 是否已點選使用 : 包月洗澡 or 包月美容
export const set_Use_Plan = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type         : "SET_USE_PLAN" ,
            is_Plan_Used : bool
        }) ;

    } ;

} ;



// 設定 _ 目前選擇 : 方案資料表 ( plans ) id
export const set_Current_Plan_Id = ( planId : number | string ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type            : "SET_CURRENT_PLAN_ID" ,
                    current_Plan_Id : planId
                }) ;

           } ;

} ;


// 設定 _ 目前選擇 : 方案備註 Ex. 包月洗澡第 1 次
export const set_Current_Plan_Note = ( planNote : string ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type              : "SET_CURRENT_PLAN_NOTE" ,
            current_Plan_Note : planNote
        }) ;

    } ;

} ;


// 設定 _ 目前點選使用的方案服務 _ 價格
export const set_Current_Plan_Service_Price = ( price : number ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type                       : "SET_CURRENT_PLAN_SERVICE_PRICE" ,
            current_Plan_Service_Price : price
        }) ;

    } ;

} ;
