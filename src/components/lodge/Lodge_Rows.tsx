
import React, {useEffect, useState} from "react"
import {set_Side_Panel} from "store/actions/action_Global_Layout";
import Update_Customer from "components/customers/edit/Update_Customer";
import {useDispatch} from "react-redux";
import usePet_Button from "hooks/layout/usePet_Button";
import Update_Service from "components/services/edit/Update_Service";

import { get_Interval_Dates } from "utils/time/date"


const Lodge_Rows = ( props : any ) => {

    const dispatch = useDispatch();

    const { data } = props ;

    // 總天數
    const [ dates_Sum , set_Dates_Sum] = useState( 0 ) ;

    // 寵物
    const [ pet , set_Pet ] = useState<any>( {} ) ;

    // 寵物按鈕 ( 1 隻 )
    const petButton = usePet_Button([ pet ]) ;

    // 客戶
    const customer = data['customer'] ;

    // console.log( data )

    try{

        customer.customer_relation = [ data['customer_relative'] ] ; // 配合 <Update_Customer />，關係人屬性名稱，改為 'customer_relation'

    }catch(e){

        console.log( '客戶關係人發生錯誤' )

    }


    // 點選 _ 客戶
    const click_Customer = () => dispatch( set_Side_Panel(true , <Update_Customer /> , { preLoadData : customer } ) ) ;

    // 點選 _ 房號 (房型)
    const click_Room = () => dispatch( set_Side_Panel(true , <Update_Service /> , { service_Type : '住宿' ,  preLoadData : data } as { service_Type : string } ) ) ;

    // 設定 _ 寵物、總天數
    useEffect( () => {

        // 寵物
        if( data['pet'] ) set_Pet( data['pet'] ) ;

        // 總天數
        if( data['start_date'] && data['end_date'] ){
            const interval = get_Interval_Dates( data['start_date'] , data['end_date'] ) ;
            set_Dates_Sum( interval.length ) ;
        }

    } , [ data ]  ) ;

    const t_L = { textAlign : "left" } as const ;

   return <tr style = { { lineHeight : "40px" } } >

            <td style={ t_L }> { petButton  } </td>
            <td>
                <b className="tag is-medium pointer" onClick={ click_Customer }>
                    { customer['name'] }
                </b>
            </td>
            <td>
                <b className="tag is-medium pointer" onClick={ click_Room }>
                   { data['room_number'] } ( { data['room_type'] } )
                </b>
            </td>

            <td> { data['start_date'] }&nbsp; &nbsp;{ data['start_time'] } </td>
            <td> { data['end_date'] }&nbsp; &nbsp;{ data['end_time'] } </td>
            <td> { dates_Sum } </td>
            <td> { data['lodge_price'] }  </td>
            <td>  </td>
            <td>  </td>
            <td>  { data['pickup_fee'] }  </td>
            <td> <i className="fas fa-download"></i>  </td>

          </tr>

} ;


export default Lodge_Rows