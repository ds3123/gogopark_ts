
import React , { FC , useEffect , useState } from "react" ;
import usePet_Button from "hooks/layout/usePet_Button";
import { set_Side_Panel } from "store/actions/action_Global_Layout";
import Service_History from "components/services/Service_History";
import { useDispatch } from "react-redux";
import Update_Customer from "components/customers/edit/Update_Customer";
import{ useLocation }from"react-router";
import {useHistory} from "react-router-dom";
import axios from "utils/axios";
import {toast} from "react-toastify";
import cookie from "react-cookies";



const Pets_Rows = ( props : any ) => {

    const { data } = props ;

    const dispatch = useDispatch() ;

    const url      = useLocation().pathname;
    const history  = useHistory() ;

    // * 寵物按鈕 ( 無 / 單隻 、多隻 )
    const petButton = usePet_Button([data]) ;

    const customer  = data['customer'] ;

    try{

      customer.customer_relation = [ data.customer_relative ] ;

    }catch(e){

      console.log( '客戶關係人發生錯誤' )

    }


    // 點選 _ 客戶
    const click_Customer = () => dispatch( set_Side_Panel(true , <Update_Customer /> , { preLoadData : customer } ) ) ;

    // 點選 _ 消費歷史
    const click_History  = () => dispatch( set_Side_Panel(true , <Service_History/> , { preLoadData : data } ) ) ;


    // 點選 _ 封存資料
    const click_Archive = ( id : string ) => {

        axios.put( `/pets/${ id }` , { is_archive : 1 } ).then( res => {

            toast(`🦄 資料已封存`, { position : "top-left", autoClose : 1500 , hideProgressBar : false });

            history.push("/wrongpath");  // 錯誤路徑
            history.push("/pets");  // 正確路徑

        }) ;

    } ;

    // 點選 _ 復原封存資料
    const click_Undo_Archive = ( id : string ) => {

        axios.put( `/pets/${ id }` , { is_archive : 0 } ).then( res => {

            toast(`🦄 資料已復原封存`, { position : "top-left", autoClose : 1500 , hideProgressBar : false });


            // 設定 cookie ( for 前往 : 價格管理 > 服務價格 / 5 秒後銷毀 )
            cookie.save( 'after_Edit_Archive' , '寵物'  ,  { path : '/' , maxAge : 5 } ) ;


            history.push("/wrongpath");  // 錯誤路徑
            history.push("/management");  // 正確路徑

        }) ;

    } ;

    // 點選 _ 刪除資料
    const click_Delete = ( id : string ) => {

        axios.delete( `/pets/${ id }` ).then( res => {

            toast(`🦄 資料已刪除`, { position : "top-left", autoClose : 1500 , hideProgressBar : false });

            // 設定 cookie ( for 前往 : 價格管理 > 服務價格 / 5 秒後銷毀 )
            cookie.save( 'after_Edit_Archive' , '寵物'  ,  { path : '/' , maxAge : 5 } ) ;

            history.push("/wrongpath");  // 錯誤路徑
            history.push("/management");  // 正確路徑

        }) ;


    } ;



    const t_L = { textAlign : "left" } as const ;

   return <tr>
             <td style={ t_L }> { petButton }      </td>
             <td style={ t_L }> { data['serial'] } </td>
             <td>
                 <b className="tag is-medium" onClick={ () => click_Archive( data['customer_id'] ) }>
                     <i className="far fa-list-alt" onClick={ () => click_History() }></i>
                 </b>
             </td>
             <td style={ t_L }>
                 { data['name'] &&

                     // data['customer']['name']

                     <b className="tag is-medium pointer" onClick={ click_Customer }>
                         { customer ? customer['name'] : '' }
                     </b>
                 }
             </td>
             <td style={ t_L }>
                 { customer ? customer['mobile_phone'] : '' }
             </td>
             <td>  </td>
             <td>  </td>
             <td>  </td>
             <td>  </td>

             { /* 寵物頁面 : 封存 */ }
             { url === '/pets' && <td>
                                    <b className="tag is-medium" onClick={ () => click_Archive( data['serial'] ) }>
                                       <i className="fas fa-download"></i>
                                    </b>
                                  </td> }

               { /* 封存資料頁面 : 復原封存、刪除 */ }
               { url === '/management' &&
               <>

                   <td>
                       <b className="tag is-medium pointer" onClick={ () => click_Undo_Archive( data['serial'] ) } >
                           <i className="fas fa-undo-alt"></i>
                       </b>
                   </td>

                   <td>
                       <b className="tag is-medium pointer" onClick={ () => { if( window.confirm('確認要刪除此筆資料') ) click_Delete( data['serial'] )  }  }>
                           <i className="fas fa-trash-alt"></i>
                       </b>
                   </td>
               </>
               }

          </tr>

} ;


export default Pets_Rows