
import React, {useEffect, useState , FC , useMemo, useCallback} from "react" ;
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import {Link, useHistory} from "react-router-dom";


// Cookie
import cookie from 'react-cookies'     // 匯入 cookie

import { get_Today } from 'utils/time/date' ;

import Create_Data_Container from "containers/Create_Data_Container";
import Nav_Qcode_List from "components/services/Nav_Qcode_List";

// React-Toastify
import { toast } from "react-toastify";

// Redux
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;


interface IOptionObj {
    title : string ;
    url   : string ;
    color : string ;
    icon  : string ;
}



// # 導覽列 _ 選項
const Nav_Options = () => {

    // 使用者類別 ( Ex. 櫃台、美容 .... )
    const [ account , set_Account ] = useState({
                                                            employee_Type : '' , // 帳號類型( Ex.管理帳號、測試帳號、工作人員 )
                                                            position_Type : ''   // 職位類別( Ex. 櫃台、美容、接送 )
                                                          }) ;

    const history  = useHistory();
    const dispatch = useDispatch() ;
    let location   = useLocation() ;  // 取得 : 路徑資訊


    // 根據 cookie 取得的 positionType , 運算取得功能選項 ( 利用 useMemo 優化，再判斷是否有必要 2021.07.17 )
    const get_OptionArr = useMemo( ( ) => {

        // 頁面選項
        const OptionArr : IOptionObj[] = [

            { title : "首 頁"  , url : "/index"           , color : "is-white"   , icon : "fas fa-home"  } ,
            { title : "客 戶"  , url : "/customers"  , color : "is-warning" , icon : "fas fa-user"  } ,
            { title : "寵 物"  , url : "/pets"       , color : "is-warning" , icon : "fas fa-dog"  } ,
            { title : "洗 美"  , url : "/services"   , color : "is-success" , icon : "fas fa-bath"  } ,
            { title : "住 宿"  , url : "/lodge"      , color : "is-success" , icon : "fas fa-home"  } ,
            { title : "美容師" , url : "/beautician" , color : "is-danger"  , icon : "fas fa-cut"  } ,
            { title : "管理區" , url : "/management" , color : ""           , icon : "fas fa-sliders-h"  } ,

        ] ;

        const filter_Manage = OptionArr ;
        const filter_Test   = OptionArr ;
        const filter_Admin  = OptionArr.filter( x => ( x['title'] !== '美容師' && x['title'] !== '管理區'  ) ) ;
        const filter_Beauty = OptionArr.filter( x => ( x['title'] === '美容師' ) ) ;
        const filter_Pickup = OptionArr.filter( x => ( x['title'] === '美容師' ) ) ;

        let _OptionArr : any[] = [] ;

        const Employee = account['employee_Type'] ;
        const Position = account['position_Type'] ;

        switch ( true ) {

            case Employee === '管理帳號' :
                _OptionArr = filter_Manage ; break ;

            case Employee === '測試帳號' :
                _OptionArr = filter_Test ; break ;

            case Position === '櫃台' || Position === '計時櫃台'  :
                _OptionArr = filter_Admin ; break ;

            case Position === '美容' || Position === '計時美容' :
                _OptionArr = filter_Beauty ; break ;

            case Position === '接送' || Position === '計時接送' :
                _OptionArr = filter_Pickup ; break ;

        }

        return _OptionArr ;

    } , [ account ] ) ;


    // 點選 _ 登出鈕
    const click_SignOut = ( ) => {

        // 刪除 cookie
        cookie.remove( 'userInfo' ,{ path : '/' } );

        cookie.remove( 'after_Created_Redirect' ,{ path : '/' } );

        // 通知
        toast(`🦄 登出成功`, { position: "top-left", autoClose: 1500 , hideProgressBar: false,});

        // 轉址
        history.push('/');

    } ;

    // 顯示 _ Q code 面板
    const show_Qcode = () => dispatch( set_Side_Panel(true , <Nav_Qcode_List /> , { preLoadData : null } ) );

    // 顯示 _ 新增資料面板
    const add_Data = () => dispatch( set_Side_Panel(true , <Create_Data_Container /> , { create_Data : '洗澡' , preLoadData : null } ) ) ;

    useEffect(() => {

        // 設定 _ 使用者類別
        const _cookie = cookie.load('userInfo') ;

        if( _cookie ){

            set_Account({ ...account ,
                                  employee_Type : _cookie['employee_type'] ,
                                  position_Type : _cookie['position_type'] ,
                              }) ;

            // "美容"、"計時美容"，前往 : 【 美容頁面 ( ~ /beautician ) 】
            if( _cookie['position_type'] === '美容' || _cookie['position_type'] === '計時美容' ) history.push('/beautician') ;

        }

        // add_Data() ;
        // show_Qcode() ;

    } ,[] ) ;


   return  <div id="navbarExampleTransparentExample" className="is-hidden-mobile">

               <b className="absolute"> { account['employee_Type'] } _ { account['position_Type'] } </b>

               <div className="navbar-start relative" style={{ top:"34%" , left:"30px" }} >

                   {
                     /* 業務功能頁面 */
                     get_OptionArr.map( ( option , index ) => {

                        const optionStyle = option.url === location.pathname ? { boxShadow : "1px 1px 5px 1px rgba(0,0,0,.6)" , borderRadius : "3px" } : {} ;

                        return <span key={ index }>
                                 <Link to={ option.url }>
                                   <span style     = { optionStyle }
                                         className = { "tag is-medium is-rounded relative pointer "+option.color } >
                                         <i className={ option.icon }></i> &nbsp; { option.title }
                                   </span> &nbsp; &nbsp;
                                 </Link>
                               </span>


                     })

                   }

                   {/* 功能按鈕 */}
                   <span style={{ marginLeft : '20px' }}>

                      {  ( account['employee_Type'] === '管理帳號' ||
                           account['employee_Type'] === '測試帳號' ||
                           account['position_Type'] === '櫃台' ||
                           account['position_Type'] === '計時櫃台' )  &&

                           <>

                               <span className="pointer tag is-medium is-rounded" onClick={ () => show_Qcode() } style={{ background : "rgb(150,0,0)" , color : "white" }}>
                                    <i className="fab fa-quora"></i> &nbsp; ( { get_Today().slice(4,8) } )
                                </span> &nbsp; &nbsp;

                               <span className="pointer tag is-medium is-black is-rounded"  onClick={ () => add_Data() }> <i className="fas fa-plus"></i> &nbsp; 新增資料  </span>

                               &nbsp; &nbsp; &nbsp;
                           </>

                      }

                       { /*  登出鈕  */ }
                       <b className="tag is-medium is-rounded pointer relative" style={{ right : '-30px' }} onClick={ click_SignOut }>
                           <i className="fas fa-sign-out-alt"></i>
                       </b>


                   </span>

               </div>

           </div>

} ;

export default Nav_Options  ;

