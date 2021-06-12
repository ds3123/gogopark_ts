
import React, {FC, useEffect, useState} from "react"
import {Input} from "templates/form/Input";

import { Edit_Form_Type } from "utils/Interface_Type"
import { useRead_Customer_By_Column } from "hooks/ajax_crud/useAjax_Read"

// Redux
import {useDispatch} from "react-redux";
import { set_IsExisting_Customer , get_Current_Customer_Pets } from "store/actions/action_Customer";


import { get_Today } from "utils/time/date";
import { get_RandomInt } from "utils/number/number";


import{ useRead_Customer_Pets } from "hooks/ajax_crud/useAjax_Read"



{ /*  客戶表單欄位  */ }
const Customer_Form : FC<Edit_Form_Type> = ( { register , setValue , errors } ) => {

    const dispatch = useDispatch() ;

    const [ value , set_Value ] = useState({
                                                        customer_Id        : "" ,  // 身分證字號
                                                        customer_Name      : "" ,  // 姓名
                                                        customer_Cellphone : ""    // 手機號碼
                                                      }) ;

    // 查詢資料 _ 依照 : 身分證字號、姓名、手機號碼
    const query_By_Id        = useRead_Customer_By_Column('id'   , value['customer_Id'] ) ;
    const query_By_Name      = useRead_Customer_By_Column('name' , value['customer_Name'] ) ;
    const query_By_CellPhone = useRead_Customer_By_Column('mobile_phone' , value['customer_Cellphone'] ) ;


    // 變動處理
    const handle_Change = ( e : any ) => {

       const { name , value } = e.target ;
        set_Value( { ...value , [name] : value } ) ;

        dispatch( set_IsExisting_Customer( false ) );

    } ;



    // 點選 _ 帶入舊客戶資料
    const set_Cus_Data = ( data : any ) => {

        // 設定 _ 客戶單，目前所填入客戶 _ 所有寵物 ( for 寵物表單，查詢客戶寵物用 )
        dispatch( get_Current_Customer_Pets( data['id']) ) ;


        // 客戶
        setValue( "customer_Id"        , data['id']           , { shouldValidate: true , shouldDirty: true } ) ;
        setValue( "customer_Name"      , data['name']         , { shouldValidate: true , shouldDirty: true } ) ;
        setValue( "customer_Cellphone" , data['mobile_phone'] , { shouldValidate: true , shouldDirty: true } ) ;
        setValue( "customer_Telephone" , data['tel_phone']    , { shouldValidate: true , shouldDirty: true } ) ;
        setValue( "customer_Line"      , data['line']         , { shouldValidate: true , shouldDirty: true } ) ;
        setValue( "customer_Email"     , data['email']        , { shouldValidate: true , shouldDirty: true } ) ;
        setValue( "customer_Address"   , data['address']      , { shouldValidate: true , shouldDirty: true } ) ;

        // 客戶 _ 關係人 ( 先設定 _ 僅有 1 個關係人，之後再確認  2021.06.12)
        if( data['customer_relation'].length === 1 ){

            const relative = data['customer_relation'][0] ;

            setValue( "customer_Relative_Name" , relative['name'] , { shouldValidate: true , shouldDirty: true } ) ;
            setValue( "customer_Relative_Type" , relative['type'] , { shouldValidate: true , shouldDirty: true } ) ;
            setValue( "customer_Relative_Family" , relative['tag'] , { shouldValidate: true , shouldDirty: true } ) ;
            setValue( "customer_Relative_Cellphone" , relative['mobile_phone'] , { shouldValidate: true , shouldDirty: true } ) ;
            setValue( "customer_Relative_Telephone" , relative['tel_phone'] , { shouldValidate: true , shouldDirty: true } ) ;

        }

    } ;

    // 設定 _ 隨機身分證字號
    const set_Random_Id = ( ) => {

        const randomId = `C_${ get_Today() }_${ get_RandomInt(100) }` ;
        setValue( "customer_Id" , randomId , { shouldValidate: true  } ) ;




    } ;

    useEffect(( ) => {

        dispatch( set_IsExisting_Customer( false ) );

       if( query_By_Id.length > 0 ){
         dispatch( set_IsExisting_Customer( true ) );
       }

    } ,[ query_By_Id ]) ;


    const iStyle = { left: "195px" , top :"4px" , zIndex:"3000" } as any ;

    return <>

                { /* 客戶訊息 */ }
                <label className="label relative" style={{ fontSize : "1.3em" }} >

                    <i className="fas fa-user"></i> &nbsp; 客戶資訊 &nbsp;

                    { /* 有符合 _ 身分證字號  */ }
                    <div className="absolute" style={{ left : "140px" , top:"-5px" }}>
                        {
                          value["customer_Id"] && query_By_Id.length > 0 &&

                            query_By_Id.map(( x , v) => {

                                return <span key={ v } >
                                          <b className="tag is-medium hover is-light" onClick={ ( ) => set_Cus_Data( x ) }> { x['name'] } ( { x['mobile_phone'] } )  </b> &nbsp;
                                       </span> ;

                            })

                        }
                    </div>

                    { /* 顯示 : 新客戶 */ }
                    { ( value["customer_Id"] && query_By_Id.length === 0 ) && <b style={{color:"red"}}>新客戶</b> }

                </label>

                <div className="columns is-multiline  is-mobile relative">

                    {/*<b className="tag is-light is-medium is-success absolute pointer"*/}
                    {/*   style={ iStyle }*/}
                    {/*   onClick = { () => set_Random_Id() }*/}
                    {/*> 產 生 </b>*/}

                    <Input type="text" name="customer_Id"        label="身分證字號" register={register} error={ errors.customer_Id }        icon="fas fa-id-card-alt" asterisk={true} columns="3" onChange={ handle_Change } />
                    <Input type="text" name="customer_Name"      label="姓 名"      register={register} error={ errors.customer_Name }      icon="fas fa-user" asterisk={true} columns="3" onChange={ handle_Change } />
                    <Input type="text" name="customer_Cellphone" label="手機號碼"   register={register} error={ errors.customer_Cellphone } icon="fas fa-mobile-alt" asterisk={true} columns="3" onChange={ handle_Change }/>
                    <Input type="text" name="customer_Telephone" label="家用電話"   register={register} error={ errors.customer_Telephone } icon="fas fa-phone" asterisk={false} columns="3" />
                    <Input type="text" name="customer_Line"      label="Line ID"   register={register} error={ errors.customer_Line }      icon="fab fa-line" asterisk={false} columns="3" />
                    <Input type="text" name="customer_Email"     label="E-mail"    register={register} error={ errors.customer_Email }     icon="fas fa-envelope-open-text" asterisk={false} columns="3" />
                    <Input type="text" name="customer_Address"   label="通訊地址"   register={register} error={ errors.customer_Address }   icon="fas fa-home" asterisk={false} columns="6" />

                </div> <br/>

                { /* 客戶欄位 */ }
                <label className="label" style={{ fontSize : "1.3em" }} >

                    <i className="fas fa-users"></i> &nbsp; 關係人
                    { /* <b className="tag is-medium is-success is-light hover" > 新 增 </b> */ }

                </label>

                { /* 關係人欄位 */ }
                <div className="columns is-multiline  is-mobile">

                    <Input type="text" name="customer_Relative_Name" label="姓 名" register={register} error={ errors.customer_Relative_Name } icon="fas fa-user" asterisk={true} columns="3" />

                    <div className="column is-2-desktop required">

                        <p> 類 型 &nbsp; <b style={{color:"red"}}> { errors.customer_Relative_Type?.message } </b> </p>
                        <div className="select">
                            <select { ...register( "customer_Relative_Type" ) }  >
                                <option value="緊急連絡人">緊急連絡人</option>
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

export default Customer_Form
