
import React from "react" ;
import usePagination from "hooks/layout/usePagination";
import Services_Rows from "components/services/Services_Rows";
import Pagination from "utils/Pagination";


/* @ 洗美頁面 */
const Services = () => {

    // 取得 _ 分頁資料
    const { pageOfItems , filteredItems , click_Pagination } = usePagination( "/services/show_with_cus_pet/" ) ;

    return <>

             <table className="table is-fullwidth is-hoverable">

                <thead>
                    <tr>
                        <th> 消費類別                          </th>
                        <th> 寵物資訊                          </th>
                        <th> 消費歷史                          </th>
                        <th style={{ width:"80px" }}> 價 格    </th>
                        <th > 來店日期 </th>
                        <th style={{ width:"80px" }}> Q 碼     </th>
                        <th style={{ width:"150px" }}> 到店狀態 </th>


                        <th style={{ width:"110px" }}> 來店方式 </th>
                        <th>  封 存  </th>
                    </tr>
                </thead>

                <tbody>
                  {
                    pageOfItems.map( ( item : any , index ) => {
                        return <Services_Rows key={ index } data={ item } /> ;
                    })
                  }
                </tbody>

             </table>

             { /* 分頁按鈕 */ }
             <div style={{ marginTop:"70px", marginBottom:"150px" }}>
                <Pagination items={ filteredItems } onChangePage={ click_Pagination } />
             </div>

           </>

};

export default Services ;
