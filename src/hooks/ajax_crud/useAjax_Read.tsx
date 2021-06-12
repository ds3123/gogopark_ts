import React, {useState, useEffect, useCallback} from "react" ;
import axios from "utils/axios" ;
import { Service_Type_Api } from 'utils/Interface_Type'
import { useSelector } from "react-redux";
import {toast} from "react-toastify";
import {set_Side_Panel} from "../../store/actions/action_Global_Layout";


/* @ GET : 透過 Ajax _ 取得資料 */

// # 服務資料 ----

// * 取得 : 主要服務( 基礎、洗澡、美容 ) 與 客戶、寵物資料
export const useRead_Service_Cus_Pet = ( serviceType? : Service_Type_Api ) => {

    const [ data , set_Data ] = useState( [] ) ;

    // 判斷 _ 要取得 _ 單一類型資料 OR 所有資料
    const api = serviceType ? `/${ serviceType }/show_with_cus_pet/` : '/services/show_with_cus_pet/' ;

    // 取得資料
    useEffect(()=>{

       axios.get( api ).then( res => { set_Data( res.data ) ; } );

    },[]) ;

    return data ;

} ;

// * 取得 : 特定到店日期，所有服務 或 特定服務 ，"已使用" 的 Qcode
export const useRead_Qcode_Service_Date = (  type_Url? : 'basics' | 'bathes' | 'beauties' ) => {

    // 從 store 中取得 : 到店日期( 預設 : 今日 )
    const service_Date  = useSelector( ( state : any ) => state.Info.service_Date ) ;

    const [ data , set_Data ] = useState( [] ) ;

    const api = type_Url ? `/${ type_Url }/show_qcode/${ service_Date }` : `/services/show_qcode/${ service_Date }`

    // 取得資料
    useEffect(()=>{

        axios.get( api ).then( res => { set_Data( res.data ) ; } );

    },[ service_Date]) ;

    return data ;

} ;

// * 取得 : 特定日期，所有服務
export const useRead_Date_Services = ( date : string ) => {

    const [ data , set_Data ] = useState( [] ) ;

    // 取得資料
    useEffect(() => {

        axios.get( `/services/show_services/${ date }` ).then( res => { set_Data( res.data ) ; } );

    },[ date ]) ;

    return data ;

} ;

// # 客戶 ----

// * 依照特定欄位值，查詢客戶資料 ( LIKE 模糊搜尋 ， 依傳入參數 ，查詢欄位 與 查詢值 ，如 : 'id' & 身分證字號 或 'mobile_phone' & 手機號碼 )
export const useRead_Customer_By_Column = ( column : string , value : string | number )  => {

    const [ data , set_Data ] = useState( [] ) ;

    // 取得資料
    useEffect(() => {

        if( value ){

          axios.get( `/customers/show_by_param/${ column }/${ value }` ).then( res => {
            set_Data( res.data ) ;
          });

        }

    },[ value ]) ;

    return data ;

} ;

// * 取得 : 客戶寵物 ( 依客戶身分證字號 )
export const useRead_Customer_Pets = ( cus_Id : string ) => {

   const [ cusPets , set_cusPets ] = useState([]) ;


   useEffect(( ) => {

       if( cus_Id ) axios.get( `/customers/show_pets/${ cus_Id }` ).then( res => {

           if( res.data.length > 0 ) set_cusPets( res.data ) ; }

       );

   } , [  ] ) ;

   return cusPets ;

} ;



// # 品種 & 價錢 ----

// * 所有品種
export const useRead_All_Species = ( ) => {

    const [ species , set_Species ] = useState([]);

    useEffect(( ) => {

        axios.get( '/species/' ).then( res => { set_Species( res.data ) ; } );

    } , [] ) ;

    return species ;

} ;

// * 特定品種
export const useRead_Single_Species = ( id : string ) => {

    const [ species , set_Species ] = useState({}) ;

    useEffect(( ) => {

       if( id ) axios.get( `/species/${ id }` ).then( res => { set_Species( res.data ) ; } );

    } , [] ) ;

    return species ;

} ;


// * 所有價錢
export const useRead_All_Prices = ( ) => {

    const [ prices , set_Prices ] = useState([]);

    useEffect(( ) => {

        axios.get( '/prices/' ).then( res => { set_Prices( res.data ) ; } );

    } , [] ) ;

    return prices ;

} ;


// # 檢查 _ 資料庫是否 : 已有相關資料 ( 尚未完成 2021.06.12 )
export const useRead_Check_IsExist = ( ) => {

    const [ checkFunc , set_checkFunc ] = useState<any>( ()=>{} )


    const check_IsExist = ( api : string , colValue : string  ) => {

        axios.get( `${api}/${colValue}` ).then(res => {

             return "ggggg"

        }) ;

        return "ffff"

    } ;

    return checkFunc

} ;