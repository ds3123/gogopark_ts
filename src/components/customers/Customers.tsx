import React from "react" ;

// 分頁套件、呼叫邏輯
import usePagination from "hooks/usePagination";
import Pagination from "utils/Pagination";

// 資料列
import Customers_Rows from "components/customers/Customers_Rows";


/* @ 客戶頁面  */
const Customers = () => {

    // 取得 _ 分頁資料
    const { pageOfItems , filteredItems , click_Pagination } = usePagination( '/customers/show_customers_pets/' );

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
                            pageOfItems.map( ( item : any , index ) => {
                                return <Customers_Rows key={index} data={ item } /> ;
                            })
                        }
                    </tbody>

                </table>

                { /* 分頁按鈕 */ }
                <div style={{ marginTop:"70px", marginBottom:"150px" }}>
                    <Pagination items={ filteredItems } onChangePage={ click_Pagination } />
                </div>

             </React.Fragment>

};

export default Customers ;


