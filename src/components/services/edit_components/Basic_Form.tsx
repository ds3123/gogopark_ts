import React, {FC, useEffect, useState} from "react" ;
import { Edit_Form_Type } from "utils/Interface_Type"
import { useRead_Service_Prices } from "hooks/ajax_crud/useAjax_Read";
import {useDispatch} from "react-redux";

// Redux
import { set_BasicSumPrice } from "store/actions/action_Basic"
import useSection_Folding from "hooks/layout/useSection_Folding";



interface IBasic extends Edit_Form_Type {

    editType?    : string ;
    serviceData? : any ;

}


/* 基礎單選項 */
const Basic_Form : FC< IBasic > = ( { register , current, editType, serviceData } ) => {

    const dispatch                    = useDispatch() ;
    const basicPrices                 = useRead_Service_Prices( '基礎' ) ; // 讀取 _ "基礎" 所有價格
    const { is_folding , Folding_Bt } = useSection_Folding(false) ;      // 收折區塊

    // 所填寫 _ 基礎價格
    const [ price , set_Price ]  = useState<number>( 0 ) ;

    // 所點選 _ 基礎選項
    const [ basicArr , set_basicArr ]       = useState<string[]>( [] ) ; // checkbox
    const [ basicSelect , set_basicSelect ] = useState<string>( "" ) ;   // select

    // 取得 _ 所點選 checkbox
    const get_Checkbox = ( title : string  ) => {

       if( basicArr.indexOf( title ) !== -1 ){  // 重複點選同樣選項 --> 刪除

           const _basicArr = [...basicArr] ;
           _basicArr.splice( basicArr.indexOf( title ) , 1 ) ;
           set_basicArr( _basicArr ) ;

       }else{                                  // 尚未點選 --> 加入

           set_basicArr([ ...basicArr , title ] ) ;

       }

    } ;

    // 取得 _ 所選擇 select
    const get_Select   = ( title : string ) => {

       if( title === "請選擇" ){
           set_basicSelect("") ;
           return false ;
       }

       set_basicSelect( title );

    } ;


    useEffect(( ) => {

        // checkbox 選項 加入 select 選項
        let _basicArr = [ ...basicArr ]  ;
        if( basicSelect !== "" ) _basicArr = [ ...basicArr , basicSelect  ] ;

        // 計算 _ 基礎價格
        let _price = 0 ;

        if( _basicArr.length > 0 ){

            _basicArr.forEach( x => {

                basicPrices.forEach( y => {

                   const _item = y['service_name'] as any ;

                   if( x === ( _item.trim() ) ) _price += y['service_price'] ;

                } )

            })

        }

        set_Price( _price ) ;                     // 設定 _ 價格小計
        dispatch( set_BasicSumPrice( _price ) ) ; // 設定 _ Store

    } ,[ basicArr , basicSelect ] ) ;


   return <>
             <b className="tag is-large is-warning" >

                <i className="far fa-list-alt"></i> &nbsp; 基 礎

                { /* 顯示 : 基礎價格 */ }

                { /* for 新增 */ }
                { ( current === '基礎' && editType !== '編輯' && price !== 0 ) &&

                      <>
                          &nbsp;&nbsp;
                          <b className="tag is-rounded is-white" style={{ fontSize : "12pt" }} > 小計 : <span style={{color:"red"}}> &nbsp; { price } &nbsp; </span> 元 </b>
                      </>

                }

                 { /* for 編輯 ( 僅 "基礎" 顯示價格 ) */ }
                 { ( editType === '編輯' && current === '基礎' ) &&

                     <>
                         &nbsp;&nbsp;
                         <b className="tag is-rounded is-white" style={{ fontSize : "12pt" }} > 小計 : <span style={{color:"red"}}> &nbsp; { serviceData.basic_fee } &nbsp; </span> 元 </b>
                     </>

                 }

             </b>

              { /* 收折鈕 */ }
              <label className="label relative" style={{top:"-40px"}}> { Folding_Bt }  </label>

              <br/>

              { /* 是否收折 : 客戶資料 */ }
              { is_folding ||

                   <>

                       <div className="columns is-multiline is-mobile">

                           {

                               basicPrices.map( (x,y) => {

                                  return  <div key={y} className="column is-3-desktop relative">

                                              { x['note'] &&
                                                 <span className="absolute f_10 " style={{ top:"-5px" , left : "30px" ,color:"rgb(0,0,180)" }}> { x['note'] }  </span>
                                              }

                                              <input type="checkbox" value={ x['service_name'] } {...register("basic_Option")}
                                                     onChange={e => get_Checkbox(e.target.value)}/> <b> { x['service_name'] } </b>

                                          </div>

                               })

                           }


                           {/*<div className="column is-7-desktop">*/}

                           {/*    <b>修腳緣</b> &nbsp;*/}
                           {/*    <div className="select">*/}
                           {/*        <select {...register("basic_Option_Foot")} onChange={e => get_Select(e.target.value)}>*/}
                           {/*            <option value="請選擇">請選擇</option>*/}
                           {/*            <option value="修腳緣_大狗">大狗</option>*/}
                           {/*            <option value="修腳緣_中狗">中狗</option>*/}
                           {/*            <option value="修腳緣_小狗">小狗</option>*/}
                           {/*        </select>*/}
                           {/*    </div>*/}

                           {/*</div>*/}

                       </div>

                       <br/>

                   </>

               }

               <hr/> <br/>

          </>


} ;

export default Basic_Form ;