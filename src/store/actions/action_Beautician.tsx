
import React from "react"
import { Dispatch } from "redux";


/* @  美容師專區  */


// # 設定 _ 所點選寵物
export const set_Current_Pet = ( pet : any ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type       : "SET_CURRENT_PET" ,
            currentPet : pet
        }) ;

    } ;

} ;



// # 設定 _ 所點選寵物
export const set_Is_Admin_Confirmed = ( bool : boolean ) => {

    return ( dispatch : Dispatch ) => {

        dispatch({
            type               : "SET_IS_ADMIN_CONFIRMED" ,
            is_Admin_Confirmed : bool
        }) ;

    } ;

} ;
