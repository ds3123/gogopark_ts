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
import Fee_Summary from "components/services/edit_components/Fee_Summary";
import Extra_Beauty from "../services/edit_components/Extra_Beauty";
import Date_Picker from "../../templates/form/Date_Picker";
import {useUpdate_Data} from "../../hooks/ajax_crud/useAjax_Update";


// Yup 第三方驗證
const schema = yup.object().shape({


});


{ /* 各項服務 _ 目前狀態 ( 於首頁狀態框中，點選 Qcode )  */ }
const Service_Report = () => {

    const value            = useContext( SidePanelContext ) ;    // 取得 context 值

    const service_Type     = value.service_Type as any ;        // 服務類型 ( 基礎、洗澡、美容 )
    const data             = value.preLoadData as any;          // 服務單資料
    const customer         = value.preLoadData.customer as any; // 客戶資料

    const Q_code           = data.q_code ;                // Qcode
    const Expected_Leave   = data.expected_leave ;        // 期望離店時間

    const { color , icon } = useServiceType( service_Type ) ;

    const { register , setValue , handleSubmit , control , formState : { errors , isDirty , isValid } } =
        useForm<IService>(
                           {
                             mode          : "all" ,
                             resolver      : yupResolver( schema ) ,
                             // defaultValues : {
                             //                     // # 服務單 _ 基本資料
                             //                     Q_code          : data.q_code ,
                             //                     service_Date    : data.service_date ,    // 到店服務日期
                             //                     service_Type    : data.service_type ,    // 服務類型(基礎、洗澡、美容)
                             //                     shop_Status     : data.shop_status ,     // 到店狀態 ( 到店等候中' | '到店美容中' | '洗完等候中' | '已回家( 房 )' )
                             //
                             //                     // # 服務單 _ 表單欄位
                             //
                             //
                             //
                             //                     // # 工作人員
                             //                     beauty_User     : data.beautian ,        // 經手美容師
                             //                     beauty_Note     : data.beautian_note ,   // 美容師 _ 備註
                             //                     beauty_Star     : data.beautian_star ,   // 美容師 _ 評分
                             //
                             //                     admin_User      : data.admin_user ,      // 櫃台行政人員
                             //                     admin_Note      : data.admin_note ,      // 櫃台行政人員 _ 備註
                             //
                             //                     // # ( 預計 ) 到店時間
                             //                     expected_Arrive : data.expected_arrive , // 預計 _ 到店時間 ( 預約 )
                             //                     expected_Leave  : data.exppected_leave , // 預計 _ 離店時間 ( 預約 )
                             //
                             //                     actual_Arrive   : data.actual_arrive ,   // 實際 _ 到店時間
                             //
                             //                     // # 到店、離店方式 ( Ex. 主人送來、接走 )
                             //                     way_Arrive      : data.way_arrive ,
                             //                     way_Leave       : data.way_leave ,
                             //
                             //                     // # 美容師處理完 _ 開始等待時間、等待方式( Ex. 進籠子等候 )
                             //                     wait_Time       : data.wait_time ,
                             //                     wait_Way        : data.wait_way ,
                             //
                             //                  }
                           }
                         ) ;


    // 更新函式
    const update_Data  = useUpdate_Data() ;

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

        update_Data( api , service_Id , updateObj , '/' , `${ service_Type }單` ) ;


    } ;

    const props = {
                    register : register ,
                    control  : control ,
                    errors   : errors ,
                    isDirty  : isDirty ,
                    isValid  : isValid ,
                    current  : ""
                  } ;

    useEffect(() => {

        // * 設定 _ 預設值 ( NOTE : 以 RHF 的 defaultValues , 會與 DatePicker 衝突 2021.06.15 )
        const data = value.preLoadData ;
        setValue( 'shop_Status' , data['shop_status'] ) ; // 到店狀態


    } ,[] ) ;

  return  <form onSubmit={ handleSubmit( onSubmit ) }  >

              { /* 標題列 */ }
              <div className="columns is-multiline is-mobile" >

                <div className="column is-6-desktop">

                    <b className={ color }> <i className={ icon }></i> &nbsp;  { service_Type } _ Q{ Q_code } </b>

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

                <div className="column is-6-desktop">

                    <b className="tag is-large is-white"> 期望離店時間 : &nbsp; <span style={{color:"rgb(180,0,0)"}}> { Expected_Leave } </span></b>

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

              { /* 加價美容 */ }
              { service_Type === "洗澡" && <Extra_Beauty { ...props } /> }

              { /* 美容單項目 */ }
              { service_Type === "美容" && <Beauty_Form { ...props } /> }

              { /* 費用結算 */ }
              { ( service_Type === "基礎" || service_Type === "洗澡" || service_Type === "美容" ) && <Fee_Summary { ...props } /> }

              <br/><br/><br/><br/>

              { /* 提交按鈕 */ }
              <div className="has-text-centered" >
                  <button type="submit" className="button is-primary relative is-medium" style={{top: "-10px"}} >
                      提交表單
                  </button>
              </div> <br/><br/>

          </form>

} ;

export default Service_Report ;





