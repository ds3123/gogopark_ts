
import React from "react"



/* @ 安親  */
interface ICare {

    // 目前選擇的安親類型
    current_Care_Type   : string ;

    // 費用
    Care_Ordinary_Price : number ; // 一般安親費用
    Care_Ahead_Price    : number ; // 住宿_提早抵達
    Care_Postpone_Price : number ; // 住宿_延後帶走

}

const initState = {

    current_Care_Type   : '' ,

    Care_Ordinary_Price : 0 ,
    Care_Ahead_Price    : 0 ,
    Care_Postpone_Price : 0 ,

} ;


const reducer_Care = ( state : ICare = initState , action : any ) => {

    switch( action.type ){

        // # 設定 _ 目前所使用的方案類型
        case  "SET_CURRENT_CARE_TYPE" :
            return { ...state , current_Care_Type : action.current_Care_Type } ;

        // # 設定 _ 一般安親費用
        case  "SET_CARE_ORDINARY_PRICE" :
            return { ...state , Care_Ordinary_Price : action.Care_Ordinary_Price } ;

        // # 設定 _ 住宿 : 提早抵達
        case  "SET_CARE_AHEAD_PRICE" :
            return { ...state , Care_Ahead_Price : action.Care_Ahead_Price } ;

        // # 設定 _ 住宿 : 延後帶走
        case  "SET_CARE_POSTPONE_PRICE" :
            return { ...state , Care_Postpone_Price : action.Care_Postpone_Price } ;

        default : return state ;

    }




} ;

export default reducer_Care ;
