
import React, {useState} from "react" ;
import usePagination from "hooks/layout/usePagination";
import Services_Rows from "components/services/Services_Rows";
import Pagination from "utils/Pagination";
import Plans from "components/services/plans/Plans";


const serviceArr = [

     { title : "洗美資料" , icon : "fas fa-list-ol"  } ,
     { title : "方案資料" , icon : "fas fa-file-alt"  } ,

] ;



/* @ 洗美頁面 */
const Services = () => {

    // 取得 _ 分頁資料
    const { pageOfItems , filteredItems , click_Pagination } = usePagination( "/services/show_with_cus_pet/" ) ;

    // 目前 _ 所點選第 2 層選項
    const [ currentSecond , set_CurrentSecond ] = useState( serviceArr[0].title ) ;

    // 點選 _ 第 2 層選項
    const click_Second = ( title : string ) => set_CurrentSecond( title ) ;


    return <>

                { /* 第 2 層選項 */
                    serviceArr.map( ( item , index ) => {

                        return <b key       = {index}
                                  className = { "pointer tag is-medium is-success " + ( currentSecond === item.title ? "" : "is-light" )  }
                                  style     = {{ marginRight:"30px" }}
                                  onClick   = { () => click_Second( item.title ) } >

                                  <i className={ item.icon }></i> &nbsp; { item.title }

                               </b>

                    })
                }

                <br/><br/><br/>

                { /* 洗美資料 */ }
                { currentSecond === serviceArr[0].title &&

                    <>

                        <table className="table is-fullwidth is-hoverable">

                            <thead>
                            <tr>
                                <th> 消費類別                          </th>
                                <th> 寵物資訊                          </th>
                                <th style={{ width:"80px" }}> 價 格    </th>
                                <th > 來店日期 </th>
                                <th style={{ width:"80px" }}> Q 碼     </th>
                                <th style={{ width:"150px" }}> 到店狀態 </th>
                                <th style={{ width:"110px" }}> 來店方式 </th>
                                <th> 消費歷史                          </th>
                                <th>  封 存  </th>
                            </tr>
                            </thead>

                            <tbody>
                            {
                                pageOfItems.map( ( item : any , index ) => {

                                    if( item === 3 ) return false ;  // 確認 3 怎麼從 Pagination 套件得出 2020.06.10

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

                }

                { /* 方案資料  */ }
                { currentSecond === serviceArr[1].title &&  <Plans /> }

           </>

};

export default Services ;
