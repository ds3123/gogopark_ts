
import React from "react" ;
import { Dispatch } from "redux";
import axios from "utils/axios";


/* @ 客戶頁  */


// # 設定 _ 是否 : 已存在客戶
export const set_IsExisting_Customer = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type : "SET_IS_EXISTING_CUSTOMER" ,
            bool : bool
        }) ;

    } ;

} ;


// # 取得 _ 目前客戶表單，所填入客戶的所有寵物 ( 依客戶身分證字號查詢，for 寵物表單，取得客戶寵物用 )
export const get_Current_Customer_Pets = ( cus_Id : string ) => {

    return ( dispatch : Dispatch ) => {

                axios.get( `/customers/show_pets/${ cus_Id }` ).then( res => {

                    dispatch({
                        type     : "GET_CURRENT_CUSTOMER_PETS",
                        cus_Pets : res.data
                    })

                });

           } ;

} ;

// # 設定 _ 客戶頁資料 _ 是否下載中
export const set_Customer_isLoading = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type               : "SET_CUSTOMER_ISLOADING" ,
            Customer_isLoading : bool
        }) ;

    } ;

} ;
