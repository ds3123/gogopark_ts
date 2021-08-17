
import React, {useEffect, useState} from "react"
import {useDispatch} from "react-redux";
import usePet_Button from "hooks/layout/usePet_Button";
import {set_Side_Panel} from "store/actions/action_Global_Layout";
import Update_Customer from "components/customers/edit/Update_Customer";
import Update_Service from "components/services/edit/Update_Service";
import {get_Interval_Dates} from "utils/time/date";


const Care_Rows = ( props : any  ) => {

    const dispatch = useDispatch();

    const { data } = props ;

    // console.log( data )

    // 寵物
    const [ pet , set_Pet ] = useState<any>( {} ) ;

    // 寵物按鈕 ( 1 隻 )
    const petButton = usePet_Button([ pet ]) ;

    // 客戶
    const customer = data['customer'] ;


    try{

        customer.customer_relation = [ data['customer_relative'] ] ; // 配合 <Update_Customer />，關係人屬性名稱，改為 'customer_relation'

    }catch(e){

        console.log( '客戶關係人發生錯誤' )

    }


    // 點選 _ 客戶
    const click_Customer = () => dispatch( set_Side_Panel(true , <Update_Customer /> , { preLoadData : customer } ) ) ;

    // 點選 _ 安親類別
    const click_Type = () => dispatch( set_Side_Panel(true , <Update_Service /> , { service_Type : '安親' ,  preLoadData : data } as { service_Type : string } ) ) ;

    // 設定 _ 寵物、總天數
    useEffect( () => {

        // 寵物
        if( data['pet'] ) set_Pet( data['pet'] ) ;


    } , [ data ]  ) ;

    const t_L = { textAlign : "left" } as const ;



    return <tr>
              <td style={ t_L }> { petButton  }  </td>
              <td>
                  <b className="tag is-medium pointer" onClick={ click_Customer }>
                      { customer['name'] }
                  </b>
              </td>
              <td style={ t_L }>
                  <b className="tag is-medium pointer" onClick={ click_Type }>

                      { data['service_type'] } ( Q{ data['q_code'] } )

                  </b>
              </td>
              <td> { data['start_date'] } </td>
              <td> <b className="fDblue"> { data['start_time'] } </b> </td>
              <td> <b className="fDblue"> { data['end_time'] } </b>  </td>
              <td> { data['way_arrive'] } </td>
              <td> { data['way_leave'] }  </td>
              <td> { data['care_price'] }   </td>
              <td> { data['pickup_fee'] }   </td>
              <td>
                  <i className="fas fa-download"></i>
              </td>
           </tr>

} ;

export default Care_Rows
