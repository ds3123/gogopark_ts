import React, {useState, useEffect, useCallback} from "react" ;
import { useHistory } from "react-router-dom";

import axios from "utils/axios" ;

// React-Toastify
import { toast } from "react-toastify";

// Redux
import { useDispatch } from "react-redux";
import {set_Side_Panel} from "store/actions/action_Global_Layout";
import moment from "moment";


/* @ POST : 透過 Ajax _ 新增資料 */


// # 新增資料
export const useCreate_Data = (  ) => {

    const history  = useHistory() ;
    const dispatch = useDispatch() ;


    // 新增資料邏輯
    const create_Data = ( api : string  , data  : any , msg? : string  ) => {

        // * 新增資料 --------

        // 客戶
        if( api === "/customers" ){

           // 轉換欄位
           const obj_Customer= columns_Covert_Customer( data ) ;

           // 新增資料
           axios.post( "/customers" , obj_Customer ).then( res => {

               // 新增成功通知
               if( msg ){ toast(`🦄 已新增 : ${ msg }`, { position: "top-left", autoClose: 5000 , hideProgressBar: false,}); }

               // 關掉右側面板
               dispatch( set_Side_Panel(false , null ,{} ) ) ;

               // 前往相對應頁面
               // NOTE : 為避免在相同屬性頁面下新增資料，而導致沒有渲染頁面 --> 先前往任一錯誤路徑，再前往正確路徑 ( 2021.06.12 再看看是否有更好解決方式 )
               history.push("/wrongpath");  // 錯誤路徑
               history.push("/customers");  // 正確路徑

           }) ;

        }

        // 寵物
        if( api === "/pets" ){

           // 轉換欄位
           const obj_Customer = columns_Covert_Customer( data ) ;
           const obj_Pet      = columns_Covert_Pet( data ) ;

           // 新增資料
           axios.post( "/customers" , obj_Customer ) ;
           axios.post( "/pets" , obj_Pet ).then( res => {

               // 新增成功通知
               if( msg ){ toast(`🦄 已新增 : ${ msg }`, { position: "top-left", autoClose: 5000 , hideProgressBar: false,}); }

               // 關掉右側面板
               dispatch( set_Side_Panel(false , null ,{} ) ) ;

               // 前往相對應頁面
               // NOTE : 為避免在相同屬性頁面下新增資料，而導致沒有渲染頁面 --> 先前往任一錯誤路徑，再前往正確路徑 ( 2021.06.12 再看看是否有更好解決方式 )
               history.push("/wrongpath" ) ;  // 錯誤路徑
               history.push("/pets" ) ;       // 正確路徑

           }) ;

        }

        // 基礎
        if( api === "/basics" ){

            const dataArr = columns_Covert_Basic( data ) ;

            // 轉換欄位
            const obj_Customer  = dataArr[0] ;  // 客戶
            const obj_Pet       = dataArr[1] ;  // 寵物
            const obj_Basic     = dataArr[2] ;  // 基礎單


            // 新增資料
            axios.post( "/customers" , obj_Customer );
            axios.post( "/pets" , obj_Pet );
            axios.post( "/basics" , obj_Basic ).then(res => {

                // 新增成功通知
                if( msg ){ toast(`🦄 已新增 : ${ msg }`, { position: "top-left", autoClose: 5000 , hideProgressBar: false,}); }

                // 關掉右側面板
                dispatch( set_Side_Panel(false , null ,{} ) ) ;

                // 前往相對應頁面
                // NOTE : 為避免在相同屬性頁面下新增資料，而導致沒有渲染頁面 --> 先前往任一錯誤路徑，再前往正確路徑 ( 2021.06.12 再看看是否有更好解決方式 )
                history.push("/wrongpath" ) ;  // 錯誤路徑
                history.push("/services" ) ;   // 正確路徑

            }) ;

        }

        // 洗澡
        if( api === "/bathes" ){


        }

        // 美容
        if( api === "/beauties" ){


        }

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


// # 轉換資料欄位 ---------------------------------------------------
// 客戶
export const columns_Covert_Customer = ( data : any ) => {

    const obj = {

        name         : data['customer_Name'] ,
        id           : data['customer_Id'] ,
        mobile_phone : data['customer_Cellphone'] ,
        tel_phone    : data['customer_Telephone'] ,
        line         : data['customer_Line'] ,
        email        : data['customer_Email'] ,
        address      : data['customer_Address'] ,
    } ;

    return obj

} ;

// 寵物
export const columns_Covert_Pet = ( data : any ) => {

    const obj = {

        customer_id  : data['customer_Id'] ,

        serial       : data['pet_Serial'] ,
        species      : data['pet_Species'] ,
        name         : data['pet_Name'] ,
        sex          : data['pet_Sex'] ,
        color        : data['pet_Color'] ,
        weight       : data['pet_Weight'] ,
        age          : data['pet_Age'] ,

        injection    : data['injection'] ,
        flea         : data['flea'] ,
        ligate       : data['ligate'] ,
        chip         : data['chip'] ,
        infection    : data['infection'] ,
        together     : data['together'] ,
        drug         : data['drug'] ,
        bite         : data['bite'] ,

        health       : data['health'] ? data['health'].join(',') : "" ,
        feed         : data['feed'] ? data['feed'].join(',') : "" ,
        toilet       : data['toilet'] ? data['toilet'].join(',') : "" ,
        ownerProvide : data['ownerProvide'] ? data['ownerProvide'].join(',') : "" ,

        note         : data['pet_Note'] ,

    } ;

    return obj

} ;

// 基礎
export const columns_Covert_Basic = ( data : any ) => {

    // 客戶
    const obj_Customer = columns_Covert_Customer( data ) ;

    // 寵物
    const obj_Pet      = columns_Covert_Pet( data ) ;

    // 基礎單
    const obj_Basic    = {

                            // * 基本資訊欄位
                            service_status        : data['service_Status'] ,                                                                   // 服務性質 ( 已到店、預約_今天、預約_明天 )
                            service_date          : data['service_Date'] ? moment( data['service_Date'] ).format('YYYY-MM-DD' ) : "" ,  // 到店服務日期
                            q_code                : data['shop_Q_Code'] === "" ? "01" : data['shop_Q_Code'] ,                                  // 到店處理碼 ( Q )

                            actual_arrive         : data['actual_Arrive'] ,                                                  // 實際到店時間
                            expected_arrive       : data['expected_Arrive'] ? data['expected_Arrive'] : "" ,                 // 預計到店時間
                            expected_leave        : data['expected_Leave'] ,                                                 // 預計離店時間

                            way_arrive            : data['way_Arrive'] ,                                                     // 到店方式
                            way_leave             : data['way_Leave'] ,                                                      // 離店方式

                            // * 客戶資料
                            customer_id           : data['customer_Id'] ,                                                    // 身分證字號

                            // * 寵物資料
                            pet_id                : data['pet_Serial'] ,                                                     // 寵物編號

                            // * 基礎單欄位
                            customer_object       : data['customer_Object'] ? data['customer_Object'].join(',') : '' ,       // 自備物品 ( 可複選選項 )
                            customer_object_other : data['customer_Object_Other'] ,                                          // 自備物品 ( 其他 )
                            customer_note         : data['customer_Note'] ? data['customer_Note'].join(',') : '' ,           // 主人交代 ( 可複選選項 )
                            admin_note            : data['admin_Note'] ,                                                     // 櫃代備註

                            basic_data            : data['basic_Option'] ? data['basic_Option'].join(',') : '' ,              // 基礎資料( 可複選選項 )
                            basic_foot            : data['basic_Option_Foot'] === '請選擇' ? '' : data['basic_Option_Foot'] , // 修腳緣 ( 下拉 )


                            // * 費用欄位
                            basic_fee             : '' ,                                                                      // 本次基礎單消費價格小計
                            pickup_fee            : data['pickup_Fee'] ,                                                      // 接送費

                            admin_user            : '櫃台行政' ,                                                               // 經手人 / 櫃台行政( 再改為工作人員  )

                            shop_status           : data['service_Status'] === '已到店' ? '到店等候中' : '' ,                  // 到店狀態 ( 到店等候中、到店美容中、洗完等候中、已回家( 房 ) )

                            // * 美容師欄位 ( 美容師處理時，才會填寫 )
                            beautician            : '' ,                                                                      // 負責美容師
                            report                : '' ,                                                                      // 處理結果
                            wait_way              : '' ,                                                                      // 等候方式 ( Ex. 進籠子等候 )
                            wait_time             : '' ,                                                                      // 開始等候時間
                            beautician_star       : '' ,                                                                      // 評分
                            beautician_note       : '' ,                                                                      // 備註

                         } ;



    return [ obj_Customer , obj_Pet , obj_Basic ] ;

} ;








