
import React, {useContext} from "react"

// React Hook Form
import { useForm , SubmitHandler } from "react-hook-form";

// 各表單驗證條件
import { schema_Customer } from "utils/validator/form_validator"
import { IService } from "utils/Interface_Type";
import { yupResolver } from "@hookform/resolvers/yup";

// useContext
import { SidePanelContext } from "templates/panel/Side_Panel";

// 各區塊表單元件
import Service_Info from "components/services/edit_components/Service_Info";
import Customer_Note from "components/services/edit_components/Customer_Note";
import Basic_Form from "components/services/edit_components/Basic_Form";
import Bath_Form from "components/services/edit_components/Bath_Form";
import Beauty_Form from "components/services/edit_components/Beauty_Form";
import Extra_Beauty from "components/services/edit_components/Extra_Beauty";
import Extra_Item from "components/services/edit_components/Extra_Item";
import Pickup_Fee from "components/services//edit_components/Pickup_Fee";

import Summary_Fee from "components/services/edit_components/summary_fee/Summary_Fee";
import useServiceType from "hooks/layout/useServiceType";



{ /* 編輯服務 */ }
const Update_Service = ( ) => {

    const value        = useContext( SidePanelContext ) ;  // 取得 context 值

    const service_Type = value.service_Type as any ;
    const data         = value.preLoadData ;              // 預先取得資料
    const pet          = data.pet ? data.pet : {}  ;      // 寵物資料
    const Q_code       = data.q_code  ;

   // console.log( data )

    const { color , icon } = useServiceType( service_Type  ) ;

    // React Hook Form
    const { register , setValue , control , handleSubmit , formState: { errors , isDirty , isValid } } =
                useForm<IService>({

                                     mode          : "all" ,
                                     resolver      : yupResolver( schema_Customer ) ,
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
                                                           extra_Item   : data.extra_service ? data.extra_service.split(',') : [] ,

                                                           // # 加價美容
                                                           extra_Beauty : data.extra_beauty ? data.extra_beauty.split(',') : [] ,

                                                           // # 接送費
                                                           pickup_Fee   : data.pickup_fee ,

                                                           // # 服務明細 ( Summary_Fee )
                                                           payment_Method : data.payment_method ,   // 付款方式


                                                     }

                                  }) ;


    const props = {
                     register    : register ,
                     setValue    : setValue ,
                     control     : control ,
                     errors      : errors ,
                     isDirty     : isDirty ,
                     isValid     : isValid ,
                     current     : service_Type ,

                     editType    : '編輯' ,  // 避免於編輯時，出現 '不能選擇 : 過去日期' 警告 ( Service_Info.tsx )
                     serviceData : data      // 該筆服務資料
                  } ;


    // 提交表單
    const onSubmit : SubmitHandler<IService> = data => {

        console.log( data ) ;

    } ;


    return <form onSubmit = { handleSubmit( onSubmit ) } >

                <br/>

                <b className={ color } style = {{ fontSize:"16pt" }}>

                    <i className = { icon } ></i> &nbsp;  &nbsp; Q{ Q_code } &nbsp; { pet.name } ( { pet.species } ) &nbsp; &nbsp;

                    { pet.sex   && <> <b className="tag is-white is-rounded" style = {{ fontSize : "12pt" }}> { pet.sex }    </b> &nbsp; &nbsp; </> }
                    { pet.age   && <> <b className="tag is-white is-rounded" style = {{ fontSize : "12pt" }}> { pet.age } 歲 </b> &nbsp; &nbsp; </> }
                    { pet.color && <> <b className="tag is-white is-rounded" style = {{ fontSize : "12pt" }}> { pet.color }  </b>               </> } &nbsp;

                </b>

                <hr/>

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
                { service_Type === "美容" && <Beauty_Form  { ...props } /> }

                { /* 接送費 */ }
                <Pickup_Fee { ...props } />

                { /* 費用結算 */ }
                { ( service_Type === "基礎" || service_Type === "洗澡" || service_Type === "美容" ) && <Summary_Fee { ...props } /> }

                <br/><br/><br/>

                { /* 提交按鈕 */ }
                <div className="has-text-centered" >
                    <button disabled={ !isDirty || !isValid } type="submit" className="button is-primary relative is-medium" style={{top: "-10px"}} >
                        提交表單
                    </button>
                </div> <br/><br/>

           </form>

} ;

export default Update_Service



