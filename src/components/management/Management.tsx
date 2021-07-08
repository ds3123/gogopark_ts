
import React, {useEffect, useState} from "react" ;

import useMulti_NavOptions from "hooks/layout/useMulti_NavOptions";

// 各頁面元件
import Daily_Report from "components/management/finance/Daily_Report";
import Cash_Report from "components/management/finance/Cash_Report";
import Online_Pay from "components/management/finance/Online_Pay";
import Employees from "components/employees/Employees";
import {useDispatch, useSelector} from "react-redux";

import { set_Current_Second_Tab } from 'store/actions/action_Management'


/* @ 管理頁面  */
const Management = () => {

    const dispatch = useDispatch() ;

    // 目前須點選的第 2 層標籤
    const _Current_Second_Tab = useSelector( ( state : any ) => state.Management.Current_Second_Tab ) ;

    // 取的 : 第 2、3 層選項相關資訊
    const { Second_Nav , Third_Nav , currentSecond , currentThird , click_Second , click_Third } = useMulti_NavOptions();

    // 顯示 _ 頁面元件
    const show_PageComponent = ( title : string ) : JSX.Element | null => {

        switch( title ) {

            // 第二層
            case '員工管理' : return <Employees/>    ; break ;

            // 第三層
            case '日報表'   : return <Daily_Report/> ; break ;
            case '現金帳'   : return <Cash_Report/>  ; break ;
            case '線上支付' : return <Online_Pay/>   ; break ;

            default : return null ;

        }

    } ;


    // 點選 _ 第二層頁籤
    useEffect(( ) : any => {

       if( _Current_Second_Tab ){

           click_Second( _Current_Second_Tab ) ;

       }else{

           click_Second( '財務管理' ) ;

       }

    } ,[ _Current_Second_Tab ] ) ;


    return <>

             <div>

                 { /* 第 2 層選項 */
                    Second_Nav.map( ( item , index ) => {

                        return <b key       = {index}
                                  className =  { "pointer tag is-medium is-success " + ( currentSecond === item.title ? "" : "is-light" )  }
                                  style     = {{ marginRight:"30px" }}
                                  onClick   = { () => click_Second( item.title ) } >
                                  <i className={ item.icon }></i> &nbsp; { item.title }
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
