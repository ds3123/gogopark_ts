import React, {useState, useEffect, useCallback} from "react" ;
import { useHistory } from "react-router-dom";

import axios from "utils/axios" ;

// React-Toastify
import { toast } from "react-toastify";

// Redux
import { useDispatch } from "react-redux";
import {set_Side_Panel} from "store/actions/action_Global_Layout";


/* @ POST : 透過 Ajax _ 新增資料 */


// # 新增資料
export const useCreate_Data = (  ) => {

    const history  = useHistory() ;
    const dispatch = useDispatch() ;

    // 新增資料邏輯
    const create_Data = ( api : string  , data  : any , msg? : string  ) => {

        // 轉換資料欄位
        const submitData = columns_Covert( api , data ) ;

        // 新增資料
        axios.post( api , submitData ).then(res => {

            if( msg ){
               // 新增成功通知
               toast(`🦄 已新增 : ${ msg }`, {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
            }

            // 關掉右側面板
            dispatch( set_Side_Panel(false , null ,{} ) ) ;

            // 前往相對應頁面
            // NOTE : 為避免在相同屬性頁面下新增資料，而導致沒有渲染頁面 --> 先前往任一錯誤路徑，再前往正確路徑 ( 2021.06.12 再看看是否有更好解決方式 )
            history.push("/wrongpath");  // 錯誤路徑
            history.push("/customers");  // 正確路徑

        });

    } ;

    return create_Data

} ;


// # 新增資料 ( for 客戶關係人 )
export const useCreate_Customer_Relatives = ( ) => {

    // 新增資料邏輯
    const create_Cus_Relatives = ( api : string , data : any ) => {

        // 轉換資料欄位
        const submitData = {

            customer_id  : data['customer_Id'] ,
            type         : data['customer_Relative_Type'] ,
            tag          : data['customer_Relative_Family'] ,
            name         : data['customer_Relative_Name'] ,
            mobile_phone : data['customer_Relative_Cellphone'] ,
            tel_phone    : data['customer_Relative_Telephone'] ,

        } ;

        // 新增資料
        axios.post( api , submitData ) ;

    } ;

    return create_Cus_Relatives

} ;



// 將前端( React ) 表單欄位，轉為對應的 _ 資料庫表單欄位
export const columns_Covert = ( api : string , data : any ) => {

    let obj = {} as any ;

    // 客戶
    if( api === "/customers" ){

        obj.name         = data['customer_Name'] ;
        obj.id           = data['customer_Id'] ;
        obj.mobile_phone = data['customer_Cellphone'] ;
        obj.tel_phone    = data['customer_Telephone'] ;
        obj.line         = data['customer_Line'] ;
        obj.email        = data['customer_Email'] ;
        obj.address      = data['customer_Address'] ;

    }

    // 寵物
    if( api === "/pets" ){


    }

    // 基礎
    if( api === "/basics" ){


    }

    // 洗澡
    if( api === "/bathes" ){


    }

    // 美容
    if( api === "/beauties" ){


    }

    return obj ;

} ;





