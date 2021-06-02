import React from "react" ;



const Customers_Rows = ( props : any ) => {

    const { data } = props ;

    const t_L = { textAlign : "left" } as const ;

   return <tr>
             <td style={ t_L }>
                 { data['name'] } ( { data['customer_id'] }  )
             </td>
             <td></td>
             <td></td>
             <td></td>
             <td></td>
             <td></td>
             <td></td>
          </tr>

} ;


export default Customers_Rows