
import React from "react"

/*
*   @ 自訂 _ 表單驗證邏輯
*
*/


// 新增 _ 員工
export const useEmployee_Validator = (  ) => {

  const employee_Validator = ( data : any ) => {

      if( data['employee_Name'] === '' ){
          alert('請輸入 : 員工姓名') ;
          return false ;
      }

      if( data['employee_Sex'] === '請選擇' ){
          alert('請選擇 : 員工性別') ;
          return false ;
      }

      if( data['employee_Id'] === '' ){
          alert('請輸入 : 員工身分證字號') ;
          return false ;
      }

      if( data['employee_MobilePhone'] === '' ){
          alert('請輸入 : 員工手機號碼') ;
          return false ;
      }

      if( data['employee_Address'] === '' ){
          alert('請輸入 : 員工通訊地址') ;
          return false ;
      }

      // ---------------------------------

      if( data['relative_Name_1'] === '' ){
          alert('請輸入 : 首位緊急聯絡人姓名') ;
          return false ;
      }

      if( data['relative_Family_1'] === '請選擇' ){
          alert('請選擇 : 首位緊急聯絡人關係') ;
          return false ;
      }

      if( data['relative_MobilePhone_1'] === '' ){
          alert('請輸入 : 首位緊急聯絡人手機號碼') ;
          return false ;
      }

      return true ;

  } ;

  return employee_Validator

} ;