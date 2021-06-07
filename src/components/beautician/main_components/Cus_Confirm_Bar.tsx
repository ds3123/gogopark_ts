
import React from "react" ;

{ /* 主人確認 _ 狀態列 ( 點選 : 主人確認後，顯示 "交付櫃台確認中 ..." ) */ }
const Cus_Confirm_Bar = ()=>{


   return <div className="columns is-multiline  is-mobile">

               <div className="column is-12-desktop relative">

                   <div className="tag is-link is-light is-medium" style={{width: "100%"}}>

                       <b> 交付櫃台確認中 ... </b> &nbsp; &nbsp; &nbsp;

                       <span className="tag is-link" >
                                   <b style={{ color : "white" }} > <i className="fas fa-times-circle"></i> </b> &nbsp; 取 消
                              </span>

                   </div>

                   <br/><br/>

               </div>

          </div>


} ;

export default Cus_Confirm_Bar