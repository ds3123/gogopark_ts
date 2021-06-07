
import React from "react" ;

{ /* 洗澡時間按鈕 */ }
const Bath_Time_Button = () => {


   const timeBt = { marginBottom:"15px" , position : "relative" , zIndex : "10" } as any ;

   return  <span style     = { timeBt }
                 className = "tag is-large"  >

                00 : 00

           </span>

};

export default Bath_Time_Button