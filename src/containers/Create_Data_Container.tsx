import React, { useState , useContext } from "react" ;

// React Hook Form
import { useForm , SubmitHandler} from "react-hook-form" ;

// 各表單驗證條件
import { schema_Customer }  from "utils/validator/form_validator" ;

// 各分類標籤元件
import Create_Customer from "components/customers/edit/Create_Customer";
import Create_Pet from "components/pets/edit/Create_Pet";
import Create_Service from "components/services/edit/Create_Service";
import { yupResolver } from "@hookform/resolvers/yup";
import Edit_Form_Tabs from "templates/tab/Edit_Form_Tabs";

// useContext
import { SidePanelContext } from "templates/panel/Side_Panel" ;

// Interface
import { ICustomer } from "utils/Interface_Type" ;
import Service_Info from "../components/services/edit_components/Service_Info";



/* @ 新增資料 */
const Create_Data_Container = () => {

    // 分類標籤
    const [ current , set_Current ] = useState( '' ) ;        // 目前點選標籤

    // 取的 _ 子元件目前所點選的標籤
    const get_Current_Tab = ( tab : string ) => set_Current( tab ) ;


    // React Hook Form
    const { register , handleSubmit , formState: { errors , isDirty , isValid } } =
                    useForm<ICustomer>({
                                          mode          : "all" ,
                                          resolver      : yupResolver( schema_Customer ) ,
                                       }) ;

    const props = {
                    register : register ,
                    errors   : errors ,
                    isDirty  : isDirty ,
                    isValid  : isValid ,
                    current  : current
                  } ;

    // 提交表單
    const onSubmit : SubmitHandler<ICustomer> = data => {

        console.log( data ) ;

    };

    return <>

             { /* 表單標籤 */ }
             <Edit_Form_Tabs  get_Current_Tab = { get_Current_Tab } />

             <hr/> <br/>

             <form onSubmit = { handleSubmit( onSubmit ) } >

                { /* 服務單基本資訊 : 服務性質、到店日期、處理碼 ... */ }
                { ( current === "基礎" || current === "洗澡" || current === "美容" )  &&  <Service_Info { ...props } /> }

                { /* 表單元件 */ }
                { ( current === "客戶" || current === "寵物" || current === "基礎" || current === "洗澡" || current === "美容"  ) &&  <Create_Customer { ...props } />  }
                { ( current === "寵物" || current === "基礎" || current === "洗澡" || current === "美容"  ) &&  <Create_Pet { ...props } />  }
                { ( current === "基礎" || current === "洗澡" || current === "美容" )  &&  <Create_Service { ...props } />  }

                <br/><br/><br/><br/>

                { /* 提交按鈕 */ }
                <div className="has-text-centered" >
                    <button disabled={ !isDirty || !isValid } type="submit" className="button is-primary relative is-medium" style={{top: "-10px"}} >
                        新增{current}
                    </button>
                </div> <br/><br/>

             </form>

           </>

};

export default Create_Data_Container ;