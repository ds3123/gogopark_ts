
import React from "react" ;


{ /* 回傳 _ 預先填寫資料 ( for 編輯資料 )  */ }
const usePreLoadData = ( data : any ) => {

    let preLoadData = {} as any ;
    const obj       = data.preLoadData ;

    // # 首頁
    if( obj && obj.customer && obj.pet ){

      const cus = obj.customer ;
      const pet = obj.pet ;

      preLoadData = {

                        // # 服務單資料
                        Q_code             : obj.q_code ,
                        service_Date       : obj.service_date ,    // 到店服務日期
                        service_Type       : obj.service_type ,    // 服務類型(基礎、洗澡、美容)
                        shop_Status        : obj.shop_status ,     // 到店狀態 ( 到店等候中' | '到店美容中' | '洗完等候中' | '已回家( 房 )' )

                        // # 工作人員
                        beauty_User        : obj.beautian ,        // 經手美容師
                        beauty_Note        : obj.beautian_note ,   // 美容師 _ 備註
                        beauty_Star        : obj.beautian_star ,   // 美容師 _ 評分

                        admin_User         : obj.admin_user ,      // 櫃台行政人員
                        admin_Note         : obj.admin_note ,      // 櫃台行政人員 _ 備註


                        // # ( 預計 ) 到店時間
                        expected_Arrive    : obj.expected_arrive , // 預計 _ 到店時間 ( 預約 )
                        expected_Leave     : obj.exppected_leave , // 預計 _ 離店時間 ( 預約 )

                        actual_Arrive      : obj.actual_arrive ,   // 實際 _ 到店時間

                        // # 到店、離店方式 ( Ex. 主人送來、接走 )
                        way_Arrive         : obj.way_arrive ,
                        way_Leave          : obj.way_leave ,

                        // # 美容師處理完 _ 開始等待時間、等待方式( Ex. 進籠子等候 )
                        wait_Time          : obj.wait_time ,
                        wait_Way           : obj.wait_way ,

                     } ;

      return preLoadData

   }


    // # 客戶
    if( obj ){

        preLoadData = {

            // # 客戶資料
            customer_Id        : obj.id,
            customer_Name      : obj.name,
            customer_Cellphone : obj.mobile_phone,
            customer_Telephone : obj.tel_phone,
            customer_Line      : obj.line,
            customer_Email     : obj.email,
            customer_Address   : obj.address,

        } ;

        return preLoadData

    }


    return preLoadData

};

export default usePreLoadData