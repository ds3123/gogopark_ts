
import React from "react"
import usePagination from "hooks/layout/usePagination";
import Services_Rows from "../Services_Rows";
import Pagination from "../../../utils/Pagination";


/* @ 方案頁面 */
const Plans = ( ) => {

    // 取得 _ 分頁資料
    const { pageOfItems , filteredItems , click_Pagination } = usePagination( "/services/show_with_cus_pet/" ) ;

    return <>

            <table className="table is-fullwidth is-hoverable">

                <thead>
                <tr>
                    <th> 方案名稱 </th>
                    <th> 使用紀錄 </th>
                    <th> 主人姓名 </th>
                    <th> 主人手機 </th>
                    <th> 經手人員 </th>
                    <th> 收款日期 </th>
                    <th> 開始日期 </th>
                    <th> 結束日期 </th>
                    <th> 方案餘額 </th>
                    <th> 封 存    </th>
                </tr>
                </thead>

                <tbody>
                {
                    // pageOfItems.map( ( item : any , index ) => {
                    //
                    //     if( item === 3 ) return false ;  // 確認 3 怎麼從 Pagination 套件得出 2020.06.10
                    //
                    //     return <Services_Rows key={ index } data={ item } /> ;
                    //
                    // })
                }
                </tbody>

            </table>

            { /* 分頁按鈕 */ }
            <div style={{ marginTop:"70px", marginBottom:"150px" }}>
                <Pagination items={ filteredItems } onChangePage={ click_Pagination } />
            </div>


           </>

} ;

export default Plans