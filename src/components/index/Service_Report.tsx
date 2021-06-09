import React, {useContext, useState} from "react" ;

// React Hook Form
import { useForm , SubmitHandler } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import { Input } from "templates/form/Input"

import useServiceType from "hooks/data/useServiceType"
import { Service_Type, Shop_Status} from "utils/Interface_Type" ;
import usePreLoadData from "hooks/data/usePreLoadData";
import { SidePanelContext } from "templates/panel/Side_Panel";
import Create_Basic_Form from "components/services/create_components/Create_Basic_Form";
import Create_Bath_Form from "components/services/create_components/Create_Bath_Form";
import Create_Beauty_Form from "components/services/create_components/Create_Beauty_Form";
import Create_Service_Info from "components/services/create_components/Create_Service_Info";
import Create_Customer_Note from "components/services/create_components/Create_Customer_Note";
import Create_Fee_Summary from "components/services/create_components/Create_Fee_Summary";


interface Inputs {

   shop_Status : Shop_Status ;
   way_Leave   : string ;

} ;


// Yup 第三方驗證
const schema = yup.object().shape({




});


{ /* 各項服務 _ 目前狀態 ( 於首頁狀態框中，點選 Qcode )  */ }
const Service_Report = () => {

    const value                               = useContext( SidePanelContext ) ;  // 取得 context 值
    const preLoadData                         = usePreLoadData( value ) ;         // 取得 預先填寫資料 ( for 編輯資料 )
    const { color , icon }                    = useServiceType( preLoadData.service_Type ) ;

    const { register , handleSubmit , formState : { errors , isDirty , isValid } } = useForm<Inputs>(
                                                                                                       {
                                                                                                         mode          : "all" ,
                                                                                                         resolver      : yupResolver( schema ) ,
                                                                                                         defaultValues : preLoadData
                                                                                                       }
                                                                                                     ) ;



    // 提交
    const onSubmit : SubmitHandler<Inputs> = data => {

       console.log( data ) ;

    } ;

    const props = {
        register : register ,
        errors   : errors ,
        isDirty  : isDirty ,
        isValid  : isValid ,
        current  : ""
    } ;

  return  <form onSubmit={ handleSubmit( onSubmit ) }  >

              { /* 標題列 */ }
              <div className="columns is-multiline is-mobile" >

                <div className="column is-6-desktop">

                    <b className={ color }> <i className={ icon }></i> &nbsp;  { preLoadData.service_Type } _ Q{ preLoadData.Q_code } </b>

                    <b className="tag is-large is-white"> 到店狀態 : </b>
                    < div className="select" >
                        <select  { ...register( "shop_Status" ) }  >
                            <option value="到店等候中"   > 到店等候中   </option>
                            <option value="到店美容中"   > 到店美容中   </option>
                            <option value="洗完等候中"   > 洗完等候中   </option>
                            <option value="已回家( 房 )" > 已回家( 房 ) </option>
                        </select>
                    </div>

                </div>

                <div className="column is-6-desktop">

                    <b className="tag is-large is-white"> 期望離店時間 : &nbsp; <span style={{color:"rgb(180,0,0)"}}> { preLoadData.expected_Leave } </span></b>

                    <b className="tag is-large is-white"> 離店方式 : </b>
                    <div className="select" >
                        <select  { ...register( "way_Leave" ) }  >
                          <option value="主人接走" > 主人接走 </option>
                          <option value="司機接送" > 司機接送 </option>
                          <option value="轉回住宿" > 轉回住宿 </option>
                        </select>
                    </div>

                </div>

              </div>

              <hr/><br/>

              { /* 服務單基本資訊 : 服務性質、到店日期、處理碼 ... */ }
              <Create_Service_Info  { ...props } />

              { /* 自備物品、主人交代、櫃台備註  */ }
              <Create_Customer_Note { ...props } />

              { /* 基礎單項目 */ }
              <Create_Basic_Form { ...props } />

              { value.preLoadData.service_type === "洗澡" &&  <Create_Bath_Form { ...props } /> }
              { value.preLoadData.service_type === "美容" &&  <Create_Beauty_Form { ...props } />}

              <Create_Fee_Summary { ...props } />

              <br/><br/><br/><br/>

              { /* 提交按鈕 */ }
              <div className="has-text-centered" >
                  <button disabled={ !isDirty || !isValid } type="submit" className="button is-primary relative is-medium" style={{top: "-10px"}} >
                      提交表單
                  </button>
              </div> <br/><br/>

          </form>

} ;

export default Service_Report ;





