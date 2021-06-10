
import React from "react" ;
import Date_picker from "../../../utils/time/Date_picker";



/*  @ 日報表  */
const Daily_Report = () => {



  const way = {  fontSize : "11pt" , fontWeight : "bold"  } as const ;

  return <>

           <div className="columns is-multiline  is-mobile">

               <div className="column is-4-desktop">

                   <div className="tag is-large is-white">
                       <b> 報表日期 : </b> &nbsp; <Date_picker no_Past = { true }  />

                   </div>

               </div>

               <div className="column is-4-desktop">

                   <span className="tag is-large is-white">
                      <b> 篩選類別 : </b> &nbsp;
                   </span>

                   <div className="select is-small" >

                       {/* <Select> value 值 : 新增狀態 -> '' ; 編輯狀態 -> 調出、設定該服務 Qcode  */}
                       <select style={way} >

                           <option value="全部類別"> 全部類別 </option >

                       </select>

                   </div>


               </div>


           </div>

         </>

} ;

export default Daily_Report ;