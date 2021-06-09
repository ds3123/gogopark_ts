import React, {FC} from "react" ;
import Create_Service_Info from "components/services/create_components/Create_Service_Info";
import Create_Customer_Note from "components/services/create_components/Create_Customer_Note";
import Create_Basic_Form from "components/services/create_components/Create_Basic_Form";
import Create_Bath_Form from "components/services/create_components/Create_Bath_Form";
import Create_Beauty_Form from "components/services/create_components/Create_Beauty_Form";
import Create_Extra_Beauty from "components/services/create_components/Create_Extra_Beauty";


import { Edit_Form_Type } from "utils/Interface_Type"
import Create_Fee_Summary from "../create_components/Create_Fee_Summary";


interface TS extends Edit_Form_Type {
   current : string ;
}


/* @ 編輯 _ 新增 / 修改 : 基礎單、洗澡單、美容單 */
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

             { /* 服務單基本資訊 : 服務性質、到店日期、處理碼 ... */ }
             <Create_Service_Info { ...props } />

             { /* 自備物品、主人交代、櫃台備註  */ }
             <Create_Customer_Note { ...props } />

             { /* 基礎單項目 */ }
             <Create_Basic_Form { ...props } />

             { /* 洗澡單項目 */ }
             { ( current === "洗澡" || current === "美容" ) && <Create_Bath_Form { ...props } /> }

             { /* 加價美容 */ }
             { current === "洗澡" && <Create_Extra_Beauty { ...props } /> }

             { /* 美容單項目 */ }
             { current === "美容" && <Create_Beauty_Form { ...props } /> }

             { /* 費用結算 */ }
             { ( current === "基礎" || current === "洗澡" || current === "美容" ) && <Create_Fee_Summary { ...props } /> }

          </>

} ;


export default Create_Service