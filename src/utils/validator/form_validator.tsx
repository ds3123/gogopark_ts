
import React from "react" ;
import * as yup from "yup"


// 客戶
export const schema_Customer = yup.object().shape({

    // 客戶
    customer_Id                 : yup.string().required("必填欄位") ,
    customer_Name               : yup.string().required("必填欄位") ,
    customer_Cellphone          : yup.number().required("必填欄位").typeError("須為數字") ,

    // 客戶關係人
    customer_Relative_Name      : yup.string().required("必填欄位") ,
    customer_Relative_Type      : yup.string().required().test( "關係人_類型" , "請選擇", value => value !== "請選擇") ,
    customer_Relative_Family    : yup.string().required().test( "關係人_關係" , "請選擇", value => value !== "請選擇") ,
    customer_Relative_Cellphone : yup.number().required("必填欄位").typeError("須為數字") ,

});


// 寵物
export const schema_Pet = yup.object().shape({

    // 客戶
    customer_Id                 : yup.string().required("必填欄位") ,
    customer_Name               : yup.string().required("必填欄位") ,
    customer_Cellphone          : yup.number().required("必填欄位").typeError("須為數字") ,

    // 客戶關係人
    customer_Relative_Name      : yup.string().required("必填欄位") ,
    customer_Relative_Type      : yup.string().required().test( "關係人_類型" , "請選擇", value => value !== "請選擇") ,
    customer_Relative_Family    : yup.string().required().test( "關係人_關係" , "請選擇", value => value !== "請選擇") ,
    customer_Relative_Cellphone : yup.number().required("必填欄位").typeError("須為數字") ,

    // 寵物
    pet_Serial                  : yup.string().required("必填欄位") ,
    pet_Name                    : yup.string().required("必填欄位") ,
    pet_Species                 : yup.string().required().test( "品種" , "請選擇", value => value !== "請選擇") ,
    pet_Sex                     : yup.string().required().test( "性別" , "請選擇", value => value !== "請選擇") ,

});



// 基礎單
export const schema_Basic = yup.object().shape({

    // 客戶
    // customer_Id                 : yup.string().required("必填欄位") ,
    // customer_Name               : yup.string().required("必填欄位") ,
    // customer_Cellphone          : yup.number().required("必填欄位").typeError("須為數字") ,
    //
    // // 客戶關係人
    // customer_Relative_Name      : yup.string().required("必填欄位") ,
    // customer_Relative_Type      : yup.string().required().test( "關係人_類型" , "請選擇", value => value !== "請選擇") ,
    // customer_Relative_Family    : yup.string().required().test( "關係人_關係" , "請選擇", value => value !== "請選擇") ,
    // customer_Relative_Cellphone : yup.number().required("必填欄位").typeError("須為數字") ,

    // 寵物
    // pet_Serial                  : yup.string().required("必填欄位") ,
    // pet_Name                    : yup.string().required("必填欄位") ,
    // pet_Species                 : yup.string().required().test( "品種" , "請選擇", value => value !== "請選擇") ,
    // pet_Sex                     : yup.string().required().test( "性別" , "請選擇", value => value !== "請選擇") ,

});



// 洗澡單
export const schema_Bath = yup.object().shape({

    // 客戶
    // customer_Id                 : yup.string().required("必填欄位") ,
    // customer_Name               : yup.string().required("必填欄位") ,
    // customer_Cellphone          : yup.number().required("必填欄位").typeError("須為數字") ,
    //
    // // 客戶關係人
    // customer_Relative_Name      : yup.string().required("必填欄位") ,
    // customer_Relative_Type      : yup.string().required().test( "關係人_類型" , "請選擇", value => value !== "請選擇") ,
    // customer_Relative_Family    : yup.string().required().test( "關係人_關係" , "請選擇", value => value !== "請選擇") ,
    // customer_Relative_Cellphone : yup.number().required("必填欄位").typeError("須為數字") ,

    // 寵物
    // pet_Serial                  : yup.string().required("必填欄位") ,
    // pet_Name                    : yup.string().required("必填欄位") ,
    // pet_Species                 : yup.string().required().test( "品種" , "請選擇", value => value !== "請選擇") ,
    // pet_Sex                     : yup.string().required().test( "性別" , "請選擇", value => value !== "請選擇") ,

});



// 美容單
export const schema_Beauty = yup.object().shape({

    // 客戶
    // customer_Id                 : yup.string().required("必填欄位") ,
    // customer_Name               : yup.string().required("必填欄位") ,
    // customer_Cellphone          : yup.number().required("必填欄位").typeError("須為數字") ,
    //
    // // 客戶關係人
    // customer_Relative_Name      : yup.string().required("必填欄位") ,
    // customer_Relative_Type      : yup.string().required().test( "關係人_類型" , "請選擇", value => value !== "請選擇") ,
    // customer_Relative_Family    : yup.string().required().test( "關係人_關係" , "請選擇", value => value !== "請選擇") ,
    // customer_Relative_Cellphone : yup.number().required("必填欄位").typeError("須為數字") ,

    // 寵物
    // pet_Serial                  : yup.string().required("必填欄位") ,
    // pet_Name                    : yup.string().required("必填欄位") ,
    // pet_Species                 : yup.string().required().test( "品種" , "請選擇", value => value !== "請選擇") ,
    // pet_Sex                     : yup.string().required().test( "性別" , "請選擇", value => value !== "請選擇") ,

});
