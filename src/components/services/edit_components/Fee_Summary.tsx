import React, {FC, useEffect, useState} from "react" ;
import {Edit_Form_Type} from "utils/Interface_Type";
import { get_Today } from "utils/time/date"
import {useDispatch, useSelector} from "react-redux";
import { usePrice_Basic , usePrice_Plan , usePrice_Care } from "hooks/data/usePrice"
import { set_PickupFee } from "store/actions/action_Extra_Service_Fee"




interface TS extends Edit_Form_Type {
    current : string ;
}

/* 費用結算 */
const Fee_Summary : FC<TS> = ({ register , setValue , errors , isDirty , isValid , current } ) => {

    const dispatch = useDispatch();

    // 接送費
    const pickupFee = parseInt( useSelector( ( state : any ) => state.Extra_Fee.Pickup_Fee ) ) ;

    // # 基礎價格
    const { basicSumPrice } = usePrice_Basic() ;

    // # 安親價格
    const current_Care_Type = useSelector(( state : any ) => state.Care.current_Care_Type ) ;  // 目前所選擇的 _ 安親類型
    const { Care_Ordinary_Price , Care_Ahead_Price , Care_Postpone_Price } = usePrice_Care();

    // # 方案費用
    const current_Plan_Type = useSelector(( state : any ) => state.Plan.current_Plan_Type ) ;  // 目前所選擇的 _ 方案類型
    const { Month_Bath_Price , Month_Beauty_Price , Lodge_Coupon_Price } = usePrice_Plan() ;


    const [ receivable , set_Receivable ]               = useState(0 ) ;        // 應收金額
    const [ actual_Payment , set_Actual_Payment ]       = useState(0 ) ;        // 實收金額
    const [ delinquent_Amount , set_Delinquent_Amount ] = useState( 0) ;        // 未收金額
    const [ discount_Amount , set_Discount_Amount ]     = useState( 0) ;        // 優惠金額

    const [ paymentMethod , set_PaymentMethod ]         = useState( '現金' ) ;  // 付款方式

    // 付款方式
    const handle_PaymentMethod = ( value : string ) => {

        set_PaymentMethod( value ) ;  // 設定 _ 付款方式

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

        // 驗證 ( 再改為 Yup 2021.06.27 )
        if( isNaN( value ) ){
            alert('實收金額須為整數數字') ;
            setValue( 'actual_Payment' , receivable ) ;
            set_Delinquent_Amount( 0 ) ;
            return false ;
        }

        if( value > receivable ){
           alert('實收金額不能大於應收金額') ;
           setValue( 'actual_Payment' , receivable ) ;
           set_Delinquent_Amount( 0 ) ;
           return false ;
        }

        // 設定 _ 實收金額
        set_Actual_Payment( value ) ;
        setValue( 'actual_Payment' , value ) ;  // for React-Hook-Form INPUT

        // 設定 _ 未收金額
        set_Delinquent_Amount(receivable -  value ) ;

    } ;

    // 優惠價格
    const handle_Discount = ( value : any ) => {

      setValue( 'actual_Payment' , receivable - value ) ;  // 實收

    } ;

    // -----------------------------------------------------------------------------------


    // * 設定 _ 應收金額
    // 基礎
    useEffect(( ) => {

       if( current === "基礎" ) set_Receivable(basicSumPrice + pickupFee ) ;

    } ,[ basicSumPrice , pickupFee ] ) ;


    // 安親
    useEffect(( ) => {

       set_Receivable(0 ) ;
       if( current === "安親" && current_Care_Type === '一般安親' )      set_Receivable( Care_Ordinary_Price + pickupFee ) ;
       if( current === "安親" && current_Care_Type === '住宿_提早抵達' ) set_Receivable( Care_Ahead_Price + pickupFee ) ;
       if( current === "安親" && current_Care_Type === '住宿_延後帶走' ) set_Receivable( Care_Postpone_Price + pickupFee ) ;

    } ,[ Care_Ordinary_Price , Care_Ahead_Price , Care_Postpone_Price , current , pickupFee ] ) ;

    // 方案
    useEffect(( ) => {

      set_Receivable(0 ) ;

      if( current === "方案" && current_Plan_Type === '包月洗澡' ) set_Receivable( Month_Bath_Price ) ;
      if( current === "方案" && current_Plan_Type === '包月美容' ) set_Receivable( Month_Beauty_Price ) ;
      if( current === "方案" && current_Plan_Type === '住宿券' )   set_Receivable( Lodge_Coupon_Price ) ;

    } ,[ Month_Bath_Price , Month_Beauty_Price , Lodge_Coupon_Price , current ] ) ;

    // -----------------------------------------------------------------------------------

    // 預先設定 _ 實收金額( 依據不同付款方式 )
    useEffect(( ) => {

        // 先初始化( 應收金額變動時 )
        setValue( 'actual_Payment' , '' ) ;    // 實收金額
        set_Delinquent_Amount( receivable ) ;  // 未收金額


        // # 預先設定 _ 實收金額 :
        // * 基礎
        if( current === "基礎" && paymentMethod === "現金" ){
           set_Actual_Payment(basicSumPrice + pickupFee ) ;
           setValue( 'actual_Payment' , basicSumPrice + pickupFee ) ;  // for React-Hook-Form INPUT
        }

        // * 安親
        if( current === "安親" && paymentMethod === "現金" && current_Care_Type === '一般安親' ){
            set_Actual_Payment( Care_Ordinary_Price + pickupFee   ) ;
            setValue( 'actual_Payment' , Care_Ordinary_Price + pickupFee   ) ;  // for React-Hook-Form INPUT
        }

        if( current === "安親" && paymentMethod === "現金" && current_Care_Type === '住宿_提早抵達' ){
            set_Actual_Payment( Care_Ahead_Price + pickupFee   ) ;
            setValue( 'actual_Payment' , Care_Ahead_Price + pickupFee   ) ;  // for React-Hook-Form INPUT
        }

        if( current === "安親" && paymentMethod === "現金" && current_Care_Type === '住宿_延後帶走' ){
            set_Actual_Payment( Care_Postpone_Price + pickupFee  ) ;
            setValue( 'actual_Payment' , Care_Postpone_Price + pickupFee  ) ;  // for React-Hook-Form INPUT
        }

        // * 方案
        if( current === "方案" && paymentMethod === "現金" && current_Plan_Type === '包月洗澡' ){
            set_Actual_Payment( Month_Bath_Price  ) ;
            setValue( 'actual_Payment' , Month_Bath_Price  ) ;  // for React-Hook-Form INPUT
        }

        if( current === "方案" && paymentMethod === "現金" && current_Plan_Type === '包月美容' ){
            set_Actual_Payment( Month_Beauty_Price  ) ;
            setValue( 'actual_Payment' , Month_Beauty_Price  ) ;  // for React-Hook-Form INPUT
        }

        if( current === "方案" && paymentMethod === "現金" && current_Plan_Type === '住宿券' ){
            set_Actual_Payment( Lodge_Coupon_Price  ) ;
            setValue( 'actual_Payment' , Lodge_Coupon_Price  ) ;  // for React-Hook-Form INPUT
        }

    } ,[ receivable ] ) ;

    // 預先設定 _ 未收金額
    useEffect(( ) => {

      // 設定 _ 未收金額
      set_Delinquent_Amount(receivable -  actual_Payment ) ;

    } ,[ actual_Payment ] ) ;


    const blue = { color : "rgb(0,0,150)" } ;

    return <div className="columns is-multiline  is-mobile">

                    <div className="column is-4-desktop">

                       <span className="tag is-large is-white">
                          <b> 服務項目 :
                              <span style={ blue }> { current } &nbsp;
                                  <span className='f_10'>
                                  { ( current === '方案' && current_Plan_Type ) && `( ${ current_Plan_Type } )` }
                                      { ( current === '安親' && current_Care_Type ) && `( ${ current_Care_Type } )` }
                                </span>
                              </span>
                          </b>
                       </span>

                    </div>

                    <div className="column is-8-desktop">

                       <span className="tag is-large is-white">
                          <b> 應收金額 : <span style={{ color:"red" }} > { receivable } </span> 元 </b>
                       </span> &nbsp; &nbsp;

                        { /* 金額明細 */ }
                        { current === '基礎' &&

                        <b className="tag is-medium is-rounded"> &nbsp; &nbsp;
                            { basicSumPrice !== 0 && <span> 基礎費 : { basicSumPrice } 元 </span> } &nbsp;
                            { pickupFee !== 0     && <span> 接送費 : { pickupFee } 元     </span> } &nbsp; &nbsp;
                        </b>

                        }

                        { current === '安親' &&

                        <b className="tag is-medium is-rounded"> &nbsp; &nbsp;
                            { Care_Ordinary_Price !== 0 && <span> 一般安親 : { Care_Ordinary_Price } 元       </span> } &nbsp;
                            { Care_Ahead_Price !== 0    && <span> 住宿 _ 提早抵達 : { Care_Ahead_Price } 元    </span> } &nbsp;
                            { Care_Postpone_Price !== 0 && <span> 住宿 _ 延後帶走 : { Care_Postpone_Price } 元 </span> } &nbsp;
                            { pickupFee !== 0           && <span> 接送費 : { pickupFee } 元                    </span> } &nbsp;
                        </b>

                        }

                    </div>

                    { /* 付款方式  */ }
                    <div className="column is-4-desktop">

                         <span className="tag is-large is-white">

                              <b> 付款方式 : </b> &nbsp;

                              <div className="control has-icons-left">

                                 <div className="select is-small relative" >

                                     <select { ...register( "payment_Method" ) }
                                             style    = {{ fontSize : "13pt" , top : "-7px" , fontWeight : "bold" }}
                                             onChange = { e => handle_PaymentMethod( e.target.value )} >

                                          <option value="現金" > 現金        </option>

                                         { ( current === '基礎' || current === '洗澡' || current === '美容') &&
                                         <option value="贈送"> 贈送 </option>
                                         }

                                         { ( current === '基礎' || current === '洗澡' || current === '美容') &&
                                         <option value="優惠"> 優惠 </option>
                                         }

                                         {  current === '洗澡' &&
                                         <option value="包月洗澡"> 包月洗澡 </option>
                                         }

                                         {  current === '美容' &&
                                         <option value="包月美容" > 包月美容 </option>
                                         }

                                     </select>

                                  </div>

                                  <div className="icon is-small is-left"> <i className="fas fa-money-bill-wave"></i> </div>

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

                            <div className="control has-icons-left" style={{left:"-60px"}}>

                                <input className="input relative"  type="text"
                                       {...register( "actual_Payment" )}
                                       onChange={ e => handle_ActualPayment( e.target.value ) } />

                                <span className="icon is-small is-left"> <i className="fas fa-dollar-sign"></i> </span>

                            </div>

                            <span className="tag is-large is-white absolute" style={{left: "110px",top:"12px"}}> <b> 元 </b> </span>

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
                    <div className="column is-4-desktop">

                         <span className="tag is-large is-white">

                             <b> 經手人員 : </b> &nbsp;


                             <div className="control has-icons-left">

                                 <div className="select is-small relative" >
                                    <select  style={{ fontSize : "13pt" , top : "-7px" , fontWeight : "bold" }}  >
                                      <option value="請選擇" > 請選擇 </option>
                                      <option value="陳宜芳" > 陳宜芳 </option>
                                      <option value="李馨慧" > 李馨慧 </option>
                                    </select>
                                 </div>

                                 <div className="icon is-medium is-left">  <i className="fas fa-user"></i> </div>

                             </div>

                       </span>

                    </div>

                    { /* 建檔日期 */ }
                    <div className="column is-8-desktop">

                       <span className="tag is-large is-white">

                          <b> 建檔日期 : <span style={ blue } > { get_Today() } </span> </b>

                       </span>

                    </div>

                </div>

};

export default Fee_Summary ;