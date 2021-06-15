import React, {FC, useContext, useState} from "react" ;
import { Input } from "templates/form/Input"
import { Edit_Form_Type , ICustomer } from "utils/Interface_Type"
import Customer_Form from "components/customers/edit/Customer_Form";




/* @ 新增 _  客戶 */
const Create_Customer : FC<Edit_Form_Type> = ({ register , setValue , errors , isDirty , isValid } ) => {


      const props = {
         register : register ,
         setValue : setValue ,
         errors   : errors ,
         isDirty  : isDirty ,
         isValid  : isValid ,
      } ;

      return <>
               { /* 客戶表單欄位  */ }
               <Customer_Form  { ...props }  />

               <br/><hr/><br/>

             </>

} ;


export default Create_Customer