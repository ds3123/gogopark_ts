import React, {useState, useEffect, useCallback} from "react" ;
import axios from "utils/axios" ;
import { Service_Type_Api } from 'utils/Interface_Type'


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