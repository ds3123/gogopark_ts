import React, {useState, useEffect, useCallback} from "react" ;
import { useHistory } from "react-router-dom";

import axios from "utils/axios" ;

// React-Toastify
import { toast } from "react-toastify";

// Redux
import { useDispatch , useSelector } from "react-redux";
import { set_Side_Panel } from "store/actions/action_Global_Layout";
import { set_Current_Second_Tab } from "store/actions/action_Management"
import moment from "moment";


/* @ POST : 透過 Ajax _ 新增資料 */

// 新增 _ 客戶
const useCreate_Customer = ( history : any , dispatch : any ) => {

    const create_Customer = ( api : string  , data  : any , msg? : string ) => {

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

    } ;

    return create_Customer ;

} ;

// 新增 _ 寵物
const useCreate_Pet = ( history : any , dispatch : any ) => {

    const create_Pet = ( api : string  , data  : any , msg? : string ) => {

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

    } ;

    return create_Pet ;

} ;

// 新增 _ 基礎單
const useCreate_Basic = ( history : any , dispatch : any ) => {

    // 資料庫已有 : 該客戶、寵物紀錄
    const IsExisting_Customer = useSelector(( state : any ) => state.Customer.IsExisting_Customer ) ;
    const IsExisting_Pet      = useSelector(( state : any ) => state.Pet.IsExisting_Pet ) ;

    const create_Basic = ( api : string  , data  : any , msg? : string ) => {

        const dataArr = columns_Covert_Basic( data ) ;

        // 轉換欄位
        const obj_Customer  = dataArr[0] as any ; // 客戶
        const obj_Pet       = dataArr[1] ;        // 寵物
        const obj_Basic     = dataArr[2] ;        // 基礎單


        // 新增資料
        if( !IsExisting_Customer ) axios.post( "/customers" , obj_Customer );
        if( !IsExisting_Pet )      axios.post( "/pets" , obj_Pet ) ;

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

    } ;

    return create_Basic ;

} ;

// 新增 _ 洗澡單
const useCreate_Bath = ( history : any , dispatch : any ) => {

    const create_Bath = ( api : string  , data  : any , msg? : string ) => {

        const dataArr = columns_Covert_Bath( data ) ;

        // 轉換欄位
        const obj_Customer  = dataArr[0] ;  // 客戶
        const obj_Pet       = dataArr[1] ;  // 寵物
        const obj_Bath      = dataArr[2] ;  // 洗澡單

        // 新增資料
        axios.post( "/customers" , obj_Customer );
        axios.post( "/pets" , obj_Pet );
        axios.post( "/bathes" , obj_Bath ).then(res => {

            // 新增成功通知
            if( msg ){ toast(`🦄 已新增 : ${ msg }`, { position: "top-left", autoClose: 5000 , hideProgressBar: false,}); }

            // 關掉右側面板
            dispatch( set_Side_Panel(false , null ,{} ) ) ;

            // 前往相對應頁面
            // NOTE : 為避免在相同屬性頁面下新增資料，而導致沒有渲染頁面 --> 先前往任一錯誤路徑，再前往正確路徑 ( 2021.06.12 再看看是否有更好解決方式 )
            history.push("/wrongpath" ) ;  // 錯誤路徑
            history.push("/services" ) ;   // 正確路徑

        }) ;


    } ;

    return create_Bath ;

} ;

// 新增 _ 美容單
const useCreate_Beauty = ( history : any , dispatch : any ) => {

    const create_Beauty = ( api : string  , data  : any , msg? : string ) => {

        const dataArr = columns_Covert_Beauty( data ) ;

        // 轉換欄位
        const obj_Customer  = dataArr[0] ;  // 客戶
        const obj_Pet       = dataArr[1] ;  // 寵物
        const obj_Beauty      = dataArr[2] ;  // 洗澡單

        // 新增資料
        axios.post( "/customers" , obj_Customer );
        axios.post( "/pets" , obj_Pet );
        axios.post( "/beauties" , obj_Beauty ).then(res => {

            // 新增成功通知
            if( msg ){ toast(`🦄 已新增 : ${ msg }`, { position: "top-left", autoClose: 5000 , hideProgressBar: false,}); }

            // 關掉右側面板
            dispatch( set_Side_Panel(false , null ,{} ) ) ;

            // 前往相對應頁面
            // NOTE : 為避免在相同屬性頁面下新增資料，而導致沒有渲染頁面 --> 先前往任一錯誤路徑，再前往正確路徑 ( 2021.06.12 再看看是否有更好解決方式 )
            history.push("/wrongpath" ) ;  // 錯誤路徑
            history.push("/services" ) ;   // 正確路徑

        }) ;

    } ;

    return create_Beauty ;

} ;

// 新增 _ 員工
const useCreate_Employee = ( history : any , dispatch : any ) => {

    const create_Employee = ( api : string  , data  : any , msg? : string ) => {

        const dataObj = columns_Covert_Employee( data ) ;

        // 新增資料
        axios.post( "/employees" , dataObj ).then( res => {

            // 新增成功通知
            if( msg ){ toast(`🦄 已新增 : ${ msg }`, { position: "top-left", autoClose: 5000 , hideProgressBar: false,}); }

            // 關掉右側面板
            dispatch( set_Side_Panel(false , null ,{} ) ) ;

            // for 新增後，跳回 /management ，並點選 '員工管理' 頁籤
            dispatch( set_Current_Second_Tab('員工管理') ) ;

            history.push("/wrongpath");  // 錯誤路徑
            history.push("/management");  // 正確路徑

        }) ;

    } ;

    return create_Employee ;

} ;


// 新增 _ 服務價格
const useCreate_Service_Price = ( history : any , dispatch : any ) => {

    const create_Service_Price = ( api : string  , data  : any , msg? : string ) => {

        


        // 轉換資料表欄位
        const obj = columns_Covert_Service_Prices( data ) ;

        // 新增資料
        axios.post( "/service_prices" , obj ).then( res => {

            // 新增成功通知
            if( msg ){ toast(`🦄 已新增 : ${ msg }`, { position: "top-left", autoClose: 5000 , hideProgressBar: false,}); }

            // 關掉右側面板
            dispatch( set_Side_Panel(false , null ,{} ) ) ;

            history.push("/wrongpath");  // 錯誤路徑
            history.push("/management");  // 正確路徑

        }) ;

    } ;

    return create_Service_Price ;

} ;


// 新增 _ 品種
const useCreate_Pet_Species = ( history : any , dispatch : any ) => {

    const create_Pet_Species = ( api : string  , data  : any , msg? : string ) => {

        // 轉換資料表欄位
        const obj = columns_Covert_Pet_Species( data ) ;

        // 新增資料
        axios.post( "/pet_species" , obj ).then( res => {

            // 新增成功通知
            if( msg ){ toast(`🦄 已新增 : ${ msg }`, { position: "top-left", autoClose: 5000 , hideProgressBar: false,}); }

            // 關掉右側面板
            dispatch( set_Side_Panel(false , null ,{} ) ) ;

            history.push("/wrongpath");   // 錯誤路徑
            history.push("/management");  // 正確路徑

        }) ;

    } ;

    return create_Pet_Species ;

} ;


// 新增 _ 時間按鈕紀錄 ( 美容區中，美容師點選 _ 時間按鈕 )
export const useCreate_TimeRecord = ( ) => {

    const create_TimeRecord = ( id  : string , type : string , button : string , time : string , beautician : string ) => {

        // 轉換資料表欄位
        const obj = {
            service_table_id : id ,
            service_type     : type ,
            button_name      : button ,
            button_time      : time ,
            beautician       : beautician
        } ;


        // 新增資料
        axios.post( "/time_records" , obj ).then(res => {

          // 新增成功通知
          toast(`🦄 已新增 : ` ,{ position : "top-left" , autoClose : 1500 , hideProgressBar : false } );

        }) ;

    } ;

    return create_TimeRecord ;

} ;


// @ 新增資料 ------------------------------------------------------------------------------

// # 新增資料
export const useCreate_Data = ( ) => {

    const history  = useHistory() ;
    const dispatch = useDispatch() ;

    // * 依賴項目
    const create_Customer = useCreate_Customer( history , dispatch ) ; // 客戶
    const create_Pet      = useCreate_Pet( history , dispatch ) ;      // 寵物
    const create_Basic    = useCreate_Basic( history , dispatch ) ;    // 基礎單
    const create_Bath     = useCreate_Bath( history , dispatch ) ;     // 洗澡單
    const create_Beauty   = useCreate_Beauty( history , dispatch ) ;   // 美容單


    const create_Service_Price = useCreate_Service_Price( history , dispatch ) ; // 價格 ( 各項服務 )
    const create_Pet_Species   = useCreate_Pet_Species( history , dispatch ) ;   // 寵物品種

    const create_Employee      = useCreate_Employee( history , dispatch ) ; // 員工


    // * Controller / 表示層
    const create_Data = ( api : string  , data  : any , msg? : string  ) => {


        // 客戶
        if (api === "/customers") create_Customer(api, data, msg);

        // 寵物
        if (api === "/pets") create_Pet(api, data, msg);

        // 基礎
        if (api === "/basics") create_Basic(api, data, msg);

        // 洗澡
        if (api === "/bathes") create_Bath(api, data, msg);

        // 美容
        if (api === "/beauties") create_Beauty(api, data, msg);

        // 價格 ( 各項服務 )
        if (api === "/service_prices") create_Service_Price(api, data, msg);

        // 寵物品種
        if (api === "/pet_species") create_Pet_Species(api, data, msg);

        // 員工
        if (api === "/employees") create_Employee(api, data, msg);

    } ;

    return create_Data

} ;

// # 新增資料 ( for 客戶關係人 )
export const useCreate_Customer_Relatives = ( ) => {

    // 資料庫已有 : 該客戶紀錄
    const IsExisting_Customer = useSelector( ( state : any ) => state.Customer.IsExisting_Customer ) ;

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

        // 新增資料 ( 資料庫沒有該客戶，才能新增關係人 )
        if( !IsExisting_Customer ) axios.post( api , submitData ) ;

    } ;

    return create_Cus_Relatives

} ;



// @  轉換資料欄位 ---------------------------------------------------


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

// 洗澡
export const columns_Covert_Bath = ( data : any ) => {

    // 客戶
    const obj_Customer = columns_Covert_Customer( data ) ;

    // 寵物
    const obj_Pet      = columns_Covert_Pet( data ) ;

    // 洗澡單
    const obj_Bath     = {

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

                            customer_object : '' ,

                            customer_object_other : '' ,

                            customer_note : '' ,


                            shop_status           : data['service_Status'] === '已到店' ? '到店等候中' : '' ,                  // 到店狀態 ( 到店等候中、到店美容中、洗完等候中、已回家( 房 ) )


    } ;


    return [ obj_Customer , obj_Pet , obj_Bath ] ;

} ;

// 美容
export const columns_Covert_Beauty = ( data : any ) => {

    // 客戶
    const obj_Customer = columns_Covert_Customer( data ) ;

    // 寵物
    const obj_Pet      = columns_Covert_Pet( data ) ;

    // 美容單
    const obj_Beauty   = {

                            // * 基本資訊欄位
                            service_status  : data['service_Status'] ,                                                                   // 服務性質 ( 已到店、預約_今天、預約_明天 )
                            service_date    : data['service_Date'] ? moment( data['service_Date'] ).format('YYYY-MM-DD' ) : "" ,  // 到店服務日期
                            q_code          : data['shop_Q_Code'] === "" ? "01" : data['shop_Q_Code'] ,                                  // 到店處理碼 ( Q )

                            actual_arrive   : data['actual_Arrive'] ,                                                  // 實際到店時間
                            expected_arrive : data['expected_Arrive'] ? data['expected_Arrive'] : "" ,                 // 預計到店時間
                            expected_leave  : data['expected_Leave'] ,                                                 // 預計離店時間

                            way_arrive      : data['way_Arrive'] ,                                                     // 到店方式
                            way_leave       : data['way_Leave'] ,                                                      // 離店方式

                            // * 客戶資料
                            customer_id     : data['customer_Id'] ,                                                    // 身分證字號

                            // * 寵物資料
                            pet_id          : data['pet_Serial'] ,                                                     // 寵物編號

                            shop_status     : data['service_Status'] === '已到店' ? '到店等候中' : '' ,                  // 到店狀態 ( 到店等候中、到店美容中、洗完等候中、已回家( 房 ) )

                          } ;

    return [ obj_Customer , obj_Pet , obj_Beauty ] ;

} ;

// 價格( 各項服務 )
export const columns_Covert_Service_Prices = ( data : any ) => {

    return {
             service_type  : data['price_Type'] ,        // 服務類型

             service_plan  : data['price_Plan'] ,        // 指定方案
             species_id    : data['price_Species_Id'] ,  // species 資料表 id ( 指定品種 )

             service_name  : data['price_Item'] ,        // 服務名稱
             service_price : data['price_Amount'] ,      // 服務價格

             note          : data['price_Note'] ,        // 備註
          }  ;

} ;

// 品種
export const columns_Covert_Pet_Species = ( data : any ) => {

    return {
             name      : data['species_Name'] ,
             serial    : data['species_Serial'] ,
             character : data['species_Character'] === '請選擇' ? '' : data['species_Character'] ,
             size      : data['species_Size'] === '請選擇' ? '' : data['species_Size'] ,
             fur       : data['species_Fur'] === '請選擇' ? '' : data['species_Fur'] ,
             note      : data['species_Note'] ,
           } ;

} ;

// 員工
export const columns_Covert_Employee = ( data : any ) => {

    return {
              employee_type         : data['employee_Type'] ,         // 員工類型( Ex. 管理員、美容師 ... )
              account               : data['employee_Account'] ,      // 帳號
              password              : data['employee_Password'] ,     // 密碼
              nickname              : data['employee_Nickname'] ,     // 暱稱

              employee_name         : data['employee_Name'] ,         // 員工姓名
              employee_id           : data['employee_Id'] ,           // 員工身分證字號
              employee_mobile_phone : data['employee_MobilePhone'] ,  // 員工手機號碼
              employee_address      : data['employee_Address'] ,      // 員工通訊地址
           } ;

} ;





