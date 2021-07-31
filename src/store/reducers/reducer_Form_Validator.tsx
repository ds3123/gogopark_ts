
import React from "react" ;

// @ 自訂 _ 表單驗證邏輯
interface IForm {

   // # 新增 _ 方案
   invalid_To_Month_Bath : boolean ;  //  因包月洗澡條件不符，導致表單無效


}

const initState = {

   invalid_To_Month_Bath : false

} ;


const reducer_Form_Validator = ( state : IForm = initState , action : any ) => {

    switch( action.type ){

        // # 設定 _  因 "包月洗澡" 條件不符，導致表單無效
        case  "SET_INVALID_TO_MONTH_BATH" : return {...state , invalid_To_Month_Bath : action.invalid_To_Month_Bath } ;

        default : return state ;

    }

} ;

export default reducer_Form_Validator ;
