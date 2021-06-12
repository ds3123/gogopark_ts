import React, {FC, useState} from "react" ;
import {Edit_Form_Type} from "utils/Interface_Type";
import { get_Today } from "utils/time/date"
import { useSelector } from "react-redux";


interface TS extends Edit_Form_Type {
    current : string ;
}

/* 費用結算 */
const Fee_Summary : FC<TS> = ({ register , errors , isDirty , isValid , current } ) => {

    // # 各項費用
    const basicSumPrice = parseInt( useSelector( ( state : any ) => state.Basic.Basic_Sum_Price ) ) ; // 基礎單
    const pickupFee     = parseInt( useSelector( ( state : any ) => state.Extra_Fee.Pickup_Fee ) ) ;  // 接送費

    const [ price , set_Price ] = useState( 0 ) ; // 金額共計


    const blue  = {color:"rgb(0,0,150)"} ;

    return <div className="columns is-multiline  is-mobile">

             <div className="column is-3-desktop">

               <span className="tag is-large is-white">
                  <b> 服務項目 : <span style={ blue }> { current } </span> </b> &nbsp;
               </span>

             </div>

             <div className="column is-9-desktop">

               <span className="tag is-large is-white">
                  <b> 應收金額 : <span style={{ color:"red" }}>{ basicSumPrice + pickupFee } </span> 元 </b>
               </span> &nbsp; &nbsp;

               { /* 金額明細 */ }
                 { ( basicSumPrice !== 0 || pickupFee !== 0 ) &&

                     <b className="tag is-medium is-rounded">
                         &nbsp;
                         { basicSumPrice !== 0 && <span> 基礎費 : { basicSumPrice } 元 </span> } &nbsp; &nbsp;
                         { pickupFee !== 0     && <span> 接送費 : { pickupFee } 元     </span> } &nbsp; &nbsp;
                     </b>

               }

             </div>

             <div className="column is-3-desktop">

                 <span className="tag is-large is-white">

                      <b> 付款方式 : </b> &nbsp;
                      <div className="select is-small relative" >
                         <select  style={{ fontSize : "13pt" , top : "-7px" , fontWeight : "bold" }}  >
                            <option value="現金" > 現金 </option>
                            <option value="贈送" > 贈送 </option>
                            <option value="優惠" > 優惠 </option>
                         </select>
                      </div>

                 </span>

             </div>

            <div className="column is-3-desktop">

                <span className="tag is-large is-white">

                    <b> 付款狀態 : </b> &nbsp;
                    <div className="select is-small relative" >
                        <select  style={{ fontSize : "13pt" , top : "-7px" , fontWeight : "bold" }}   >
                          <option value="已收款" > 已收款 </option>
                          <option value="未收款" > 未收款 </option>
                        </select>
                    </div>

                </span>

            </div>

            <div className="column is-6-desktop">

               <span className="tag is-large is-white">
                  <b> 實收金額 : <span style={{ color:"red" }}>  </span> 元 </b>
               </span>

            </div>

            <div className="column is-3-desktop">

                 <span className="tag is-large is-white">

                     <b> 經手人員 : </b> &nbsp;
                     <div className="select is-small relative" >
                        <select  style={{ fontSize : "13pt" , top : "-7px" , fontWeight : "bold" }}  >
                          <option value="請選擇" > 請選擇 </option>
                          <option value="陳宜芳" > 陳宜芳 </option>
                          <option value="李馨慧" > 李馨慧 </option>
                        </select>
                     </div>

               </span>

             </div>


             <div className="column is-6-desktop">

               <span className="tag is-large is-white">

                  <b> 建檔日期 :  <span style={blue}> { get_Today() } </span> </b> &nbsp;

               </span>

             </div>

           </div>


};

export default Fee_Summary ;