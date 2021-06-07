import React, { useState , useContext } from "react" ;
import { useForm , SubmitHandler} from "react-hook-form";

// 各表單驗證條件
import { schema_Customer }  from "utils/validator/form_validator"

// 各分類標籤元件
import Edit_Customer from "components/customers/Edit_Customer";
import Edit_Pet from "components/pets/Edit_Pet";
import Edit_Service from "components/services/Edit_Service";
import { yupResolver } from "@hookform/resolvers/yup";
import Edit_Form_Tabs from "templates/tab/Edit_Form_Tabs";

// useContext
import { SidePanelContext } from "templates/panel/Side_Panel";

// Hook
import usePreLoadData from "hooks/usePreLoadData";

type Inputs = {

    // 以下可以不填寫 2021.06.05
    customer_Id        : string ;
    customer_Name      : string ;
    customer_Cellphone : string ;
    customer_Telephone : string ;
    customer_Line      : string ;
    customer_Email     : string ;
    customer_Address   : string ;

    customer_Relative_Name      : string ;
    customer_Relative_Type      : string ;
    customer_Relative_Family    : string ;
    customer_Relative_Cellphone : string ;

} ;


/* @ 新增資料 */
const Edit_Data = () => {

    // 分類標籤
    const [ current , set_Current ] = useState( '' ) ;        // 目前點選標籤
    const value                     = useContext( SidePanelContext ) ;  // 取得 context 值
    const preLoadData               = usePreLoadData( value ) ;         // 取得 預先填寫資料 ( for 編輯資料 )

    // 取的 _ 子元件目前所點選的標籤
    const get_Current_Tab = ( tab : string ) => set_Current( tab ) ;


    // React Hook Form
    const { register , handleSubmit , formState: { errors , isDirty , isValid } } =
            useForm<Inputs>({
                              mode          : "all" ,
                              resolver      : yupResolver( schema_Customer ) ,
                              defaultValues : preLoadData
                            }) ;

    const props = {
                    register : register ,
                    errors   : errors ,
                    isDirty  : isDirty ,
                    isValid  : isValid ,
                    current  : current
                  } ;

    // 提交表單
    const onSubmit : SubmitHandler<Inputs> = data => {

        console.log( data ) ;

    };

    return <>

             { /* 表單標籤 */ }
             <Edit_Form_Tabs  get_Current_Tab = { get_Current_Tab } />

             <hr/>

             <form onSubmit={ handleSubmit( onSubmit ) } >

                 { /* 表單元件 */ }
                 { ( current === "客戶" || current === "寵物" || current === "基礎" || current === "洗澡" || current === "美容"  ) &&  <Edit_Customer { ...props } />  }
                 { ( current === "寵物" || current === "基礎" || current === "洗澡" || current === "美容"  ) &&  <Edit_Pet { ...props } />  }
                 { ( current === "基礎" || current === "洗澡" || current === "美容" ) &&  <Edit_Service { ...props } />  }

                <br/><br/><br/><br/>

                { /* 提交按鈕 */ }
                <div className="has-text-centered" >
                    <button disabled={ !isDirty || !isValid } type="submit" className="button is-primary relative is-medium" style={{top: "-10px"}} >
                        新增{current}
                    </button>
                </div> <br/>

             </form>

           </>

};

export default Edit_Data ;