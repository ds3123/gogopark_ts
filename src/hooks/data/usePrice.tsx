
import React, { useState } from "react"
import { useDispatch , useSelector } from "react-redux";



// 基礎價格
export const usePrice_Basic = ( ) => {

    const basicSumPrice = parseInt( useSelector( ( state : any ) => state.Basic.Basic_Sum_Price ) ) ; // 基礎單
    return { basicSumPrice } ;

} ;

// 洗澡價格
export const usePrice_Bath = ( ) => {


} ;

// 美容價格
export const usePrice_Beauty = ( ) => {


} ;



// 安親價格
export const usePrice_Care = ( ) => {

    // 一般安親費用
    const Care_Ordinary_Price = parseInt( useSelector( ( state : any ) => state.Care.Care_Ordinary_Price ) ) ;

    // 住宿 _ 提早抵達 : 轉安親費用
    const Care_Ahead_Price    = parseInt( useSelector( ( state : any ) => state.Care.Care_Ahead_Price ) ) ;

    // 住宿 _ 延後帶走 : 轉安親費用
    const Care_Postpone_Price = parseInt( useSelector( ( state : any ) => state.Care.Care_Postpone_Price ) ) ;

    return { Care_Ordinary_Price , Care_Ahead_Price , Care_Postpone_Price }

} ;

// 住宿價格
export const usePrice_Lodge = ( ) => {



} ;

// 方案價格
export const usePrice_Plan = ( ) => {

    // 包月洗澡金額
    const Month_Bath_Price   = parseInt( useSelector( ( state : any ) => state.Plan.Month_Bath_Price ) ) ;

    // 包月美容金額
    const Month_Beauty_Price = parseInt( useSelector( ( state : any ) => state.Plan.Month_Beauty_Price ) ) ;

    // 住宿券金額
    const Lodge_Coupon_Price = parseInt( useSelector( ( state : any ) => state.Plan.Lodge_Coupon_Price ) ) ;


    return { Month_Bath_Price , Month_Beauty_Price , Lodge_Coupon_Price }

} ;