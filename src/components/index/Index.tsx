
import React , { useEffect , useState }  from "react" ;
import Statistics_Rows from "components/index/Statistics_Rows"
import Status_Cards from "components/index/Status_Cards";
import { useRead_Service_Cus_Pet } from 'hooks/ajax_crud/useAjax_Read'
import useShopStatus_Sum from "hooks/data/useShopStatus_Sum";
import { useDispatch, useSelector } from "react-redux";
import { set_Detail_Mode } from "store/actions/action_Index"
import axios from "utils/axios";
import moment from "moment";
import { set_Side_Panel } from "store/actions/action_Global_Layout";
import Customer_Confirm from "components/index/list/Customer_Confirm"

import cookie from 'react-cookies'     // 匯入 cookie



const Index = ( ) => {

    const dispatch = useDispatch() ;

    // 美容師請求櫃台確認訊息
    const [ customer_Confirm , set_Customer_Confirm] = useState<any>( null ) ;

    // 使用者類別 ( Ex. 櫃台、美容 .... )
    const [ account , set_Account ] = useState({
                                                            employee_Type : '' , //  帳號類型( Ex.管理帳號、測試帳號、工作人員 )
                                                            position_Type : '' ,  // 職位類別( Ex. 櫃台、美容、接送 )
                                                            account       : '' ,  // 帳號名稱
                                                            employee_Name : '' ,  // 使用者姓名
                                                          }) ;

    // 首頁詳細模式 ( 展開所有統計資料 )
    const is_Detail_Mode = useSelector(( state : any ) => state.Index.is_Detail_Mode ) ;


    // 今日
    const today = moment( new Date() ).format('YYYY-MM-DD' ) ;

    // 取得資料 : 服務、客戶、寵物 ( 並只顯示 "今日" 資料 )
    const pet_Arr = useRead_Service_Cus_Pet().filter( x => x['service_date'] === today ) ;


    // 到店個階段，基礎、洗澡、美容數量
    const numObj_1 = useShopStatus_Sum("到店等候中"   , pet_Arr ) ;
    const numObj_2 = useShopStatus_Sum("到店美容中"   , pet_Arr ) ;
    const numObj_3 = useShopStatus_Sum("洗完等候中"   , pet_Arr ) ;
    const numObj_4 = useShopStatus_Sum("已回家( 房 )" , pet_Arr ) ;


    // 點選 _ 詳細模式
    const click_Detail_Mode      = () => dispatch( set_Detail_Mode( !is_Detail_Mode ) );

    // 點選 _ 檢視美容師請求櫃台確認訊息
    const click_Customer_Confirm = () => {

        // 打開右側面板
        dispatch( set_Side_Panel(true , <Customer_Confirm /> , { } ) ) ;

        // 修改 _ 確認狀態欄位 ( confirm_status : 由 "送交櫃台確認" ， 改為 "櫃台確認中" )
        if( customer_Confirm && customer_Confirm.length > 0 ){

            customer_Confirm.forEach( ( x:any ) => {

               // 狀態為 : "送交櫃台確認" 才修改
               if( x['confirm_status'] === '送交櫃台確認' ){

                   axios.put( `/customer_confirms/${ x['id'] }` , { 'confirm_status' : '櫃台確認中' } ) ;

               }

            })

        }

    } ;


    // 取得 _ 美容師請櫃檯確認訊息
    useEffect(( ) : any => {

      const today = moment( new Date ).format('YYYY-MM-DD' ) ;

      let is_Mounted = true ;

      // 每隔 4 秒，發出 post 請求 :
      const interval = setInterval(( ) => {

              axios.get( `/customer_confirms/show_by_service_date/${ today }` ).then( res => {

                  if( is_Mounted && res.data.length > 0 ){

                     const filter = res.data.filter( ( x : any ) => ( x['confirm_status'] === '送交櫃台確認' || x['confirm_status'] === '櫃台確認中' )  ) ;
                     set_Customer_Confirm( filter ) ;

                  }else{

                     set_Customer_Confirm(null) ;

                  }


              }).catch( error => {

                  console.log('首頁 _ 客戶確認訊息發生錯誤') ;
                  clearInterval( interval) ;

              });

          } , 3000 ) ;

      return ( ) => ( is_Mounted = false ) ;


    } , [] ) ;


    // 取得 : Cookie ( 使用者帳號資訊 )
    useEffect(( ) => {

        // 設定 _ 使用者類別
        const _cookie = cookie.load('userInfo') ;

        if( _cookie ){

            set_Account({ ...account ,
                                  employee_Type : _cookie['employee_type'] ,
                                  position_Type : _cookie['position_type'] ,
                                  account       : _cookie['account'] ,
                                  employee_Name : _cookie['employee_name'] ,
                               }) ;

        }

    } ,[]) ;


    const member  = {
            width         : "260px" ,
            top           : "0px" ,
            right         : "-3%" ,
            padding       : "13px",
            paddingBottom : "3px" ,
            boxShadow     : "0px 0px 4px 0px rgba(0,0,0,.1)" ,
            borderRadius  : "5px" ,
         } ;

    const card = { padding : "5px" } ;

    const confirm = { top: "-1vh" , left : "20%", width:"60%" , boxShadow : "0px 1px 4px 0px rgba(0,0,0,.2)" } as any ;

    return <div className="is-hidden-mobile">

                { /* 美容師請求櫃台確認訊息 */ }
                { ( customer_Confirm && customer_Confirm.length > 0 ) &&

                    <b className="tag is-large is-danger absolute is-rounded pointer" style={ confirm } onClick={ click_Customer_Confirm } >

                        <i className="far fa-comment-dots"></i> &nbsp; 美容師 _ 欲確認 &nbsp;

                        <b className="tag is-medium is-white is-rounded">  { customer_Confirm[0]['confirm_item_title'] } </b>

                        &nbsp; &nbsp;  { customer_Confirm.length > 1 ? <> (  1 / { customer_Confirm.length }  ) </> : '' } &nbsp; &nbsp;
                        <span className="f_11 relative" style={{top:"2px"}} >
                           { customer_Confirm.length > 1 ? <> 第一則 </> : '' } 發送時間 : { customer_Confirm[0]['created_at'].slice(10,16) }
                        </span>

                    </b>

                }

                { /*  今日值班人員  */ }
                <div className="absolute" style = { member } >

                    { /* 使用者名稱 / 暱稱 */ }
                    { ( account['employee_Name'] || account['account']  ) &&

                        <span className="m_Bottom_15" >
                            <b className="fDred"> { account['employee_Name'] ? account['employee_Name'] : account['account']  } </b>
                            ( { account['position_Type'] ? account['position_Type'] : account['employee_Type'] } ) &nbsp; 您好 :
                        </span>

                    }

                    { /* 設定 _ 詳細模式 */ }
                    <b className="f_18 relative pointer" style={{ float:"right", top:"-5px" }} onClick={ click_Detail_Mode }>

                        { is_Detail_Mode  && <i className="fas fa-toggle-on"></i>  }
                        { !is_Detail_Mode && <i className="fas fa-toggle-off"></i>  }

                    </b>

                    { is_Detail_Mode &&

                        <> <br/>
                            <i className="fas fa-user m_Bottom_20 m_Top_20" ></i> &nbsp; <b>今日值班人員 </b>
                            &nbsp; &nbsp; <b className="tag is-warning">  <i className="far fa-calendar-alt"></i> &nbsp; 班表 </b><br/>
                            <b className="tag m_Bottom_10"> 櫃 台 </b> &nbsp; 小婷、宜芳 <br/>
                            <b className="tag m_Bottom_10"> 接 送 </b> &nbsp; 阿財 <br/>
                            <b className="tag m_Bottom_20"> 美容師</b> &nbsp; 晨薇、馨慧
                        </>

                    }

                </div>

                { /* 今日來店、今日統計 */ }

                { is_Detail_Mode &&  <Statistics_Rows /> }

                <br/><br/><br/><br/>

                {/* 今日服務 _ 各階段狀態  */}
                <div className="columns is-mobile  is-multiline relative" style={{ width:"110%" , left:"-4%" }}>

                    {/* 到店等候中 */}
                    <div className="column is-3-desktop" style={ card }>
                        <Status_Cards  pet_Arr = { pet_Arr }  shop_Status = "到店等候中"  service_Sum = { numObj_1 } />
                    </div>

                    {/* 到店美容中 */}
                    <div className="column is-3-desktop" style={ card }>
                        <Status_Cards  pet_Arr = { pet_Arr }  shop_Status = "到店美容中" service_Sum = { numObj_2 } />
                    </div>

                    {/* 洗完等候中 */}
                    <div className="column is-3-desktop" style={ card }>
                        <Status_Cards  pet_Arr = { pet_Arr } shop_Status = "洗完等候中" service_Sum = { numObj_3 } />
                    </div>

                    {/* 已回家( 房 )  */}
                    <div className="column is-3-desktop" style={ card }>
                        <Status_Cards  pet_Arr = { pet_Arr } shop_Status = "已回家( 房 )" service_Sum = { numObj_4 } />
                    </div>

                </div> <br/>

           </div>

};

export default Index