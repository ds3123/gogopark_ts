import React, {FC, useContext, useState} from "react" ;
import { Input } from "templates/form/Input"
import { Edit_Form_Type , ICustomer } from "utils/Interface_Type"
import Customer_Form from "components/customers/edit/Customer_Form";



/* @ 新增 _  客戶 */
const Create_Customer : FC<Edit_Form_Type> = ({ register , errors , isDirty , isValid } ) => {


      return <>
               { /* 客戶表單欄位  */ }
               <Customer_Form register = { register } errors = { errors } />

               <br/><hr/><br/>

             </>

} ;


export default Create_Customer