import React from "react" ;

/* @ 定義 _ 全局 Interface、Type */

// 限制 : 到店狀態 _ 類型
export type Shop_Status    = '到店等候中' | '到店美容中' | '洗完等候中' | '已回家( 房 )' ;

// 限制 : 服務狀態 _ 類型
export type Service_Status = '已到店' | '預約_今天' | '預約_未來' ;


// 限制 : 主要服務 _ 類型
export type Service_Type = '基礎' | '洗澡' | '美容' | '安親' | '一般安親' | '住宿_提早抵達' | '住宿_延後帶走' | '住宿' ;

// 限制 : 主要服務 _ 類型 ( for API )
export type Service_Type_Api = 'basics' | 'bathes' | 'beauties' ;


// 右側 _ 編輯表單 ( 新增、更新 )
export interface Edit_Form_Type {

    register? : any ;
    setValue? : any ;
    control?  : any ;
    errors?   : any ;
    isDirty?  : boolean ;
    isValid?  : boolean ;
    current?  : string ;

    pet_Species_id? : any ; // 寵物資料表( pet_species ) id ( for 編輯 _ 寵物資料 )

}


// ********* 主要表單欄位  **********


// 所有服務共用 ?? ( for 新增 _ 服務單 Create_Data_Container.tsx --> 再確認 2021.07.21 )
// 服務單表單欄位( Create_Service / Update_Service )
export interface IService {

    // # 基本資料 ( Service_Info )
    shop_Q_Code     : string ; // 到店當天處理碼 ( Q )
    service_Date    : string ; // 到店服務日期
    service_Type    : string ; // 服務類型(基礎、洗澡、美容)
    shop_Status     : string ; // 到店狀態 ( 到店等候中' | '到店美容中' | '洗完等候中' | '已回家( 房 )' )


    expected_Arrive : string ; // 預計 _ 到店時間 ( 預約 )
    expected_Leave  : string ; // 預計 _ 離店時間 ( 預約 )
    actual_Arrive   : string ; // 實際 _ 到店時間


    // # 客戶交代、物品 ( Customer_Note ) -------------------------------------------------
    customer_Object       : string[] ;  // checkbox 選項
    customer_Object_Other : string ;    // 其他輸入框
    customer_Note         : string[] ;  // 主人交代
    admin_Customer_Note   : string ;    // 櫃台備註

    // # 基礎單資料 ( Basic_Form )
    basic_Option          : string[] ;

    // # 洗澡單資料 ( Bath_Form )
    bath_Option_1         : string ;
    bath_Option_2         : string ;
    bath_Option_3         : string ;
    bath_Option_4         : string ;
    bath_Option_5         : string ;
    bath_Option_6         : string ;

    // # 美容單資料 ( Beauty_Form )
    beauty_Option_Body  : string ;
    beauty_Option_Head  : string ;
    beauty_Option_Ear   : string ;
    beauty_Option_Tail  : string ;
    beauty_Option_Foot  : string ;
    beauty_Option_Other : string ;

    // # 加價項目
    extra_Item          : string[] ;

    // # 加價美容
    extra_Beauty        : string[] ;


    // # 住宿單資料 ( Lodge_Form )
    lodge_Room_Type     : string ;

    lodge_CheckIn_Date  : any ;
    lodge_CheckIn_Time  : string ;

    lodge_CheckOut_Date : any ;
    lodge_CheckOut_Time : string ;


    // # 接送費用
    pickup_Fee          : number ;

    // # 服務明細 ( Summary_Fee )

    payment_Method : string ; // 付款方式

    admin_User     : string ; // 櫃台行政人員
    admin_Note     : string ; // 櫃台行政人員 _ 備註


    // # 美容師相關

    beauty_User    : string ; // 經手美容師
    beauty_Note    : string ; // 美容師 _ 備註
    beauty_Star    : string ; // 美容師 _ 評分



    // # 到店、離店方式 ( Ex. 主人送來、接走 )
    way_Arrive      : string ;
    way_Leave       : string ;

    // # 美容師處理完 _ 開始等待時間、等待方式( Ex. 進籠子等候 )
    wait_Time       : string ;
    wait_Way        : string ;






}


// 服務單 _ 基礎資訊
export interface IInfo {

    service_Status  : Service_Status ;  // 服務狀態 _ 類型 : 已到店、預約_今天、預約_未來
    service_Date    : string ;          // 到店服務日期
    shop_Q_Code     : string ;          // 到店當天處理碼 ( Q )

    expected_Arrive : string ;          // 預計 _ 到店時間 ( 預約 )
    actual_Arrive   : string ;          // 實際 _ 到店時間
    expected_Leave  : string ;          // 預計 _ 離店時間 ( 預約 )

    way_Arrive      : string ;          // 到店方式 Ex. 主人送來
    way_Leave       : string ;          // 離店方式 Ex. 主人接走

}


// 客戶表單欄位( Create_Customer / Update_Customer )
export interface ICustomer {

    customer_Id                 : string ;
    customer_Name               : string ;
    customer_Cellphone          : number ;
    customer_Telephone          : string ;
    customer_Line               : string ;
    customer_Email              : string ;
    customer_Address            : string ;

    customer_Relative_Name      : string ;
    customer_Relative_Type      : string ;
    customer_Relative_Family    : string ;
    customer_Relative_Cellphone : string ;
    customer_Relative_Telephone : string ;

}

// 寵物表單欄位( Create_Pet / Update_Pet )
export interface IPet {

    // # 寵物資料
    pet_Serial         : string ;
    pet_Name           : string ;
    pet_Species        : string ;
    pet_Sex            : string ;
    pet_Color          : string ;
    pet_Weight         : string ;
    pet_Age            : string ;

    // * 調查資料 ( 單選 )
    injection          : string ;
    flea               : string ;
    ligate             : string ;
    chip               : string ;
    infection          : string ;
    together           : string ;
    drug               : string ;
    bite               : string ;

    // * 調查資料 ( 複選 : 轉為陣列 )
    health             : string [] ;
    feed               : string [] ;
    toilet             : string [] ;
    ownerProvide       : string [] ;

    pet_Note           : string ;

}





// ******** 住宿 ********

export interface ILodge {

    lodgeData          : any[] ;  // 住宿資料

    lodgeType          : string ; // 房型
    lodgeNumber        : string ; // 房號

    // 住房
    lodgeCheckIn_Date  : string ; // 日期
    lodgeCheckIn_Time  : string ; // 時間

    // 退房
    lodgeCheckOut_Date : string ; // 日期
    lodgeCheckOut_Time : string ; // 時間


}

// 住宿資料
export interface ILodge_Data {

    title       : string ,
    startDate   : any ,
    endDate     : any ,
    lodgeType   : string ,
    lodgeNumber : string

}


export type room_Type = '大房' | '中房' | '小房' | '大籠' | '中籠' | '小籠'  ;


// 價格 ( 各項服務 )
export interface IService_Price{

    price_Type       : string ;     // 服務類別
    price_Plan       : string ;     // 指定方案
    price_Species_Id : number ;     // 品種資料表 ( pet_species ) id
    price_Item       : string ;     // 服務名稱
    price_Amount     : number ;     // 服務價格
    price_Note       : string ;     // 備註

    price_Fist_Bath   : number ;    // 初次洗澡優惠
    price_Single_Bath : number ;    // 單次洗澡
    price_Month_Bath  : number ;    // 包月洗澡

    price_Single_Beauty : number ;  // 單次美容
    price_Month_Beauty  : number ;  // 包月美容

}


// 品種資料
export interface ISpecies {

    species_Serial    : string ,
    species_Character : string ,
    species_Size      : string ,
    species_Fur       : string ,
    species_Name      : string ,
    species_Note      : string ,

}


// 員工資料
export interface IEmployee {

    // # 共同欄位
    employee_Type              : string ;   // 員工類型( Ex. 管理員、美容師 ...  )
    employee_Account           : string ;   // 帳號
    employee_Password          : string ;   // 密碼
    employee_Nickname          : string ;   // 暱稱 / 別名

    // # 帳號類型 : 工作人員
    employee_Serial            : string ;   // 員工編號
    salary_Type                : string ;   // 計薪類別 ( Ex. 正職 / 計時 )
    position_Type              : string ;   // 職位類別 ( Ex. 櫃台 / 美容 / 接送 )
    position_Status            : string ;   // 職位現況 ( Ex. 在職 / 離職 )
    Brand                      : string ;   // 所屬品牌 ( Ex. 狗狗公園 )
    Shop                       : string ;   // 所屬店別 ( Ex. 淡水店 )

    employee_Name              : string ;   // 員工姓名
    employee_Sex               : string ;   // 員工性別
    employee_Id                : string ;   // 員工身分證字號
    employee_MobilePhone       : string ;   // 員工手機號碼
    employee_TelPhone          : string ;   // 員工家用電話
    employee_Birthday          : string ;   // 員工生日
    employee_Line              : string ;   // 員工 LINE
    employee_Email             : string ;   // 員工 Email
    employee_Transportation    : string ;   // 員工 交通工具
    employee_Address           : string ;   // 員工通訊地址
    employee_Residence_Address : string ;   // 員工戶籍地址

    // # 緊急聯絡人(1、2、3)
    relative_Name_1            : string ;   // 姓名
    relative_Family_1          : string ;   // 關係
    relative_MobilePhone_1     : string ;   // 手機號碼
    relative_TelPhone_1        : string ;   // 家用電話
    relative_Address_1         : string ;   // 通訊地址

    relative_Name_2            : string ;
    relative_Family_2          : string ;
    relative_MobilePhone_2     : string ;
    relative_TelPhone_2        : string ;
    relative_Address_2         : string ;

    relative_Name_3            : string ;
    relative_Family_3          : string ;
    relative_MobilePhone_3     : string ;
    relative_TelPhone_3        : string ;
    relative_Address_3         : string ;


}








