
import React, {FC, useState} from "react"
import {Edit_Form_Type} from "utils/Interface_Type";
import {useDispatch} from "react-redux";
import { set_current_care_type , set_care_ordinary_price , set_care_ahead_price , set_care_postpone_price } from "store/actions/action_Care"
import Date_Picker from "templates/form/Date_Picker";
import Time_Picker from "templates/form/Time_Picker";
import { get_H_M , get_Cal_Hour_Time } from "utils/time/time"
import moment from "moment";



{ /* 安親表單欄位 */ }
const Care_Form : FC<Edit_Form_Type> = ({ register  , control , setValue , errors , current } ) => {

    const dispatch = useDispatch() ;

    const today    = moment( new Date ).format('YYYY-MM-DD') ; // 今日

    // 目前所選擇 : 安親類型
    const [ current_Care_Type , set_Current_Care_Type ]     = useState('' ) ;

    // 一般安親費用
    const [ care_Ordinary_Price , set_Care_Ordinary_Price ] = useState(0 ) ;

    // 安親日期、時間
    const [ Date_Time , set_Date_Time ] = useState<any>({

                                            // 開始 :
                                            care_Start_Date   : today ,     // 日期
                                            care_Start_Time   : get_H_M() , // 時間

                                            care_End_DateTime : '' ,

                                            // 結束 :
                                            // care_End_Date   : today ,     // 日期
                                            // care_End_Time   : get_H_M()   // 時間

                                         }) ;


   // 取得 _ 安親類別
   const get_Care_Type = ( type : string ) => {

       // * 初始化
       set_Date_Time({ ...Date_Time , care_End_DateTime : '' }) ;
       setValue( 'care_Hour' , '0' ) ;       // 安親時數
       set_Care_Ordinary_Price( 0 ) ;  // 一般安親價格
       dispatch( set_current_care_type( type === '請選擇' ? '' : type ) ) ;
       dispatch( set_care_ordinary_price(0 )) ;
       dispatch( set_care_ahead_price(0)) ;
       dispatch( set_care_postpone_price(0)) ;


       // 設定目前安親類型
       set_Current_Care_Type(type === '請選擇' ? '' : type ) ;

       if( type === '住宿_提早抵達' ){
           setValue( 'care_Ahead' , 200 ) ;
           dispatch( set_care_ahead_price(200)) ;
       }

       if( type === '住宿_延後帶走' ){
           setValue( 'care_Postpone' , 200 ) ;
           dispatch( set_care_postpone_price(200)) ;
       }

   } ;

   // 取得 _ 安親時數
   const get_Care_Hour = ( hour : number ) => {

       // 目前時間
       const startTime = `${Date_Time['care_Start_Date']} ${Date_Time['care_Start_Time']}` ;

       // 請選擇
       if( hour === 0 ){
           set_Care_Ordinary_Price( 0 ) ;
           dispatch( set_care_ordinary_price(0 )) ;
       }

       if( hour === 4 ){

           set_Care_Ordinary_Price( 200 ) ;
           dispatch( set_care_ordinary_price(200 )) ;

           // 設定 _ 安親結束時間
           set_Date_Time( { ...Date_Time , care_End_DateTime : get_Cal_Hour_Time( startTime,4) } ) ;

       }

       if( hour === 8 ){
           set_Care_Ordinary_Price( 350 ) ;
           dispatch( set_care_ordinary_price(350 )) ;

           // 設定 _ 安親結束時間
           set_Date_Time( { ...Date_Time , care_End_DateTime : get_Cal_Hour_Time( startTime,8) } ) ;

       }

       if( hour === 12 ){
           set_Care_Ordinary_Price( 500 ) ;
           dispatch( set_care_ordinary_price(500 )) ;

           // 設定 _ 安親結束時間
           set_Date_Time( { ...Date_Time , care_End_DateTime : get_Cal_Hour_Time( startTime,12) } ) ;

       }

   } ;

   // 取得 _ 安親 : 開始、結束 _ 日期
   const handle_Date = ( date : any , type : string ) => {

       const _date = moment( date ).format('YYYY-MM-DD' ) ;

       // if( type === 'care_Start_Date' && _date > Date_Time['care_End_Date'] ){
       //     alert('開始日期 不能晚於 結束日期') ;
       //     setValue( 'care_Start_Date' , new Date ) ;
       //     return false ;
       // }

       if( type === 'care_Start_Date' && _date < today ){
           alert('開始日期 不能選擇 過去日期') ;
           setValue( 'care_Start_Date' , new Date ) ;
           return false ;
       }

       // if( type === 'care_End_Date' && _date < Date_Time['care_Start_Date'] ){
       //     alert('結束日期 不能早於 開始日期') ;
       //     setValue( 'care_End_Date' , new Date ) ;
       //     return false ;
       // }

       set_Date_Time({ ...Date_Time , [ type ] : _date  }) ;


   } ;

   // 取得 _ 安親 : 開始、結束 _ 時間
   const handle_Time = ( time : any , type : string ) => {

      set_Date_Time({ ...Date_Time , [ type ] : time  }) ;

   } ;


   return <>

             <b className="tag is-large is-link" > <i className="fas fa-baby-carriage"></i> &nbsp; 安 親 </b> <br/><br/><br/>

             { /* 安親 _ 性質、類型、時數、價格 */ }
             <div className="columns is-multiline is-mobile">

                  { /* 性質 */ }
                  <div className="column is-2-desktop ">
                     <p> <b> 性 質 </b> &nbsp; <b style={{color:"red"}}> { errors.care_Type?.message } </b> </p>
                     <b className="f_13 m_Top_5 fGreen">  { Date_Time['care_Start_Date'] === today ? '當日安親' : '預約安親' } </b>
                 </div>

                  { /* 類型 */ }
                  <div className="column is-2-desktop required">

                       <p> <b> 類 型 </b> &nbsp; <b style={{color:"red"}}> { errors.care_Type?.message } </b> </p>
                       <div className="select">
                           <select { ...register( "care_Type" ) } onChange={ e => get_Care_Type( e.target.value ) } >
                               <option value="請選擇"> 請選擇 </option>
                               <option value="一般安親"> 一般安親 </option>
                               <option value="住宿_提早抵達"> 住宿 提早抵達 </option>
                               <option value="住宿_延後帶走"> 住宿 延後帶走 </option>
                           </select>
                       </div>

                  </div>

                  { /*  一般安親 : 時數、價格  */ }
                  { current_Care_Type === '一般安親' &&

                     <>
                         <div className="column is-2-desktop">
                             <p> <b> 安親時數 </b> </p>
                             <div className="select">
                                 <select { ...register( "care_Hour" ) } onChange={ e => get_Care_Hour( parseInt( e.target.value ) ) } >
                                     <option value="0"> 請選擇 </option>
                                     <option value="4"> 4小時 </option>
                                     <option value="8"> 8小時 </option>
                                     <option value="12"> 12小時 </option>
                                 </select>
                             </div>
                         </div>

                         { ( care_Ordinary_Price > 0 ) &&

                             <div className="column is-6-desktop ">
                                 <span className="tag is-large relative" style={{ top:"20px" }}>
                                     <span className='absolute f_12' style={{ top:'-25px' , left:'0px' }}>
                                         * 4 小時 : 200 元 / 隻  &nbsp;，&nbsp; 8 小時 : 350 元 / 隻  &nbsp;，&nbsp; 12 小時 : 500 元 / 隻
                                     </span>
                                     <b>一般安親 </b> &nbsp; 價格 :  &nbsp;
                                     <b className="tag is-white is-rounded fRed f_12"> { care_Ordinary_Price } 元 </b>
                                 </span>
                             </div>

                         }


                     </>

                  }

                  { /* 住宿 : 提早抵達 */ }
                  { current_Care_Type === '住宿_提早抵達' &&

                     <>
                         <div className="column is-2-desktop relative">
                             <p> <b> 安親費用 </b> </p>
                             <input className='input' type='text' {...register("care_Ahead")}   />
                         </div>
                         <div className="column is-7-desktop relative">
                              <span className="m_Top_30"> 元 </span> &nbsp; &nbsp; &nbsp; &nbsp;
                              <span className="f_10"> * 200 元 / 隻 ( 上限 500 元 ) </span>
                         </div>

                     </>

                  }

                 { /* 住宿 : 延後帶走 */ }
                 { current_Care_Type === '住宿_延後帶走' &&

                     <>
                         <div className="column is-2-desktop relative">
                             <p> <b> 安親費用 </b> </p>
                             <input className='input' type='text' {...register("care_Postpone")}   />
                         </div>
                         <div className="column is-7-desktop relative">
                             <span className="m_Top_30"> 元 </span> &nbsp; &nbsp; &nbsp; &nbsp;
                             <span className="f_10"> * 200 元 / 隻 ( 上限 500 元 ) </span>
                         </div>

                     </>

                 }

              </div>

             { /* 安親日期、時間 */ }
             <div className="columns is-multiline  is-mobile">

                   <div className="column is-1-desktop relative required">
                       <b className="absolute" style={{top:"20px"}}> 開始時間 : </b>
                   </div>

                   { /* 日期 */ }
                   <div className="column is-2-desktop">

                       <p> <b style={{color:"red"}}> { errors.lodge_CheckIn_Date?.message } </b> </p>
                       <Date_Picker control      = { control }
                                    name         = "care_Start_Date"
                                    default_Date = { new Date }
                                    handle_OnChange = { ( value : any ) => handle_Date( value , 'care_Start_Date' ) }
                       />

                   </div>

                   { /* 時間 */ }
                   <div className="column is-2-desktop">

                       <p> <b style={{color:"red"}}> { errors.lodge_CheckIn_Time?.message } </b> </p>
                       <Time_Picker name    = "care_Start_Time"
                                    control = { control }
                                    handle_OnChange = { ( value : any ) => handle_Time( value , 'care_Start_Time' ) }

                       />

                   </div>


                 { Date_Time['care_End_DateTime'] &&

                    <>

                     { /* 安親結束時間 */}
                     <div className="column is-2-desktop">

                         <b className="tag is-medium is-white"> 結束時間 : &nbsp;
                             <span className="tag is-medium is-success is-light"> {Date_Time['care_End_DateTime']}  </span>
                         </b>

                     </div>

                     { /* 逾時計算 */}
                     <div className="column is-5-desktop">

                         <b className="tag is-medium is-white fDred"> 逾時計算 : &nbsp;
                            00 : 00
                         </b>

                     </div>

                   </>

                 }

                   {/*<div className="column is-1-desktop">  <span className="relative" style={{ top:"7px" }}> { '---------' } </span> </div>*/}

                   {/*<div className="column is-1-desktop relative required">*/}
                   {/*    <b className="absolute" style={{top:"20px"}}> 結束時間 : </b>*/}
                   {/*</div>*/}

                   { /* 日期 */ }
                   {/*<div className="column is-2-desktop">*/}

                   {/*    <p> <b style={{ color:"red" }}> { errors.lodge_CheckOut_Date?.message } </b> </p>*/}
                   {/*    <Date_Picker control         = { control }*/}
                   {/*                 name            = "care_End_Date"*/}
                   {/*                 default_Date    = { new Date }*/}
                   {/*                 handle_OnChange = { ( value : any ) => handle_Date( value , 'care_End_Date' ) }*/}
                   {/*    /> &nbsp;*/}

                   {/*</div>*/}

                   { /* 時間  */ }
                   {/*<div className="column is-2-desktop">*/}

                   {/*    <p> <b style={{color:"red"}}> { errors.lodge_CheckOut_Time?.message } </b> </p>*/}
                   {/*    <Time_Picker name            = "care_End_Time"*/}
                   {/*                 control         = { control }*/}
                   {/*                 handle_OnChange = { ( value : any ) => handle_Time( value , 'care_End_Time' ) }*/}


                   {/*    />*/}

                   {/*</div>*/}

               </div>

             <br/><hr/><br/>

          </>

} ;

export default Care_Form
