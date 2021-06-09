import React, {FC} from "react"

import { Edit_Form_Type } from "utils/Interface_Type"
import {Input} from "../../../templates/form/Input";



{ /* 寵物表單欄位  */ }
const Pet_Form : FC<Edit_Form_Type> = ( { register , errors } ) => {


   return <>

               { /* 寵物基本資料 */ }
               <label className="label" style={{ fontSize : "1.3em" }}>
                   <i className="fas fa-dog"></i> &nbsp; 寵物資料  &nbsp;
               </label>

               <div className="columns is-multiline  is-mobile">

                   <Input type="text" name="pet_Serial" label="編 號" register={register} error={errors.pet_Serial} icon="fas fa-list-ol" asterisk={true} columns="3" />
                   <Input type="text" name="pet_Name"   label="名 字" register={register} error={errors.pet_Name}   icon="fas fa-paw"     asterisk={true} columns="3" />

                   <div className="column is-3-desktop required">
                       <p> 品 種 &nbsp; <b style={{color:"red"}}> { errors.pet_Species?.message } </b> </p>
                       <div className="select">
                           <select { ...register( "pet_Species" ) }  >
                               <option value="請選擇">請選擇</option>
                           </select>
                       </div>
                   </div>

                   <div className="column is-3-desktop required">
                       <p> 性 別 &nbsp; <b style={{color:"red"}}> { errors.pet_Sex?.message } </b> </p>
                       <div className="select">
                           <select { ...register( "pet_Sex" ) }  >
                               <option value="請選擇">請選擇</option>
                               <option value="公">公</option>
                               <option value="母">母</option>
                           </select>
                       </div>
                   </div>

                   <Input type="text" name="pet_Color" label="毛 色" register={register} error={ errors.pet_Color } icon="fas fa-eye-dropper" asterisk={true} columns="3"/>
                   <Input type="text" name="pet_Weight" label="體 重 (kg)" register={register} error={ errors.pet_Weight } icon="fas fa-weight" asterisk={true} columns="3"/>
                   <Input type="text" name="pet_Age" label="年 紀 (歲)" register={register} error={ errors.pet_Age } icon="fas fa-pager" asterisk={true} columns="3"/>

               </div>

               <br/>

               { /* Radio 單選 */ }
               <div className="columns is-multiline  is-mobile" >

                   <div className="column is-6-desktop required">
                       <b> 每年預防注射 : </b> &nbsp;
                       <input type="radio" value = "有"     { ...register( "injection" ) } /> 有    &nbsp; &nbsp;
                       <input type="radio" value = "無"     { ...register( "injection" ) } /> 無    &nbsp; &nbsp;
                       <input type="radio" value = "不確定" { ...register( "injection" ) } /> 不確定
                   </div>

                   <div className="column is-6-desktop required">
                       <b> 滴除蚤 : </b> &nbsp;
                       <input type="radio" value = "有"     { ...register( "flea" ) } /> 有    &nbsp; &nbsp;
                       <input type="radio" value = "無"     { ...register( "flea" ) } /> 無    &nbsp; &nbsp;
                       <input type="radio" value = "代送獸醫除蚤" { ...register( "flea" ) } /> 代送獸醫除蚤 &nbsp; &nbsp;
                       <input type="radio" value = "不確定" { ...register( "flea" ) } /> 不確定
                   </div>

                   <div className="column is-6-desktop required">
                       <b> 結 紮 : </b> &nbsp;
                       <input type="radio" value = "有"     { ...register( "ligate" ) } /> 有     &nbsp; &nbsp;
                       <input type="radio" value = "無"     { ...register( "ligate" ) } /> 無     &nbsp; &nbsp;
                       <input type="radio" value = "發情中" { ...register( "ligate" ) } /> 發情中 &nbsp; &nbsp;
                       <input type="radio" value = "不確定" { ...register( "ligate" ) } /> 不確定
                   </div>

                   <div className="column is-6-desktop required">
                       <b> 晶 片 : </b> &nbsp;
                       <input type="radio" value = "有"     { ...register( "chip" ) } /> 有    &nbsp; &nbsp;
                       <input type="radio" value = "無"     { ...register( "chip" ) } /> 無    &nbsp; &nbsp;
                       <input type="radio" value = "不確定" { ...register( "chip" ) } /> 不確定
                   </div>

                   <div className="column is-6-desktop required">
                       <b> 傳染病 : </b> &nbsp;
                       <input type="radio" value = "有"     { ...register( "infection" ) } /> 有    &nbsp; &nbsp;
                       <input type="radio" value = "無"     { ...register( "infection" ) } /> 無    &nbsp; &nbsp;
                       <input type="radio" value = "不確定" { ...register( "infection" ) } /> 不確定
                   </div>

                   <div className="column is-6-desktop required">
                       <b> 與其他狗共處 : </b> &nbsp;
                       <input type="radio" value = "可"     { ...register( "together" ) } /> 可    &nbsp; &nbsp;
                       <input type="radio" value = "否"     { ...register( "together" ) } /> 否    &nbsp; &nbsp;
                       <input type="radio" value = "不確定" { ...register( "together" ) } /> 不確定
                   </div>

                   <div className="column is-6-desktop required">
                       <b> 服藥中 : </b> &nbsp;
                       <input type="radio" value = "是"     { ...register( "drug" ) } /> 是    &nbsp; &nbsp;
                       <input type="radio" value = "否"     { ...register( "drug" ) } /> 否    &nbsp; &nbsp;
                       <input type="radio" value = "不確定" { ...register( "drug" ) } /> 不確定
                   </div>

                   <div className="column is-6-desktop required">
                       <b> 咬 人 : </b> &nbsp;
                       <input type="radio" value = "會"     { ...register( "bite" ) } /> 會    &nbsp; &nbsp;
                       <input type="radio" value = "不會"   { ...register( "bite" ) } /> 不會  &nbsp; &nbsp;
                       <input type="radio" value = "不一定" { ...register( "bite" ) } /> 不一定，須小心  &nbsp; &nbsp;
                       <input type="radio" value = "不確定" { ...register( "bite" ) } /> 不確定
                   </div>

               </div>

               <b style={{ color : "rgb(0,0,150)" }}> * 以下選項可複選 --- </b>

               { /* Checkbox 單選、備註 */ }
               <div className="columns is-multiline is-mobile" >

                   <div className="column is-6-desktop required">
                       <b> 健 康 : </b> &nbsp;
                       <input type="checkbox" value = "良好" { ...register( "health" ) } /> 良好 &nbsp; &nbsp;
                       <input type="checkbox" value = "關節" { ...register( "health" ) } /> 關節 &nbsp; &nbsp;
                       <input type="checkbox" value = "皮膚" { ...register( "health" ) } /> 皮膚 &nbsp; &nbsp;
                       <input type="checkbox" value = "過敏" { ...register( "health" ) } /> 過敏 &nbsp; &nbsp;
                       <input type="checkbox" value = "其他" { ...register( "health" ) } /> 其他 &nbsp; &nbsp;
                   </div>

                   <div className="column is-6-desktop required">
                       <b> 餵食方式 : </b> &nbsp;
                       <input type="checkbox" value = "飼料" { ...register( "feed" ) } /> 飼料 &nbsp; &nbsp;
                       <input type="checkbox" value = "罐頭" { ...register( "feed" ) } /> 罐頭 &nbsp; &nbsp;
                       <input type="checkbox" value = "鮮食" { ...register( "feed" ) } /> 鮮食 &nbsp; &nbsp;
                       <input type="checkbox" value = "其他" { ...register( "feed" ) } /> 其他 &nbsp; &nbsp;
                   </div>

                   <div className="column is-6-desktop required">
                       <b> 如廁方式 : </b> &nbsp;
                       <input type="checkbox" value = "戶外" { ...register( "toilet" ) } /> 戶外 &nbsp; &nbsp;
                       <input type="checkbox" value = "室內" { ...register( "toilet" ) } /> 室內 &nbsp; &nbsp;
                       <input type="checkbox" value = "尿布" { ...register( "toilet" ) } /> 尿布 &nbsp; &nbsp;
                       <input type="checkbox" value = "其他" { ...register( "toilet" ) } /> 其他 &nbsp; &nbsp;
                   </div>

                   <div className="column is-12-desktop required">
                       <b> 飼主提供 : </b> &nbsp;
                       <input type="checkbox" value = "飼料" { ...register( "ownerProvide" ) } /> 飼料 &nbsp; &nbsp;
                       <input type="checkbox" value = "罐頭" { ...register( "ownerProvide" ) } /> 罐頭 &nbsp; &nbsp;
                       <input type="checkbox" value = "零食" { ...register( "ownerProvide" ) } /> 零食 &nbsp; &nbsp;
                       <input type="checkbox" value = "睡墊" { ...register( "ownerProvide" ) } /> 睡墊 &nbsp; &nbsp;
                       <input type="checkbox" value = "項圈" { ...register( "ownerProvide" ) } /> 項圈 &nbsp; &nbsp;
                       <input type="checkbox" value = "胸背" { ...register( "ownerProvide" ) } /> 胸背 &nbsp; &nbsp;
                       <input type="checkbox" value = "牽繩" { ...register( "ownerProvide" ) } /> 牽繩 &nbsp; &nbsp;
                       <input type="checkbox" value = "提籃" { ...register( "ownerProvide" ) } /> 提籃 &nbsp; &nbsp;
                       <input type="checkbox" value = "玩具" { ...register( "ownerProvide" ) } /> 玩具 &nbsp; &nbsp;
                       <input type="checkbox" value = "其他" { ...register( "ownerProvide" ) } /> 其他 &nbsp; &nbsp;
                   </div>

                   <div className="column is-12-desktop">

                       <textarea className = "textarea" { ...register( "pet_Note" ) } placeholder="備註事項" />

                   </div>

               </div>

          </>

} ;

export default Pet_Form
