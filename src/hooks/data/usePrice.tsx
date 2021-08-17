
import React, {useEffect, useState} from "react"
import { useDispatch , useSelector } from "react-redux";


// 協助 usePrice_Service ,   從 Redux 取得 _ 各項服務 : 價格
export const useHelper_Prices = ( ) => {

    // 基礎價格
    const basicSumPrice  = useSelector( ( state : any ) => state.Basic.Basic_Sum_Price )  ;

    // 洗澡價格
    const bathSumPrice   = useSelector( ( state:any ) => state.Bath.Bath_Price ) ;

    // 美容價格
    const beautySumPrice = useSelector( ( state:any ) => state.Beauty.Beauty_Price ) ;

    // 加價項目費用
    const extraItemFee   = parseInt( useSelector( ( state : any ) => state.Extra_Fee.Extra_Item_Fee ) ) ;

    // 加價美容費用
    const extraBeautyFee = parseInt( useSelector( ( state : any ) => state.Extra_Fee.Extra_Beauty_Fee ) ) ;


    return { basicSumPrice , bathSumPrice , beautySumPrice , extraItemFee , extraBeautyFee }

} ;


// # 主要服務 ( 基礎、洗澡、美容 )
export const usePrice_Service = ( current : string , paymentMethod : string , setValue : any ) => {

    // 接送費用
    const pickupFee      = parseInt( useSelector( ( state : any ) => state.Extra_Fee.Pickup_Fee ) ) ;

    // 取得 _ 各項服務價格
    const { basicSumPrice , bathSumPrice  , beautySumPrice , extraItemFee , extraBeautyFee } = useHelper_Prices();

    // ------------------------

    // 服務金額
    const [ service_Price , set_Service_Price ] = useState( 0 ) ;

    // 應收金額 ( 包含 : 服務金額以外的費用 Ex. 接送費、加價項目 )
    const [ receivable , set_Receivable ]       = useState( 0 ) ;


    // 設定 _ 應收金額 ( receivable )
    useEffect(( ) => {

       set_Receivable(service_Price + pickupFee + extraItemFee + extraBeautyFee ) ;

    } ,[ service_Price , pickupFee , extraItemFee , extraBeautyFee ] ) ;


    // 預先設定 _ 實收金額 ( amount_Paid )
    useEffect(( ) => {

       if( ( current === '基礎' || current === '洗澡' || current === '美容' ) && paymentMethod === "現金" )
           setValue( 'amount_Paid' , service_Price + pickupFee + extraItemFee + extraBeautyFee ) ;

    } , [ receivable ] ) ;


    // 設定 _ 服務金額
    useEffect( ( ) => {

        if( current === '基礎' ) set_Service_Price( basicSumPrice ) ;
        if( current === '洗澡' ) set_Service_Price( bathSumPrice ) ;
        if( current === '美容' ) set_Service_Price( beautySumPrice ) ;

    } , [ basicSumPrice , bathSumPrice , beautySumPrice ] ) ;


    // 切換 _ 服務頁籤 ( 服務金額、應付金額 -> 歸零 )
    useEffect( ( ) => {

        set_Service_Price(0 ) ;
        set_Receivable(0 ) ;

    } , [ current ] ) ;

   return { receivable } ;

} ;

// # 安親價格
export const usePrice_Care = ( current : string , paymentMethod : string , setValue : any ) => {

    // 應收金額 ( 包含 : 住宿金額以外的費用  Ex. 接送費 )
    const [ receivable , set_Receivable ] = useState( 0 ) ;

    // 目前所選擇的 _ 安親類型 ( 一般安親、住宿 _ 提早抵達、住宿 _ 延後帶走 )
    const current_Care_Type   = useSelector(( state : any ) => state.Care.current_Care_Type ) ;

    // 接送費
    const pickupFee           = parseInt( useSelector( ( state : any ) => state.Extra_Fee.Pickup_Fee ) ) ;

    // 一般安親費用
    const Care_Ordinary_Price = parseInt( useSelector(( state : any ) => state.Care.Care_Ordinary_Price ) ) ;

    // 住宿 _ 提早抵達 : 轉安親費用
    const Care_Ahead_Price    = parseInt( useSelector(( state : any ) => state.Care.Care_Ahead_Price ) ) ;

    // 住宿 _ 延後帶走 : 轉安親費用
    const Care_Postpone_Price = parseInt( useSelector(( state : any ) => state.Care.Care_Postpone_Price ) ) ;


    // 設定 _ 應收金額  ( receivable )
    useEffect(( ) => {

       let care_Price = 0 ;

       if( current_Care_Type === '一般安親' )      care_Price = Care_Ordinary_Price ;
       if( current_Care_Type === '住宿_提早抵達' ) care_Price = Care_Ahead_Price ;
       if( current_Care_Type === '住宿_延後帶走' ) care_Price = Care_Postpone_Price ;

       set_Receivable(care_Price + pickupFee ) ;


    } ,[ current_Care_Type , Care_Ordinary_Price , Care_Ahead_Price , Care_Postpone_Price , pickupFee ] ) ;


    // 預先設定 _ 實收金額 ( amount_Paid )
    useEffect(( ) => {

        let care_Price = 0 ;

        if( current_Care_Type === '一般安親' )      care_Price = Care_Ordinary_Price ;
        if( current_Care_Type === '住宿_提早抵達' ) care_Price = Care_Ahead_Price ;
        if( current_Care_Type === '住宿_延後帶走' ) care_Price = Care_Postpone_Price ;

        if( current === '安親' && paymentMethod === '現金' )  setValue( 'amount_Paid' , care_Price + pickupFee ) ;

    } , [ Care_Ordinary_Price , Care_Ahead_Price , Care_Postpone_Price , pickupFee ] ) ;



    return { current_Care_Type , receivable }

} ;

// # 住宿價格
export const usePrice_Lodge = ( current : string , paymentMethod : string , setValue : any ) => {

    // 住宿金額
    const current_Lodge_Price_Sum = useSelector( ( state : any ) => state.Lodge.current_Lodge_Price_Sum )  ;

    // 接送費
    const pickupFee               = parseInt( useSelector( ( state : any ) => state.Extra_Fee.Pickup_Fee ) ) ;


    // 應收金額 ( 包含 : 住宿金額以外的費用  Ex. 接送費 )
    const [ receivable , set_Receivable ] = useState( 0 ) ;


    // 設定 _ 應收金額  ( receivable )
    useEffect(( ) => {

        set_Receivable(current_Lodge_Price_Sum + pickupFee ) ;

    } ,[ current_Lodge_Price_Sum , pickupFee ] ) ;


    // 預先設定 _ 實收金額 ( amount_Paid )
    useEffect(( ) => {

        if( current === '住宿' && paymentMethod === '現金' )  setValue( 'amount_Paid' , current_Lodge_Price_Sum + pickupFee ) ;

    } , [ receivable ] ) ;

    return { receivable } ;

} ;

// # 方案價格
export const usePrice_Plan = ( current : string , paymentMethod : string , setValue : any ) => {

    const current_Plan_Type  = useSelector(( state : any ) => state.Plan.current_Plan_Type ) ;  // 目前所選擇的 _ 方案類型

    // # 從 Redux 取得相關費用 --------------

    // 包月洗澡金額
    const Month_Bath_Price   = parseInt( useSelector( ( state : any ) => state.Plan.Month_Bath_Price ) ) ;

    // 包月美容金額
    const Month_Beauty_Price = parseInt( useSelector( ( state : any ) => state.Plan.Month_Beauty_Price ) ) ;

    // 住宿券金額
    const Lodge_Coupon_Price = parseInt( useSelector( ( state : any ) => state.Plan.Lodge_Coupon_Price ) ) ;

    // 接送費
    const pickupFee          = useSelector(( state : any ) => state.Plan.service_Pickup_Fee )  ;

    // 自行加減價金額
    const self_Adjust_Price  = useSelector(( state : any ) => state.Plan.self_Adjust_Amount ) ;


    // ----------------------------------------------------------------------

    // 方案金額
    const [ plan_Price , set_Plan_Price ] = useState( 0 ) ;


    // 應收金額 ( 包含 : 方案金額以外的費用 Ex. 接送費、自行加減價金額 )
    const [ receivable , set_Receivable ] = useState( 0 ) ;


    // 設定 _ 應收金額 ( receivable )
    useEffect(( ) => {

        set_Receivable(plan_Price + pickupFee + self_Adjust_Price  ) ;

    } ,[ plan_Price , pickupFee , self_Adjust_Price ] ) ;


    // 預先設定 _ 實收金額 ( amount_Paid )
    useEffect(( ) => {

        if( paymentMethod === "現金" ) setValue( 'amount_Paid' , plan_Price + pickupFee + self_Adjust_Price  ) ;

    } , [ receivable ] ) ;


    // 設定 _ 方案金額
    useEffect(( ) => {

        if( current_Plan_Type === '包月洗澡' ) set_Plan_Price( Month_Bath_Price ) ;
        if( current_Plan_Type === '包月美容' ) set_Plan_Price( Month_Beauty_Price ) ;
        if( current_Plan_Type === '住宿券' )   set_Plan_Price( Lodge_Coupon_Price ) ;

    } ,[ Month_Bath_Price , Month_Beauty_Price , Lodge_Coupon_Price ] ) ;


    // 切換 _ 服務頁籤 ( 服務金額、應付金額 -> 歸零 )
    useEffect(( ) => {

      set_Plan_Price(0 ) ;
      set_Receivable(0 ) ;

    } ,[ current ] ) ;


    return { current_Plan_Type , receivable  }

} ;

