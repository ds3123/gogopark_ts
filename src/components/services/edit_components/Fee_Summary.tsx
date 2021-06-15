import React, {FC, useEffect, useState} from "react" ;
import {Edit_Form_Type} from "utils/Interface_Type";
import { get_Today } from "utils/time/date"
import { useSelector } from "react-redux";
import { usePrice_Basic } from "hooks/data/usePrice"
import {Input} from "templates/form/Input";



interface TS extends Edit_Form_Type {
    current : string ;
}

/* 費用結算 */
const Fee_Summary : FC<TS> = ({ register , setValue , errors , isDirty , isValid , current } ) => {


    // # 基礎價格、接送費
    const { basicSumPrice , pickupFee }  = usePrice_Basic() ;

    const [ receivable , set_Receivable ]               = useState(0 ) ; // 應收金額
    const [ actual_Payment , set_Actual_Payment ]       = useState(0 ) ; // 實收金額
    const [ delinquent_Amount , set_Delinquent_Amount ] = useState( 0) ; // 未收金額

    const [ discount_Amount , set_Discount_Amount ]     = useState( 0) ; // 優惠金額


    const [ paymentMethod , set_PaymentMethod ]         = useState( '現金' ) ;  // 付款方式

    // 付款方式
    const handle_PaymentMethod = ( value : string ) => {

        set_PaymentMethod( value ) ; // 設定 _ 付款方式

        // 現金
        if( value === "現金" ){
            setValue( 'actual_Payment' , receivable  ) ;  // 實收
            set_Delinquent_Amount( 0 ) ;            // 未收
        }

        // 贈送
        if( value === "贈送" ){
            setValue( 'actual_Payment' , 0 ) ;  // 實收
            set_Delinquent_Amount( 0 ) ;  // 未收
        }

        // 優惠
        if( value === "優惠" ){
            setValue( 'discount_Amount' , 0 ) ;           // 優惠
            setValue( 'actual_Payment' , receivable  ) ;  // 實收
            set_Delinquent_Amount( 0 ) ;            // 未收
        }

    } ;

    // 實收金額
    const handle_ActualPayment = ( value : any ) => {

        // 設定 _ 未收金額
        set_Actual_Payment( value ) ;
        setValue( 'actual_Payment' , value ) ;  // for React-Hook-Form INPUT

        // 設定 _ 未收金額
        set_Delinquent_Amount(receivable -  value ) ;

    } ;

    // 優惠價格
    const handle_Discount = ( value : any ) => {

      setValue( 'actual_Payment' , receivable - value ) ;  // 實收

    } ;


    const blue = { color : "rgb(0,0,150)" } ;

    // 設定 _ 應收金額
    useEffect(( ) => {

       if( current === "基礎" ) set_Receivable(basicSumPrice + pickupFee ) ;

    } ,[ basicSumPrice , pickupFee ] ) ;


    // 設定 _ 實收金額( 依據不同付款方式 )
    useEffect(( ) => {

        // * 付款方式
        if( current === "基礎" && paymentMethod === "現金" ){
           set_Actual_Payment( basicSumPrice + pickupFee  ) ;
           setValue( 'actual_Payment' , basicSumPrice + pickupFee ) ;  // for React-Hook-Form INPUT
        }

    } ,[ receivable ] ) ;





    return <div className="columns is-multiline  is-mobile">

             <div className="column is-3-desktop">

               <span className="tag is-large is-white">
                  <b> 服務項目 : <span style={ blue }> { current } </span> </b>
               </span>

             </div>

             <div className="column is-9-desktop">

               <span className="tag is-large is-white">
                  <b> 應收金額 : <span style={{ color:"red" }}>{ receivable } </span> 元 </b>
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

             { /* 付款方式  */ }
             <div className="column is-3-desktop">

                 <span className="tag is-large is-white">

                      <b> 付款方式 : </b> &nbsp;
                      <div className="select is-small relative" >

                         <select { ...register( "payment_Method" ) }
                                   style    = {{ fontSize : "13pt" , top : "-7px" , fontWeight : "bold" }}
                                   onChange = { e => handle_PaymentMethod( e.target.value )} >

                              <option value="現金" > 現金        </option>
                              <option value="贈送" > 贈送        </option>
                              <option value="優惠" > 優惠        </option>
                              <option value="包月美容" > 包月美容 </option>
                              <option value="包月洗澡" > 包月洗澡 </option>

                         </select>

                      </div>

                 </span>

             </div>

             { ( paymentMethod === '現金' || paymentMethod === '贈送' || paymentMethod === '包月洗澡' || paymentMethod === '包月美容' ) &&

                <>

                   <div className="column is-2-desktop">
                     <span className="tag is-large is-white"> <b> 實收金額 : </b> </span>
                   </div>

                   { ( paymentMethod === '現金' || paymentMethod === '包月洗澡' || paymentMethod === '包月美容' ) &&
                       <div className="column is-2-desktop relative">
                         <input className="input relative"  type="text"
                                {...register( "actual_Payment" )}
                                onChange={ e => handle_ActualPayment( e.target.value ) } style={{left:"-60px"}}/>
                         <span className="tag is-large is-white absolute" style={{left: "110px"}}> <b> 元 </b> </span>
                       </div>
                   }

                   { /* 實收金額不能填寫  */ }
                   { paymentMethod === '贈送' &&
                        <div className="column is-2-desktop relative">
                            <input className="input relative" type="text" {...register( "actual_Payment" )} style={{left:"-60px"}} disabled/>
                            <span className="tag is-large is-white absolute" style={{left: "110px"}}> <b> 元 </b> </span>
                        </div>
                   }


                </>

             }

             { paymentMethod === '優惠' &&

                <>
                    <div className="column is-2-desktop">
                        <span className="tag is-large is-white"> <b> <span style={{ color:"orange" }}>優惠</span>金額 : </b> </span>
                    </div>

                    <div className="column is-1-desktop relative">
                        <input className="input relative" type="text"
                               { ...register( "discount_Amount" ) }
                               onChange={ e => handle_Discount( e.target.value ) }
                               style={{left:"-60px"}}/>
                        <span className="tag is-large is-white absolute" style={{left: "16px"}}> <b> 元 </b> </span>
                    </div>

                    <div className="column is-2-desktop">
                        <span className="tag is-large is-white"> <b> 實收金額 : </b> </span>
                    </div>

                    <div className="column is-1-desktop relative" >
                        <input className="input relative" type="text" { ...register( "actual_Payment" ) } style={{left:"-60px"}} disabled/>
                        <span className="tag is-large is-white absolute" style={{left: "16px"}}> <b> 元 </b> </span>
                    </div>
                </>

             }

             { /* 未收金額 */ }
             <div className="column is-3-desktop">

                   <span className="tag is-large is-white">
                      <b> 未收金額 : <span style={{ color:"red" }}> { delinquent_Amount } </span> 元 </b>
                   </span>

            </div>

             { /* 經手人員  */ }
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

             { /* 建檔日期 */ }
             <div className="column is-6-desktop">

               <span className="tag is-large is-white">

                  <b> 建檔日期 : <span style={ blue } > { get_Today() } </span> </b>

               </span>

             </div>

           </div>


};

export default Fee_Summary ;