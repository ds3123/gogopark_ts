
import React from "react"
import usePagination from "hooks/layout/usePagination";
import Plans_Rows from "components/plan/Plans_Rows";
import Pagination from "utils/Pagination";


/* @ 方案頁面 */
const Plans = ( ) => {

    // 取得 _ 分頁資料
    // const { pageOfItems , filteredItems , click_Pagination } = usePagination( "/services/show_with_cus_pet/" ) ;
    const { pageOfItems , filteredItems , click_Pagination } = usePagination( "/plans/show_all_with_customer_species_records/" ) ;



    return <>

            <table className="table is-fullwidth is-hoverable">

                <thead>
                   <tr>
                      <th> 方案類型 </th>
                      <th> 客戶資訊 </th>
                      <th> 寵物品種 </th>
                      <th> 方案價格 </th>
                      <th> <b className="fDred">收款</b>日期 </th>
                      <th> <b className="fDblue">開始</b>日期 </th>
                      <th> <b className="fDblue">結束</b>日期 </th>
                      <th> 使用情形 </th>

                      <th> 封 存    </th>
                    </tr>
                </thead>

                <tbody>

                    {
                        pageOfItems.map( ( item : any , index ) => {

                            if( item === 3 ) return false ;  // 確認 3 怎麼從 Pagination 套件得出 2020.06.10

                            return <Plans_Rows key={ index } data={ item } /> ;

                        })
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