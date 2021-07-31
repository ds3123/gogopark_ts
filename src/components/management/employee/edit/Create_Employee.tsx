
import React, {FC, useEffect, useState} from "react"
import {Edit_Form_Type} from "utils/Interface_Type";
import Date_Picker from "templates/form/Date_Picker";
import {Input} from "templates/form/Input";
import {get_Today} from "utils/time/date";
import {get_RandomInt} from "utils/number/number";


// 品牌、分店資料
const dataBrand = [
                      { brand : '狗狗公園' , shop : [ '淡水店' , '紅樹林店' , '竹圍店' , '五股店' ] } ,
                      { brand : '寵物王國' , shop : [ '新莊店' , '蘆洲店' , '板橋店' , '天母店'  ] } ,
                      { brand : '寵物管家' , shop : [ '新北總店' , '台中分店' , '台南分店' ] } ,
                  ] ;


{ /* 員工單欄位 */ }
const Create_Employee : FC<Edit_Form_Type>    = ({ register  , control  , setValue , errors , current } ) => {

    // 帳戶類別
    const [ accountType , set_AccountType ]   = useState('' ) ;       // 管理帳號、測試帳號、工作人員

    // 薪資類別
    const [ salaryType , set_SalaryType ]     = useState('正職' ) ;   // 正職、計時

    // 職位類別
    const [ positionType , set_PositionType ] = useState<any[]>([]) ; // 櫃台、美容、接送 / 計時櫃台、計時美容、計時接送、計時人員

    // 所屬品牌
    const [ brandType , set_BrandType ]       = useState( dataBrand[0]['brand'] ) ;

    // 品牌所屬分店
    const [ brandShop , set_BrandShop ]       = useState( dataBrand[0]['shop'] ) ;


    // -----------------------------------

    // 取得 _ 員工類別
    const get_Employee_Type = ( type : string ) => set_AccountType( type );

    // 取得 _ 薪資類別
    const get_Salary_Type = ( type : string ) => set_SalaryType( type ) ;

    // 取得 _ 所屬品牌
    const get_Brand_Type = ( type : string ) => { set_BrandType( type ) } ;


    // -------------------------------------


    // 依據 _ 薪資類別，設定 _ 職位類別
    useEffect(( ) => {

      set_PositionType(salaryType === '正職' ? [ '櫃台' , '美容' , '接送' ] : [ '計時櫃台' , '計時美容' , '計時接送' , '計時人員' ] ) ;

    } ,[ salaryType ]) ;


    // 依據 _ 所屬品牌，設定 _ 所屬店別
    useEffect(( ) => {

       if( brandType ){

           dataBrand.forEach( x => {
               if( x['brand'] === brandType ) set_BrandShop( x['shop'] )
           }) ;

       }

    } , [ brandType ] ) ;



    // 設定 _ 隨機寵物編號 ( '新增'時，才設定 )
    useEffect(( ) => {

        if( current ){
          const randomId = `E_${ get_Today() }_${ get_RandomInt(1000) }` ;
          setValue( "employee_Serial" , randomId  ) ;          // 設定 input 欄位值
        }

    } , [] ) ;


    return <>
                { /* 帳號資料 */ }
                <label className="label" style={{ fontSize : "1.3em" }}> <i className="fas fa-file-invoice"></i> &nbsp; 帳號資料 </label> <br/>

                <div className="columns is-multiline is-mobile">

                    { /* 帳號類別 */ }
                    <div className="column is-2-desktop required">
                        <p> <span> 帳號類別 </span> <b style={{color: "red"}}> { errors.employee_Type?.message } </b> </p>
                        <div className="select">
                            <select { ...register( "employee_Type" ) }  onChange={ e => get_Employee_Type( e.target.value ) } >
                                <option value="請選擇">   請選擇   </option>
                                <option value="管理帳號"> 管理帳號 </option>
                                <option value="測試帳號"> 測試帳號 </option>
                                <option value="工作人員"> 工作人員 </option>
                            </select>
                        </div>
                    </div>

                    { /* 帳號 */ }
                    <Input type="text" name="employee_Account" label="帳 號" register={register} error={ errors.employee_Account } icon="fas fa-user-circle" asterisk={ true } columns="2" />

                    { /* 密碼 */ }
                    <Input type="text" name="employee_Password" label="密 碼" register={register} error={ errors.employee_Password } icon="fas fa-key" asterisk={ true } columns="2" />

                    { /* 暱稱 */ }
                    <Input type="text" name="employee_Nickname" label="暱稱 / 別名 " register={register} error={ errors.employee_Nickname } icon="fas fa-signature" asterisk={ false } columns="2" />

                    <div className="column is-4-desktop"></div>

                </div>

                 { accountType === '工作人員' &&

                    <>

                        <hr/>

                        { /* 帳號資料 */ }
                        <label className="label" style={{ fontSize : "1.3em" }}> <i className="fas fa-user"></i> &nbsp; 員工資料 </label> <br/>

                        { /* 員工 _ 個人資料 */ }
                        <div className="columns is-multiline is-mobile">

                            { /* 員工編號 */}
                            <div className= 'column is-2-desktop'  >
                                <p className="relative"> 員工編號  </p>
                                <input disabled={true} className="input" type='text' { ...register( 'employee_Serial' ) }    />
                            </div>

                            { /* 計薪類別 */ }
                            <div className="column is-2-desktop required">
                                <p> <span> 計薪類別 </span> <b style={{color: "red"}}>{errors.employee_Salary_Type?.message}</b> </p>
                                <div className="select" >
                                    <select { ...register( "employee_Salary_Type" ) } onChange={ e => get_Salary_Type( e.target.value ) } >
                                        <option value="正職"> 正職 </option>
                                        <option value="計時"> 計時 </option>
                                    </select>
                                </div>
                            </div>

                            { /* 職位類別 */ }
                            <div className="column is-2-desktop required">
                                <p> <span> 職位類別 </span> <b style={{color: "red"}}>{errors.employee_Position_Type?.message}</b> </p>
                                <div className="select">
                                    <select { ...register( "employee_Position_Type" ) } >

                                        {
                                          positionType.map( (x,y) => {
                                             return <option key={y} value={x}> {x} </option>
                                          })
                                        }

                                    </select>
                                </div>
                            </div>

                            { /* 現況 */ }
                            <div className="column is-2-desktop required">
                                <p> <span> 現 況 </span> <b style={{color: "red"}}>{errors.employee_Status?.message}</b> </p>
                                <div className="select">
                                    <select { ...register( "employee_Status" ) } >
                                        <option value="在職"> 在職 </option>
                                        <option value="離職"> 離職 </option>
                                    </select>
                                </div>
                            </div>

                            { /* 所屬品牌 */ }
                            <div className="column is-2-desktop">
                                <p> <span> 所屬品牌 </span> <b style={{color: "red"}}>{errors.employee_Shop?.message}</b> </p>
                                <div className="select">
                                    <select { ...register( "employee_Brand" ) } onChange={ e => get_Brand_Type( e.target.value ) } >
                                        {
                                            dataBrand.map( (x,y)=>{
                                                return   <option key={y} value={ x['brand'] }> { x['brand'] } </option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>

                            { /* 所屬店別 */ }
                            <div className="column is-2-desktop">
                                <p> <span> 所屬店別 </span> <b style={{color: "red"}}>{errors.employee_Shop?.message}</b> </p>
                                <div className="select">
                                    <select { ...register( "employee_Shop" ) } >
                                        {
                                            brandShop.map( ( x, y) => {
                                                return  <option key={y} value={x} > {x} </option>
                                            })
                                        }

                                    </select>
                                </div>
                            </div>


                            { /* 姓名 */}
                            <Input type="text" name="employee_Name" label="姓 名" register={register} error={ errors.employee_Name } icon="fas fa-user" asterisk={ true } columns="2" />

                            { /* 性別 */}
                            <div className="column is-2-desktop required">
                                <p> <span> 性 別 </span> <b style={{color: "red"}}>{errors.employee_Type?.message}</b> </p>
                                <div className="select">
                                    <select { ...register( "employee_Sex" ) }  onChange={ e => get_Employee_Type( e.target.value ) } >
                                        <option value="請選擇"> 請選擇 </option>
                                        <option value="男">   男   </option>
                                        <option value="女">   女   </option>
                                    </select>
                                </div>
                            </div>

                            { /* 身分證字號 */}
                            <Input type="text" name="employee_Id" label="身分證字號" register={register} error={ errors.employee_Id } icon="fas fa-id-card" asterisk={ true } columns="2" />

                            { /* 手機號碼 */}
                            <Input type="text" name="employee_MobilePhone" label="手機號碼" register={register} error={ errors.employee_MobilePhone } icon="fas fa-mobile-alt" asterisk={ true } columns="2" />

                            { /* 家用電話 */}
                            <Input type="text" name="employee_TelPhone" label="家用電話" register={register} error={ errors.employee_TelPhone } icon="fas fa-phone" asterisk={ false } columns="2" />

                            { /* 出生年月日 */}
                            <div className="column is-2-desktop">
                                <p><span> 出生年月日 </span></p>
                                <Date_Picker control      = { control }
                                             name         = "employee_Birthday"
                                             default_Date = { new Date } />
                            </div>

                            { /* Line ID */}
                            <Input type="text" name="employee_Line" label=" Line ID" register={register} error={ errors.employee_Line } icon="fab fa-line" asterisk={false} columns="4" />

                            { /* Email */}
                            <Input type="text" name="employee_Email" label="Email" register={register} error={ errors.employee_Email } icon="fas fa-envelope" asterisk={false} columns="4" />

                            { /* 交通工具 */}
                            <Input type="text" name="employee_Transportation" label="交通工具" register={register} error={ errors.employee_Transportation } icon="fas fa-motorcycle" asterisk={false} columns="4" />

                            { /* 通訊地址 */}
                            <Input type="text" name="employee_Current_Address" label="通訊地址" register={register} error={ errors.employee_Current_Address } icon="fas fa-home" asterisk={true} columns="6" />

                            { /* 戶籍地址 */}
                            <Input type="text" name="employee_Permanent_Address" label="戶籍地址" register={register} error={ errors.employee_Permanent_Address } icon="fas fa-home" asterisk={false} columns="6" />

                        </div>

                        <br/>

                        { /* 員工 _ 緊急連絡人資料  */ }

                        { /* 帳號資料 */ }
                        <label className="label" style={{ fontSize : "1.3em" }}> <i className="fas fa-user"></i> &nbsp; 緊急連絡人資料 </label> <br/>

                        { /* 緊急連絡人 _ 1 */ }
                        <div className="columns is-multiline  is-mobile">

                            <Input type="text" name="employee_Relative_Name_1" label="姓 名" register={register} error={ errors.customer_Relative_Name_1 } icon="fas fa-user" asterisk={true} columns="2" />

                            <div className="column is-2-desktop required">
                                <p> 關 係 &nbsp; <b style={{color:"red"}}> { errors.employee_Relative_Family_1?.message } </b> </p>
                                <div className="select">
                                    <select { ...register( "employee_Relative_Family_1" ) }  >
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

                            <Input type="text" name="employee_Relative_Cellphone_1" label="手機號碼" register={ register } error={ errors.employee_Relative_Cellphone_1 } icon="fas fa-mobile-alt" asterisk={true}  columns="2" />
                            <Input type="text" name="employee_Relative_Telephone_1" label="家用電話" register={ register } error={ errors.employee_Relative_Telephone_1 } icon="fas fa-phone"      asterisk={false} columns="2" />
                            <Input type="text" name="employee_Relative_Address_1"   label="通訊地址" register={ register } error={ errors.employee_Relative_Address_1 }   icon="fas fa-home"       asterisk={false} columns="4" />

                        </div>

                        { /* 緊急連絡人 _ 2 */ }
                        <div className="columns is-multiline  is-mobile">

                            <Input type="text" name="employee_Relative_Name_2" label="姓 名" register={register} error={ errors.customer_Relative_Name_2 } icon="fas fa-user" asterisk={false} columns="2" />

                            <div className="column is-2-desktop">
                                <p> 關 係 &nbsp; <b style={{color:"red"}}> { errors.employee_Relative_Family_2?.message } </b> </p>
                                <div className="select">
                                    <select { ...register( "employee_Relative_Family_2" ) }  >
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

                            <Input type="text" name="employee_Relative_Cellphone_2" label="手機號碼" register={ register } error={ errors.employee_Relative_Cellphone_2 } icon="fas fa-mobile-alt" asterisk={false}  columns="2" />
                            <Input type="text" name="employee_Relative_Telephone_2" label="家用電話" register={ register } error={ errors.employee_Relative_Telephone_2 } icon="fas fa-phone"      asterisk={false} columns="2" />
                            <Input type="text" name="employee_Relative_Address_2"   label="通訊地址" register={ register } error={ errors.employee_Relative_Address_2 }   icon="fas fa-home"       asterisk={false} columns="4" />

                        </div>

                        { /* 緊急連絡人 _ 3 */ }
                        <div className="columns is-multiline  is-mobile">

                            <Input type="text" name="employee_Relative_Name_3" label="姓 名" register={register} error={ errors.customer_Relative_Name_3 } icon="fas fa-user" asterisk={false} columns="2" />

                            <div className="column is-2-desktop">
                                <p> 關 係 &nbsp; <b style={{color:"red"}}> { errors.employee_Relative_Family_2?.message } </b> </p>
                                <div className="select">
                                    <select { ...register( "employee_Relative_Family_3" ) }  >
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

                            <Input type="text" name="employee_Relative_Cellphone_3" label="手機號碼" register={ register } error={ errors.employee_Relative_Cellphone_3 } icon="fas fa-mobile-alt" asterisk={false}  columns="2" />
                            <Input type="text" name="employee_Relative_Telephone_3" label="家用電話" register={ register } error={ errors.employee_Relative_Telephone_3 } icon="fas fa-phone"      asterisk={false} columns="2" />
                            <Input type="text" name="employee_Relative_Address_3"   label="通訊地址" register={ register } error={ errors.employee_Relative_Address_3 }   icon="fas fa-home"       asterisk={false} columns="4" />

                        </div>

                    </>

                 }

           </>

} ;

export default React.memo( Create_Employee , () => true )
