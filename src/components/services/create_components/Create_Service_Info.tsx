import React, {FC} from "react" ;
import Time_picker from "utils/time/Time_Picker";
import Date_picker from "utils/time/Date_picker";
import { Edit_Form_Type } from "utils/Interface_Type"

/*
*
*  @ 資料狀態 ( shop_status ) 共有 6 種 ~
*     # 預約 _ 類型 ( 2 種 ) : 預約當日、預約非當日
*     # 到店 _ 類型 ( 4 種 ) : 到店等候中、到店美容中、洗完等候中、已回家( 房 )
*
*/


/* 服務單( 基礎、洗澡、美容 ) _ 基本資訊 */
const Create_Service_Info : FC<Edit_Form_Type> = ({ register , errors , isDirty , isValid }  ) => {


    const way = {  fontSize : "11pt" , top : "-5px" , fontWeight : "bold"  } ;

    return <>

              <div className="columns is-multiline  is-mobile">

                 { /* 服務性質 */ }
                 <div className="column is-4-desktop">
                     <div className="tag is-large is-white">
                         <b> 服務性質 : </b> &nbsp;

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

                     <div className="tag is-large is-white">

                         <b> 處理碼 ( Q ) : </b> &nbsp;
                         <div className="select is-small" >

                             {/* <Select> value 值 : 新增狀態 -> '' ; 編輯狀態 -> 調出、設定該服務 Qcode  */}
                             <select  {...register( "edit_Q_Code" )} style={way} >

                                 <option> Q_01 </option >

                             </select>

                         </div>

                     </div>

                 </div>

                 { /* 實際到店時間 */ }
                 <div className="column is-4-desktop relative">

                    <div className="tag is-large is-white">

                        <b> 實際到店 : </b> &nbsp;

                        <Time_picker time_Type = {"appointed_Time"}  default_time = '00:00' />

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

export default Create_Service_Info ;