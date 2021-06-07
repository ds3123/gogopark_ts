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

    register : any ;
    errors   : any ,
    isDirty  : boolean ,
    isValid  : boolean

}




