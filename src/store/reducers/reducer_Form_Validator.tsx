
import React from "react" ;

// @ 自訂 _ 表單驗證邏輯
interface IForm {

   // # 新增 _ 方案
   invalid_To_Plan     : boolean ;  //  因 : 方案 ( 包月洗澡、包月美容 )條件不符，導致表單無效


}

const initState = {

    invalid_To_Plan     : false ,


} ;


const reducer_Form_Validator = ( state : IForm = initState , action : any ) => {

    switch( action.type ){

        // # 設定 _  因方案 ( 包月洗澡、包月美容 )條件不符，導致表單無效
        case  "SET_INVALID_TO_PLAN" : return {...state , invalid_To_Plan : action.invalid_To_Plan } ;


        default : return state ;

    }

} ;

export default reducer_Form_Validator ;
