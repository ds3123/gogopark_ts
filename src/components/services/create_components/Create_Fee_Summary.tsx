import React, {FC} from "react" ;
import {Edit_Form_Type} from "utils/Interface_Type";
import { get_Today } from "utils/time/date"




interface TS extends Edit_Form_Type {
    current : string ;
}

/* 費用結算 */
const Create_Fee_Summary : FC<TS> = ({ register , errors , isDirty , isValid , current } ) => {


    return <div className="columns is-multiline  is-mobile">

             <div className="column is-3-desktop">

               <span className="tag is-large is-white">
                  <b> 服務項目 : <span style={{color:"rgb(0,0,150)"}}> { current } </span> </b> &nbsp;
               </span>

             </div>

             <div className="column is-9-desktop">

               <span className="tag is-large is-white">
                 <b> 金額共計 : </b>
               </span>

             </div>


             <div className="column is-3-desktop">

                 <span className="tag is-large is-white">

                      <b> 經手人 : </b> &nbsp;
                     <div className="select is-small relative" >

                     <select  style={{ fontSize : "13pt" , top : "-7px" , fontWeight : "bold" }}  >

                        <option value="請選擇" > 請選擇 </option>
                        <option value="陳宜芳" > 陳宜芳 </option>
                        <option value="李馨慧" > 李馨慧 </option>

                     </select>

                  </div>

               </span>

             </div>

             <div className="column is-3-desktop">

                  <span className="tag is-large is-white">

                         <b> 收款情形 : </b> &nbsp;
                      <div className="select is-small relative" >

                              <select  style={{ fontSize : "13pt" , top : "-7px" , fontWeight : "bold" }}   >

                                  <option value="請選擇" > 請選擇 </option>
                                  <option value="已收款" > 已收款 </option>
                                  <option value="未收款" > 未收款 </option>

                              </select>

                          </div>

                  </span>

             </div>

             <div className="column is-6-desktop">

               <span className="tag is-large is-white">

                  <b> 建檔日期 :  <span style={{color:"rgb(0,0,150)"}}> { get_Today() } </span> </b> &nbsp;

               </span>

             </div>

           </div>


};

export default Create_Fee_Summary ;