
import React, {useContext, useEffect, useState} from "react"
import {SubmitHandler, useForm} from "react-hook-form";
import {IService_Price} from "utils/Interface_Type";
import {yupResolver} from "@hookform/resolvers/yup";
import {schema_Price} from "utils/validator/form_validator";

import Price_Form from "components/prices/edit/Price_Form" ;
import {useUpdate_Data} from "hooks/ajax_crud/useAjax_Update";
import {SidePanelContext} from "templates/panel/Side_Panel";
import {useRead_Species} from "hooks/ajax_crud/useAjax_Read";


const Update_Price = ( ) => {


    const value                      = useContext( SidePanelContext ) ;  // 取得 context 值
    const data                       = value.preLoadData ;               // 預載資料

    const [ data_Id , set_Data_Id ]  = useState('' ) ;         // 資料表 id


    // React Hook Form
    const { register , control , setValue , handleSubmit , formState: { errors , isDirty , isValid } } =
        useForm<IService_Price>({

            mode          : "all" ,
            resolver      : yupResolver( schema_Price ) ,
            defaultValues : {

                               // # NOTE "指定品種" ( price_Species_Id ) 預設值，於 Price_Form 設定 ( 因其由 Ajax 取得資料 )
                               price_Type   : data['service_type'] ,
                               price_Plan   : data['service_plan'] ,
                               price_Item   : data['service_name'] ,
                               price_Amount : data['service_price'] ,
                               price_Note   : data['note'] ,

                            }

        }) ;

    const props = {

                    register : register ,
                    setValue : setValue ,
                    errors   : errors ,
                    isDirty  : isDirty ,
                    isValid  : isValid ,

                    species_Id : data['species_id']  // 寵物品種資料表(pet_species) id

                   } ;


    // 更新函式
    const update_Data = useUpdate_Data() ;

    // 提交表單
    const onSubmit : SubmitHandler<IService_Price> = ( data : any ) => {

        // 更新 _ 客戶
        update_Data( "/service_prices" , data_Id , data , "/management" , "服務價格" ) ;

    } ;

    // 設定 _ 資料表 id
    useEffect(( ) => {

        set_Data_Id( data['id'] ) ;   // 資料表 id

    } ,[]);


    return <form onSubmit = { handleSubmit( onSubmit ) } >

                { /* 標題 */ }
                <label className="label relative" style={{ fontSize : "1.3em"  }} >
                    <i className="fas fa-dollar-sign"></i> &nbsp;價格資料 &nbsp;
                </label> <br/>

                <Price_Form  {...props}  />

                <br/><br/><br/>

                { /* 提交按鈕 */ }
                <div className="has-text-centered" >
                    <button disabled={ !isValid } type="submit" className="button is-primary relative is-medium" style={{top: "-10px"}} >
                        提交表單
                    </button>
                </div> <br/><br/>

             </form>

} ;

export default Update_Price