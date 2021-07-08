
import React, {useContext} from "react"

// React Hook Form
import { useForm , SubmitHandler} from "react-hook-form";

// 各表單驗證條件
import {schema_Customer} from "utils/validator/form_validator"
import {IPet} from "utils/Interface_Type";
import {yupResolver} from "@hookform/resolvers/yup";

// useContext
import { SidePanelContext } from "templates/panel/Side_Panel";

import Pet_Form from "components/pets/edit/Pet_Form";



{ /*  編輯寵物  */ }
const Update_Pet = ( ) => {

    const value = useContext( SidePanelContext ) ;  // 取得 context 值
    const pet   = value.preLoadData ? value.preLoadData : { } ;

    // React Hook Form
    const { register , setValue , handleSubmit , formState: { errors , isDirty , isValid } } =
        useForm<IPet>({
            mode          : "all" ,
            resolver      : yupResolver( schema_Customer ) ,
            defaultValues : {

                                // # 寵物資料
                                pet_Serial         : pet.serial ,
                                pet_Name           : pet.name ,
                                pet_Species        : pet.species ,
                                pet_Sex            : pet.sex ,
                                pet_Color          : pet.color ,
                                pet_Weight         : pet.weight ,
                                pet_Age            : pet.age ,

                                // * 調查資料 ( 單選 )
                                injection          : pet.injection ,
                                flea               : pet.flea ,
                                ligate             : pet.ligate ,
                                chip               : pet.chip ,
                                infection          : pet.infection ,
                                together           : pet.together ,
                                drug               : pet.drug ,
                                bite               : pet.bite ,

                                // * 調查資料 ( 複選 : 轉為陣列 )
                                health             : pet.health ? pet.health.split(',') : [] ,
                                feed               : pet.feed ? pet.feed.split(',') : [] ,
                                toilet             : pet.toilet ? pet.toilet.split(',') : [] ,
                                ownerProvide       : pet.ownerProvide ? pet.ownerProvide.split(',') : [] ,

                                pet_Note           : pet.note ,

                             }
        }) ;

    const props = {

        register : register ,
        setValue : setValue ,
        errors   : errors ,

    } ;

    // 提交表單
    const onSubmit : SubmitHandler<IPet> = data => {

        console.log( data ) ;

    };

    return <form onSubmit = { handleSubmit( onSubmit ) }>

              { /* 寵物表單欄位  */ }
              <Pet_Form  {...props}  />

              { /* 提交按鈕 */ }
              <div className="has-text-centered" >
                  <button disabled={ !isDirty || !isValid } type="submit" className="button is-primary relative is-medium" style={{top: "-10px"}} >
                       提交表單
                  </button>
              </div> <br/><br/>

           </form>

} ;

export default Update_Pet