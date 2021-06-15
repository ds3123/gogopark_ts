import React from "react" ;

/* @ 定義 _ 全局 Interface、Type */


// 限制 : 到店狀態 _ 類型
export type Shop_Status  = '到店等候中' | '到店美容中' | '洗完等候中' | '已回家( 房 )' ;


// 限制 : 主要服務 _ 類型
export type Service_Type = '基礎' | '洗澡' | '美容' | '住宿' ;

// 限制 : 主要服務 _ 類型 ( for API )
export type Service_Type_Api = 'basics' | 'bathes' | 'beauties' ;


// 右側 _ 編輯表單 ( 新增、更新 )
export interface Edit_Form_Type  {

    register? : any ;
    setValue? : any ;
    control?  : any ;
    errors?   : any ;
    isDirty?  : boolean ;
    isValid? : boolean ;
    current? : string ;

}


// ********* 主要表單欄位  **********


// 客戶表單欄位( Create_Customer / Update_Customer )
export interface ICustomer {

    customer_Id                 : string ;
    customer_Name               : string ;
    customer_Cellphone          : string ;
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

// 服務單表單欄位( Create_Service / Update_Service )
export interface IService {

    // # 服務單資料
    Q_code          : string ; // Q 碼
    service_Date    : string ; // 到店服務日期
    service_Type    : string ; // 服務類型(基礎、洗澡、美容)
    shop_Status     : string ; // 到店狀態 ( 到店等候中' | '到店美容中' | '洗完等候中' | '已回家( 房 )' )

    // # 工作人員
    beauty_User     : string ; // 經手美容師
    beauty_Note     : string ; // 美容師 _ 備註
    beauty_Star     : string ; // 美容師 _ 評分

    admin_User      : string ; // 櫃台行政人員
    admin_Note      : string ; // 櫃台行政人員 _ 備註

    // # ( 預計 ) 到店時間
    expected_Arrive : string ; // 預計 _ 到店時間 ( 預約 )
    expected_Leave  : string ; // 預計 _ 離店時間 ( 預約 )

    actual_Arrive   : string ; // 實際 _ 到店時間

    // # 到店、離店方式 ( Ex. 主人送來、接走 )
    way_Arrive      : string ;
    way_Leave       : string ;

    // # 美容師處理完 _ 開始等待時間、等待方式( Ex. 進籠子等候 )
    wait_Time       : string ;
    wait_Way        : string ;

}




