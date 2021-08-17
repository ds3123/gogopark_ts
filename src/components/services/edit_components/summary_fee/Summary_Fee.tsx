
import React, {FC, useEffect, useState} from "react"
import {Edit_Form_Type} from "utils/Interface_Type";
import {get_Today} from "utils/time/date";

import { usePrice_Service , usePrice_Care , usePrice_Lodge , usePrice_Plan } from "hooks/data/usePrice"

import { FeeDetail , FeeDetail_Basic , FeeDetail_Bath , FeeDetail_Beauty , FeeDetail_Plan_Bath , FeeDetail_Plan_Beauty } from "components/services/edit_components/summary_fee/Fee_Detail"


import Customer_Plans from "components/services/edit_components/summary_fee/Customer_Plans";



import axios from "utils/axios";
import cookie from 'react-cookies'
import {useSelector} from "react-redux";

interface TS extends Edit_Form_Type {

    current      : string ;
    editType?    : string ;
    serviceData? : any ;

}

/* 服務費用 _ 結算明細 */
const Summary_Fee : FC<TS> = ( { register , setValue , errors  , current, editType, serviceData } ) => {

          // 所有櫃台人員( 正職、計時 )
          const [ admin_Users , set_Admin_Users ] = useState([]) ;

          // ---------------------------

          // 應收金額
          const [ receivable , set_Receivable ] = useState( 0 ) ;

          // 付款方式
          const [ paymentMethod , set_PaymentMethod ]  = useState( '現金' ) ;


          // @ 各服務類型，所應提供資料 ----------------------------------------------------

          // # 基礎、洗澡、美容
          const { receivable : service_Receivable } = usePrice_Service( current , paymentMethod , setValue );

          // # 安親 ------
          const { current_Care_Type , receivable : care_Receivable } = usePrice_Care( current , paymentMethod , setValue ) ;

          // # 住宿 ------
          const { receivable : lodge_Receivable } = usePrice_Lodge( current , paymentMethod , setValue );


          // # 方案 ------
          const { current_Plan_Type , receivable : plan_Receivable  } = usePrice_Plan( current , paymentMethod , setValue ) ;


          // 欲傳給 <Customer_Plans /> 元件的 Props
          const plan_Props = {
              current       : current ,
              paymentMethod : paymentMethod ,
              register      : register ,
              setValue      : setValue
          } ;

          // # 變動處理 --------------

          // 實收金額
          const handle_ActualPayment = ( value : any ) => {

                if( value > receivable ){
                    alert('實收金額，不能大於應收金額') ;
                    setValue( 'amount_Paid' , receivable ) ;
                    return false ;
                }

                if( value < 0 ){
                    setValue( 'amount_Paid' , '' ) ;
                    return false ;
                }

            } ;

          // 優惠價格
          const handle_Discount = ( value : any ) => {

                if( value > receivable ){
                    alert('優惠金額，不能大於應收金額') ;
                    setValue( 'amount_Discount' , '' ) ;
                    return false ;
                }

                setValue( 'amount_Paid' , receivable - value ) ;  // 實收

          } ;

          // -------------------------------------------------------------------------------------------

          // 設定 _ 應收金額 ( receivable )
          useEffect( ( ) => {

             // 主要服務( 基礎、洗澡、美容 )
             if( current === '基礎' || current === '洗澡' || current === '美容' ) set_Receivable( service_Receivable ) ;

             // 住宿
             if( current === '住宿' ) set_Receivable( lodge_Receivable ) ;

             // 安親
             if( current === '安親' ) set_Receivable( care_Receivable ) ;

             // 方案( 包月洗澡、包月美容、住宿券 )
             if( current === '方案' ) set_Receivable( plan_Receivable ) ;

          } ,[ current , service_Receivable , lodge_Receivable , care_Receivable , plan_Receivable ] ) ;

          // 設定 _ 櫃台人員 ( 正職、計時 )
          useEffect( ( ) : any => {

              let is_Mounted = true ;

              axios.get( '/employees' ).then( res => {

                  // 篩選出 : 職位類型( position_type ) 為 "櫃台"、"計時櫃台"
                  if( is_Mounted && res.data.length > 0 ){

                      // 設定所取得的櫃檯人員
                      const adminArr = res.data.filter( ( x : any ) => x['position_type'] && ( x['position_type'] === '櫃台' || x['position_type'] === '計時櫃台' ) ) ;
                      set_Admin_Users( adminArr ) ;

                      // 利用 Cookie ，根據目前登入帳號，設定 _ 櫃台人員下拉選單 "預設值" ( 若沒有櫃台人員，Ex. 測試帳號 ，設定為"請選擇" )
                      const current_User = cookie.load('userInfo') ;
                      setValue( 'admin_User' , current_User['employee_name'] ? current_User['employee_name'] : '請選擇' ) ;

                  }

              }) ;

              return () => is_Mounted = false

          } , [] ) ;

    return <>

              <br/>

              { /* 費用明細 */ }
              <div className="columns is-multiline is-mobile">

                { /* 服務項目 */ }
                <div className="column is-4-desktop">

                       <span className="tag is-large is-white">
                          <b> 服務項目 :
                              <span className="fDblue" > { current } &nbsp;
                                <span className='f_10'>
                                   { ( current === '方案' && editType !== '編輯' && current_Plan_Type ) && `( ${ current_Plan_Type } )` }
                                   { ( current === '安親' && editType !== '編輯' && current_Care_Type ) && `( ${ current_Care_Type } )` }
                                </span>
                              </span>
                          </b>
                       </span>

                </div>

                { /* 應收金額 */ }
                <div className="column is-8-desktop">

                  { ( paymentMethod === '包月洗澡' || paymentMethod === '包月洗澡' ) ||

                    <>

                        <span className="tag is-large is-white">

                          <b> 應收金額 :&nbsp;
                              <span style={{ color:"red" }} >
                                 { editType !== '編輯' && receivable }                 { /* for 新增 */ }
                                 { editType !== '編輯' || serviceData.amount_payable } { /* for 編輯 */ }
                              </span> 元
                          </b>

                        </span>

                        { /* 消費明細 */ }
                        <FeeDetail current = { current } editType = { editType }  />

                    </>

                  }

                </div>

                { /* 付款方式  */ }
                <div className="column is-4-desktop" >

                     <span className="tag is-large is-white" >

                         <b> 付款方式 : </b> &nbsp;

                         { /* for 新增 */ }
                         { editType !== '編輯' &&

                             <div className="control has-icons-left">

                                 <div className="select is-small relative">

                                     <select {...register("payment_Method")}
                                             style={{fontSize: "13pt", top: "-7px", fontWeight: "bold"}}
                                             onChange={e => set_PaymentMethod(e.target.value)}>

                                         <option value="現金"> 現金</option>

                                         { ( current === '基礎' || current === '洗澡' || current === '美容') &&
                                            <option value="贈送"> 贈送 </option>
                                         }

                                         { ( current === '基礎' || current === '洗澡' || current === '美容') &&
                                            <option value="優惠"> 優惠 </option>
                                         }

                                         { current === '洗澡' &&
                                            <option value="包月洗澡"> 包月洗澡 </option>
                                         }

                                         { current === '美容' &&
                                            <option value="包月美容"> 包月美容 </option>
                                         }

                                     </select>

                                 </div>

                                 <div className="icon is-small is-left"><i className="fas fa-money-bill-wave"></i></div>

                             </div>

                         }

                         { /*  for 編輯  */ }
                         { editType !== '編輯' || <b className="fDblue"> { serviceData.payment_method } </b>  }


                     </span>

                </div>

                { /* 實收金額 */ }
                { ( paymentMethod === '現金' || paymentMethod === '贈送' ) &&

                    <>

                        <div className="column is-2-desktop">
                            <span className="tag is-large is-white"> <b> 實收金額 : </b> </span>
                        </div>

                        { paymentMethod === '現金' &&

                            <div className="column is-2-desktop relative">

                                { /* for 新增 */ }
                                { editType !== '編輯' &&

                                    <div className="control has-icons-left" style={{left: "-64px"}}>

                                        <input className="input relative" type="number" min="0"
                                               {...register("amount_Paid")}
                                               onChange={e => handle_ActualPayment(e.target.value)} />

                                        <span className="icon is-small is-left"> <i className="fas fa-dollar-sign"></i> </span>

                                        <span className="absolute" style={{left: "170px",top:"5px"}}> <b> 元 </b> </span>

                                    </div>

                                }

                                { /* for 編輯 */ }
                                { editType !== '編輯' ||

                                    <b className="tag is-large is-white absolute" style={{ left : "-64px" , top:"12px" }} >
                                        <b style={{ color:"red" }}> { serviceData.amount_paid } </b>&nbsp;元
                                    </b>

                                }

                            </div>

                        }

                        { /* 付款方式為 "贈送" 時，"實收金額" _ 不能填寫  */ }
                        { paymentMethod === '贈送' &&

                            <div className="column is-2-desktop relative">
                                <span className="tag is-large is-white absolute" style={{left: "-60px"}}>  <b style={{ color:"red" }}> 0 </b>  <b> &nbsp; 元 </b> </span>
                            </div>

                        }

                    </>

                }

                { /* 優惠 */ }
                { paymentMethod === '優惠' &&

                    <>
                        <div className="column is-2-desktop">
                            <span className="tag is-large is-white"> <b> <span style={{ color:"orange" }}>優惠</span>金額 : </b> </span>
                        </div>

                        <div className="column is-2-desktop relative">

                            <div className="control has-icons-left" style={{left:"-60px"}} >

                                <input className="input relative"  type="number" min="0"
                                       { ...register( "amount_Discount" ) }
                                       onChange={ e => handle_Discount( e.target.value ) } />

                                <span className="icon is-small is-left"> <i className="fas fa-dollar-sign"></i> </span>

                            </div>

                            <span className="tag is-large is-white absolute" style={{ top: "10px" , left: "110px"}}> <b> 元 </b> </span>

                        </div>

                        <div className="column is-2-desktop">
                            <span className="tag is-large is-white"> <b> 實收金額 : </b> </span>
                        </div>

                        <div className="column is-1-desktop relative" >
                            <input className="input relative" type="text" { ...register( "amount_Paid" ) } style={{left:"-60px"}} disabled />
                            <span className="tag is-large is-white absolute" style={{left: "16px"}}> <b> 元 </b> </span>
                        </div>

                    </>

                }

                { /* 包月洗澡、包月美容 */ }
                { ( paymentMethod === '包月洗澡' || paymentMethod === '包月美容' ) &&

                   <div className="column is-8-desktop">

                        <Customer_Plans { ...plan_Props } />

                   </div>

                }

              </div>

              { /* 櫃台經手資訊 */ }
              <div className="columns is-multiline  is-mobile">

                    { /* 櫃台人員  */ }
                    <div className="column is-4-desktop">

                         <span className="tag is-large is-white">

                             <b> 櫃台人員 : </b> &nbsp;

                             { /* for 新增  */ }
                             { editType !== '編輯' &&

                                 <div className="control has-icons-left">

                                     <div className="select is-small relative">

                                         <select  { ...register("admin_User") }  style={ { fontSize: "13pt", top: "-7px", fontWeight: "bold" } }>

                                             <option value="請選擇"> 請選擇 </option>

                                             { admin_Users.map( ( x , y) => <option key={y} value={ x['employee_name'] }> { x['employee_name'] } </option> )  }

                                         </select>

                                     </div>

                                     <div className="icon is-medium is-left"> <i className="fas fa-user"></i> </div>

                                 </div>

                             }

                             { /* for 編輯  */ }
                             { editType !== '編輯' ||

                                 <b className="absolute" style={{ left : "122px" , top:"16px" }} >
                                     <b className="fDblue"> { serviceData.admin_user }  </b>
                                 </b>

                             }

                         </span>
                    </div>

                    { /* 櫃台備註  */ }
                    <div className="column is-2-desktop">
                       <span className="tag is-large is-white"> <b> 櫃台備註 : </b> </span>
                    </div>

                    <div className="column is-6-desktop relative">

                        { /* for 新增  */ }
                        { editType !== '編輯' &&

                            <div className="control has-icons-left" style={{left: "-60px"}}>
                                <input className="input" type="text" {...register("admin_Service_Note")} />
                                <span className="icon is-small is-left"> <i className="fas fa-edit"></i> </span>
                            </div>

                        }

                        { /* for 編輯  */ }
                        { editType !== '編輯' ||

                            <b className="absolute f_15" style={{ left : "-46px" , top:"17px" }} >
                                <b className="fDblue"> { serviceData.admin_service_note }  </b>
                            </b>

                        }


                    </div>

                    { /* 建檔日期 */ }
                    <div className="column is-4-desktop">
                       <span className="tag is-large is-white">
                          <b> 建檔日期 : <span className="fDblue">
                              { editType !== '編輯' && get_Today() }                        { /* for 新增  */ }
                              { editType !== '編輯' || serviceData.created_at.slice(0,10) } { /* for 編輯 */ }
                          </span> </b>
                       </span>
                    </div>

              </div>

           </>

} ;

export default Summary_Fee