
import React from "react" ;
import Pet_Info from "components/beautician/main_components/pet_info/Pet_Info"
import Cus_Confirm_Bar from "components/beautician/main_components/Cus_Confirm_Bar"
import Bath_Time_Records from "components/beautician/main_components/Bath_Time_Records"
import { useSelector } from "react-redux";


{ /* 右側 : 主要面板  */ }
const Main_Card = () => {

   // 是否交付櫃台確認
   const is_Admin_Confirmed = useSelector(( state : any ) => state.Beautician.is_Admin_Confirmed ) ;

   return <>

            <div className="card p_10" style={{ height : "auto" }} > <br/>

                { /* ------------- 寵物基本資訊 --------------- */ }
                 <Pet_Info />

                { /* ------------- 主人確認狀態 Bar ------------ */ }
                { is_Admin_Confirmed  &&  <Cus_Confirm_Bar />  }

                { /* ------------- 洗澡 _ 時間點選按鈕 ------------ */ }
                <Bath_Time_Records />

            </div>

         </>

};

export default Main_Card