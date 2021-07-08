
import React, {useEffect, useState} from "react" ;
import Date_Picker from "templates/form/Date_Picker";

// React Hook Form
import { useForm , SubmitHandler , Controller } from "react-hook-form" ;
import {ICustomer} from "utils/Interface_Type";
import {set_Side_Panel} from "store/actions/action_Global_Layout";
import Update_Service from "components/services/edit/Update_Service";
import {useDispatch} from "react-redux";
import Update_Pet from "components/pets/edit/Update_Pet";
import Update_Customer from "components/customers/edit/Update_Customer";

import useSection_Folding from "hooks/layout/useSection_Folding";




// 洗澡、美容 : 應收款
const data_Receivable = [
                           { item : '加價美容' , qcode : 'Q04' , petSpecies : '比熊' , petName : '麻糬' , price : 200 , discount : 0 , receivable : 200 , note : '包月第 4 次' } ,
                           { item : '單次洗澡' , qcode : 'Q21' , petSpecies : '柴犬' , petName : 'Cashe' , price : 500 , discount : 0 , receivable : 500 , note : '' } ,
                           { item : '單次洗澡' , qcode : 'Q22' , petSpecies : '瑪爾濟斯' , petName : '桃太郎' , price : 350 , discount : 0 , receivable : 350 , note : '' } ,
                           { item : '單次洗澡' , qcode : 'Q23' , petSpecies : '法鬥' , petName : '憨吉' , price : 400 , discount : 0 , receivable : 400 , note : '' } ,
                           { item : '單次洗澡' , qcode : 'Q24' , petSpecies : '柴犬' , petName : '皮蛋' , price : 500 , discount : 0 , receivable : 500 , note : '' } ,
                           { item : '單次美容' , qcode : 'Q20' , petSpecies : '米克斯' , petName : '錢錢' , price : 1000 , discount : 0 , receivable : 1000 , note : '' } ,
                        ] ;

// 洗澡、美容 : 扣_預收款
const data_MinusPrepayment = [
                                { item : '包月洗澡' , qcode : 'Q01' , petSpecies : '瑪爾濟斯' , petName : '小白' , price : 325 , discount : 0 , receivable : 325 , note : '包月第 3 次' } ,
                                { item : '包月洗澡' , qcode : 'Q11' , petSpecies : '法鬥' , petName : '胖虎' , price : 350 , discount : 0 , receivable : 350 , note : '包月第 2 次' } ,
                                { item : '包月洗澡' , qcode : 'Q12' , petSpecies : '米克斯' , petName : '前前' , price : 650 , discount : 0 , receivable : 650 , note : '包月第 3 次' } ,
                                { item : '包月洗澡' , qcode : 'Q13' , petSpecies : '大白熊' , petName : '小熊' , price : 800 , discount : 0 , receivable : 800 , note : '包月第 4 次' } ,
                                { item : '包月洗澡' , qcode : 'Q15' , petSpecies : '貴賓' , petName : '巧克力' , price : 350 , discount : 0 , receivable : 350 , note : '包月第 3 次' } ,
                                { item : '包月美容' , qcode : 'Q16' , petSpecies : '長毛臘腸' , petName : 'Money' , price : 350 , discount : 0 , receivable : 350 , note : '包月第1次' } ,
                                { item : '包月美容' , qcode : 'Q17' , petSpecies : '貴賓' , petName : '布丁' , price : 400 , discount : 0 , receivable : 400 , note : '包月第 3 次' } ,
                                { item : '包月美容' , qcode : 'Q18' , petSpecies : '米克斯' , petName : '大大' , price : 750 , discount : 0 , receivable : 750 , note : '包月第 4 次' } ,
                                { item : '包月美容' , qcode : 'Q10' , petSpecies : '比熊' , petName : 'Q比' , price : 450 , discount : 0 , receivable : 450 , note : '包月第 1 次' } ,
                                { item : '包月美容' , qcode : 'Q21' , petSpecies : '瑪爾濟斯' , petName : '雪糕' , price : 350 , discount : 0 , receivable : 350 , note : '包月第 2 次' } ,

                              ] ;

// 洗澡、美容 : 預收款
const data_Prepayment = [
                           { item : '包月美容' , petSpecies : '貴賓'   , petName : 'Bonny' , price : 1400 , session : 1 , discount : 0 , receivable : 1400 , note : '' } ,
                           { item : '包月美容' , petSpecies : '貴賓'   , petName : 'Kitty' , price : 1400 , session : 1 , discount : 0 , receivable : 1400 , note : '' } ,
                           { item : '包月美容' , petSpecies : '米克斯' , petName : '米漿'  , price : 1900 , session : 1 , discount : 0 , receivable : 1900 , note : '' } ,
                           { item : '包月美容' , petSpecies : '比熊'   , petName : 'Q比'   , price : 1800 , session : 1 , discount : 0 , receivable : 1800 , note : '' } ,
                           { item : '包月洗澡' , petSpecies : '貴賓'   , petName : 'QQ'    , price : 1400 , session : 1 , discount : 0 , receivable : 1400 , note : '' } ,
                        ] ;

// 住宿、安親 : 應收款
const data_LodgeCare = [
                         { item : '安親' , petSpecies : '傑克羅素梗犬' , petName : '斑斑' , price : 200 , discount : 0 , receivable : 200 , note : '' } ,

                       ] ;




/*  @ 日報表  */
const Daily_Report = () => {


    const dispatch = useDispatch();

    // # 總計金額
    const [ receivable_Sum , set_Receivable_Sum ]           = useState( 0 ) ;  // 應收帳款
    const [ minusPrepayment_Sum , set_MinusPrepayment_Sum ] = useState( 0 ) ;  // 扣 _ 應收帳款
    const [ prepayment_Sum , set_Prepayment_Sum ]           = useState( 0 ) ;  // 應收帳款
    const [ lodgeCare_Sum , set_LodgeCare_Sum ]             = useState( 0 ) ;  // 住宿 + 安親

    // # 收折區塊
    const { is_folding : is_folding_Receivable , Folding_Bt : Folding_Bt_Receivable }           = useSection_Folding(true) ;  // 應收款
    const { is_folding : is_folding_MinusPrepayment , Folding_Bt : Folding_Bt_MinusPrepayment } = useSection_Folding(true) ;  // 扣_預收款
    const { is_folding : is_folding_Prepayment , Folding_Bt : Folding_Bt_Prepayment }           = useSection_Folding(true) ;  // 預收款
    const { is_folding : is_folding_LodgeCare , Folding_Bt : Folding_Bt_LodgeCare }             = useSection_Folding(true) ;  // 住宿款 + 安親款


    // React Hook Form
    const { register , setValue , handleSubmit , control , formState: { errors , isDirty , isValid } } = useForm<ICustomer>({
                                         mode : "all" ,
                                      }) ;


    // 點選 _ 服務單
    const click_Service  = ( service_Type : string ) => dispatch( set_Side_Panel(true , <Update_Service /> , { service_Type : service_Type ,  preLoadData : null } as { service_Type : string } ) ) ;

    // 點選 : 寵物
    const click_Pet      = () => dispatch( set_Side_Panel(true , <Update_Pet /> , { preLoadData : null } ) ) ;

    // 點選 _ 客戶
    const click_Customer = () => dispatch( set_Side_Panel(true , <Update_Customer /> , { preLoadData : null } ) ) ;


    const way   = { fontSize : "11pt" , fontWeight : "bold"  } as const ;
    const tLeft = { textAlign:"left" } as const ;
    const blue  = { color:'rgb(0,0,160)' } ;


    // 計算 _ 應收金額總計、實收金額總計
    useEffect(( ) => {

        let _receivable_Sum      = 0 ;
        let _minusPrepayment_Sum = 0 ;
        let _prepayment_Sum      = 0 ;
        let _lodgeCare_Sum       = 0 ;

        data_Receivable.forEach( x => { _receivable_Sum += x['receivable'] ; }) ;
        set_Receivable_Sum( _receivable_Sum ) ;

        data_MinusPrepayment.forEach( x => { _minusPrepayment_Sum += x['receivable'] ; }) ;
        set_MinusPrepayment_Sum( _minusPrepayment_Sum ) ;

        data_Prepayment.forEach( x => { _prepayment_Sum += x['receivable'] ; }) ;
        set_Prepayment_Sum( _prepayment_Sum ) ;

        data_LodgeCare.forEach( x => { _lodgeCare_Sum += x['receivable'] ; }) ;
        set_LodgeCare_Sum( _lodgeCare_Sum ) ;

    } ,[] ) ;


  return <form >

          { /* 查詢列  */ }
          <div className="columns is-multiline  is-mobile">

               <div className="column is-7-desktop">

                   <div className="tag is-large is-white">
                       <b> 報表日期 : </b> &nbsp;
                       <Date_Picker control={control} name="service_Date" default_Date={new Date} />
                   </div>

               </div>

               <div className="column is-5-desktop relative">

                   <div className="absolute" style={{ width:"450px" , top:'55px' , left:'225px' }}> 洗澡美容 : 應收款 + 洗澡美容 : 預收款 + 住宿安親 : 應收款 </div>

                   <b className="tag is-large is-white relative" style={{left:'200px'}}>
                     總 計 :&nbsp;<span className="fRed"> { receivable_Sum + prepayment_Sum + lodgeCare_Sum } </span> &nbsp; 元
                   </b> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;

               </div>

           </div>

           <br/><br/><br/><br/>

          { /* 洗澡美容 : 應收款 */ }
          <div className="columns is-multiline  is-mobile">
              <div className="column is-9-desktop">
                  <b className="tag is-large is-success is-light"> 洗澡美容 :&nbsp;<span style={blue}> 應收款 </span>  </b>
              </div>
              <div className="column is-3-desktop">
                  <b className="tag is-large is-white"> 小計 :&nbsp;<span className="fRed"> { receivable_Sum } </span>&nbsp;元  </b>
                  { Folding_Bt_Receivable }
              </div>
          </div>

          { is_folding_Receivable &&

              <>
                  <br/>

                  <table className="table is-fullwidth is-hoverable">

                      <thead>
                          <tr>
                              <th> 項 目    </th>
                              <th> 排 序    </th>
                              <th> 品 種    </th>
                              <th> 寵 物    </th>
                              <th> 金 額    </th>
                              <th> 折 扣    </th>
                              <th> 應收帳款 </th>
                              <th> 備 註    </th>
                          </tr>
                      </thead>

                      <tbody>

                        { data_Receivable.map( (x,y)=> {

                            return <tr key = { y }>
                                      <td> { x['item'] } </td>
                                      <td> { x['qcode'] } </td>
                                      <td> { x['petSpecies'] } </td>
                                      <td> { x['petName'] } </td>
                                      <td> { x['price'] } </td>
                                      <td> { x['discount'] } </td>
                                      <td> { x['receivable'] } </td>
                                      <td> { x['note'] } </td>
                                   </tr>

                        }) }

                      </tbody>

                  </table>

                  <br/><br/><br/><br/>

              </>

          }

          <br/><br/>

          { /* 洗澡美容 : 扣 _ 預收款 */ }
          <div className="columns is-multiline  is-mobile">
              <div className="column is-9-desktop">
                  <b className="tag is-large is-warning is-light"> 洗澡美容 :&nbsp;<span style={blue}> 扣 _ 預收款 </span>    </b>
              </div>
              <div className="column is-3-desktop">
                  <b className="tag is-large is-white"> 小計 :&nbsp;<span className="fDred"> { minusPrepayment_Sum } </span>&nbsp;元  </b> &nbsp; &nbsp; &nbsp; &nbsp;
                  { Folding_Bt_MinusPrepayment }
              </div>
          </div>

          { is_folding_MinusPrepayment &&

              <>

                  <br/>

                  <table className="table is-fullwidth is-hoverable">

                      <thead>
                          <tr>
                              <th> 項 目    </th>
                              <th> 排 序    </th>
                              <th> 品 種    </th>
                              <th> 寵 物    </th>
                              <th> 金 額    </th>
                              <th> 折 扣    </th>
                              <th> 應收帳款 </th>
                              <th> 備 註    </th>
                          </tr>
                      </thead>

                      <tbody>

                          { data_MinusPrepayment.map( (x,y)=> {

                              return <tr key = { y }>
                                          <td> { x['item'] } </td>
                                          <td> { x['qcode'] } </td>
                                          <td> { x['petSpecies'] } </td>
                                          <td> { x['petName'] } </td>
                                          <td> { x['price'] } </td>
                                          <td> { x['discount'] } </td>
                                          <td> { x['receivable'] } </td>
                                          <td> { x['note'] } </td>
                                       </tr>

                          }) }

                      </tbody>

                  </table>

                  <br/><br/><br/><br/>

              </>

          }

          <br/><br/>

          { /* 洗澡美容 : 預收款 */ }
          <div className="columns is-multiline  is-mobile">
              <div className="column is-9-desktop">
                  <b className="tag is-large is-warning is-light"> 洗澡美容 :&nbsp;<span style={blue}> 預收款 </span>  </b>
              </div>
              <div className="column is-3-desktop">
                  <b className="tag is-large is-white"> 小計 :&nbsp;<span className="fRed"> { prepayment_Sum } </span>&nbsp;元  </b> &nbsp; &nbsp; &nbsp; &nbsp;
                  { Folding_Bt_Prepayment }
              </div>
          </div>

          { is_folding_Prepayment &&

             <>

                 <br/>

                 <table className="table is-fullwidth is-hoverable">

                  <thead>
                      <tr>
                          <th> 項 目    </th>
                          <th> 品 種    </th>
                          <th> 寵 物    </th>
                          <th> 金 額    </th>
                          <th> 期 數    </th>
                          <th> 折 扣    </th>
                          <th> 應收帳款 </th>
                          <th> 備 註    </th>
                      </tr>
                  </thead>

                  <tbody>

                      { data_Prepayment.map( (x,y)=> {

                          return <tr key = { y }>
                                      <td> { x['item'] } </td>
                                      <td> { x['petSpecies'] } </td>
                                      <td> { x['petName'] } </td>
                                      <td> { x['price'] } </td>
                                      <td> { x['session'] } </td>
                                      <td> { x['discount'] } </td>
                                      <td> { x['receivable'] } </td>
                                      <td> { x['note'] } </td>
                                  </tr>

                      }) }

                  </tbody>

              </table>

                 <br/><br/><br/><br/>

             </>

          }

          <br/><br/>

          { /* 住宿 + 安親 */ }
          <div className="columns is-multiline  is-mobile">
              <div className="column is-9-desktop">
                  <b className="tag is-large is-success is-light"> 住宿安親 :&nbsp;<span style={blue}> 應收款 </span>  </b>
              </div>
              <div className="column is-3-desktop">
                  <b className="tag is-large is-white"> 小計 :&nbsp;<span className="fRed"> { lodgeCare_Sum } </span>&nbsp;元 </b> &nbsp; &nbsp; &nbsp; &nbsp;
                  { Folding_Bt_LodgeCare }
              </div>
          </div>

          { is_folding_LodgeCare &&

              <>

                  <br/>

                  <table className="table is-fullwidth is-hoverable">

                      <thead>
                          <tr>
                              <th> 項 目    </th>
                              <th> 品 種    </th>
                              <th> 寵 物    </th>
                              <th> 金 額    </th>
                              <th> 折 扣    </th>
                              <th> 應收帳款 </th>
                              <th> 備 註    </th>
                          </tr>
                      </thead>
                      <tbody>

                          { data_LodgeCare.map( (x,y)=> {

                              return <tr key = { y }>
                                          <td> { x['item'] } </td>
                                          <td> { x['petSpecies'] } </td>
                                          <td> { x['petName'] } </td>
                                          <td> { x['price'] } </td>
                                          <td> { x['discount'] } </td>
                                          <td> { x['receivable'] } </td>
                                          <td> { x['note'] } </td>
                                      </tr>

                          }) }

                      </tbody>

                  </table>

                  <br/><br/><br/><br/>

              </>

          }

          <br/><br/><br/><br/><br/><br/>

         </form>

} ;

export default Daily_Report ;