
import React , {FC}  from "react" ;
import { Input } from "templates/form/Input"
import { Edit_Form_Type } from "utils/Interface_Type"


/* @ 編輯 _ 新增 / 修改 : 客戶 */
const Edit_Customer : FC<Edit_Form_Type> = ( { register , errors , isDirty , isValid } ) => {

      return <>

                { /* 客戶訊息 */ }
                <label className="label" style={{ fontSize : "1.3em" }} >
                    <i className="fas fa-user"></i> &nbsp; 客戶資訊 &nbsp;
                </label>

                <div className="columns is-multiline  is-mobile">

                  <Input type="text" name="customer_Id"        label="身分證字號" register={register} error={ errors.customer_Id }        icon="fas fa-id-card-alt" asterisk={true} columns="3"/>
                  <Input type="text" name="customer_Name"      label="姓 名"      register={register} error={ errors.customer_Name }      icon="fas fa-user" asterisk={true} columns="3" />
                  <Input type="text" name="customer_Cellphone" label="手機號碼"   register={register} error={ errors.customer_Cellphone } icon="fas fa-mobile-alt" asterisk={true} columns="3" />
                  <Input type="text" name="customer_Telephone" label="家用電話"   register={register} error={ errors.customer_Telephone } icon="fas fa-phone" asterisk={false} columns="3" />
                  <Input type="text" name="customer_Line"      label="Line ID"   register={register} error={ errors.customer_Line }      icon="fab fa-line" asterisk={false} columns="3" />
                  <Input type="text" name="customer_Email"     label="E-mail"    register={register} error={ errors.customer_Email }     icon="fas fa-envelope-open-text" asterisk={false} columns="3" />
                  <Input type="text" name="customer_Address"   label="通訊地址"   register={register} error={ errors.customer_Address }   icon="fas fa-home" asterisk={false} columns="6" />

                </div> <br/>

                { /* 客戶訊息 */ }
                <label className="label" style={{ fontSize : "1.3em" }} >

                    <i className="fas fa-users"></i> &nbsp; 關係人
                    { /* <b className="tag is-medium is-success is-light hover" > 新 增 </b> */ }

                </label>

                <div className="columns is-multiline  is-mobile">

                    <Input type="text" name="customer_Relative_Name" label="姓 名" register={register} error={ errors.customer_Relative_Name } icon="fas fa-user" asterisk={true} columns="3" />

                    <div className="column is-2-desktop required">

                        <p> 類 型 &nbsp; <b style={{color:"red"}}> { errors.customer_Relative_Type?.message } </b> </p>
                        <div className="select">
                            <select { ...register( "customer_Relative_Type" ) }  >
                                <option value="請選擇">請選擇</option>
                                <option value="緊急連絡人">緊急連絡人</option>
                                <option value="介紹人">介紹人</option>
                            </select>
                        </div>

                    </div>

                    <div className="column is-2-desktop required">

                        <p> 關 係 &nbsp; <b style={{color:"red"}}> { errors.customer_Relative_Family?.message } </b> </p>
                        <div className="select">
                            <select { ...register( "customer_Relative_Family" ) }  >
                                <option value="請選擇"> 請選擇 </option>
                                <option value="父"> 父 </option>
                                <option value="母"> 母 </option>
                                <option value="兄"> 兄 </option>
                                <option value="弟"> 弟 </option>
                                <option value="姊"> 姊 </option>
                                <option value="妹"> 妹 </option>
                                <option value="同學"> 同學 </option>
                                <option value="朋友"> 朋友 </option>
                                <option value="其他"> 其他 </option>
                            </select>
                        </div>

                    </div>

                    <Input type="text" name="customer_Relative_Cellphone" label="手機號碼" register={register} error={ errors.customer_Relative_Cellphone } icon="fas fa-mobile-alt" asterisk={true} columns="2" />
                    <Input type="text" name="customer_Relative_Telephone" label="家用電話" register={register} error={ errors.customer_Relative_Telephone } icon="fas fa-phone" asterisk={false} columns="2" />

                </div>

             </>

} ;


export default Edit_Customer