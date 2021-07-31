import React, {useEffect, useState} from "react"
import useServiceType from "hooks/layout/useServiceType";
import usePet_Button from "hooks/layout/usePet_Button";
import {set_Side_Panel} from "store/actions/action_Global_Layout";
import Service_History from "./Service_History";
import {useDispatch} from "react-redux";

import Update_Service from "components/services/edit/Update_Service";


const Services_Rows = ( props : any ) => {

    const { data } = props ;

    const [ pet , set_Pet ] = useState<any>( {} ) ;

    const dispatch = useDispatch() ;

    // 服務 ( 基礎、洗澡、美容 ) 費用
    const [ service_Price , set_Service_Price ] = useState(0) ;

    // 服務單欄位 _ 顏色、Icon
    const { color , icon }  = useServiceType( data[ 'service_type' ] , false , 'medium' );

    // * 寵物按鈕
    const petButton = usePet_Button([ pet ] ) ;

    // 點選 _ 服務單
    const click_Service = () => dispatch( set_Side_Panel(true , <Update_Service /> , { service_Type : data['service_type'] ,  preLoadData : data } as { service_Type : string } ) ) ;

    // 點選 _ 消費歷史
    const click_History = () => dispatch( set_Side_Panel(true , <Service_History /> , { preLoadData : data } ) ) ;


    useEffect( () => {

          // 有些服務單，沒有寵物 ( null ) 2021.06.10 再確認查詢式
          if( data['pet'] ) set_Pet( data['pet'] ) ;


          // 設定 _ 不同服務下，該次服務價則
          if( data['service_type'] === '基礎' ) set_Service_Price( data['basic_fee'] ) ;
          if( data['service_type'] === '洗澡' ) set_Service_Price( data['bath_fee'] ) ;
          if( data['service_type'] === '美容' ) set_Service_Price( data['beauty_fee'] ) ;


    } , [] ) ;

    const t_L = { textAlign : "left" } as const ;

   return <tr style = { { lineHeight : "40px" } } >

             <td>
                 <b className = { color+" pointer" } onClick={ click_Service }>
                     <i className = { icon } ></i> &nbsp; { data[ 'service_type' ] } &nbsp; Q{ data['q_code'] }
                 </b>
             </td>
             <td style = { t_L } >  { data['pet'] ? petButton : "" } </td>
             <td> { service_Price }                                  </td>
             <td> { data['payment_method'] }                         </td>
             <td> { data[ 'service_date' ].slice(5,10) }             </td>
             <td> { data[ 'shop_status' ] }                          </td>
             <td> { data[ 'way_arrive' ] }                           </td>
             <td> <b className="tag is-medium "> <i className="far fa-list-alt" onClick={ () => click_History() }></i> </b>  </td>
             <td> <b className="tag is-medium" > <i className="fas fa-download"></i> </b> </td>

          </tr>

} ;


export default Services_Rows


