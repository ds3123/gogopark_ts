
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

// # 設定 _ 是否正在輸入 _ 身分證字號欄位
export const set_IsQuerying_Customer_ID = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type : "SET_IS_QUERYING_CUSTOMER_ID" ,
            bool : bool
        }) ;

    } ;

} ;



// # 設定 _ 該客戶，是否有 : 基礎單紀錄
export const set_Has_Basic_Records = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type : "SET_HAS_BASIC_RECORDS" ,
                    bool : bool
                }) ;

           } ;

} ;


// # 設定 _ 該客戶，是否有 : 洗澡單紀錄 ( for 判斷是否為 "初次洗澡" )
export const set_Has_Bath_Records = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type : "SET_HAS_BATH_RECORDS" ,
                    bool : bool
                }) ;

           } ;

} ;


// # 設定 _ 該客戶，是否有 : 美容單紀錄
export const set_Has_Beauty_Records = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type : "SET_HAS_BEAUTY_RECORDS" ,
                    bool : bool
                }) ;

            } ;

} ;






// # 設定 _ 該客戶，是否有購買方案，如 : 包月洗澡、美容 ( for 決定 _ 是否能使用、還可以使用幾次 )
export const set_Customer_Plans_Records = ( planRecords : any[] ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type                   : "SET_CUSTOMER_PLANS_RECORDS" ,
            Customer_Plans_Records : planRecords
        }) ;

    } ;

} ;





// # 取得 _ 目前客戶表單，所填入客戶身分證字號，其所有寵物 ( 依客戶身分證字號查詢，for 寵物表單，取得客戶寵物用 )
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


// # 設定 _ 目前客戶的所有寵物
export const set_Current_Customer_Pets = ( cus_Pets : [] ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type     : "SET_CURRENT_CUSTOMER_PETS",
                    cus_Pets : cus_Pets
                })

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
