import React, {useContext} from "react"
import {Input} from "../../../templates/form/Input";

// React Hook Form
import { useForm , SubmitHandler} from "react-hook-form";

// 各表單驗證條件
import {schema_Customer} from "utils/validator/form_validator"
import {ICustomer} from "utils/Interface_Type";
import {yupResolver} from "@hookform/resolvers/yup";

// useContext
import { SidePanelContext } from "templates/panel/Side_Panel";



import Customer_Form from "components/customers/edit/Customer_Form";



{ /*  編輯客戶 */ }
const Update_Customer = ( ) => {

    const value                     = useContext( SidePanelContext ) ;  // 取得 context 值

    // React Hook Form
    const { register , handleSubmit , formState: { errors , isDirty , isValid } } =
                    useForm<ICustomer>({
                        mode          : "all" ,
                        resolver      : yupResolver( schema_Customer ) ,
                        defaultValues : {
                                           customer_Id        : value.preLoadData.id ,
                                           customer_Name      : value.preLoadData.name ,
                                           customer_Cellphone : value.preLoadData.mobile_phone ,
                                           customer_Telephone : value.preLoadData.tel_phone ,
                                           customer_Line      : value.preLoadData.line ,
                                           customer_Email     : value.preLoadData.email ,
                                           customer_Address   : value.preLoadData.address ,
                                         }
                    }) ;


    // 提交表單
    const onSubmit : SubmitHandler<ICustomer> = data => {

        console.log( data ) ;

    };


    return <form onSubmit = { handleSubmit( onSubmit ) } >

             { /* 客戶表單欄位  */ }
             <Customer_Form register = { register } errors = { errors } />

             <br/><br/><br/>

             { /* 提交按鈕 */ }
             <div className="has-text-centered" >
                    <button disabled={ !isDirty || !isValid } type="submit" className="button is-primary relative is-medium" style={{top: "-10px"}} >
                        提交表單
                    </button>
             </div> <br/><br/>

           </form>


} ;

export default Update_Customer