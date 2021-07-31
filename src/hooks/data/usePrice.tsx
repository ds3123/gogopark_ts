
import React, {useEffect, useState} from "react"
import { useDispatch , useSelector } from "react-redux";


// 協助 usePrice_Service , 取得 _ 各項服務 : 價格
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


// # 各項服務
export const usePrice_Service = ( current : string , pickupFee : number , paymentMethod : string , setValue : any ) => {


    // 取得 _ 各項服務價格
    const { basicSumPrice , bathSumPrice  , beautySumPrice , extraItemFee , extraBeautyFee } = useHelper_Prices();

    // ------------------------

    // 服務金額
    const [ service_Price , set_Service_Price ] = useState( 0 ) ;

    // 應收金額 ( 包含 : 服務金額以外的費用 Ex. 接送費、加價項目 )
    const [ receivable , set_Receivable ]       = useState( 0 ) ;


    // 設定 _ 應收金額
    useEffect(( ) => {

       set_Receivable(service_Price + pickupFee + extraItemFee + extraBeautyFee ) ;

    } ,[ service_Price , pickupFee , extraItemFee , extraBeautyFee ] ) ;


    // 付款方式 : 現金 ( 預先設定 _ 實收金額 )
    useEffect(( ) => {

        if( paymentMethod === "現金" ) setValue( 'amount_Paid' , service_Price + pickupFee + extraItemFee + extraBeautyFee ) ;

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

   return { service_Price , receivable } ;

} ;



// # 基礎價格 ( 確認後，刪除 2021.07.26 )
export const usePrice_Basic = ( current : string , pickupFee : number , paymentMethod : string , setValue : any ) => {

    // 基礎價格
    const basicSumPrice = useSelector( ( state : any ) => state.Basic.Basic_Sum_Price )  ;


    // 應收金額
    const [ receivable , set_Receivable ] = useState( 0 ) ;


    // 設定 _ 應收金額
    useEffect(( ) => {

        if( current === "基礎" ) set_Receivable( basicSumPrice + pickupFee ) ;

    } ,[ basicSumPrice , pickupFee ] ) ;


    // # 付款方式 : 現金 ( 預先設定 _ 實收金額 )
    useEffect(( ) => {

       if( current === "基礎" && paymentMethod === "現金" ) setValue( 'amount_Paid' , basicSumPrice + pickupFee ) ;

    } , [ receivable ] ) ;


    // # 切換頁籤，歸零 : 應收金額、實收金額
    useEffect(( ) => {

       if( current !== '基礎' ){
           set_Receivable( 0 ) ;
           setValue( 'amount_Paid' , 0 ) ;
       }

    } , [ current ] ) ;


    return { basicSumPrice , receivable } ;

} ;

// # 洗澡價格 ( 確認後，刪除 2021.07.26 )
export const usePrice_Bath = ( current : string , pickupFee : number , paymentMethod : string , setValue : any ) => {

    // 洗澡價格
    const bathSumPrice = useSelector( ( state:any ) => state.Bath.Bath_Price ) ;

    // 應收金額
    const [ receivable , set_Receivable ] = useState( 0 ) ;


    // ---------------------------------------


    // 設定 _ 應收金額
    useEffect(( ) => {

        if( current === "洗澡" ) set_Receivable( bathSumPrice + pickupFee ) ;

    } ,[ bathSumPrice , pickupFee ] ) ;

    // # 付款方式 : 現金 ( 預先設定 _ 實收金額 )
    useEffect(( ) => {

        if( current === "基礎" && paymentMethod === "現金" ) setValue( 'amount_Paid' , bathSumPrice + pickupFee ) ;

    } , [ receivable ] ) ;

    // # 切換頁籤，歸零 : 應收金額、實收金額
    useEffect(( ) => {

        if( current !== '洗澡' ){
            set_Receivable( 0 ) ;
            setValue( 'amount_Paid' , 0 ) ;
        }

    } , [ current ] ) ;

    return { bathSumPrice , receivable } ;


} ;

// # 美容價格 ( 確認後，刪除 2021.07.26 )
export const usePrice_Beauty = ( ) => {



} ;


// # 安親價格
export const usePrice_Care = ( ) => {

    const current_Care_Type   = useSelector(( state : any ) => state.Care.current_Care_Type ) ;  // 目前所選擇的 _ 安親類型

    // # 費用 --------------


    // 一般安親費用
    const Care_Ordinary_Price = parseInt( useSelector(( state : any ) => state.Care.Care_Ordinary_Price ) ) ;

    // 住宿 _ 提早抵達 : 轉安親費用
    const Care_Ahead_Price    = parseInt( useSelector(( state : any ) => state.Care.Care_Ahead_Price ) ) ;

    // 住宿 _ 延後帶走 : 轉安親費用
    const Care_Postpone_Price = parseInt( useSelector(( state : any ) => state.Care.Care_Postpone_Price ) ) ;


    return { current_Care_Type , Care_Ordinary_Price , Care_Ahead_Price , Care_Postpone_Price }

} ;

// # 住宿價格
export const usePrice_Lodge = ( ) => {




} ;

// # 方案價格
export const usePrice_Plan = ( current : string , paymentMethod : string , setValue : any ) => {

    const current_Plan_Type  = useSelector(( state : any ) => state.Plan.current_Plan_Type ) ;  // 目前所選擇的 _ 方案類型

    // # 費用 --------------

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


    // 設定 _ 應收金額
    useEffect(( ) => {

        set_Receivable(plan_Price + pickupFee + self_Adjust_Price  ) ;

    } ,[ plan_Price , pickupFee , self_Adjust_Price ] ) ;


    // 付款方式 : 現金 ( 預先設定 _ 實收金額 )
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


    return { current_Plan_Type , receivable , Month_Bath_Price , Month_Beauty_Price , self_Adjust_Price , pickupFee , Lodge_Coupon_Price }

} ;


// # 價格 ( 接送、加價項目、加價美容  )
export const usePrice_Extra = ( ) => {

    // 接送費用
    const pickupFee      = parseInt( useSelector( ( state : any ) => state.Extra_Fee.Pickup_Fee ) ) ;

    // 加價項目費用
    const extraItemFee   = parseInt( useSelector( ( state : any ) => state.Extra_Fee.Extra_Item_Fee ) ) ;

    // 加價美容費用
    const extraBeautyFee = parseInt( useSelector( ( state : any ) => state.Extra_Fee.Extra_Beauty_Fee ) ) ;


    return { pickupFee , extraItemFee , extraBeautyFee }

} ;

