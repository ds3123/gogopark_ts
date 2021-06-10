import React, {FC} from "react" ;

// 各區塊表單元件
import Customer_Note from "components/services/edit_components/Customer_Note";
import Basic_Form from "components/services/edit_components/Basic_Form";
import Bath_Form from "components/services/edit_components/Bath_Form";
import Beauty_Form from "components/services/edit_components/Beauty_Form";
import Extra_Beauty from "components/services/edit_components/Extra_Beauty";

import { Edit_Form_Type } from "utils/Interface_Type"
import Fee_Summary from "../edit_components/Fee_Summary";


interface TS extends Edit_Form_Type {
   current : string ;
}


/* @ 新增 : 基礎單、洗澡單、美容單 */
const Create_Service : FC<TS> = ({ register , errors , isDirty , isValid , current } ) => {


    const props = {
        register : register ,
        errors   : errors ,
        isDirty  : isDirty ,
        isValid  : isValid ,
        current  : current
    } ;

   return <>

             <br/><br/>

             { /* 自備物品、主人交代、櫃台備註  */ }
             <Customer_Note { ...props } />

             { /* 基礎單項目 */ }
             <Basic_Form { ...props } />

             { /* 洗澡單項目 */ }
             { ( current === "洗澡" || current === "美容" ) && <Bath_Form { ...props } /> }

             { /* 加價美容 */ }
             { current === "洗澡" && <Extra_Beauty { ...props } /> }

             { /* 美容單項目 */ }
             { current === "美容" && <Beauty_Form { ...props } /> }

             { /* 費用結算 */ }
             { ( current === "基礎" || current === "洗澡" || current === "美容" ) && <Fee_Summary { ...props } /> }

          </>

} ;


export default Create_Service