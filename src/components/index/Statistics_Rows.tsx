
import React, {useEffect} from "react" ;
import {set_Side_Panel} from "store/actions/action_Global_Layout";
import {useDispatch} from "react-redux";
import Service_Error from "components/index/list/Service_Error";
import Appointment_Record from "components/index/list/Appointment_Record";



/* @ 今日預約、今日統計 */
const Statistics_Rows = () => {

    const dispatch = useDispatch() ;

    // 顯示 _ 預約紀錄
    const show_Appointments_List   = () => dispatch( set_Side_Panel(true , <Appointment_Record /> , {} ) );

    // 顯示 _ 服務異常
    const show_Service_Error       = () => dispatch( set_Side_Panel(true , <Service_Error /> , {} ) );


    useEffect(( ) => {

        show_Service_Error();

    } , [] ) ;




    return <>

              <div className="columns is-mobile  is-multiline">

                  { /* 今日預約 */ }
                  <div className="column is-12-desktop">

                      <div className="tags has-addons" >

                          <b className= "tag is-large is-primary">
                              <i className="fas fa-phone"></i> &nbsp; 今日預約
                          </b>

                          <span className="tag is-large is-light">
                              基礎 : &nbsp; <b className='fDred'> 2 </b> &nbsp;&nbsp;
                              洗澡 : &nbsp; <b className='fDred'> 7 </b> &nbsp;&nbsp;
                              美容 : &nbsp; <b className='fDred'> 6 </b> &nbsp;&nbsp;
                              安親 : &nbsp; <b className='fDred'> 1 </b> &nbsp;&nbsp;
                              住宿 : &nbsp; <b className='fDred'> 2 </b> &nbsp;
                          </span>

                          <span className="tag is-primary is-large is-light pointer" onClick={ show_Appointments_List } >
                              <i className="fas fa-list"></i> &nbsp; 預約紀錄 : 18
                          </span>

                      </div>

                  </div>

                  { /* 今日統計 */ }
                  <div className="column is-12-desktop">

                      <div className="tags has-addons" >

                          <b className= "tag is-large is-link" >
                              <i className="fas fa-calculator"></i> &nbsp; 今日統計
                          </b>

                          <span className="tag is-large is-light">

                              <i className="fas fa-list-alt"></i> &nbsp; 基礎 <b>完</b> &nbsp; :&nbsp;
                              <b className='fDred'> 3 </b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                               <i className="fas fa-bath"></i> &nbsp; 洗澡 <b>完</b> &nbsp; :&nbsp;
                              <b className='fDred'> 4 </b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                              <i className="fas fa-cut"></i> &nbsp; 美容 <b>完</b> &nbsp;: &nbsp;
                              <b className='fDred'> 5 </b> &nbsp;&nbsp;

                          </span>


                          <span className="tag is-large is-light is-danger pointer" onClick={ show_Service_Error } >
                              <i className="fas fa-exclamation"></i> &nbsp; 服務異常 : &nbsp;
                              <b> 0 </b>
                          </span>

                      </div>

                  </div>

              </div>

         </>

} ;

export default Statistics_Rows ;