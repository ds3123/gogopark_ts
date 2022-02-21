
import React, {useContext} from "react"

// React Hook Form
import { useForm , SubmitHandler} from "react-hook-form";

// 各表單驗證條件
import { schema_Pet } from "utils/validator/form_validator"
import { IPet } from "utils/Interface_Type";
import { yupResolver } from "@hookform/resolvers/yup";

// useContext
import { SidePanelContext } from "templates/panel/Side_Panel";

import Pet_Form from "components/pets/edit/Pet_Form";
import {useRead_Species} from "hooks/ajax_crud/useAjax_Read";


// Hook
import { useUpdate_Data } from "hooks/ajax_crud/useAjax_Update";


{ /*  編輯寵物  */ }
const Update_Pet = ( ) => {


    const value = useContext( SidePanelContext ) ;  // 取得 context 值
    const pet   = value.preLoadData ? value.preLoadData : { } ;

    // 取得 _ 所有寵物品種資料
    const petSpecies = useRead_Species() ;

    // 將 "寵物品種名稱" ，改為 : "寵物品種 pet_species 資料表 id"
    const _pet = petSpecies.filter( x => x['name'] === pet['species'] )[0] ;

    // React Hook Form
    const { register , watch , setValue , handleSubmit , formState: { errors , isDirty , isValid } } =
                useForm<IPet>({
                    mode          : "all" ,
                    resolver      : yupResolver( schema_Pet ) ,
                    defaultValues : {

                                        // # NOTE "品種" ( pet_Species ) 預設值，於 Pet_Form 設定 ( 因其由 Ajax 取得資料 )

                                        // # 寵物資料
                                        pet_Serial   : pet.serial ,
                                        pet_Name     : pet.name ,
                                        // pet_Specie: _pet ? _pet['id'] : '' ,
                                        pet_Sex      : pet.sex ,
                                        pet_Color    : pet.color ,
                                        pet_Weight   : pet.weight ,
                                        pet_Size     : pet.size ,
                                        pet_Age      : pet.age ,

                                        // * 調查資料 ( 單選 )
                                        injection    : pet.injection ,
                                        flea         : pet.flea ,
                                        ligate       : pet.ligate ,
                                        chip         : pet.chip ,
                                        infection    : pet.infection ,
                                        together     : pet.together ,
                                        drug         : pet.drug ,
                                        bite         : pet.bite ,

                                        // * 調查資料 ( 複選 : 轉為陣列 )
                                        health       : pet.health ? pet.health.split(',') : [] ,
                                        feed         : pet.feed ? pet.feed.split(',') : [] ,
                                        toilet       : pet.toilet ? pet.toilet.split(',') : [] ,
                                        ownerProvide : pet.ownerProvide ? pet.ownerProvide.split(',') : [] ,

                                        pet_Note     : pet.note ,

                                    }
                }) ;


    const props = {

        register : register ,
        setValue : setValue ,
        errors   : errors ,
        watch    : watch ,

        pet_Serial     : pet.serial ,             // 寵物編號  
        pet_Species_id : _pet ? _pet['id'] : ''   // 寵物資料表( pet_species ) id

    } ;


    const update_Data = useUpdate_Data( ) ;


    // 提交表單
    const onSubmit : SubmitHandler< IPet > = data => {

        // 將 "寵物品種 pet_species 資料表 id" ，改為 : "寵物品種名稱"  
        const mPet       = petSpecies.filter( x => x['id'] ===  parseInt( data.pet_Species ) )[0] as any ;  // 篩選出該寵物
        data.pet_Species =  mPet.name ;    // 將品種資料表 id ， 改為 : "寵物品種名稱"  

        // 更新 _ 寵物
        update_Data( "/pets" , data.pet_Serial , data , "/pets" , "寵物" ) ;
        

    } ;

    return <form onSubmit = { handleSubmit( onSubmit ) }>

              { /* 寵物表單欄位  */ }
              <Pet_Form  {...props}  />

              { /* 提交按鈕 */ }
              <div className="has-text-centered" >
                  <button disabled={ !isValid } type="submit" className="button is-primary relative is-medium" style={{top: "-10px"}} >
                       提交表單
                  </button>
              </div> <br/><br/>

           </form>

} ;

export default Update_Pet