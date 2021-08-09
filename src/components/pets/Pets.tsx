import React , { FC } from "react" ;

// 分頁套件、呼叫邏輯
import usePagination from "hooks/layout/usePagination" ;
import Pagination from "utils/Pagination" ;

// 資料列
import Pets_Rows from "components/pets/Pets_Rows" ;
import {useSelector} from "react-redux";





/* @ 寵物頁面 */
const Pets = () => {

    // 寵物頁資料 _ 是否下載中
    const Pet_isLoading = useSelector( ( state:any ) => state.Pet.Pet_isLoading ) ;

    // 取得 _ 分頁資料
    const { pageOfItems , filteredItems , click_Pagination } = usePagination('/pets/show_pets_customers_relatives/0' , 'pet' ) ;


  return <>

            <table className="table is-fullwidth is-hoverable">

              <thead>
                <tr>
                  <th> 寵物資訊 </th>
                  <th style={{height:"10px",width:"100px"}}> 寵物編號 </th>
                  <th> 消費歷史 </th>
                  <th> 主人姓名 </th>
                  <th> 主人手機 </th>
                  <th style={{width:"100px"}}> <b className="fBlue">單次</b>洗澡 </th>
                  <th style={{width:"100px"}}> <b className="fBlue">單次</b>美容 </th>
                  <th style={{width:"100px"}}> <b className="fBlue">包月</b>洗澡 </th>
                  <th style={{width:"100px"}}> <b className="fBlue">包月</b>美容 </th>
                  <th> 封 存  </th>
                </tr>
              </thead>

              <tbody>

                { Pet_isLoading ||

                  pageOfItems.map( ( item : any , index ) => {

                    if( item === 3 ) return false ;  // 確認 3 怎麼從 Pagination 套件得出 2020.06.10

                    return <Pets_Rows key={ index } data={ item } />

                  })

                }

              </tbody>

            </table>

            { /* 下載圖示  */ }
            { Pet_isLoading &&

                <div className="has-text-centered" >
                    <br/><br/><br/><br/><br/><br/>
                    <button className="button is-loading is-white"></button>
                </div>

            }


            { /* 分頁按鈕 */ }
            <div style={{ marginTop:"70px", marginBottom:"150px" }}>
              <Pagination items={ filteredItems } onChangePage={ click_Pagination } />
            </div>

         </>


} ;

export default Pets ;
