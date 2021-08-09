import React, {useContext, useEffect, useState} from "react" ;

// React Hook Form
import { useForm , SubmitHandler } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import { IService } from "utils/Interface_Type";

import useServiceType from "hooks/layout/useServiceType"
import { SidePanelContext } from "templates/panel/Side_Panel";
import Basic_Form from "components/services/edit_components/Basic_Form";
import Bath_Form from "components/services/edit_components/Bath_Form";
import Beauty_Form from "components/services/edit_components/Beauty_Form";
import Service_Info from "components/services/edit_components/Service_Info";
import Customer_Note from "components/services/edit_components/Customer_Note";
import Summary_Fee from "components/services/edit_components/summary_fee/Summary_Fee";
import Extra_Beauty from "../services/edit_components/Extra_Beauty";
import {useUpdate_Data} from "hooks/ajax_crud/useAjax_Update";

import Pickup_Fee from "../services/edit_components/Pickup_Fee";
import Extra_Item from "../services/edit_components/Extra_Item";



// Yup 第三方驗證
const schema = yup.object().shape({


});


{ /* 各項服務 _ 目前狀態 ( 於首頁狀態框中，點選 Qcode )  */ }
const Service_Report = () => {

    const value            = useContext( SidePanelContext ) ; // 取得 context 值

    const service_Type     = value.service_Type as any ;      // 服務類型 ( 基礎、洗澡、美容 )
    const data             = value.preLoadData as any;        // 服務單資料
    const pet              = data['pet'] ;

    const Q_code           = data.q_code ;                    // Qcode
    const Expected_Leave   = data.expected_leave ;            // 期望離店時間

    const { color , icon } = useServiceType( service_Type , false , 'large' , true ) ;

    const { register , setValue , handleSubmit , control , formState : { errors , isDirty , isValid } } =
            useForm<IService>(

                                {

                                  mode          : "all" ,
                                  resolver      : yupResolver( schema ) ,
                                  defaultValues : {

                                                     // # 基本資料 ( Service_Info )
                                                     service_Date    : new Date( data.service_date ) as any ,

                                                     actual_Arrive   : data.actual_arrive ,   // 實際 _ 到店時間
                                                     expected_Arrive : data.expected_arrive ? data.expected_arrive : '' , // 預計 _ 到店時間 ( 預約 )
                                                     expected_Leave  : data.expected_leave ,  // 預計 _ 離店時間

                                                     way_Arrive      : data.way_arrive ,       // 到店方式
                                                     way_Leave       : data.way_leave ,        // 離店方式

                                                     // # 客戶交代、物品 ( Customer_Note )
                                                     customer_Object       : data.customer_object ? data.customer_object.split(',') : [] ,
                                                     customer_Object_Other : data.customer_object_other ,
                                                     customer_Note         : data.customer_note ? data.customer_note.split(',') : [] ,
                                                     admin_Customer_Note   : data.admin_customer_note ,

                                                     // # 基礎單資料 ( Basic_Form )
                                                     basic_Option          : data.basic_data ? data.basic_data.split(',') : [] ,

                                                     // # 洗澡單資料 ( Bath_Form )
                                                     bath_Option_1 : data.bath_1 ,
                                                     bath_Option_2 : data.bath_2 ,
                                                     bath_Option_3 : data.bath_3 ,
                                                     bath_Option_4 : data.bath_4 ,
                                                     bath_Option_5 : data.bath_5 ,
                                                     bath_Option_6 : data.bath_6 ,

                                                     // # 美容單資料 ( Beauty_Form )
                                                     beauty_Option_Body  : data.b_body ,
                                                     beauty_Option_Head  : data.b_head ,
                                                     beauty_Option_Ear   : data.b_ear ,
                                                     beauty_Option_Tail  : data.b_tail ,
                                                     beauty_Option_Foot  : data.b_foot ,
                                                     beauty_Option_Other : data.b_other ,

                                                     // # 加價項目
                                                     extra_Item     : data.extra_service ? data.extra_service.split(',') : [] ,

                                                     // # 加價美容
                                                     extra_Beauty   : data.extra_beauty ? data.extra_beauty.split(',') : [] ,

                                                     // # 接送費
                                                     pickup_Fee     : data.pickup_fee ,

                                                     // # 服務明細 ( Summary_Fee )
                                                     payment_Method : data.payment_method ,   // 付款方式

                                                }

                                }

                             ) ;


    // console.log( data )

    // 更新函式
    const update_Data    = useUpdate_Data() ;

    // 提交 _ 更新資料
    const onSubmit : SubmitHandler<IService> = columnsData => {

        const service = data as any ;

        let service_Id = '' ;
        let api        = '' ;
        if( service_Type === '基礎' ){ service_Id = service['basic_id'] ;  api = '/basics' };
        if( service_Type === '洗澡' ){ service_Id = service['bath_id'] ;   api = '/bathes' };
        if( service_Type === '美容' ){ service_Id = service['beauty_id'] ; api = '/beauties' };


        // 更改欄位
        const updateObj = {
                            shop_status : columnsData['shop_Status']
                           } ;

        update_Data( api , service_Id , updateObj , '/index' , `${ service_Type }單` ) ;

    } ;

    const props = {
                    register    : register ,
                    setValue    : setValue ,
                    control     : control ,
                    errors      : errors ,
                    isDirty     : isDirty ,
                    isValid     : isValid ,
                    current     : data.service_type ,

                    editType    : '編輯' ,  // 避免於編輯時，出現 '不能選擇 : 過去日期' 警告 ( Service_Info.tsx )
                    serviceData : data      // 該筆服務資料
                  } ;

    useEffect(() => {

        // * 設定 _ 預設值 ( NOTE : 以 RHF 的 defaultValues , 會與 DatePicker 衝突 2021.06.15 )
        const data = value.preLoadData ;
        setValue( 'shop_Status' , data['shop_status'] ) ; // 到店狀態

    } ,[] ) ;

  return  <form onSubmit = { handleSubmit( onSubmit ) }  >

              { /* 標題列 */ }
              <div className="columns is-multiline is-mobile" >

                <div className="column is-7-desktop">

                    <b className={ color }>

                        <i className={ icon }></i> &nbsp; Q{ Q_code } &nbsp; { pet['name'] } ( { pet['species'] } ) &nbsp;

                        { pet['sex']   && <> <b className="tag is-white is-rounded f_11" > { pet['sex'] } </b> &nbsp; &nbsp; </> }

                        { pet['color'] && <> <b className="tag is-white is-rounded f_11" > { pet['color'] } </b> &nbsp; &nbsp;</> }

                        { pet['age']   && <> <b className="tag is-white is-rounded f_11" > { pet['age'] } 歲 </b> &nbsp; &nbsp; </> }

                    </b>

                </div>

                <div className="column is-5-desktop">

                    <b className="tag is-large is-white"> 到店狀態 : </b>
                    <div className="select" >
                        <select  { ...register( "shop_Status" ) }  >
                           <option value="到店等候中"   > 到店等候中   </option>
                           <option value="到店美容中"   > 到店美容中   </option>
                           <option value="洗完等候中"   > 洗完等候中   </option>
                           <option value="已回家( 房 )" > 已回家( 房 ) </option>
                        </select>
                    </div>

                </div>


              </div>

              <hr/><br/>

              { /* 服務單基本資訊 : 服務性質、到店日期、處理碼 ... */ }
              <Service_Info { ...props } />

              { /* 自備物品、主人交代、櫃台備註  */ }
              <Customer_Note { ...props } />

              { /* 基礎單項目 */ }
              <Basic_Form { ...props } />

              { /* 洗澡單項目 */ }
              { ( service_Type === "洗澡" || service_Type === "美容" ) && <Bath_Form { ...props } /> }

              { /* 加價 _ 項目 */ }
              { ( service_Type === "洗澡" || service_Type === "美容" ) && <Extra_Item { ...props } /> }

              { /* 加價 _ 美容 */ }
              { service_Type === "洗澡" && <Extra_Beauty { ...props } /> }

              { /* 美容單項目 */ }
              { service_Type === "美容" && <Beauty_Form { ...props } />  }

              { /* 接送費 */ }
              <Pickup_Fee { ...props } />

              { /* 櫃台人員評分 */ }
              <div className="columns is-multiline is-mobile relative"  style={{ left : "20px" }}>

                  <div className="column is-12-desktop" >

                      <i className="far fa-star f_14"></i>&nbsp;<b className="tag is-medium is-white f_14"> 櫃台人員評分 ( 客戶 ) : </b>
                      { data['admin_star'] === '0' ?
                          <b className="f_14" style={{ color:'red'}}> 拒 接 </b> :
                          <b className="fDred f_14"> { data['admin_star'] } </b>
                      }

                  </div>

              </div>

              <hr/>

              { /* 費用結算 */ }
              { ( service_Type === "基礎" || service_Type === "洗澡" || service_Type === "美容" ) && <Summary_Fee { ...props } /> }


              <hr/> <br/>




              <b className="tag is-large is-danger"> <i className="fas fa-list-alt"></i> &nbsp; 美容師處理結果

                  { data['shop_status'] === '到店等候中' && <> &nbsp; &nbsp; <b className="tag is-medium is-rounded is-white"> 美容師 _ 尚未處理 </b></>  }
                  { data['shop_status'] === '到店美容中' && <> &nbsp; &nbsp; <b className="tag is-medium is-rounded is-white"> 美容師 _ 處理中 </b></>  }




              </b> <br/><br/>

              { /* 美容師後續處理 */ }
              { ( data['shop_status'] === '洗完等候中' || data['shop_status'] === '已回家( 房 )' ) &&

                  <div className="columns is-multiline is-mobile relative"  style={{ left : "20px" }}>

                      <div className="column is-12-desktop" >

                          <i className="fas fa-list-ul f_14"></i> &nbsp;<b className="tag is-medium is-white f_14"> 檢查 / 異常項目 : </b>
                          <b className="fDred f_14"> { data['beautician_report'] } </b>

                      </div>


                      <div className="column is-12-desktop" >

                          <i className="fas fa-door-open f_14"></i>&nbsp;<b className="tag is-medium is-white f_14"> 等候方式 : </b>
                          <b className="fDred f_14"> { data['wait_way'] } </b>

                      </div>

                      <div className="column is-12-desktop" >

                          <i className="far fa-clock f_14"></i>&nbsp;<b className="tag is-medium is-white f_14"> 開始等候時間 : </b>
                          <b className="fDred f_14"> { data['wait_time'] } </b>

                      </div>

                      <div className="column is-12-desktop" >

                          <i className="far fa-star f_14"></i>&nbsp;<b className="tag is-medium is-white f_14"> 美容師評分 ( 寵物 ) : </b>
                          { data['beautician_star'] === '0' ?
                              <b className="f_14" style={{ color:'red'}}> 拒 接 </b> :
                              <b className="fDred f_14"> { data['beautician_star'] } </b>
                          }

                      </div>

                      <div className="column is-12-desktop" >

                          <i className="fas fa-pencil-alt f_14"></i>&nbsp;<b className="tag is-medium is-white f_14"> 美容師備註 : </b>
                          <b className="fDred f_14"> { data['beautician_note'] ? data['beautician_note'] : '無' } </b>

                      </div>

                  </div>

              }


              <br/><br/><br/><br/><br/>

              { /* 提交按鈕 */ }
              <div className="has-text-centered" >
                  <button type="submit" className="button is-primary relative is-medium" style={{top: "-10px"}} >
                      提交表單
                  </button>
              </div> <br/><br/>

          </form>

} ;

export default Service_Report ;





