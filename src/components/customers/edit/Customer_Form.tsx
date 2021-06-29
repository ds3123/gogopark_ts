
import React, {FC, useEffect, useState} from "react"
import {Input} from "templates/form/Input";
import { Edit_Form_Type } from "utils/Interface_Type"
import { useRead_Customer_By_Column } from "hooks/ajax_crud/useAjax_Read"

import useSection_Folding from "hooks/layout/useSection_Folding";


// Redux
import { useDispatch } from "react-redux";
import { get_Current_Customer_Pets , set_IsExisting_Customer } from "store/actions/action_Customer";

import { get_Today } from "utils/time/date";
import { get_RandomInt } from "utils/number/number";



{ /*  客戶表單欄位  */ }
const Customer_Form : FC<Edit_Form_Type> = ( { register , setValue , errors } ) => {

    const dispatch = useDispatch() ;

    // 收折區塊
    const { is_folding , Folding_Bt } = useSection_Folding() ;

    // 是否已開始查詢 : 身分證字號、姓名、手機號碼
    const [ isQuerying , set_IsQuerying ] = useState( false ) ;

    // 查詢 _ 欄位
    const [ query , set_Query ] = useState({
                                                       customer_Id        : '' , // 身分證字號
                                                       customer_Name      : '' , // 姓名
                                                       customer_Cellphone : ''   // 手機號碼
                                                     }) ;

    // # 以特定欄位，查詢 _ 客戶資料表 ( 是否有該客戶 )
    const { data : query_Result_Id }        = useRead_Customer_By_Column('id'           , query['customer_Id'] ) ;        // 身分證字號
    const { data : query_Result_Name }      = useRead_Customer_By_Column('name'         , query['customer_Name']  ) ;     // 姓名
    const { data : query_Result_CellPhone } = useRead_Customer_By_Column('mobile_phone' , query['customer_Cellphone'] ) ; // 手機號碼

    // 欄位變動處理 : 身分證字號、姓名、手機號碼
    const handle_Change = ( e : any ) => {

        // 設定 _ state
        const { name , value } = e.target ;
        set_Query( { ...query , [name] : value } ) ;

        // 設定 _ 是否正在查詢 : 身分證字號、姓名、手機號碼
        if( name === 'customer_Id' ||  name === 'customer_Id' ||  name === 'customer_Id' ) set_IsQuerying(true ) ;
        if( name && !value ) set_IsQuerying(false ) ;

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

        // 客戶 _ 關係人 ( 先設定 _ 僅有 1 個關係人，之後再確認  2021.06.12 )
        if( data['customer_relation'].length === 1 ){

            const relative = data['customer_relation'][0] ;

            setValue( "customer_Relative_Name"      , relative['name']         , { shouldValidate: true , shouldDirty: true } ) ;
            setValue( "customer_Relative_Type"      , relative['type']         , { shouldValidate: true , shouldDirty: true } ) ;
            setValue( "customer_Relative_Family"    , relative['tag']          , { shouldValidate: true , shouldDirty: true } ) ;
            setValue( "customer_Relative_Cellphone" , relative['mobile_phone'] , { shouldValidate: true , shouldDirty: true } ) ;
            setValue( "customer_Relative_Telephone" , relative['tel_phone']    , { shouldValidate: true , shouldDirty: true } ) ;

        }

    } ;

    // 設定 _ 隨機身分證字號
    const set_Random_Id = ( ) => {

        const randomId = `C_${ get_Today() }_${ get_RandomInt(100) }` ;
        setValue( "customer_Id" , randomId , { shouldValidate: true  } ) ;


    } ;

    useEffect(( ) => {

      // * 檢查 _ 資料庫中是否有該客戶紀錄( for 提交表單時，是否要新增該客戶 )
      if( query_Result_Id.length > 0 || query_Result_Name.length > 0 || query_Result_CellPhone.length > 0 ){
          dispatch( set_IsExisting_Customer(true)  ) ;
      }else{
          dispatch( set_IsExisting_Customer(false )) ;
      }


    } , [ query_Result_Id , query_Result_Name , query_Result_CellPhone ] ) ;


    return <>

                { /* 標題 */ }
                <label className="label relative" style={{ fontSize : "1.3em"  }} >

                    <i className="fas fa-user"></i> &nbsp; 客戶資料 &nbsp;

                    { Folding_Bt } { /* 收折鈕 */ }

                    { /* 有符合 _ 身分證字號  */ }
                    <div className="absolute" style={{ width: "80%", height:"40px" ,left : "140px" , top:"-5px" , overflowY:"hidden" }}>

                        { /* 顯示查詢結果 _ 身分證字號 */ }
                        {
                            query_Result_Id.length > 0 &&

                            query_Result_Id.map(( x , v) => {

                                return <span key={ v } >
                                          <b className="tag is-medium hover is-light" onClick={ ( ) => set_Cus_Data( x ) }> { x['name'] } ( { x['mobile_phone'] } )  </b> &nbsp;
                                       </span> ;

                            })

                        }

                        { /* 顯示查詢結果 _ 姓名 */ }
                        {
                            query_Result_Name.length > 0 &&

                            query_Result_Name.map(( x , v) => {

                                return <span key={ v } >
                                          <b className="tag is-medium hover is-light" onClick={ ( ) => set_Cus_Data( x ) }> { x['name'] } ( { x['mobile_phone'] } )  </b> &nbsp;
                                       </span> ;

                            })

                        }

                        { /* 顯示查詢結果 _ 手機號碼 */ }

                        {
                            query_Result_CellPhone.length > 0 &&

                            query_Result_CellPhone.map(( x , v) => {

                                return <span key={ v } >
                                          <b className="tag is-medium hover is-light" onClick={ ( ) => set_Cus_Data( x ) }> { x['name'] } ( { x['mobile_phone'] } )  </b> &nbsp;
                                       </span> ;

                            })

                        }


                    </div>

                    { /* 顯示 : 新客戶 */ }
                    { ( isQuerying && query_Result_Id.length === 0 && query_Result_Name.length === 0 &&  query_Result_CellPhone.length === 0 ) && <b style={{color:"red"}}>新客戶</b> }

                </label> <br/>

                { /* 是否收折 : 客戶資料 */ }
                { is_folding ||

                   <>

                     <div className="columns is-multiline  is-mobile relative">

                        {/* <b className="tag is-light is-medium is-success absolute pointer"  */}
                        {/*    style={ iStyle }                                                */}
                        {/*    onClick = { () => set_Random_Id() }  >                          */}
                        {/*  產 生 </b> */}

                        <Input type="text" name="customer_Id"        label="身分證字號" register={register} error={errors.customer_Id}        icon="fas fa-id-card-alt" asterisk={true} columns="3" onChange={handle_Change} />
                        <Input type="text" name="customer_Name"      label="姓 名"      register={register} error={errors.customer_Name}      icon="fas fa-user" asterisk={true} columns="3" onChange={handle_Change} />
                        <Input type="text" name="customer_Cellphone" label="手機號碼"   register={register} error={errors.customer_Cellphone} icon="fas fa-mobile-alt" asterisk={true} columns="3" onChange={handle_Change}/>
                        <Input type="text" name="customer_Telephone" label="家用電話"   register={register} error={errors.customer_Telephone} icon="fas fa-phone" asterisk={false} columns="3" />
                        <Input type="text" name="customer_Line"      label="Line ID"   register={register} error={errors.customer_Line}      icon="fab fa-line" asterisk={false} columns="3" />
                        <Input type="text" name="customer_Email"     label="E-mail"    register={register} error={errors.customer_Email}     icon="fas fa-envelope-open-text" asterisk={false} columns="3" />
                        <Input type="text" name="customer_Address"   label="通訊地址"   register={register} error={errors.customer_Address}   icon="fas fa-home" asterisk={false} columns="6" />

                     </div> <br/>

                     { /* 客戶欄位 */}
                     <label className="label" style={{ fontSize : "1.3em" }} >

                        <i className="fas fa-users"></i> &nbsp; 關係人
                        { /* <b className="tag is-medium is-success is-light hover" > 新 增 </b> */}

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

                     <br/>

                   </>

                }

           </>

} ;

export default Customer_Form
