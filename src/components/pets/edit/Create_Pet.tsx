
import React, {FC} from "react" ;
import { Edit_Form_Type } from "utils/Interface_Type"
import Pet_Form from "components/pets/edit/Pet_Form";



/* @ 新增 _ 寵物 */
const Create_Pet : FC<Edit_Form_Type> = ({ register , errors , isDirty , isValid } ) => {




   return <>

             { /* 寵物表單欄位  */ }
             <Pet_Form register = { register } errors = { errors }  />

             <br/><hr/>

          </>


} ;

export default Create_Pet ;