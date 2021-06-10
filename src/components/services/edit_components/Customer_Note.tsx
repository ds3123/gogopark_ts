import React , { FC } from "react" ;
import { Edit_Form_Type } from "utils/Interface_Type"
import {Input} from "../../../templates/form/Input";



{ /*  自備物品、主人交代、櫃台備註  */ }
const Customer_Note : FC<Edit_Form_Type> = ({ register , errors , isDirty , isValid } ) => {


   return <>

            <div className="columns is-multiline  is-mobile">

               { /* 自備物品 */ }
               <div className="column is-2-desktop"> <b className="tag is-large"> <i className="fas fa-gavel"></i> &nbsp; 自備物品 </b> </div>
               <div className="column is-7-desktop">
                   <input type="checkbox" value = "項圈_胸背"  { ...register( "customer_Object" ) } />  項圈_胸背 &nbsp; &nbsp;
                   <input type="checkbox" value = "牽繩"       { ...register( "customer_Object" ) } />  牽繩      &nbsp; &nbsp;
                   <input type="checkbox" value = "提籠_提袋"  { ...register( "customer_Object" ) } />  提籠_提袋 &nbsp; &nbsp;
                   <input type="checkbox" value = "衣服"       { ...register( "customer_Object" ) } />  衣服     &nbsp; &nbsp;
                   <input type="checkbox" value = "口罩"       { ...register( "customer_Object" ) } /> 口罩     &nbsp; &nbsp;
                   <input type="checkbox" value = "洗劑"       { ...register( "customer_Object" ) } />   洗劑     &nbsp; &nbsp;
                   <input type="checkbox" value = "耳藥"       { ...register( "customer_Object" ) } />   耳藥     &nbsp; &nbsp;
                   <input type="checkbox" value = "眼藥"       { ...register( "customer_Object" ) } />   眼藥     &nbsp; &nbsp; <br/>
               </div>

               <div className="column is-1-desktop" style={{ textAlign : "right" }}> 其他 :  </div>

               <div className="column is-2-desktop">
                    <input type="text" className="input" { ...register( "customer_Object_Other" ) } />
               </div>

               { /* 主人交代 */ }
               <div className="column is-2-desktop"> <b className="tag is-large"> <i className="fas fa-user-tag"></i> &nbsp; 主人交代 </b> </div>
               <div className="column is-10-desktop">
                   <input type="checkbox" value = "給水"   { ...register( "customer_Note" ) } /> 給水   &nbsp; &nbsp;
                   <input type="checkbox" value = "遛"     { ...register( "customer_Note" ) } /> 遛     &nbsp; &nbsp;
                   <input type="checkbox" value = "老犬"   { ...register( "customer_Note" ) } /> 老犬   &nbsp; &nbsp;
                   <input type="checkbox" value = "心臟病" { ...register( "customer_Note" ) } /> 心臟病 &nbsp; &nbsp;
                   <input type="checkbox" value = "會兇狗" { ...register( "customer_Note" ) } /> 會兇狗 &nbsp; &nbsp;
                   <input type="checkbox" value = "會咬繩" { ...register( "customer_Note" ) } /> 會咬繩 &nbsp; &nbsp;
               </div>

               { /* 櫃台備註 */ }
               <div className="column is-2-desktop"> <b className="tag is-large"> <i className="fas fa-pencil-alt"></i> &nbsp; 櫃台備註 </b> </div>

               <div className="column is-10-desktop">
                   <input type="text" className="input" { ...register( "admin_Note" ) } />
               </div>

          </div>

            <br/><hr/><br/>

          </>
} ;


export default Customer_Note ;

