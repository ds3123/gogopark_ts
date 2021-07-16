
import React  from "react"

import { useRead_All_Species } from "hooks/ajax_crud/useAjax_Read"


/* 各種務品種 _ 價格清單範本 */
const Species_Price_List  = (  ) => {

    // 取得 species 資料表所有資料
    const data = useRead_All_Species();


    const left = { textAlign : "left" } as any;

    return <table className="table is-fullwidth is-hoverable" style={{ marginBottom:"150px" }} >

                <thead>
                   <tr>
                      <th> 品種名稱 </th>
                      <th> 代 碼    </th>
                      <th> 代 號    </th>
                      <th> 體 型    </th>
                      <th> 毛 髮    </th>
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

                      data.map( (x,y) => {

                         return <tr key={y}>
                                   <td style={left}> { x['species_name'] } </td>
                                   <td> { x['serial'] }            </td>
                                   <td> { x['type'] }              </td>
                                   <td> { x['size'] }              </td>
                                   <td> { x['fur'] }               </td>
                                   <td> { x['bath_first'] }        </td>
                                   <td> { x['bath_single'] }       </td>
                                   <td> { x['bath_month'] }        </td>
                                   <td> { x['beauty_single'] }     </td>
                                   <td> { x['beauty_month'] }      </td>
                                   <td style={left}> { x['note'] } </td>
                                </tr>

                      })

                  }

                </tbody>

           </table>

} ;

export default Species_Price_List ;

