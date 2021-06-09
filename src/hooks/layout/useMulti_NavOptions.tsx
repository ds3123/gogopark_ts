
import React, {useState} from "react" ;



interface ISecond_Nav {
    title     : string ;
    icon      : string ;
    third_nav : string[]
}


const Second_Nav : ISecond_Nav[] = [
    { title : "財務管理" , icon : "fas fa-user" , third_nav : ["日報表","現金帳","線上支付"] } ,
    { title : "價格管理" , icon : "fas fa-user" , third_nav : ["基 礎","洗 澡","美 容","住 宿","綜 合"] } ,
    { title : "退費管理" , icon : "fas fa-user" , third_nav : [] } ,
    { title : "員工管理" , icon : "fas fa-user" , third_nav : [] } ,
    { title : "權限管理" , icon : "fas fa-user" , third_nav : [] } ,
    { title : "資料管理" , icon : "fas fa-user" , third_nav : ["服務異常","刪除資料"] } ,
] ;



const useMulti_NavOptions = () => {

    const [ currentSecond , set_CurrentSecond ] = useState<string>( Second_Nav[0]['title'] ) ;        // 目前 _ 第 2 層選項
    const [ currentThird , set_CurrentThird ]   = useState<string>( Second_Nav[0]['third_nav'][0] ) ; // 目前 _ 第 3 層選項
    const [ Third_Nav , set_ThirdNav ]          = useState<string[]>( Second_Nav[0]['third_nav'] ) ;  // 設定 _ 第 3 層選項列

    // 點選 _ 第 2 層選項
    const click_Second = ( title : string ) => {

        // 設定 _ 所點選第 2　層選項
        set_CurrentSecond( title ) ;

        // 設定 _ 第 3 層選項
        Second_Nav.forEach( x => {
            if( x['title'] === title ){
                set_ThirdNav( x['third_nav']  ) ;
                set_CurrentThird( x['third_nav'][0] ) ;
            }
        }) ;

    } ;

    // 點選 _ 第 3 層選項
    const click_Third = ( title : string ) => {

        // 設定 _ 所點選第 3層選項
        set_CurrentThird( title ) ;

    } ;

    return { Second_Nav , Third_Nav , currentSecond , currentThird , click_Second , click_Third }

} ;

export default useMulti_NavOptions ;
