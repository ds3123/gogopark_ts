import React , { useEffect } from "react" ;
import { useDispatch } from "react-redux";
import Inform_Customer_Options from "components/beautician/main_components/inform_customer/Inform_Customer_Options";
import Customer_Confirm_Options from "components/beautician/main_components/inform_customer/Customer_Confirm_Options";


// Redux
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;



{ /* 告知主人、主人確認 */ }
const Inform_Customer = () => {

    const dispatch = useDispatch() ;

    // 顯示 _ 告知主人面板
    const show_InfoCustomer    = () => dispatch( set_Side_Panel( true , <Inform_Customer_Options /> , {} ) ) ;

    // 顯示 _ 主人確認面板
    const show_CustomerConfirm = () => dispatch( set_Side_Panel( true , <Customer_Confirm_Options /> , {} ) ) ;

    useEffect(()=>{

      // show_CustomerConfirm() ;

    },[]) ;


    return <div style={{ textAlign : "right" }}>
              <b className = "tag is-medium is-link is-light pointer" onClick = { show_InfoCustomer } >    <i className="fas fa-phone"></i> &nbsp; 告知主人      </b> &nbsp; &nbsp; &nbsp;
              <b className = "tag is-medium is-link is-light pointer" onClick = { show_CustomerConfirm } > <i className="fas fa-user-check"></i> &nbsp; 主人確認 </b>
           </div>

};


export default Inform_Customer