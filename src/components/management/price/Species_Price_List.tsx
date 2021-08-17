
import React  from "react"

import { useRead_All_Species_With_Service_Prices } from "hooks/ajax_crud/useAjax_Read"
import {set_Side_Panel} from "../../../store/actions/action_Global_Layout";
import Update_Species from "../setting/species/edit/Update_Species";
import {useDispatch} from "react-redux";
import Update_Price from "../../prices/edit/Update_Price";


/* 各種務品種 _ 價格清單範本 */
const Species_Price_List  = (  ) => {

    const dispatch = useDispatch() ;

    // 取得 species 資料表所有資料
    const data = useRead_All_Species_With_Service_Prices();

    //console.log( data )


    // 點選 _ 品種名稱
    const click_Species = ( species : any ) =>
        dispatch( set_Side_Panel(true , <Update_Price /> , { preLoadData : species , source_Create_Way : '寵物品種'  } ) ) ;


    const left = { textAlign : "left" } as any;
    const bt   = { background : 'white' , boxShadow : '0px 0px 4px 1px rgba(100,100,100,.1)' }  as const ;

    return <table className="table is-fullwidth is-hoverable" style={{ marginBottom:"150px" }} >

                <thead>
                   <tr>
                      <th> 品種名稱 </th>
                      <th> 代 碼    </th>
                      <th> 代 號    </th>
                      <th> <span style={{color:"rgb(180,130,0)"}}>初次洗澡</span> </th>
                      <th> <span style={{color:"rgb(0,0,160)"}}>單次</span>洗澡   </th>
                      <th> <span style={{color:"rgb(0,0,160)"}}>包月</span>洗澡   </th>
                      <th> <span style={{color:"rgb(0,0,160)"}}>單次</span>美容   </th>
                      <th> <span style={{color:"rgb(0,0,160)"}}>包月</span>美容   </th>
                      <th> 備 註    </th>
                   </tr>
                </thead>

                <tbody>

                   {

                      data.map( ( x , y) => {

                         const service_prices = x['service_prices'] as any ;

                         const first_Bath     = service_prices.filter( (x:any) => ( x['service_name'] === '初次洗澡優惠價格' ) )[0] ;
                         const single_Bath    = service_prices.filter( (x:any) => ( x['service_name'] === '單次洗澡價格' ) )[0] ;
                         const month_Bath     = service_prices.filter( (x:any) => ( x['service_name'] === '包月洗澡價格' ) )[0] ;

                         const single_Beauty  = service_prices.filter( (x:any) => ( x['service_name'] === '單次美容價格' ) )[0] ;
                         const month_Beauty   = service_prices.filter( (x:any) => ( x['service_name'] === '包月美容價格' ) )[0] ;

                         return <tr key = { y } >
                                   <td style={left}>
                                       <b className="tag is-medium pointer" style={bt} onClick={ () => click_Species( x ) }>
                                           { x['name'] }
                                       </b>
                                   </td>
                                   <td> { x['serial'] }                                          </td>
                                   <td> { x['character'] }                                       </td>
                                   <td> { first_Bath ? first_Bath['service_price'] : '' }        </td>
                                   <td> { single_Bath ? single_Bath['service_price'] : '' }      </td>
                                   <td> { month_Bath ? month_Bath['service_price'] : '' }        </td>
                                   <td> { single_Beauty ? single_Beauty['service_price'] : '' }  </td>
                                   <td> { month_Beauty ? month_Beauty['service_price'] : '' }    </td>
                                   <td style={left}> { x['note'] }                               </td>
                                </tr>

                      })

                   }

                </tbody>

           </table>

} ;

export default Species_Price_List ;

