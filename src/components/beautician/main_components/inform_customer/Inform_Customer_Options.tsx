
import React , { useState } from  "react" ;
import { useForm , SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema_Customer } from "utils/validator/form_validator";
import { get_H_M } from "utils/time/time"




type Inputs = {

    entanglement : string ;
    doghair      : string ;
    aggressive   : string ;
    eye          : string ;
    ear          : string ;
    skin         : string ;
    body         : string ;
    way          : string ;
    star         : string ;
    note         : string ;

} ;


{ /*  告知主人面板  */ }
const Inform_Customer_Options = () => {

    // 開始等待時間
    let [ time , set_Time ]   = useState('00 : 00' ) ;



    // React Hook Form
    const { register , handleSubmit , formState: { errors , isDirty , isValid } } =
        useForm<Inputs>( { mode: "all" , resolver : yupResolver( schema_Customer ) } ) ;


    // 點選 _ 時間
    const click_Time = () => set_Time( time === '00 : 00' ? get_H_M() : '00 : 00'  ) ;

    const onSubmit : SubmitHandler<Inputs>  = data => {

        console.log( data );

    };


   return <form onSubmit={ handleSubmit( onSubmit ) }>

             <div className="columns is-multiline is-mobile" >

                 { /* 所有項目皆正常 */ }
                 <div className="column is-12-desktop" >
                     <div className = "tag is-large hover" style={{ width:"100%" }} >
                         <b> <i className="fas fa-check-circle" ></i> &nbsp; 所 有 檢 查 項 目 皆 正 常 </b>
                     </div>
                 </div>

                 <div className="column is-6-desktop" >
                     <b className="tag is-medium is-white"> 打 結 : </b> &nbsp; &nbsp;
                     <input type="radio" value = "輕"     { ...register( "entanglement" ) } /> 輕 &nbsp; &nbsp; &nbsp; &nbsp;
                     <input type="radio" value = "中"     { ...register( "entanglement" ) } /> 中 &nbsp; &nbsp; &nbsp; &nbsp;
                     <input type="radio" value = "重"     { ...register( "entanglement" ) } /> 重
                 </div>

                 <div className="column is-6-desktop" >
                     <b className="tag is-medium is-white"> 廢 毛 : </b> &nbsp; &nbsp;
                     <input type="radio" value = "輕"     { ...register( "doghair" ) } /> 輕 &nbsp; &nbsp; &nbsp; &nbsp;
                     <input type="radio" value = "中"     { ...register( "doghair" ) } /> 中 &nbsp; &nbsp; &nbsp; &nbsp;
                     <input type="radio" value = "重"     { ...register( "doghair" ) } /> 重
                 </div>

                 <div className="column is-6-desktop" >
                     <b className="tag is-medium is-white"> 眼 睛 : </b> &nbsp; &nbsp;
                     <input type="radio" value = "左眼"     { ...register( "eye" ) } /> 左眼 &nbsp; &nbsp; &nbsp; &nbsp;
                     <input type="radio" value = "右眼"     { ...register( "eye" ) } /> 右眼 &nbsp; &nbsp; &nbsp; &nbsp;
                     <input type="radio" value = "兩眼"     { ...register( "eye" ) } /> 兩眼
                 </div>

                 <div className="column is-6-desktop" >
                     <b className="tag is-medium is-white"> 耳 朵 : </b> &nbsp; &nbsp;
                     <input type="radio" value = "左耳"     { ...register( "ear" ) } /> 左耳 &nbsp; &nbsp; &nbsp; &nbsp;
                     <input type="radio" value = "右耳"     { ...register( "ear" ) } /> 右耳 &nbsp; &nbsp; &nbsp; &nbsp;
                     <input type="radio" value = "兩耳"     { ...register( "ear" ) } /> 兩耳
                 </div>

                 <div className="column is-12-desktop" >
                     <b className="tag is-medium is-white"> 身 體 : </b> &nbsp; &nbsp;
                     <input type="checkbox" value = "壁蝨"   { ...register( "body" ) } /> 壁蝨 &nbsp; &nbsp; &nbsp; &nbsp;
                     <input type="checkbox" value = "跳蚤"   { ...register( "body" ) } /> 跳蚤 &nbsp; &nbsp; &nbsp; &nbsp;
                     <input type="checkbox" value = "建議點藥"   { ...register( "body" ) } /> 建議點藥 &nbsp; &nbsp; &nbsp; &nbsp;
                     ( 可複選 )
                 </div>

                 <div className="column is-12-desktop" >
                     <b className="tag is-medium is-white"> 皮 膚 : </b> &nbsp; &nbsp;
                     <input type="checkbox" value = "略紅"   { ...register( "skin" ) } /> 略紅 &nbsp; &nbsp; &nbsp; &nbsp;
                     <input type="checkbox" value = "紅點"   { ...register( "skin" ) } /> 紅點 &nbsp; &nbsp; &nbsp; &nbsp;
                     <input type="checkbox" value = "結痂"   { ...register( "skin" ) } /> 結痂 &nbsp; &nbsp; &nbsp; &nbsp;
                     <input type="checkbox" value = "傷口"   { ...register( "skin" ) } /> 傷口 &nbsp; &nbsp; &nbsp; &nbsp;
                     <input type="checkbox" value = "建議看醫生"   { ...register( "skin" ) } /> 建議看醫生 &nbsp; &nbsp; &nbsp; &nbsp;

                     ( 可複選 )
                 </div>

                 <div className="column is-12-desktop" >
                     <b className="tag is-medium is-white"> 會 兇 : </b> &nbsp; &nbsp;
                     <input type="checkbox" value = "擠肛門腺" { ...register( "aggressive" ) } /> 擠肛門腺 &nbsp; &nbsp; &nbsp; &nbsp;
                     <input type="checkbox" value = "碰頭"     { ...register( "aggressive" ) } /> 碰頭 &nbsp; &nbsp; &nbsp; &nbsp;
                     <input type="checkbox" value = "剪指甲"   { ...register( "aggressive" ) } /> 剪指甲 &nbsp; &nbsp; &nbsp; &nbsp;
                     <input type="checkbox" value = "清耳朵"   { ...register( "aggressive" ) } /> 清耳朵 &nbsp; &nbsp; &nbsp; &nbsp;
                     <input type="checkbox" value = "其他"     { ...register( "aggressive" ) } /> 其他 &nbsp; &nbsp; &nbsp; &nbsp;
                     ( 可複選 )
                 </div>

             </div>

             <hr/>

             <div className="columns is-multiline is-mobile" >

                 <div className="column is-12-desktop" >

                     <i className="fas fa-door-open"></i>&nbsp;<b className="tag is-medium is-white"> 洗澡 / 美容後處理方式 : </b> &nbsp; &nbsp;

                     <div className="select is-normal realtive" >
                         <select { ...register( "way" ) }>
                             <option value = "進籠子_等候" > 進籠子 _ 等候 </option>
                             <option value = "運動場_等候" > 運動場 _ 等候 </option>
                             <option value = "美容桌_等候">  美容桌 _ 等候 </option>
                         </select>
                     </div>  &nbsp; &nbsp; &nbsp; &nbsp;

                     <b className= { time === '00 : 00' ? "tag is-large hover" : "tag is-large is-success" }  onClick={ click_Time } > { time } </b>

                 </div>

                 <div className="column is-12-desktop" >

                     <i className="far fa-star"></i>&nbsp;<b className="tag is-medium is-white"> 美容師評分 : </b> &nbsp; &nbsp;

                     <input type="radio" value = "拒接" { ...register( "star" ) } /> <b style={{color:"rgb(200,0,0)"}}>拒接</b> &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;
                     <input type="radio" value = "1"    { ...register( "star" ) } /> 1    &nbsp; &nbsp; &nbsp; &nbsp;
                     <input type="radio" value = "2"    { ...register( "star" ) } /> 2    &nbsp; &nbsp; &nbsp; &nbsp;
                     <input type="radio" value = "3"    { ...register( "star" ) } /> 3    &nbsp; &nbsp; &nbsp; &nbsp;
                     <input type="radio" value = "4"    { ...register( "star" ) } /> 4    &nbsp; &nbsp; &nbsp; &nbsp;
                     <input type="radio" value = "5"    { ...register( "star" ) } /> 5

                 </div>

                 <div className="column is-12-desktop" >

                     <i className="fas fa-pencil-alt"></i>&nbsp;<b className="tag is-medium is-white"> 美容師備註 : </b> &nbsp; &nbsp;

                     <div className="select is-normal realtive" >
                         <select { ...register( "note" ) }>
                            <option value="請選擇"> 請選擇 </option>
                            <option value="會咬人"> 會咬人 </option>
                            <option value="廢毛太多"> 廢毛太多 </option>
                            <option value="過動、不好處理"> 過動、不好處理 </option>
                         </select>
                     </div>  &nbsp; &nbsp; &nbsp; &nbsp;

                 </div>

             </div>

               <br/><br/>

               { /* 提交按鈕 */ }
               <div className="has-text-centered" >
                   <button disabled={ !isDirty || !isValid } type="submit" className="button is-primary relative is-medium" style={{top: "-10px"}} >
                       提交表單
                   </button>
               </div> <br/>

          </form>

};

export default Inform_Customer_Options