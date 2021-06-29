import React from "react" ;


/* @ 方案項目  */
interface IPlan {


    // 目前選擇的方案類型
    current_Plan_Type  : string ;

    // * 價錢
    Month_Bath_Price   : number ;  // 包月洗澡
    Month_Beauty_Price : number ;  // 包月美容
    Lodge_Coupon_Price : number ;  // 住宿券

}

const initState = {

    current_Plan_Type  : '' ,

    Month_Bath_Price   : 0 ,
    Month_Beauty_Price : 0 ,
    Lodge_Coupon_Price : 0

} ;


const reducer_Plan = ( state : IPlan = initState , action : any ) => {

    switch( action.type ){

        // # 設定 _ 目前所使用的方案類型
        case  "SET_CURRENT_PLAN_TYPE" :
            return { ...state , current_Plan_Type : action.current_Plan_Type } ;

        // # 設定 _ 包月洗澡價格
        case  "SET_MONTH_BATH_PRICE" :
            return { ...state , Month_Bath_Price : action.Month_Bath_Price } ;

        // # 設定 _ 包月美容價格
        case  "SET_MONTH_BEAUTY_PRICE" :
            return { ...state , Month_Beauty_Price : action.Month_Beauty_Price } ;

        // # 設定 _ 住宿券價格
        case  "SET_LODGE_COUPON_PRICE" :
            return { ...state , Lodge_Coupon_Price : action.Lodge_Coupon_Price } ;

        default : return state ;

    }




} ;

export default reducer_Plan ;
