import React, {useContext} from "react"

// React Hook Form
import { useForm , SubmitHandler} from "react-hook-form";

// 各表單驗證條件
import {schema_Customer} from "utils/validator/form_validator"
import {ICustomer} from "utils/Interface_Type";
import {yupResolver} from "@hookform/resolvers/yup";

// useContext
import { SidePanelContext } from "templates/panel/Side_Panel";

import Customer_Form from "components/customers/edit/Customer_Form";

// Hook
import { useUpdate_Data , useUpdate_Customer_Relatives } from "hooks/ajax_crud/useAjax_Update";


{ /*  編輯客戶 */ }
const Update_Customer = ( ) => {

    const value    = useContext( SidePanelContext ) ;  // 取得 context 值
    const customer = value.preLoadData ? value.preLoadData : {} ;
    const relative = value.preLoadData ? value.preLoadData.customer_relation : { customer_relation : [] } ;


    // React Hook Form
    const { register , setValue , handleSubmit , formState: { errors , isDirty , isValid } } =
                    useForm<ICustomer>({
                        mode          : "all" ,
                        resolver      : yupResolver( schema_Customer ) ,
                        defaultValues : {
                                           // 客戶
                                           customer_Id                 : customer.id ,
                                           customer_Name               : customer.name ,
                                           customer_Cellphone          : customer.mobile_phone ,
                                           customer_Telephone          : customer.tel_phone ,
                                           customer_Line               : customer.line ,
                                           customer_Email              : customer.email ,
                                           customer_Address            : customer.address ,

                                           // 客戶關係人
                                           customer_Relative_Name      : relative.length === 1 ? relative[0]['name'] : "" ,
                                           customer_Relative_Type      : relative.length === 1 ? relative[0]['type'] : "" ,
                                           customer_Relative_Family    : relative.length === 1 ? relative[0]['tag'] : "" ,
                                           customer_Relative_Cellphone : relative.length === 1 ? relative[0]['mobile_phone'] : "" ,
                                           customer_Relative_Telephone : relative.length === 1 ? relative[0]['tel_phone'] : "" ,

                                         }
                    }) ;


    const update_Data          = useUpdate_Data() ;
    const update_Relative_Data = useUpdate_Customer_Relatives() ;

    // 提交表單
    const onSubmit : SubmitHandler<ICustomer> = data => {

        // 更新 _ 客戶
        update_Data( "/customers" , customer.customer_id , data , "/customers" , "客戶" ) ;

        // 更新 _ 關係人 ( 先處理 _ 更新 1 人 2021.06.12 )
        if( relative.length === 1 ){
            update_Relative_Data( "/customers/update_relation" , relative[0]['relation_id'] , data ) ;
        }

    };

    return <form onSubmit = { handleSubmit( onSubmit ) } >

             { /* 客戶表單欄位  */ }
             <Customer_Form register = { register } errors = { errors } />

             <br/><br/><br/>

             { /* 提交按鈕 */ }
             <div className="has-text-centered" >
                    <button disabled={ !isValid } type="submit" className="button is-primary relative is-medium" style={{top: "-10px"}} >
                        提交表單
                    </button>
             </div> <br/><br/>

           </form>


} ;

export default Update_Customer