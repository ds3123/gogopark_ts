
import React , {useEffect, useState} from "react" ;
import usePet_Button from "hooks/layout/usePet_Button";
import {set_Side_Panel} from "store/actions/action_Global_Layout";
import Service_History from "components/services/Service_History";
import {useDispatch} from "react-redux";
import Update_Customer from "components/customers/edit/Update_Customer";


const Pets_Rows = ( props : any ) => {

    const { data } = props ;

    const [ customer , set_Customer ] = useState( { name : "" , mobile_phone  : "" } ) ;

    const dispatch = useDispatch() ;

    // * 寵物按鈕 ( 無 / 單隻 、多隻 )
    const petButton = usePet_Button( [data] ) ;

    // 點選 _ 客戶
    const click_Customer = () => dispatch( set_Side_Panel(true , <Update_Customer /> , { preLoadData : customer } ) ) ;

    // 點選 _ 消費歷史
    const click_History  = () => dispatch( set_Side_Panel(true , <Service_History/> , { preLoadData : data } ) ) ;

    useEffect(( ) => {

        if( data['customer'] ) set_Customer( data['customer'] ) ;

    } ,[] ) ;


    const t_L = { textAlign : "left" } as const ;

   return <tr>
             <td style={ t_L }> { petButton }      </td>
             <td style={ t_L }> { data['serial'] } </td>
             <td>
                 <b className="tag is-medium" >
                     <i className="far fa-list-alt" onClick={ () => click_History() }></i>
                 </b>
             </td>
             <td style={ t_L }>
                 { customer['name'] &&
                     <b className="tag is-medium pointer" onClick={ click_Customer }>
                         { customer['name'] }
                     </b>
                 }
             </td>
             <td style={ t_L }> { customer['mobile_phone'] } </td>
             <td>  </td>
             <td>  </td>
             <td>  </td>
             <td>  </td>
             <td> <b className="tag is-medium" > <i className="fas fa-download"></i> </b>  </td>
          </tr>

} ;


export default Pets_Rows