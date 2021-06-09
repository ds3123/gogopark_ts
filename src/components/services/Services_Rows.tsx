
import React, {useEffect, useState} from "react"
import useServiceType from "../../hooks/data/useServiceType";


const Services_Rows = ( props : any ) => {

    const { data } = props ;

    const [ service , set_Service ] = useState<any>( { } ) ;

    console.log( data ) ;

    // 服務單欄位 _ 顏色、Icon
    const { color , icon }  = useServiceType( service[ 'service_type' ] );

    useEffect( ( ) => {

       if( data.service_type ) set_Service( data ) ;

    } , [] ) ;



   return <tr style={{ lineHeight : "40px" }}>
             <td>
                 <b className = { color} >
                     <i className = { icon }></i> &nbsp; { service[ 'service_type' ] }
                 </b>
             </td>
             <td>   </td>
             <td>   </td>
             <td> 0 </td>
             <td> { service['service_date'].slice(5,10)  } </td>
             <td> <b> {  service['q_code'] } </b></td>
             <td> { service[ 'shop_status' ] } </td>


             <td> </td>
             <td> </td>
          </tr>

} ;


export default Services_Rows


