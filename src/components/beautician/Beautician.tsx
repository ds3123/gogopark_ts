
import React from "react" ;
import Main_Card from "components/beautician/Main_Card";
import Left_Cards from "components/beautician/Left_Cards";
import Inform_Cutomer from "components/beautician/main_components/inform_customer/Inform_Customer"

// Hook ( Ajax )
import { useRead_Service_Cus_Pet } from 'hooks/ajax_crud/useAjax_Read'

/* @ 美容師頁面  */
const Beautician = () => {

    // 取得資料 : 服務、客戶、寵物
    const pet_Arr    = useRead_Service_Cus_Pet();

    // 篩選出 _ 到店狀態( shop_status ) 為 : "到店等候中" ( 之後加上 "今天" 2021.06.15 )
    const shop_Wait  = pet_Arr.filter( x => { return x['shop_status'] === '到店等候中' || x['shop_status'] === '到店美容中'  ;  } ) ;


    const beautician = [ "吳晨葳" , "曾馨慧" , "吳宜芳" ] ;


    return <div className="relative" style={{ top:"-40px" }}>

              <div className="columns is-multiline  is-mobile" >

                  { /* 美容師列表 */ }
                  <div className="column is-8-desktop relative" >
                     <b className="tag is-medium is-white" > <i className="fas fa-user"></i> &nbsp; 美容師 : &nbsp;
                        <b className="tag is-medium" > 吳晨葳 </b> &nbsp; &nbsp;
                        <b className="tag is-medium" > 曾馨慧 </b> &nbsp; &nbsp;
                        <b className="tag is-medium" > 吳宜芳 </b> &nbsp; &nbsp;
                     </b>
                  </div>

                  { /* 告知主人、主人確認 */ }
                  <div className="column is-4-desktop relative" >
                      <Inform_Cutomer />
                  </div>

                  { /* 左側 : 等待中、處理中 面板 */ }
                  <div className="column is-3-desktop relative" >
                      <Left_Cards pet_Arr = { shop_Wait } />
                  </div>

                  { /* 右側 : 主要面板 */ }
                  <div className="column is-9-desktop relative" >
                      <Main_Card />
                  </div>

              </div>

           </div>

};

export default Beautician ;
