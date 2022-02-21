
import { useEffect , useState } from "react";
import usePagination from "hooks/layout/usePagination";
import Services_Rows from "components/services/Services_Rows";
import Pagination from "utils/Pagination";
import Plans from "components/plan/Plans";
import Contact_Customers from "components/contact_customers/Contact_Customers";
import { useSelector } from "react-redux";
import SearchBar from "templates/search/SearchBar";
import cookie from 'react-cookies'     // 匯入 cookie
import { useSearch_Bar } from "hooks/data/useSearch";

import Data_List_Sum from "templates/search/Data_List_Sum";
import Search_Type_Note from "templates/search/Search_Type_Note";


// React Hook Form
import { useForm } from "react-hook-form" ;
import { ICustomer } from "utils/Interface_Type";

import Date_Picker from "templates/form/Date_Picker";


const serviceArr = [
     { title : "洗 美" , icon : "fas fa-list-ol"  } ,
     { title : "方 案" , icon : "fas fa-file-alt" } ,
    //  { title : "客戶連繫" , icon : "fas fa-phone" } ,  // 先隱藏 2022.01.10
] ;


// 可搜尋關鍵字類型
const search_Types = [ "客戶姓名","客戶身分證字號","客戶手機號碼", "寵物名字", "寵物品種","服務類型","到店狀態" ] ;


// 關鍵字搜尋 : 過濾資料 _ 條件 ( for 洗澡、美容 )
const filter_Data = ( source : any[] , searchKeyword : string ) => {

  return source.filter( ( x : any ) => {

              // # 設置 _ 多種查詢條件
              let cus_Name     = x['customer']['name'].match(new RegExp(searchKeyword, 'gi'));         // 客戶_姓名
              let cus_Id       = x['customer']['id'].match(new RegExp(searchKeyword, 'gi'));           // 客戶_身分證號
              let cus_Mobile   = x['customer']['mobile_phone'].match(new RegExp(searchKeyword, 'gi')); // 客戶_手機號碼

              let pet_Name     = x['pet']['name'].match(new RegExp(searchKeyword, 'gi'));              // 寵物_名字
              let pet_Species  = x['pet']['species'].match(new RegExp(searchKeyword, 'gi'));           // 寵物_品種

              let shop_status  = x['shop_status'].match(new RegExp(searchKeyword, 'gi'));              // 處理狀態
              let service_type = x['service_type'].match(new RegExp(searchKeyword, 'gi'));             // 服務類型

              return !!cus_Name || !!cus_Id || !!cus_Mobile || !!pet_Name || !!pet_Species || !!shop_status || !!service_type ;

          })

} ;


/* @ 洗美頁面 ( 洗美資料、方案資料 ) */
const Services = () => {

    // 是否顯示 _ 所有資料
    const [ is_Show_All_Data , set_Is_Show_All_Data ] = useState( true ) ; 

    // 點選 _ 所有資料 / 來店日期
    const click_Data_Type = () => set_Is_Show_All_Data( !is_Show_All_Data ) ;
    
    // 到店日期
    const service_Date = useSelector( ( state : any ) => state.Info.service_Date ) ; 

    // ---------


    // 所輸入 : 搜尋關鍵字
    const [ searchKeyword , set_SearchKeyword ] = useState( '' ) ;

    // 取得 _ 搜尋框中的文字
    const get_Search_Text = ( value : string ) => set_SearchKeyword( value ) ;
 
    // ---------


    // 洗美頁資料 _ 是否下載中
    const Service_isLoading = useSelector( ( state : any ) => state.Service.Service_isLoading ) ;

    // 取得 _ 分頁資料
    const { pageOfItems , filteredItems , click_Pagination } = usePagination( "/services/show_with_cus_relative_pet/0" , 'service' ) ;

    // 目前 _ 所點選第 2 層選項
    const [ currentSecond , set_CurrentSecond ] = useState( serviceArr[0].title ) ;

    // 點選 _ 第 2 層選項
    const click_Second = ( title : string ) => set_CurrentSecond( title ) ;

    // 篩選資料 ( 依搜尋框輸入關鍵字 )
    const { data } = useSearch_Bar( filteredItems , filter_Data , searchKeyword ) ;

    // React Hook Form
    const { control } = useForm<ICustomer>({ mode : "all" }) ;

    
    // 二次篩選資料( 加入日期 )
    const [ fData , set_fData ] = useState( [] ) ;


    // 是否加入 _ 日期篩選條件
    useEffect( () => { 
    
      const _data = is_Show_All_Data ? data : data.filter( ( x:any ) => x['service_date'] === service_Date ) ;   
    
      set_fData( _data ) ;

    } , [ is_Show_All_Data , service_Date , data ] ) ;


    // 新增 "方案" 後，利用 Cookie 點選方案標籤
    useEffect( () => {

        // Cookie
        const redirect = cookie.load( 'after_Created_Plan' ) ;

        // * 服務價格
        if( redirect && redirect === '洗美_方案' ) click_Second( '方 案' ) ;
        
        // click_Second( '洗 美' ) ;

    } , [] ) ;

    return <>
               
                { /* 第 2 層選項 */
                    serviceArr.map( ( item , index ) => {

                        return <b key          = { index }
                                  className    = { "pointer tag is-medium is-success " + ( currentSecond === item.title ? "" : "is-light" )  }
                                  style        = { { marginRight:"30px" } }
                                  onClick      = { () => click_Second( item.title ) } >

                                  <i className = { item.icon }></i> &nbsp; { item.title }

                               </b>

                    })
                }

                { /* 篩選區塊*/ }   
                { currentSecond === '洗 美' &&                     

                    <div className="columns is-multiline is-variable is-12 m_Bottom_50">

                        { /* 所有資料 */ }   
                        <div className="column is-offset-4 is-1-desktop"> 

                        <b className = { `tag is-medium relative pointer ${ is_Show_All_Data ? 'is-primary' : '' }` } 
                            onClick   = { click_Data_Type }
                            style     = {{top:"-3px"}}> 
                            所有資料 
                        </b>   

                        </div>   

                        { /* 來店日期 */ }        
                        <div className="column is-2-desktop"> 

                        <div className="relative" style={{top:"-3px"}}>
                                
                                <b className = { `tag is-medium m_Left_15 m_Bottom_5 pointer ${ !is_Show_All_Data ? 'is-primary' : '' }` } 
                                    onClick  = { click_Data_Type } > 
                                來店日期 
                                </b>     
                                
                                { !is_Show_All_Data &&

                                    <div className="tag is-large is-white">
                                    <Date_Picker control={ control } name="service_Date" default_Date={ new Date } />
                                    </div>

                                } 

                            </div>

                        </div>   
                    
                        { /* 搜尋列 */ } 
                        <div className="column is-5-desktop">

                            { /* 可搜尋類型提示 */ }  
                            <Search_Type_Note search_Types={ search_Types } />

                            { /* 搜尋欄位 */ }
                            <SearchBar get_Search_Text = { get_Search_Text } /> 

                        </div>
                    
                    </div>   

                }

                { /* 洗美列表 */ }
                { currentSecond === serviceArr[0].title &&

                    <div className="relative" style={{width:"110%" , left:"-5%"}} >

                        { /* 資料筆數 */ } 
                        <Data_List_Sum data_Sum={ fData.length } />   

                        { /* 資料列表  */ }  
                        <table className="table is-fullwidth is-hoverable">

                            <thead>
                              <tr>
                                <th>  服務類別  </th>
                                <th>  寵物資訊  </th>
                                <th>  客戶姓名  </th>
                                {/* <th>  付款方式  </th> */}
                                <th>  服務說明  </th>
                                <th>  服務價格  </th>
                                <th>  個體調整  </th>
                                <th>  加價項目  </th>
                                <th>  加價美容  </th>
                                <th>  接送費    </th>
                                <th>  應 收     </th>
                                <th>  實 收     </th>
                                <th>  來 店     </th>
                                <th>  封 存     </th>
                              </tr>
                            </thead>

                            <tbody>

                                { Service_isLoading ||

                                    pageOfItems.map( ( item : any , index ) => {

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
                            <Pagination items={ fData ? fData : [] } onChangePage={ click_Pagination } />
                        </div>

                    </div>

                }

                { /* 方案列表  */ }
                { currentSecond === serviceArr[1].title &&  <Plans /> }

                { /* 客戶聯繫列表  */ }
                { /* { currentSecond === serviceArr[2].title && <Contact_Customers /> } */ } { /* 先隱藏 2022.01.10 */ }

           </>

};

export default Services ;
