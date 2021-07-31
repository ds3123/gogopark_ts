
import React, { useEffect , useState } from "react" ;

import useMulti_NavOptions from "hooks/layout/useMulti_NavOptions";

// 各頁面元件
import Daily_Report from "components/management/finance/Daily_Report";
import Cash_Report from "components/management/finance/Cash_Report";
import Online_Pay from "components/management/finance/Online_Pay";

import Species_Price_List from "components/management/price/Species_Price_List";

import Service_Price from "components/management/price/service_type/Service_Price";
import Basic_Price from "components/management/price/service_type/Basic_Price";
import Bath_Price from "components/management/price/service_type/Bath_Price";
import Beauty_Price from "components/management/price/service_type/Beauty_Price";
import Care_Price from "components/management/price/service_type/Care_Price";
import Lodge_Price from "components/management/price/service_type/Lodge_Price";
import Extra_Item_Price from "components/management/price/service_type/Extra_Item_Price";
import Extra_Beauty_Price from "components/management/price/service_type/Extra_Beauty_Price";

import Employees from "components/management/employee/Employees";
import Species_List from "components/management/setting/species/Species_List";

import cookie from 'react-cookies'     // 匯入 cookie


/* @ 管理頁面  */
const Management = () => {


    // 取的 : 第 2、3 層選項相關資訊
    const { Second_Nav , Third_Nav , currentSecond , currentThird , click_Second , click_Third } = useMulti_NavOptions();

    // 顯示 _ 頁面元件
    const show_PageComponent = ( title : string ) : JSX.Element | null => {

        switch( title ) {

            // # 第二層
            case '員工管理' : return <Employees/>    ; break ;

            // # 第三層
            // * 財務管理
            case '日報表'   : return <Daily_Report/> ; break ;
            case '現金帳'   : return <Cash_Report/>  ; break ;
            case '線上支付' : return <Online_Pay/>   ; break ;

            // * 價格管理
            case '品種價格' : return <Species_Price_List/> ; break ;
            // case '服務價格' : return <Service_Price/>      ; break ;  // 所有服務價格

            case '基礎' : return <Basic_Price/>  ; break ;
            case '洗澡' : return <Bath_Price/>   ; break ;
            case '美容' : return <Beauty_Price/> ; break ;
            case '安親' : return <Care_Price/>   ; break ;
            case '住宿' : return <Lodge_Price/>  ; break ;

            case '加價項目' : return <Extra_Item_Price/>    ; break ;
            case '加價美容' : return <Extra_Beauty_Price/>  ; break ;

            // * 系統設定
            case '寵物品種' : return <Species_List />  ; break ;

            default : return null ;

        }

    } ;

    // 新增資料後，藉由 cookie，重導向至相對應的區塊頁面
    useEffect(( ) : any => {

       // Cookie
       const redirect = cookie.load('after_Created_Redirect') ;

       // # 價格管理 :

       // * 服務價格
       if( redirect && redirect === '價格管理_品種價格' ){
          click_Second('價格管理' ) ;
          click_Third('品種價格') ;
       }

       // * 基礎
       if( redirect && redirect === '價格管理_基礎' ){
          click_Second('價格管理' ) ;
          click_Third('基礎') ;
       }

       // * 洗澡
       if( redirect && redirect === '價格管理_洗澡' ){
            click_Second('價格管理' ) ;
            click_Third('洗澡') ;
       }

       // * 美容
       if( redirect && redirect === '價格管理_美容' ){
            click_Second('價格管理' ) ;
            click_Third('美容') ;
       }

       // * 安親
       if( redirect && redirect === '價格管理_安親' ){
            click_Second('價格管理' ) ;
            click_Third('安親') ;
       }

       // * 住宿
       if( redirect && redirect === '價格管理_住宿' ){
            click_Second('價格管理' ) ;
            click_Third('住宿') ;
       }

        // * 加價項目
        if( redirect && redirect === '價格管理_加價項目' ){
            click_Second('價格管理' ) ;
            click_Third('加價項目') ;
        }

        // * 加價美容
        if( redirect && redirect === '價格管理_加價美容' ){
            click_Second('價格管理' ) ;
            click_Third('加價美容') ;
        }





       // # 系統設定 :

       // * 寵物品種
       if( redirect && redirect === '系統設定_寵物品種' ){
            click_Second('系統設定' ) ;
            click_Third('寵物品種') ;
       }

       // --------------------------------------------------------------

       // 暫時
       if( !redirect ){
          click_Second('價格管理' ) ;
          click_Third('品種價格' ) ;
       }

    } ,[] ) ;




    return <>

             <div>

                 { /* 第 2 層選項 */
                    Second_Nav.map( ( item , index ) => {

                        return <b key       = {index}
                                  className =  { "pointer tag is-medium is-success " + ( currentSecond === item.title ? "" : "is-light" )  }
                                  style     = {{ marginRight:"30px" }}
                                  onClick   = { () => click_Second( item.title ) } >
                                  <i className = { item.icon }></i> &nbsp; { item.title }
                               </b>

                    })
                 }

             </div>

             { currentThird &&

                <>

                    <br/><br/>

                     { /* 第 3 層選項 */
                         Third_Nav.map( ( item , index ) => {

                            return <b key       = {index}
                                      className = { "pointer tag is-medium " + ( currentThird === item ? "is-info" : "is-white" ) }
                                      style     = {{ marginRight:"30px" }}
                                      onClick   = { () => click_Third( item ) } >  { item　}
                                    </b>

                        })
                     }

                    <br/>

                </>

             }

             <br/><hr/><br/>

             { /* 管理專區 _ 各分類頁面元件 */ }

             { /* 第二層 */ }
             { currentSecond && show_PageComponent( currentSecond ) }

             { /* 第三層 */ }
             { currentThird && show_PageComponent( currentThird ) }

           </>

} ;

export default Management ;
