
import React, {useState, useContext, useEffect} from "react" ;

// React Hook Form
import { useForm , SubmitHandler , Controller } from "react-hook-form" ;

// 各表單驗證條件
import { schema_Customer , schema_Pet , schema_Basic , schema_Bath , schema_Beauty  }  from "utils/validator/form_validator" ;

// 各分類標籤元件
import Create_Customer from "components/customers/edit/Create_Customer";
import Create_Pet from "components/pets/edit/Create_Pet";
import Create_Service from "components/services/edit/Create_Service";
import { yupResolver } from "@hookform/resolvers/yup";
import Edit_Form_Tabs from "templates/tab/Edit_Form_Tabs";

// Interface
import { ICustomer } from "utils/Interface_Type" ;
import Service_Info from "components/services/edit_components/Service_Info";

// Hook
import { useCreate_Data , useCreate_Customer_Relatives } from "hooks/ajax_crud/useAjax_Create";
import { useRead_Check_IsExist } from "hooks/ajax_crud/useAjax_Read"
import { useDispatch , useSelector } from "react-redux" ;



/* @ 新增資料 */
const Create_Data_Container = () => {

    // 服務性質 : 已到店、預約_今天、預約_未來
    const service_Status     = useSelector(( state : any ) => state.Info.service_Status ) ;

    // 再考慮是否加上，以阻止輸入重複資料
    const isExistingCustomer = useSelector(( state : any ) => state.Customer.IsExisting_Customer ) ; // 客戶 _ 是否已存在資料庫

    // 分類標籤
    const [ current , set_Current ] = useState( '' ) ;     // 目前點選標籤

    // 取得 _ 子元件目前所點選的標籤
    const get_Current_Tab = ( tab : string ) => set_Current( tab ) ;

    // 依照不同服務類型，切換 : 驗證條件
    let validator = schema_Customer as any ;

    switch( current ){
        case "客戶" :  validator = schema_Customer ; break ;
        case "寵物" :  validator = schema_Pet ;      break ;
        case "基礎" :  validator = schema_Basic ;    break ;
        case "洗澡" :  validator = schema_Bath ;     break ;
        case "美容" :  validator = schema_Beauty ;   break ;
    }

    // React Hook Form
    const { register , setValue , handleSubmit , control , formState: { errors , isDirty , isValid } } =
                    useForm<ICustomer>({
                                          mode     : "all" ,
                                          resolver : yupResolver( validator ) ,
                                       }) ;

    const props = {
                    register : register ,
                    setValue : setValue ,
                    control  : control ,
                    errors   : errors ,
                    isDirty  : isDirty ,
                    isValid  : isValid ,
                    current  : current
                  } ;

    const create_Data          = useCreate_Data();                // 新增 _ 一般資料
    const create_Cus_Relatives = useCreate_Customer_Relatives() ; // 新增 _ 客戶關係人


    // 提交表單
    const onSubmit : SubmitHandler<ICustomer> = ( data : any ) => {

        let api = "" ;  // 新增資料 API 路徑
        let msg = "" ;  // 新增成功後訊息

        switch( current ) {
          case "客戶" : api = "/customers" ; msg = "客戶" ; break ;
          case "寵物" : api = "/pets"      ; msg = "寵物" ; break ;
          case "基礎" : api = "/basics"    ; msg = "基礎" ; data.service_Status = service_Status ; break ;
          case "洗澡" : api = "/bathes"    ; msg = "洗澡" ; data.service_Status = service_Status ; break ;
          case "美容" : api = "/beauties"  ; msg = "美容" ; data.service_Status = service_Status ; break ;
        }

        // # 新增資料
        create_Data( api , data , msg ) ;                               // 所有資料
        create_Cus_Relatives('/customers/store_relation' , data ) ; // 僅針對 _ 客戶關係人

    } ;


    return <>

             { /* 表單標籤 */ }
             <Edit_Form_Tabs  get_Current_Tab = { get_Current_Tab } />

             <hr/> <br/>

             {/*{ isExistingCustomer ?*/}
             {/*    <b className="tag is-danger is-rounded is-medium">*/}
             {/*        <i className="fas fa-exclamation"></i> &nbsp; 資料庫可能已有該客戶資料*/}
             {/*    </b> : ""*/}
             {/*} <br/><br/>*/}

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
                    <button disabled={ !isValid  } type="submit" className="button is-primary relative is-medium" style={{ top: "-10px" }} >
                        新增{current}
                    </button>
                </div> <br/><br/>

             </form>

           </>

} ;

export default Create_Data_Container ;