
import React, { useState } from "react"
import { useDispatch , useSelector } from "react-redux";


// 基礎價格
export const usePrice_Basic = ( ) => {

    // # 各項相關費用
    const basicSumPrice = parseInt( useSelector( ( state : any ) => state.Basic.Basic_Sum_Price ) ) ; // 基礎單
    const pickupFee     = parseInt( useSelector( ( state : any ) => state.Extra_Fee.Pickup_Fee ) ) ;  // 接送費

    return {  basicSumPrice , pickupFee } ;


} ;

// 洗澡價格
export const usePrice_Bath = ( ) => {




} ;

// 美容價格
export const usePrice_Beauty = ( ) => {




} ;