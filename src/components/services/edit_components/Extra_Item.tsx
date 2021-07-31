
import React, {FC, useState , useEffect } from "react"
import {Edit_Form_Type} from "utils/Interface_Type";
import {useRead_Service_Prices} from "hooks/ajax_crud/useAjax_Read";

import { set_Extra_Item_Fee } from "store/actions/action_Extra_Service_Fee"
import {useDispatch} from "react-redux";
import useSection_Folding from "hooks/layout/useSection_Folding";




interface IExtra_Item extends Edit_Form_Type {

    editType?    : string ;
    serviceData? : any ;

}


{ /* @ 加價項目 */ }
const Extra_Item : FC< IExtra_Item >  = ( { register , editType, serviceData } ) => {

    const dispatch = useDispatch() ;

    const { is_folding , Folding_Bt }               = useSection_Folding( false ) ;  // 收折區塊

    // 讀取 _ "加價項目" 所有價格
    const extra_Item_Prices                         = useRead_Service_Prices( '加價項目' ) ;

    // 所點選的服務名稱
    const [ services_Picked , set_Services_Picked ] = useState<string[]>( [] ) ;

    // 加價項目費用小計
    const [ price , set_Price ] = useState( 0 ) ;


    // 欄位變動處理
    const handle_Change = ( service : string ) => {

        if( services_Picked.indexOf( service ) !== -1 ){  // * 重複點選同樣選項 --> 刪除

            const _services_Picked = [...services_Picked] ;

            // 刪除
            _services_Picked.splice( services_Picked.indexOf( service ) , 1 ) ;

            // 設定
            set_Services_Picked( _services_Picked ) ;

        }else{                                            // * 尚未點選 --> 加入

            set_Services_Picked([ ...services_Picked , service ] ) ;

        }


    } ;


    // 計算 : 加價項目小計價格
    useEffect(( ) => {

        let _price = 0 ;

        if( services_Picked.length > 0 ){

            services_Picked.forEach( x => {

                extra_Item_Prices.forEach( y => {

                    if( parseInt(x) === y['id'] )  _price += y['service_price'] ;

                } )

            })

        }

        // 設定 _ 價格小計
        set_Price( _price ) ;
        dispatch( set_Extra_Item_Fee( _price ) ) ;

    } , [ services_Picked ] ) ;


  return <>
              <b className="tag is-large is-link is-light">

                  <i className="fas fa-plus-circle"></i> &nbsp; 加價項目

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
                  { ( editType === '編輯' && serviceData.extra_service_fee !== 0 ) &&

                      <> &nbsp;&nbsp;
                          <b className="tag is-rounded is-white" style={{fontSize: "12pt"}}> 小計 :
                              <span style={{color: "red"}}> &nbsp; { serviceData.extra_service_fee } &nbsp; </span> 元
                          </b>
                      </>

                  }


              </b>

              { /* 收折按鈕 */ }
              <b className="relative" style={{ right : "10px" }}> { Folding_Bt } </b>  <br/>

              { /* 是否收折 */ }
              { is_folding ||

                  <>

                      <br/><br/>

                      <div className="columns is-multiline is-mobile relative" style={{left: "20px"}}>

                          {
                              extra_Item_Prices.map((x, y) => {

                                  return <div key={y} className="column is-2-desktop relative">

                                              { x['note'] &&
                                                  <span className="absolute f_10"
                                                        style={{top: "-5px", left: "30px", color: "rgb(0,0,180)"}}>  {x['note']}  </span>
                                              }

                                              <input type="checkbox" value={ x['id'] }  {...register("extra_Item")}
                                                     onChange={e => handle_Change(e.target.value)}/>
                                              <b> {x['service_name']} </b>

                                         </div>

                              })

                          }

                          {/* <div className="column is-2-desktop relative"> */}
                          {/*    <input type="checkbox" value="有"  {...register("comb_Flea")} /> <b>跳蚤、壁蝨</b> */}
                          {/* </div> */}

                      </div>

                  </>

              }


              <br/><hr/><br/>

         </>

} ;


export default Extra_Item