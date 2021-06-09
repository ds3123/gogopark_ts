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
    errors?   : any ,
    isDirty?  : boolean ,
    isValid? : boolean

}


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




