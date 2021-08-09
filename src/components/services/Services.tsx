
import React, {useEffect, useState} from "react";
import usePagination from "hooks/layout/usePagination";
import Services_Rows from "components/services/Services_Rows";
import Pagination from "utils/Pagination";
import Plans from "components/plan/Plans";
import {useSelector} from "react-redux";


import cookie from 'react-cookies'     // 匯入 cookie


const serviceArr = [

     { title : "洗 美" , icon : "fas fa-list-ol"  } ,
     { title : "方 案" , icon : "fas fa-file-alt" } ,

] ;


/* @ 洗美頁面 ( 洗美資料、方案資料 ) */
const Services = () => {

    // 洗美頁資料 _ 是否下載中
    const Service_isLoading = useSelector( ( state:any ) => state.Service.Service_isLoading ) ;

    // 取得 _ 分頁資料
    const { pageOfItems , filteredItems , click_Pagination } = usePagination( "/services/show_with_cus_relative_pet/0" , 'service' ) ;

    // 排序後的分頁資料 ( 依照建立日期 'created_at' )
    const [ sort_Data , set_Sort_Data ] = useState<any[]>([]) ;


    // 目前 _ 所點選第 2 層選項
    const [ currentSecond , set_CurrentSecond ] = useState( serviceArr[0].title ) ;

    // 點選 _ 第 2 層選項
    const click_Second = ( title : string ) => set_CurrentSecond( title ) ;


    // 資料排序 : 新增時間 ( created_at ) 最新者，排在第一筆資料
    useEffect(( ) => {


    } ,[ pageOfItems ]) ;



    // 新增 "方案" 後，利用 Cookie 點選方案標籤
    useEffect(( ) => {

        // Cookie
        const redirect = cookie.load( 'after_Created_Plan' ) ;

        // * 服務價格
        if( redirect && redirect === '洗美_方案' ){
            click_Second('方 案' ) ;
        }

        // click_Second( '方 案' ) ;

    } , [] ) ;


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

                    <div className="relative" style={{width:"110%" , left:"-5%"}}>

                        <table className="table is-fullwidth is-hoverable">

                            <thead>

                              <tr>
                                <th>  消費類別  </th>
                                <th>  寵物資訊  </th>
                                <th>  客戶姓名  </th>
                                <th>  服務價格  </th>
                                <th>  加價項目  </th>
                                <th>  加價美容  </th>
                                <th>  接送費    </th>
                                <th>  小 計     </th>
                                <th>  付款方式  </th>
                                <th>  來店日期  </th>
                                <th>  消費歷史  </th>
                                <th>  封 存     </th>
                              </tr>

                            </thead>

                            <tbody>

                                { Service_isLoading ||

                                    pageOfItems.map( ( item : any , index ) => {

                                        if( item === 3 ) return false ;  // 確認 3 怎麼從 Pagination 套件得出 2020.06.10

                                        return <Services_Rows key={ index } data={ item } /> ;

                                    })

                                }

                            </tbody>

                        </table>

                        { /* 下載圖示  */ }
                        { Service_isLoading &&

                            <div className="has-text-centered" >
                                <br/><br/><br/><br/><br/><br/>
                                <button className="button is-loading is-white"></button>
                            </div>

                        }


                        { /* 分頁按鈕 */ }
                        <div style={{ marginTop:"70px", marginBottom:"150px" }}>
                            <Pagination items={ filteredItems } onChangePage={ click_Pagination } />
                        </div>

                    </div>

                }

                { /* 方案資料  */ }
                { currentSecond === serviceArr[1].title &&  <Plans /> }

           </>

};

export default Services ;
