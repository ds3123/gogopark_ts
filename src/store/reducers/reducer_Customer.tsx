import React from "react" ;


/* @ 基礎項目  */
interface ICustomer {

   IsExisting_Customer   : boolean ;
   Current_Customer_Pets : any[] ;

}

const initState = {

    IsExisting_Customer   : false ,  // 客戶是否已存在
    Current_Customer_Pets : []     // 目前 _ 客戶的所有寵物
} ;


const reducer_Customer = ( state : ICustomer = initState , action : any ) => {


    switch( action.type ){

        // # 設定 _ 客戶是否已存在
        case  "SET_IS_EXISTING_CUSTOMER" :
            return {
                ...state ,
                IsExisting_Customer : action.bool

            } ;

        // # 設定 _ 目前客戶的所有寵物
        case  "GET_CURRENT_CUSTOMER_PETS" :
            return {
                ...state ,
                Current_Customer_Pets : action.cus_Pets

            } ;

        default : return state ;

    }




} ;

export default reducer_Customer ;
