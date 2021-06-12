import React, {FC, useEffect, useState} from "react" ;
import Time_picker from "utils/time/Time_Picker";
import Date_picker from "utils/time/Date_picker";
import { Edit_Form_Type } from "utils/Interface_Type"
import {useSelector} from "react-redux";
import moment from "moment";
import Qcode_Select_Options from "components/services/edit_components/Qcode_Select_Options";


/*
*
*  @ 資料狀態 ( shop_status ) 共有 6 種 ~
*     # 預約 _ 類型 ( 2 種 ) : 預約當日、預約非當日
*     # 到店 _ 類型 ( 4 種 ) : 到店等候中、到店美容中、洗完等候中、已回家( 房 )
*
*/

/* 服務單( 基礎、洗澡、美容 ) _ 基本資訊 */
const Service_Info : FC<Edit_Form_Type> = ({ register , errors , isDirty , isValid}) => {

   const today        = moment( new Date ).format('YYYY-MM-DD' ) ;                    // 今日
   const service_Date = useSelector( ( state : any ) => state.Info.service_Date ) ;  // 到店日期( 預設 : 今日 )


   const [ serviceStatus , set_serviceStatus ] = useState({
                                                                       is_Arrived_Today    : false ,   // 當日已到店
                                                                       is_Appointed_Today  : false ,  // 預約 _ 今天
                                                                       is_Appointed_Future : false    // 預約 _ 未來
                                                                     }) ;


    // 點選 _ 預約今天
    const appoint_Today = () => set_serviceStatus({ ...serviceStatus , is_Arrived_Today : false , is_Appointed_Today : true }) ;

    // 點選 _ 已到店
    const arrive_Shop = () => set_serviceStatus({ ...serviceStatus , is_Arrived_Today : true , is_Appointed_Today : false }) ;


    useEffect(() => {

        // 預約 _ 未來
        if( service_Date !== today ){
            set_serviceStatus({ ...serviceStatus , is_Arrived_Today : false , is_Appointed_Today : false , is_Appointed_Future : true  }) ;
        }else{
            set_serviceStatus({ ...serviceStatus , is_Arrived_Today : true , is_Appointed_Today : false , is_Appointed_Future : false  }) ;
        }

    } ,[ service_Date ] ) ;


    const way   = {  fontSize : "11pt" , top : "-5px" , fontWeight : "bold"  } ;
    const green = { color : "rgb(30,180,30)" } ;

    return <>
              <br/>
              <div className="columns is-multiline  is-mobile">

                 { /* 服務性質 */ }
                 <div className="column is-4-desktop">
                     <div className="tag is-large is-white">
                         <b> 服務性質 : </b> &nbsp;

                         { serviceStatus['is_Arrived_Today'] &&
                            <>
                              <b style={ green }> 已到店 &nbsp; </b>
                              <b className="tag is-medium pointer" onClick={ appoint_Today } > 預約 _ 今天 </b>
                            </>
                         }

                         { serviceStatus['is_Appointed_Today'] &&
                            <>
                              <b style={ green }> 預約 _ 今天 &nbsp; </b>
                                <b className="tag is-medium pointer" onClick={ arrive_Shop } > 已到店 </b>
                            </>
                         }

                         { serviceStatus['is_Appointed_Future'] &&
                             <>
                                 <b style={ green }> 預約 _ 未來 &nbsp; </b>
                             </>
                         }

                     </div>
                 </div>

                 { /* 到店日期 */ }
                 <div className="column is-4-desktop">
                    <div className="tag is-large is-white">
                        <b> 到店日期 : </b> &nbsp; <Date_picker no_Past = { true }  />
                    </div>
                 </div>

                 { /* Q 處理碼 */ }
                 <div className="column is-4-desktop">

                    <Qcode_Select_Options register = { register } />

                 </div>

                 { /* 預計到店時間 */}
                 { ( serviceStatus['is_Appointed_Today'] || serviceStatus['is_Appointed_Future'] ) &&

                     <div className="column is-4-desktop relative">
                        <div className="tag is-large is-white">
                           <b> <span style={{color: "rgb(230,100,0)"}}>預計</span>到店 : </b> &nbsp;
                           <Time_picker time_Type = {"appointed_Time"}  default_time = '00:00' />
                        </div>
                     </div>

                 }


                 { /* 實際到店時間 */ }
                 <div className="column is-4-desktop relative">

                    <div className="tag is-large is-white">
                        <b> 實際到店 : </b> &nbsp;
                        <Time_picker time_Type = {"arrived_Time"}  default_time = '00:00' />
                    </div>

                 </div>

                 { /* 到店方式 */ }
                 <div className="column is-4-desktop">

                     <div className="tag is-large is-white">
                         <b > 到店方式 : </b> &nbsp;
                         <div className="select is-small relative" >
                             <select {...register( "edit_Arrive_Way" )} style={way}>
                                 <option value="主人送來" >   主人送來   </option>
                                 <option value="接送員接來" > 接送員接來 </option>
                                 <option value="住宿轉來" >   住宿轉來   </option>
                             </select>
                         </div>
                     </div>

                 </div>

                 { /* 離店方式 */ }
                 <div className="column is-4-desktop">

                    <div className="tag is-large is-white">

                        <b > 離店方式 : </b> &nbsp;
                        <div className="select is-small relative" >
                            <select {...register( "edit_left_Way" )} style={way}>
                               <option value="主人接走">   主人接走    </option>
                               <option value="接送員接送"> 接送員接送  </option>
                               <option value="轉回住宿">   轉回住宿    </option>
                            </select>
                        </div>

                    </div>

                 </div>

                 { /* 期望離店時間 */ }
                 <div className="column is-4-desktop relative">

                    <div className="tag is-large is-white">
                      <b> 期望離店 : </b> &nbsp;
                      <Time_picker time_Type = { "exp_Leave_Time" }  default_time = '00:00' />
                    </div>

                 </div>

            </div>

            <br/><hr/><br/>

           </>
};

export default Service_Info ;