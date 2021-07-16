import React from "react"
import { useRead_Employees } from 'hooks/ajax_crud/useAjax_Read'
import {set_Side_Panel} from "store/actions/action_Global_Layout";
import {useDispatch, useSelector} from "react-redux";
import Update_Employee from "components/management/employee/edit/Update_Employee";
import {useHistory} from "react-router-dom";



/* 管理區 _ 員工 */
const Employees = ( ) => {

    const dispatch = useDispatch() ;
    const data     = useRead_Employees() ;  // 取得資料


    // 點選 _ 服務單
    const click_Type = ( employee : any ) => dispatch( set_Side_Panel(true , <Update_Employee /> , { preLoadData : employee } ) ) ;


    const bt   = { background : 'white' , boxShadow : '0px 0px 4px 1px rgba(100,100,100,.1)' } ;
    const left = { textAlign:'left'} as const ;

   return <>

            <table className="table is-fullwidth is-hoverable">

               <thead>
                   <tr>
                       <th> 類 別      </th>
                       <th> 帳 號      </th>
                       <th> 密 碼      </th>
                       <th> 暱 稱      </th>
                       <th> 姓 名      </th>
                       <th> 身分證字號 </th>
                       <th> 手機號碼   </th>
                       <th> 通訊地址   </th>
                       <th> 封 存      </th>
                   </tr>
               </thead>

               <tbody>

                   {
                       data.map( (x,y) => {

                           return <tr key={y}>
                                       <td>
                                           <span className="tag is-medium pointer" style={bt} onClick={ () => click_Type( x ) }>
                                               { x['employee_type'] }
                                           </span>
                                       </td>
                                       <td> { x['account'] } </td>
                                       <td> { x['password'] } </td>
                                       <td> { x['nickname'] } </td>
                                       <td> { x['employee_name'] } </td>
                                       <td> { x['employee_id'] } </td>
                                       <td> { x['employee_mobile_phone'] } </td>
                                       <td style={left}> { x['employee_address'] } </td>
                                       <td><i className="fas fa-download pointer"></i> </td>
                                  </tr>

                       })
                   }

               </tbody>

            </table>

          </>

} ;

export default Employees


