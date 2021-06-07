
import React from "react" ;
import Main_Card from "components/beautician/Main_Card";
import Left_Cards from "components/beautician/Left_Cards";
import Inform_Cutomer from "components/beautician/main_components/inform_customer/Inform_Customer"

/* @ 美容師頁面  */
const Beautician = () => {



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
                      <Left_Cards />
                  </div>

                  { /* 右側 : 主要面板 */ }
                  <div className="column is-9-desktop relative" >
                      <Main_Card />
                  </div>

              </div>

           </div>

};

export default Beautician ;
