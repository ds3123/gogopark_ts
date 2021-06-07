import React, {FC} from "react" ;
import Edit_Service_Info from "components/services/edit_components/Edit_Service_Info";
import Edit_Customer_Note from "components/services/edit_components/Edit_Customer_Note";
import Edit_Basic_Form from "components/services/edit_components/Edit_Basic_Form";
import Edit_Bath_Form from "components/services/edit_components/Edit_Bath_Form";
import Edit_Beauty_Form from "components/services/edit_components/Edit_Beauty_Form";
import Edit_Extra_Beauty from "components/services/edit_components/Edit_Extra_Beauty";


import { Edit_Form_Type } from "utils/Interface_Type"
import Edit_Fee_Summary from "./edit_components/Edit_Fee_Summary";


interface TS extends Edit_Form_Type {
   current : string ;
}


/* @ 編輯 _ 新增 / 修改 : 基礎單、洗澡單、美容單 */
const Edit_Service : FC<TS> = ( { register , errors , isDirty , isValid , current } ) => {


    const props = {
        register : register ,
        errors   : errors ,
        isDirty  : isDirty ,
        isValid  : isValid ,
        current  : current
    } ;

   return <>
             <br/><br/>

             { /* 服務單基本資訊 : 服務性質、到店日期、處理碼 ... */ }
             <Edit_Service_Info  { ...props } />  <br/><hr/><br/>

             { /* 自備物品、主人交代、櫃台備註  */ }
             <Edit_Customer_Note { ...props } />  <br/><hr/><br/>

             { /* 基礎單項目 */ }
             <Edit_Basic_Form { ...props } />

             { /* 洗澡單項目 */ }
             { ( current === "洗澡" || current === "美容" ) && <Edit_Bath_Form { ...props } /> }

             { /* 加價美容 */ }
             { current === "洗澡" && <Edit_Extra_Beauty { ...props } /> }

             { /* 美容單項目 */ }
             { current === "美容" && <Edit_Beauty_Form { ...props }  /> }

             { /* 費用結算 */ }
             { ( current === "基礎" || current === "洗澡" || current === "美容" ) && <Edit_Fee_Summary { ...props } /> }

          </>

} ;


export default Edit_Service