
import React  from "react" ;
import Statistics_Rows from "components/index/Statistics_Rows"
import Status_Cards from "components/index/Status_Cards";
import { useRead_Service_Cus_Pet } from 'hooks/ajax_crud/useAjax_Read'
import useShopStatus_Sum from "hooks/data/useShopStatus_Sum";


const Index = ( ) => {

    // 取得資料 : 服務、客戶、寵物
    const pet_Arr = useRead_Service_Cus_Pet(); // 之後加上篩選條件 : "今日"的到店服務 2021.06.15


    // 到店個階段，基礎、洗澡、美容數量
    const numObj_1 = useShopStatus_Sum( "到店等候中"   , pet_Arr ) ;
    const numObj_2 = useShopStatus_Sum( "到店美容中"   , pet_Arr ) ;
    const numObj_3 = useShopStatus_Sum( "洗完等候中"   , pet_Arr ) ;
    const numObj_4 = useShopStatus_Sum( "已回家( 房 )" , pet_Arr ) ;

    const member = {
            top          : "-15px" ,
            right        : "2%" ,
            padding      : "13px",
            boxShadow    : "0px 0px 4px 0px rgba(0,0,0,.1)" ,
            borderRadius : "5px" ,
         } ;


    return <div className="is-hidden-mobile">


                { /*  今日值班人員  */ }
                <div className="absolute" style = { member } >
                    <i className="fas fa-user m_Bottom_20" ></i> &nbsp; <b>今日值班人員 </b>
                    &nbsp; &nbsp; <b className="tag is-warning">  <i className="far fa-calendar-alt"></i> &nbsp; 班表 </b><br/>
                    <b className="tag m_Bottom_10"> 櫃 台 </b> &nbsp; 小婷、宜芳 <br/>
                    <b className="tag m_Bottom_10"> 接 送 </b> &nbsp; 阿財 <br/>
                    <b className="tag "> 美容師</b> &nbsp; 晨薇、馨慧
                </div>

                { /* 今日來店、今日統計 */ }
                <Statistics_Rows />

                <br/><br/><br/>

            {/* 今日服務 _ 各階段狀態  */}
            <div className="columns is-mobile  is-multiline">

                {/* 到店等候中 */}
                <div className="column is-3-desktop">
                    <Status_Cards  pet_Arr = { pet_Arr }  shop_Status = "到店等候中"  service_Sum = { numObj_1 } />
                </div>

                {/* 到店美容中 */}
                <div className="column is-3-desktop">
                    <Status_Cards  pet_Arr = { pet_Arr }  shop_Status = "到店美容中" service_Sum = { numObj_2 } />
                </div>

                {/* 洗完等候中 */}
                <div className="column is-3-desktop">
                    <Status_Cards  pet_Arr = { pet_Arr } shop_Status = "洗完等候中" service_Sum = { numObj_3 } />
                </div>

                {/* 已回家( 房 )  */}
                <div className="column is-3-desktop">
                    <Status_Cards  pet_Arr = { pet_Arr } shop_Status = "已回家( 房 )" service_Sum = { numObj_4 }/>
                </div>

            </div> <br/>



           </div>

};

export default Index