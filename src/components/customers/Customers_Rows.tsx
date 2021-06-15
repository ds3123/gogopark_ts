import React, { useCallback , useEffect , useState } from "react" ;
import Service_History from "components/services/Service_History";

// Redux
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;
import { useDispatch } from "react-redux";

import usePet_Button from "hooks/layout/usePet_Button" ;
import Update_Customer from "components/customers/edit/Update_Customer";



const Customers_Rows = ( props : any ) => {

    const { data }                = props ;
    const [ pets , set_Pets ]     = useState([]) ;
    const dispatch                = useDispatch() ;

    console.log( data )


    // 點選 _ 客戶
    const click_Customer = () => dispatch( set_Side_Panel(true , <Update_Customer /> , { preLoadData : data } ) ) ;

    // 點選 _ 消費歷史
    const click_History  = () => dispatch( set_Side_Panel(true , <Service_History/> , { preLoadData : data } ) ) ;

    // * 寵物按鈕 ( 無 / 單隻 、多隻 )
    const petButton = usePet_Button( pets ) ;


    useEffect(() => {

      if( data['pets'] && data['pets'].length > 0 )  set_Pets(data['pets']) ;

    } ,[] ) ;


    const t_L = { textAlign : "left" } as const ;

   return <tr>

             <td style={ t_L } >
                 <b className="tag is-medium pointer" onClick={ click_Customer }>
                     { data['name'] }
                 </b>
             </td>

             <td style={ t_L }> { data['mobile_phone'] } </td>

             <td style={ t_L }> { petButton } </td>
             <td></td>
             <td></td>
             <td></td>

             <td>
                 <b className="tag is-medium "> <i className="far fa-list-alt" onClick={ () => click_History() }></i> </b>
             </td>





             <td> <b className="tag is-medium" > <i className="fas fa-download"></i> </b> </td>

          </tr>

} ;


export default Customers_Rows