
import React, {useState , useEffect} from "react" ;
import Lodge_Rows from "components/lodge/Lodge_Rows";
import Pagination from "utils/Pagination";
import {useSelector} from "react-redux";
import usePagination from "hooks/layout/usePagination";
import Care from 'components/lodge/care/Care'
import cookie from "react-cookies";


const lodgeArr = [

    { title : "住 宿" , icon : "fas fa-home"  } ,
    { title : "安 親" , icon : "fas fa-baby-carriage"  } ,

] ;


/* @ 住宿頁面 ( 住宿資料、安親資料 ) */
const Lodge = () => {

    // 住宿頁資料 _ 是否下載中 ( 再修改為 住宿 2021.08.12 )
    const Lodge_isLoading = useSelector( ( state:any ) => state.Lodge.Lodge_isLoading ) ;

    // 取得 _ 分頁資料 ( 再修改為 住宿 2021.08.12  )
    const { pageOfItems , filteredItems , click_Pagination } = usePagination( "/lodges/show_with_cus_relative_pet/0" , 'lodge' ) ;


    // 目前 _ 所點選第 2 層選項
    const [ currentSecond , set_CurrentSecond ] = useState( lodgeArr[0].title ) ;

    // 點選 _ 第 2 層選項
    const click_Second = ( title : string ) => set_CurrentSecond( title ) ;

    // 新增 "安親" 後，藉由 cookie，重導向、點選 _ 安親頁籤
    useEffect(( ) => {

        // Cookie
        const redirect = cookie.load('after_Created_Care') ;

        // * 點選 _ 安親頁籤
        if( redirect && redirect === '住宿_安親' ){
            click_Second('安 親' ) ;
        }

        click_Second('安 親' ) ;

    } , [] ) ;

    return <>

                { /* 第 2 層選項 */
                    lodgeArr.map( ( item , index ) => {

                        return <b key       = {index}
                                  className = { "pointer tag is-medium is-success " + ( currentSecond === item.title ? "" : "is-light" )  }
                                  style     = {{ marginRight:"30px" }}
                                  onClick   = { () => click_Second( item.title ) } >

                                  <i className={ item.icon }></i> &nbsp; { item.title }

                               </b>

                    })
                }

               <br/><br/><br/>

               { /* 住宿資料 */ }
               { currentSecond === lodgeArr[0].title &&

                    <>

                        <table className="table is-fullwidth is-hoverable relative" style={{ width:"110%" , left:"-5%" }}>

                            <thead>

                                <tr>

                                    <th> 寵物資訊 </th>
                                    <th> 客戶姓名 </th>
                                    <th> 房號 ( 房型 ) </th>
                                    <th> <span className="fDblue" >入住</span> : 日期 / 時間 </th>
                                    <th> <span className="fDblue" >退房</span> : 日期 / 時間 </th>
                                    <th> 總天數   </th>
                                    <th> 住宿價格 </th>
                                    <th> 洗澡價格 </th>
                                    <th> 美容價格 </th>
                                    <th> 接送費 </th>
                                    <th>  封 存  </th>

                                </tr>

                            </thead>

                            <tbody>

                                { Lodge_isLoading ||

                                    pageOfItems.map( ( item : any , index ) => {

                                        if( item === 3 ) return false ;  // 確認 3 怎麼從 Pagination 套件得出 2020.06.10

                                        return <Lodge_Rows key={ index } data={ item } /> ;

                                    })

                                }

                            </tbody>

                        </table>

                        { /* 下載圖示  */ }
                        { Lodge_isLoading &&

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

                }



               { /* 安親資料 */ }
               { currentSecond === lodgeArr[1].title &&  <Care />  }


           </>

};

export default Lodge ;
