
import React from "react" ;
import { Dispatch } from "redux" ;




/* @ 寵物  */

// # 設定 _ 是否 : 資料庫已存在寵物
export const set_IsExisting_Pet = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type           : "SET_IS_EXISTING_PET" ,
                    IsExisting_Pet : bool
                }) ;

           } ;

} ;


// # 設定 _ 寵物頁資料 _ 是否下載中
export const set_Pet_isLoading = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type          : "SET_PET_ISLOADING" ,
                    Pet_isLoading : bool
                }) ;

           } ;

} ;

// # 設定 _ 目前品種下拉選項，所選擇的品種 Id
export const set_Current_Species_Select_Id = ( speciesId : number | string ) => {

    return ( dispatch : Dispatch ) => {

                dispatch({
                    type               : "SET_CURRENT_SPECIES_ID" ,
                    current_Species_Id : speciesId
                }) ;

            } ;

} ;

