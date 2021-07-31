
import React, {FC, useEffect, useState} from "react" ;
import { Edit_Form_Type } from "utils/Interface_Type"
import {useRead_Service_Prices} from "hooks/ajax_crud/useAjax_Read";

import { set_Extra_Beauty_Fee } from "store/actions/action_Extra_Service_Fee"
import {useDispatch} from "react-redux";
import useSection_Folding from "hooks/layout/useSection_Folding";




interface IExtra_Beauty extends Edit_Form_Type {

    editType?    : string ;
    serviceData? : any ;

}

/* 加價美容 ( 僅洗澡 ) */
const Extra_Beauty : FC< IExtra_Beauty > = ({ register , editType, serviceData  } )=>{


    const dispatch = useDispatch() ;

    const { is_folding , Folding_Bt }           = useSection_Folding( false ) ;  // 收折區塊

    // 讀取 _ "加價美容" 所有價格
    const extra_Beauty_Prices                   = useRead_Service_Prices( '加價美容' ) ;

    // 所點選的服務名稱
    const [ beauty_Picked , set_Beauty_Picked ] = useState<string[]>( [] ) ;

    
    // 加價美容費用小計
    const [ price , set_Price ] = useState( 0 ) ;


    // 欄位變動處理
    const handle_Change = ( service : string ) => {


        if( beauty_Picked.indexOf( service ) !== -1 ){  // * 重複點選同樣選項 --> 刪除

            const _beauty_Picked = [...beauty_Picked] ;

            // 刪除
            _beauty_Picked.splice( beauty_Picked.indexOf( service ) , 1 ) ;

            // 設定
            set_Beauty_Picked( _beauty_Picked ) ;

        }else{                                            // * 尚未點選 --> 加入

            set_Beauty_Picked([ ...beauty_Picked , service ] ) ;

        }


    } ;


    // 計算 : 加價美容小計價格
    useEffect(( ) => {

        let _price = 0 ;

        if( beauty_Picked.length > 0 ){

            beauty_Picked.forEach( x => {

                extra_Beauty_Prices.forEach( y => {

                    if( parseInt(x) === y['id'] )  _price += y['service_price'] ;

                } )

            })

        }

        // 設定 _ 價格小計
        set_Price( _price ) ;
        dispatch( set_Extra_Beauty_Fee( _price ) ) ;

    } , [ beauty_Picked ] ) ;


  return <>

              <b className="tag is-large is-link is-light">

                  <i className="fas fa-plus-circle"></i> &nbsp; 加價美容

                  { /* # 加價項目價格 */ }

                  { /* for 新增 */ }
                  { ( editType !== '編輯' && price !== 0 ) &&

                      <> &nbsp;&nbsp;
                          <b className="tag is-rounded is-white" style={{ fontSize : "12pt" }} > 小計 :
                              <span style={{color:"red"}}> &nbsp; { price } &nbsp; </span> 元
                          </b>
                      </>

                  }

                  { /* for 編輯 */ }
                  { ( editType === '編輯' && serviceData.extra_beauty_fee !== 0 ) &&

                      <> &nbsp;&nbsp;
                          <b className="tag is-rounded is-white" style={{fontSize: "12pt"}} > 小計 :
                              <span style={{color: "red"}}> &nbsp; { serviceData.extra_beauty_fee } &nbsp; </span> 元
                          </b>
                      </>

                  }



              </b>

              { /* 收折按鈕 */ }
              <b className="relative" style={{ right : "10px" }}> { Folding_Bt } </b>  <br/>

              { /* 是否收折 */ }
              {is_folding ||

                  <>

                      <br/><br/>

                      <div className="columns is-multiline is-mobile relative" style={{left: "20px"}}>


                          {

                              extra_Beauty_Prices.map((x, y) => {

                                  return <div key={y} className="column is-2-desktop relative">

                                              {x['note'] &&
                                                  <span className="absolute f_10 "
                                                        style={{top: "-5px", left: "30px", color: "rgb(0,0,180)"}}>  {x['note']}  </span>
                                              }

                                              <input type="checkbox" value={x['id']}  {...register("extra_Beauty")}
                                                     onChange={ e => handle_Change(e.target.value) }/>
                                              <b> {x['service_name']} </b>

                                          </div>

                              })

                          }


                          {/*<div className = 'column is-2-desktop' >*/}
                          {/*    <input type="checkbox" value = "頭臉"  { ...register( "beauty_Extra_Option" ) } onChange={ handle_Change } /> <b>頭臉</b>*/}
                          {/*</div>*/}


                          {/*<b style={{ color:"rgb(0,0,150)" }}> 腿部</b> 飾毛 &nbsp;*/}
                          {/*<div className="select">*/}
                          {/*    <select { ...register( "beauty_Extra_Option_3" ) }  onChange={ handle_Change } >*/}
                          {/*        <option value="請選擇">請選擇</option>*/}
                          {/*        <option value="大狗">大狗</option>*/}
                          {/*        <option value="中狗">中狗</option>*/}
                          {/*        <option value="小狗">小狗</option>*/}
                          {/*    </select>*/}
                          {/*</div>*/}

                      </div>

                  </>

              }

              <br/><hr/>

         </>

};

export default React.memo( Extra_Beauty , ( ) => true )