import React, {useEffect, useState} from "react"
import useServiceType from "hooks/layout/useServiceType";
import usePet_Button from "hooks/layout/usePet_Button";
import {set_Side_Panel} from "store/actions/action_Global_Layout";
import Service_History from "./Service_History";
import {useDispatch} from "react-redux";

import Update_Service from "components/services/edit/Update_Service";
import Update_Customer from "components/customers/edit/Update_Customer";
import {useLocation} from "react-router";
import {useHistory} from "react-router-dom";
import axios from "../../utils/axios";
import {toast} from "react-toastify";
import cookie from "react-cookies";






const Services_Rows = ( props : any ) => {

    const { data } = props ;
    const customer = data['customer'] ;

    const url      = useLocation().pathname;
    const history  = useHistory() ;

    try{

        customer.customer_relation = [ data['customer_relative'] ] ; // 配合 <Update_Customer />，關係人屬性名稱，改為 'customer_relation'

    }catch(e){

        console.log( '客戶關係人發生錯誤' )

    }


    const [ pet , set_Pet ] = useState<any>( {} ) ;

    const dispatch = useDispatch() ;

    // 服務 ( 基礎、洗澡、美容 ) : 基本費用、加價項目費用、加價美容費用、接送費
    const [ price , set_Price ] = useState({
                                                         service      : 0 ,
                                                         extra_Item   : 0 ,
                                                         extra_Beauty : 0 ,
                                                         pickup       : 0 ,
                                                      } ) ;

    // 服務單欄位 _ 顏色、Icon
    const { color , icon }  = useServiceType( data[ 'service_type' ] , false , 'medium' );

    // * 寵物按鈕
    const petButton = usePet_Button([ pet ] ) ;


    // 點選 _ 服務單
    const click_Service  = () => dispatch( set_Side_Panel(true , <Update_Service /> , { service_Type : data['service_type'] ,  preLoadData : data } as { service_Type : string } ) ) ;

    // 點選 _ 客戶
    const click_Customer = () => dispatch( set_Side_Panel(true , <Update_Customer /> , { preLoadData : customer } ) ) ;

    // 點選 _ 消費歷史
    const click_History  = () => dispatch( set_Side_Panel(true , <Service_History /> , { preLoadData : data } ) ) ;


    // 取得個服務單資料表 id
    const get_Service_Id = ( data : any ) => {

        let url        = '' ; // 服務單路徑
        let id = '' ; // 服務單 id

        if( data['service_type'] === '基礎' ) { id = data['basic_id'] ;  url = '/basics' } ;
        if( data['service_type'] === '洗澡' ) { id = data['bath_id'] ;   url = '/bathes' } ;
        if( data['service_type'] === '美容' ) { id = data['beauty_id'] ; url = '/beauties' } ;

        return { url , id } ;

    } ;


    // ------------------------------------------

    // 點選 _ 封存資料
    const click_Archive = ( data : any ) => {

        const { url , id } = get_Service_Id( data ) ;

        axios.put( `${ url }/${ id }` , { is_archive : 1 } ).then( res => {

            toast(`🦄 資料已封存`, { position : "top-left", autoClose : 1500 , hideProgressBar : false });

            history.push("/wrongpath");  // 錯誤路徑
            history.push("/services");  // 正確路徑

        }) ;


    } ;

    // 點選 _ 復原封存資料
    const click_Undo_Archive = ( data : any  ) => {

        const { url , id } = get_Service_Id( data ) ;

        axios.put( `${ url }/${ id }` , { is_archive : 0 } ).then( res => {

            toast(`🦄 資料已復原封存`, { position : "top-left", autoClose : 1500 , hideProgressBar : false });


            // 設定 cookie ( for 前往 : 價格管理 > 服務價格 / 5 秒後銷毀 )
            cookie.save( 'after_Edit_Archive' , '洗美'  ,  { path : '/' , maxAge : 5 } ) ;

            history.push("/wrongpath");  // 錯誤路徑
            history.push("/management");  // 正確路徑

        }) ;

    } ;

    // 點選 _ 刪除資料
    const click_Delete = ( data : any  ) => {

        const { url , id } = get_Service_Id( data ) ;

        axios.delete( `${ url }/${ id }` ).then( res => {

            toast(`🦄 資料已刪除`, { position : "top-left", autoClose : 1500 , hideProgressBar : false });

            // 設定 cookie ( for 前往 : 價格管理 > 服務價格 / 5 秒後銷毀 )
            cookie.save( 'after_Edit_Archive' , '洗美'  ,  { path : '/' , maxAge : 5 } ) ;

            history.push("/wrongpath");  // 錯誤路徑
            history.push("/management");  // 正確路徑

        }) ;


    } ;

    useEffect( () => {

          // 有些服務單，沒有寵物 ( null ) 2021.06.10 再確認查詢式
          if( data['pet'] ) set_Pet( data['pet'] ) ;

          // 設定 _ 不同服務下，該次服務價則
          if( data['service_type'] === '基礎' ){

              set_Price({ ...price ,
                                   service : data['basic_fee'] ,
                                   pickup : data['pickup_fee']
                              })

          }

          if( data['service_type'] === '洗澡' ){

              set_Price({ ...price ,
                                   service      : data['bath_fee'] ,
                                   extra_Item   : data['extra_service_fee'] ,
                                   extra_Beauty : data['extra_beauty_fee'] ,
                                   pickup       : data['pickup_fee']
                               })

          }

          if( data['service_type'] === '美容' ){

              set_Price({ ...price ,
                                   service    : data['beauty_fee'] ,
                                   extra_Item : data['extra_service_fee'] ,
                                   pickup     : data['pickup_fee']
                               })

          }


    } , [] ) ;

    const t_L = { textAlign : "left" } as const ;

   return <tr style = { { lineHeight : "40px" } } >

             <td>
                 <b className = { color+" pointer" } onClick = { click_Service } >
                     <i className = { icon } ></i> &nbsp; { data[ 'service_type' ] } &nbsp; Q{ data['q_code'] }
                 </b>
             </td>
             <td style = { t_L } >  { data['pet'] ? petButton : "" }      </td>
             <td>
                 <b className="tag is-medium pointer" onClick = { click_Customer } >
                    { data['customer'] ? data['customer']['name'] : '' }
                 </b>
             </td>
             <td> <span className="fDblue">  { price['service'] } </span> </td>
             <td> { price['extra_Item'] }                                 </td>
             <td> { price['extra_Beauty'] }                               </td>
             <td> { price['pickup'] }                                     </td>
             <td>
                  <span className="fDred">
                      { price['service'] + price['extra_Item'] + price['extra_Beauty'] + price['pickup'] }
                  </span>
             </td>
             <td> { data[ 'payment_method' ] }                                     </td>
             <td> { data[ 'service_date' ].slice(5,10) }                           </td>
             <td> <b className="tag is-medium "> <i className="far fa-list-alt" onClick={ () => click_History() }></i> </b>  </td>

             { /* 洗美頁面 : 封存 */ }
             { url === '/services' && <td>
                                           <b className="tag is-medium pointer" onClick={ () => click_Archive( data ) }>
                                               <i className="fas fa-download"></i>
                                           </b>
                                      </td> }

               { /* 封存資料頁面 : 復原封存、刪除 */ }
               { url === '/management' &&

                   <>

                       <td>
                           <b className="tag is-medium pointer pointer" onClick={ () => click_Undo_Archive( data ) } >
                               <i className="fas fa-undo-alt"></i>
                           </b>
                       </td>

                       <td>
                           <b className="tag is-medium pointer pointer" onClick={ () => { if( window.confirm('確認要刪除此筆資料') ) click_Delete( data )  }  }>
                               <i className="fas fa-trash-alt"></i>
                           </b>
                       </td>
                   </>

               }

          </tr>

} ;


export default Services_Rows


