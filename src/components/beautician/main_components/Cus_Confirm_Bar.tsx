
import React from "react" ;
import {set_Is_Admin_Confirmed} from "store/actions/action_Beautician";
import {set_Side_Panel} from "store/actions/action_Global_Layout";
import {useDispatch} from "react-redux";

{ /* 主人確認 _ 狀態列 ( 點選 : 主人確認後，顯示 "交付櫃台確認中 ..." ) */ }
const Cus_Confirm_Bar = ()=>{

    const dispatch = useDispatch()


    // 點選 : 取消 _ 交付櫃台詢問主人
    const click_Cancel_Confirm = ( ) => {

        // 開啟 : 詢問中狀態列
        dispatch( set_Is_Admin_Confirmed( false ) ) ;


    } ;



   return  <>
                <div className="columns is-multiline  is-mobile">

                   <div className="column is-12-desktop relative">

                       <div className="tag is-link is-light is-large" style={{width: "100%"}}>

                           <b> 交付櫃台確認中 ... </b> &nbsp; &nbsp; &nbsp;

                           <span className="tag is-link is-medium pointer" onClick={ click_Cancel_Confirm}>
                                       <b style={{ color : "white" }} > <i className="fas fa-times-circle"></i> </b> &nbsp; 取 消
                          </span>

                       </div>

                       <br/><br/>

                   </div>

              </div>

              <br/><br/>

          </>


} ;

export default Cus_Confirm_Bar