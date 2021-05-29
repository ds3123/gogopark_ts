
import React , { useState , useEffect } from "react" ;

import Pagination from "utils/Pagination";


const Customers = () => {

    // # 分頁套件 ( Pagination ) 相關
    let [ filteredItems , set_filteredItems ] = useState<any[]>( [] ) ; // 點選頁碼後 _ 所篩選項目
    let [ pageOfItems , set_pageOfItems ]     = useState( [] ) ; // 當前頁面 _ 顯示項目

    // 點選 : 分頁頁碼
    const click_Pagination = ( pageOfItems : [] ) => {  set_pageOfItems( pageOfItems ) ; } ;


    //取得 : 客人 _ 寵物資料
    useEffect(() => {

      //  read_Customers_Pets().then( data => {

            set_filteredItems( [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},] ) ;

      //  })

    },[] ) ;



    return  <React.Fragment>

                <table className="table is-fullwidth is-hoverable">

                    <thead>
                        <tr>
                            <th> 客戶姓名 </th>
                            <th> 寵物資訊 </th>
                            <th style={{ width:"100px" }}> 消費歷史 </th>
                            <th> 手機號碼 </th>
                            <th> 住家電話 </th>
                            <th> 通訊地址 </th>
                            <th> 編 輯    </th>
                        </tr>
                    </thead>

                    <tbody>

                    {
                        pageOfItems.map(( item , index ) => {

                            return <tr key={index}><td>3</td><td>4</td></tr> ;

                        })
                    }



                    </tbody>

                </table>

                { /* 分頁按鈕 */ }  <br/><br/>

                <Pagination items={ filteredItems } onChangePage={ click_Pagination } />

                <br/><br/><br/><br/>

             </React.Fragment>


};

export default Customers ;


