
import React , { useEffect , useState } from "react" ;
import axios from "utils/axios" ;

/*
*
*   @ 分頁功能 _ 共用邏輯
*
*/

const usePagination = ( api : string ) => {

    let [ filteredItems , set_filteredItems ] = useState<any[]>( [] ) ; // 點選頁碼後 _ 所篩選項目
    let [ pageOfItems , set_pageOfItems ]     = useState( [3] ) ; // 當前頁面 _ 顯示項目

    // 點選 : 分頁頁碼
    const click_Pagination = ( _pageOfItems : [] ) => {  set_pageOfItems( _pageOfItems ) ; } ;

    // 取得、設定 : 資料
    useEffect(() => {

        axios.get( api ).then( res => {
            set_filteredItems( res.data )
        }) ;

    } ,[] ) ;


    return { pageOfItems , filteredItems , click_Pagination  } ;

};

export default usePagination