import React from "react" ;
import Bath_Time_Button from "components/beautician/main_components/bath_time_records/Bath_Time_Button";



/* 洗澡紀錄_點選按鈕 */
const Bath_Time_Records = () => {



    const t_Center  = { textAlign:"center" , marginBottom : "30px" } as any ;

    const p_Title   = {

        width      : "100%" ,
        position   : "absolute",
        top        : "-60px",
        left       : "0px",
        fontWeight : "bold",
        fontSize   : "13pt" ,

    } as any ;

   return <div className="columns is-multiline is-mobile relative" style={{ top : "10px" }} >

               { /* 前置作業 */ }
               <div className="column is-2-desktop relative" style = { t_Center } >

                   <div style={ p_Title } > <span style={ { color : "rgb(80,80,200)" } } > <br/> <b className="fRed">*</b> 前置作業 </span> </div>

                   <Bath_Time_Button />
                   <Bath_Time_Button />

                   <br/><br/><br/>

               </div>

               { /* 小美容 */ }
               <div className="column is-2-desktop relative" style = { t_Center } >

                   <div style={ p_Title } > <span > <br/> <b className="fRed">*</b> 小美容 </span> </div>

                   <Bath_Time_Button />
                   <Bath_Time_Button />

                   <br/><br/><br/>

               </div>



               { /* 第一次洗澡 */ }
               <div className="column is-2-desktop relative" style={t_Center}>

                   <div style={p_Title}>
                       <div className="select is-small m_Bottom_5">
                           <select>
                               <option value="請選擇">請選擇</option>
                           </select>
                       </div> <br/>
                       <b className="fRed">*</b> 第一次洗澡
                   </div>

                   <Bath_Time_Button />
                   <Bath_Time_Button />

               </div>

               { /* 第二次洗澡 */ }
               <div className="column is-2-desktop relative" style={t_Center}>

                   <div style={p_Title}>
                       <div className="select is-small m_Bottom_5">
                           <select>
                               <option value="請選擇">請選擇</option>
                           </select>
                       </div> <br/>
                       <b className="fRed">*</b> 第二次洗澡
                   </div>

                   <Bath_Time_Button />
                   <Bath_Time_Button />

               </div>

               { /* 第一次浸泡 */ }
               <div className="column is-2-desktop relative" style={t_Center}>

                   <div style={p_Title}>
                       <div className="select is-small m_Bottom_5">
                           <select>
                               <option value="請選擇">請選擇</option>
                           </select>
                       </div> <br/>
                       <b className="fRed">*</b> 第一次浸泡
                   </div>

                   <Bath_Time_Button />
                   <Bath_Time_Button />

               </div>

               { /* 第三次洗澡 */ }
               <div className="column is-2-desktop relative" style={t_Center}>

                   <div style={p_Title}>
                       <div className="select is-small m_Bottom_5">
                           <select>
                               <option value="請選擇">請選擇</option>
                           </select>
                       </div> <br/>
                       <b className="fRed">*</b> 第三次洗澡
                   </div>

                   <Bath_Time_Button />
                   <Bath_Time_Button />

               </div>

               { /* 第二次浸泡 */ }
               <div className="column is-2-desktop relative" style={t_Center}>

                   <div style={p_Title}>
                       <div className="select is-small m_Bottom_5">
                           <select>
                               <option value="請選擇">請選擇</option>
                           </select>
                       </div> <br/>
                       <b className="fRed">*</b> 第二次浸泡
                   </div>

                   <Bath_Time_Button />
                   <Bath_Time_Button />

               </div>

               { /* 進烘箱 */ }
               <div className="column is-2-desktop relative" style={t_Center}>

                   <div style={p_Title}>
                       <div className="select is-small m_Bottom_5">
                           <select>
                               <option value="請選擇">請選擇</option>
                           </select>
                       </div> <br/>
                       <b className="fRed">*</b> 進烘箱
                   </div>

                   <Bath_Time_Button />
                   <Bath_Time_Button />

               </div>


               { /* 大美容 */ }
               <div className="column is-2-desktop relative" style = { t_Center } >

                   <div style={ p_Title } > <span > <br/> <b className="fRed">*</b> 大美容 </span> </div>

                   <Bath_Time_Button />
                   <Bath_Time_Button />

                   <br/><br/><br/>

               </div>

        </div>

} ;

export default Bath_Time_Records