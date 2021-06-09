
import React, {FC} from "react" ;
import { Edit_Form_Type } from "utils/Interface_Type"


/* 加價美容 ( 僅洗澡 ) */
const Create_Extra_Beauty : FC<Edit_Form_Type> = ({ register , errors , isDirty , isValid } )=>{


  return <>

            <div className="columns is-multiline is-mobile">

                  <div className= "column is-2-desktop"  >
                      <b className="tag is-large is-danger is-light">
                          <i className="fas fa-plus-circle"></i> &nbsp; 加價美容
                      </b>
                  </div>

                  <div className= "column is-10-desktop"  >

                      <input type="checkbox" value = "頭臉"  { ...register( "beauty_Extra_Option" ) } /> 頭臉  &nbsp; &nbsp; &nbsp;
                      <input type="checkbox" value = "耳朵"  { ...register( "beauty_Extra_Option" ) } /> 耳朵  &nbsp; &nbsp; &nbsp;
                      <input type="checkbox" value = "尾巴"  { ...register( "beauty_Extra_Option" ) } /> 尾巴  &nbsp; &nbsp; &nbsp; <br/><br/>

                      <b style={{ color:"rgb(0,0,150)" }}> 胸口</b> 飾毛 &nbsp;
                      <div className="select">
                          <select { ...register( "beauty_Extra_Option_1" ) }  >
                              <option value="請選擇">請選擇</option>
                              <option value="大狗">大狗</option>
                              <option value="中狗">中狗</option>
                              <option value="小狗">小狗</option>
                          </select>
                      </div> &nbsp;  &nbsp;  &nbsp;

                      <b style={{ color:"rgb(0,0,150)" }}> 肚子</b> 飾毛 &nbsp;
                      <div className="select">
                          <select { ...register( "beauty_Extra_Option_2" ) }  >
                              <option value="請選擇">請選擇</option>
                              <option value="大狗">大狗</option>
                              <option value="中狗">中狗</option>
                              <option value="小狗">小狗</option>
                          </select>
                      </div> &nbsp;  &nbsp;  &nbsp;

                      <b style={{ color:"rgb(0,0,150)" }}> 腿部</b> 飾毛 &nbsp;
                      <div className="select">
                          <select { ...register( "beauty_Extra_Option_3" ) }  >
                              <option value="請選擇">請選擇</option>
                              <option value="大狗">大狗</option>
                              <option value="中狗">中狗</option>
                              <option value="小狗">小狗</option>
                          </select>
                      </div> &nbsp;  &nbsp;  &nbsp;


                  </div>

            </div>

            <hr/>

         </>

};

export default Create_Extra_Beauty