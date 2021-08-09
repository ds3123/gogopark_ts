
import React, {useState, useContext, useEffect} from "react" ;

// React Hook Form
import { useForm , SubmitHandler , Controller } from "react-hook-form" ;

// 各表單驗證條件
import {
          schema_Customer , schema_Pet ,
          schema_Basic , schema_Bath , schema_Beauty ,
          schema_Plan , schema_Price , schema_Species ,
          schema_Employee }  from "utils/validator/form_validator" ;


// 各分類標籤元件
import Create_Customer from "components/customers/edit/Create_Customer";
import Create_Pet from "components/pets/edit/Create_Pet";
import Create_Service from "components/services/edit/Create_Service";
import { yupResolver } from "@hookform/resolvers/yup";
import Edit_Form_Tabs from "templates/tab/Edit_Form_Tabs";
import Create_Employee from "components/management/employee/edit/Create_Employee";
import Create_Price from "components/prices/edit/Create_Price";
import Create_Species from "components/management/setting/species/edit/Create_Species";

// Interface
import { IService } from "utils/Interface_Type" ;
import Service_Info from "components/services/edit_components/Service_Info";

// Hook
import { useCreate_Data , useCreate_Customer_Relatives } from "hooks/ajax_crud/useAjax_Create";
import { useSelector } from "react-redux" ;
import { useHelper_Prices } from "hooks/data/usePrice"
import { useRead_Species } from "hooks/ajax_crud/useAjax_Read";
import { useEmployee_Validator } from "hooks/data/useForm_Validator"




/* @ 新增資料 */
const Create_Data_Container = () => {

    // 服務性質 : 已到店、預約_今天、預約_未來
    const service_Status = useSelector(( state : any ) => state.Info.service_Status ) ;

    // 目前所選擇 Q 碼
    const current_Q_Code = useSelector(( state : any ) => state.Info.current_Q_Code ) ;

    // 服務價格 : 基礎、洗澡、美容
    const { basicSumPrice , bathSumPrice , beautySumPrice , extraItemFee , extraBeautyFee } = useHelper_Prices();

    // 包月洗澡金額
    const month_Bath_Price   = parseInt( useSelector( ( state : any ) => state.Plan.Month_Bath_Price ) ) ;

    // 包月美容金額
    const month_Beauty_Price = parseInt( useSelector( ( state : any ) => state.Plan.Month_Beauty_Price ) ) ;

    // 目前選擇 _ 方案資料表 ( plans ) id
    const current_Plan_Id    = useSelector(( state : any ) => state.Plan.current_Plan_Id ) ;

    // 目前選擇 _ 方案備註 Ex. 包月洗澡第 1 次
    const current_Plan_Note  = useSelector(( state : any ) => state.Plan.current_Plan_Note ) ;


    // # 自訂 _ 表單驗證邏輯 ( 因欲驗證值 / 邏輯，無法透過 RHF 表單欄位值表示 )

    // * 新增按鈕 _ 是否有效啟用
    const [ disabled_Form , set_Disabled_Form ] = useState( true );

    // 方案 : 包月洗澡 _ 條件不符 ( Redux )
    const invalid_To_Plan     = useSelector( ( state : any ) => state.Form.invalid_To_Plan ) ;

    // 員工 : 工作人員 _ 條件不符
    const employee_Validator = useEmployee_Validator();



    // 取得 _ 所有寵物品種資料
    const petSpecies = useRead_Species() ;

    // 分類標籤
    const [ current , set_Current ] = useState('' ) ;     // 目前點選標籤


    // 取得 _ 子元件目前所點選的標籤
    const get_Current_Tab = ( tab : string ) => set_Current( tab ) ;


    // # 依照不同服務類型，切換 : 驗證條件
    let validator = schema_Customer as any ;

    switch( current ){

        case "客戶" : validator = schema_Customer ; break ;
        case "寵物" : validator = schema_Pet ;      break ;

        case "基礎" : validator = schema_Basic ;    break ;
        case "洗澡" : validator = schema_Bath ;     break ;
        case "美容" : validator = schema_Beauty ;   break ;

        case "方案" : validator = schema_Plan ;    break ;
        case "價格" : validator = schema_Price ;   break ;
        case "品種" : validator = schema_Species ; break ;

        case "員工" : validator = schema_Employee ; break ;

    }




    // React Hook Form
    const { register , setValue , handleSubmit , control , formState: { errors , isDirty , isValid } } =
                    useForm<IService>({
                                         mode     : "all" ,
                                         resolver : yupResolver( validator ) ,
                                      }) ;

    // 欲傳遞屬性
    const props = {
                    register : register ,
                    setValue : setValue ,
                    control  : control ,
                    errors   : errors ,
                    isDirty  : isDirty ,
                    isValid  : isValid ,
                    current  : current
                  } ;


    const create_Data          = useCreate_Data() ;               // 新增 _ 一般資料
    const create_Cus_Relatives = useCreate_Customer_Relatives() ; // 新增 _ 客戶關係人


    // 提交表單 ( IService 再確認 2021.07.23 )
    const onSubmit : SubmitHandler<IService> = ( data : any ) => {

        let api = "" ;  // 新增資料 API 路徑 ( 並用以判斷 : 新增何種類型的資料  )
        let msg = "" ;  // 新增成功後訊息

        // 將 "寵物品種 pet_species 資料表 id" ， 改為 : "寵物品種名稱"
        if( data['pet_Species'] && data['pet_Species'] !== '請選擇' ){  // 有寵物區塊欄位
            const pet        = petSpecies.filter( x => x['id'] === parseInt( data['pet_Species'] ) )[0] ;
            data.pet_Species = pet['name'] ;
        }

        // 驗證 : 員工( 工作人員 )欄位
        if( current === '員工' && data['employee_Type'] === '工作人員' ){
            const bool = employee_Validator( data ) ;
            if( !bool ) return false ;
        }

        switch( current ){

          case "客戶" :
              api = "/customers" ;
              msg = "客戶" ;
              break ;

          case "寵物" :
              api = "/pets" ;
              msg = "寵物" ;
              break ;

          // 由 Redux 取得，動態加入 service_Status 欄位 ( 已到店、預約_今天、預約_未來 )
          case "基礎" :
              api = "/basics" ;
              msg = "基礎" ;
              data.shop_Q_Code       = current_Q_Code ;   // 目前所選擇 _ 到店處理碼 Q
              data.service_Status    = service_Status ;   // 服務性質 : 已到店、預約_今天、預約_未來
              data.basic_Fee         = basicSumPrice ;    // 基礎費

              break ;

          case "洗澡" :
              api = "/bathes" ;
              msg = "洗澡" ;
              data.shop_Q_Code       = current_Q_Code ;    // 目前所選擇 _ 到店處理碼 Q
              data.service_Status    = service_Status ;
              data.bath_Fee          = bathSumPrice ;      // 洗澡費
              data.extra_Service_Fee = extraItemFee ;      // 加價項目 _ 費用
              data.extra_Beauty_Fee  = extraBeautyFee ;    // 加價美容 _ 費用
              data.current_Plan_Id   = current_Plan_Id ;   // 目前選擇 _ 方案資料表 ( plans ) id
              data.current_Plan_Note = current_Plan_Note ; // 目前選擇 _ 方案備註 Ex. 包月洗澡第 1 次

              break ;

          case "美容" :
              api = "/beauties" ;
              msg = "美容" ;
              data.shop_Q_Code       = current_Q_Code ;    // 目前所選擇 _ 到店處理碼 Q
              data.service_Status    = service_Status ;
              data.beauty_Fee        = beautySumPrice ;    // 美容費
              data.extra_Service_Fee = extraItemFee ;      // 加價項目 _ 費用
              data.current_Plan_Id   = current_Plan_Id ;   // 目前選擇 _ 方案資料表 ( plans ) id
              data.current_Plan_Note = current_Plan_Note ; // 目前選擇 _ 方案備註 Ex. 包月洗澡第 1 次

              break ;

          case "方案" :
              api = "/plans" ;
              msg = "方案" ;
              data.month_Bath_Price   = month_Bath_Price ;   // 包月洗澡 費用
              data.month_Beauty_Price = month_Beauty_Price ; // 包月美容 費用

              break ;

          case "價格" :
              api = "/service_prices" ;
              msg = "服務價格" ;
              break ;

          case "品種" :
              api = "/pet_species"  ;
              msg = "寵物品種" ;
              break ;

          case "員工" :
              api = "/employees" ;
              msg = "員工" ;
              break ;

        }



        // # 新增資料
        create_Data( api , data , msg ) ;  // 所有資料

        // 僅針對 _ 客戶關係人 ( 再確認 2021.07.05 )
        if( current === '客戶' || current === '寵物' || current === '基礎' || current === '洗澡' || current === '美容' || current === '方案' ){
          create_Cus_Relatives('/customers/store_relation' , data ) ;
        }



    } ;


    // 設定 _ 表單新增按鈕 : 驗證邏輯
    useEffect(( ) => {

      const is_RHF_Valid = isValid ;  // React Hook Form 驗證有效

      // 決定 _ 提交按鈕是否有作用的條件組合
      const is_Disabled_Form = !is_RHF_Valid || invalid_To_Plan  ;


      set_Disabled_Form(is_Disabled_Form ? true : false ) ;


    } ,[ isValid , invalid_To_Plan ] ) ;


    return <>

             { /* 表單標籤 */ }
             <Edit_Form_Tabs  get_Current_Tab = { get_Current_Tab } />

             <hr/><br/>

             <form onSubmit = { handleSubmit( onSubmit ) } >

                 { /* 服務單基本資訊 : 服務性質、到店日期、處理碼 ... */ }
                 { ( current === "基礎" || current === "洗澡" || current === "美容"  )  &&
                     <Service_Info { ...props } />
                 }

                 { /* 客戶 */ }
                 { ( current === "客戶" || current === "寵物" || current === "基礎" || current === "洗澡" || current === "美容" || current === "安親" || current === "住宿" || current === "方案" ) &&
                     <Create_Customer { ...props } />
                 }

                 { /* 寵物 */ }
                 { ( current === "寵物" || current === "基礎" || current === "洗澡" || current === "美容" || current === "安親" || current === "住宿"  ) &&
                     <Create_Pet { ...props } />
                 }

                 { /* 服務單 : 基礎、洗澡、美容 */ }
                 { ( current === "基礎" || current === "洗澡" || current === "美容" || current === "安親" || current === "住宿" || current === "方案"  )  &&
                    <Create_Service { ...props } />
                 }

                 { /* 價格項目 */ }
                 { current === "價格" && <Create_Price { ...props } />    }

                 { /* 品種項目 */ }
                 { current === "品種" && <Create_Species { ...props } />  }

                 { /* 員工項目 */ }
                 { current === "員工" && <Create_Employee { ...props } /> }

                 <br/><br/><br/><br/>

                 { /* 提交按鈕 */ }
                 <div className="has-text-centered" >
                    <button disabled={ disabled_Form }
                            type="submit" className="button is-primary relative is-medium" style={{ top: "-10px" }} >
                        新增{current}
                    </button>
                 </div>

                 <br/><br/>

             </form>

           </>

} ;

export default Create_Data_Container ;