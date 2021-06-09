import React, {FC} from "react" ;
import { Edit_Form_Type } from "utils/Interface_Type"


/* 基礎單選項 */
const Create_Basic_Form : FC<Edit_Form_Type> = ({ register , errors , isDirty , isValid }  ) => {


   return <>
             <b className="tag is-large is-warning" >
                <i className="far fa-list-alt"></i> &nbsp; 基 礎
             </b> <br/><br/>

             <div className="columns is-multiline is-mobile">

               <div className="column is-2-desktop">
                 <input type="checkbox" value = "剪指甲" { ...register( "basic_Option" ) } /> 剪指甲
               </div>

               <div className="column is-2-desktop">
                 <input type="checkbox" value = "擠肛門腺" { ...register( "basic_Option" ) } /> 擠肛門腺
               </div>

               <div className="column is-2-desktop">
                 <input type="checkbox" value = "眼周修開" { ...register( "basic_Option" ) } /> 眼周修開
               </div>

               <div className="column is-2-desktop">
                 <input type="checkbox" value = "拔耳毛、清耳朵" { ...register( "basic_Option" ) } /> 拔耳毛、清耳朵
               </div>

               <div className="column is-2-desktop">
                 <input type="checkbox" value = "貴賓腳" { ...register( "basic_Option" ) } /> 貴賓腳
               </div>

               <div className="column is-2-desktop">
                 <input type="checkbox" value = "剃腳底毛" { ...register( "basic_Option" ) } /> 剃腳底毛
               </div>

               <div className="column is-4-desktop">
                 <input type="checkbox" value = "剃肚子毛" { ...register( "basic_Option" ) } /> 剃肚子毛 ( 中、大型犬不剃肚毛 )
               </div>

               <div className="column is-8-desktop">

                     修腳緣 &nbsp;
                     <div className="select">
                       <select { ...register( "basic_Option_Foot" ) }  >
                         <option value="請選擇">請選擇</option>
                         <option value="大狗">大狗</option>
                         <option value="中狗">中狗</option>
                         <option value="小狗">小狗</option>
                       </select>
                     </div>

               </div>

             </div>

             <br/><hr/><br/>

          </>


} ;

export default Create_Basic_Form ;