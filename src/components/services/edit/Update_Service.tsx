
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
import Fee_Summary from "components/services/edit_components/Fee_Summary";
import useServiceType from "../../../hooks/data/useServiceType";


{ /* 編輯服務 */ }
const Update_Service = ( ) => {

    const value             = useContext( SidePanelContext ) ;  // 取得 context 值
    const service_Type      = value.service_Type as any ;
    const data              = value.preLoadData ;
    const pet               = data.pet ;
    const Q_code            = data.q_code  ;


    const { color , icon }  = useServiceType( service_Type );


    // React Hook Form
    const { register , handleSubmit , formState: { errors , isDirty , isValid } } =
                useForm<IService>({

                    mode          : "all" ,
                    resolver      : yupResolver( schema_Customer ) ,
                    defaultValues : {
                                       // customer_Id : value.preLoadData.id ,
                                     }
                }) ;


    const props = {
                    register : register ,
                    errors   : errors ,
                    isDirty  : isDirty ,
                    isValid  : isValid ,
                    current  : service_Type ,
                   } ;

    // 提交表單
    const onSubmit : SubmitHandler<IService> = data => {

        console.log( data ) ;

    };


    return <form onSubmit = { handleSubmit( onSubmit ) }>

                <br/>

                <b className={ color }>

                    <i className={ icon }></i> &nbsp; { } &nbsp; Q{ Q_code } &nbsp; { pet.name } ( { pet.species } ) &nbsp; &nbsp;

                    { pet.sex && <>   <b className="tag is-white is-rounded" style = {{ fontSize : "12pt" }}> { pet.sex } </b> &nbsp; </> }
                    { pet.age && <>   <b className="tag is-white is-rounded" style = {{ fontSize : "12pt" }}> { pet.age } 歲 </b> &nbsp; </> }
                    { pet.color && <> <b className="tag is-white is-rounded" style = {{ fontSize : "12pt" }}> { pet.color } </b> </> } &nbsp;

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

                { /* 加價美容 */ }
                { service_Type === "洗澡" && <Extra_Beauty { ...props } /> }

                { /* 美容單項目 */ }
                { service_Type === "美容" && <Beauty_Form { ...props } /> }

                { /* 費用結算 */ }
                { ( service_Type === "基礎" || service_Type === "洗澡" || service_Type === "美容" ) && <Fee_Summary { ...props } /> }

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



