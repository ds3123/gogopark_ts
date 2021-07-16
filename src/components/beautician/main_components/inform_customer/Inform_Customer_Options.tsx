
import React , { useState , useEffect } from  "react" ;
import { useForm , SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema_Customer } from "utils/validator/form_validator";
import { get_H_M } from "utils/time/time"
import {useDispatch, useSelector} from "react-redux";
import {useUpdate_Data} from "hooks/ajax_crud/useAjax_Update";
import {set_Side_Panel} from "store/actions/action_Global_Layout";
import {IService} from "utils/Interface_Type";

import { useRating_Options } from "hooks/layout/useRating"


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


{ /*  處理結果面板  */ }
const Inform_Customer_Options = () => {

    const dispatch = useDispatch() ;


    // 目前所點選寵物
    const data = useSelector( ( state : any ) => state.Beautician.Current_Pet ) ;

    // 更新函式
    const update_Data = useUpdate_Data() ;


    // 判斷是否有點選寵物
    const [ has_PetData , set_Has_PetData ] = useState(false) ;

    // 開始等待時間
    const [ time , set_Time ]               = useState('00 : 00') ;

    // 所有檢查項目皆正常
    const [ is_All_Good , set_Is_All_Good ] = useState(false) ;


    // React Hook Form
    const { register , handleSubmit , formState: { errors , isDirty , isValid } } =
        useForm<Inputs>( { mode: "all" , resolver : yupResolver( schema_Customer ) } ) ;


    // 評分選項
    const rating_Options = useRating_Options('美容師評分', 'rating', register ) ;

    // ---------------------------------------------------------------------

    // 點選 _ 所有檢查項目皆正常
    const click_Is_All_Good = ( bool : boolean ) => set_Is_All_Good( !bool ) ;

    // 點選 _ 時間
    const click_Time = () => set_Time(time === '00 : 00' ? get_H_M() : '00 : 00'  ) ;

    // 提交 _ 表單 ( 有問題 2016.06.16  )
    const onSubmit : SubmitHandler<IService> = columnsData => {

        const service = data as any ;

        console.log( service )

        // const _data = data as any ;
        //
        // let service_Id = '' ;
        // let api        = '' ;
        // if( _data['service_type'] === '基礎' ){ service_Id = _data['basic_id'] ;  api = '/basics' };
        // if( _data['service_type'] === '洗澡' ){ service_Id = _data['bath_id'] ;   api = '/bathes' };
        // if( _data['service_type'] === '美容' ){ service_Id = _data['beauty_id'] ; api = '/beauties' };


        // console.log( api )

        // 更改欄位
        //update_Data( api , service_Id , { shop_status : '洗完等候中' } , '/beautician' , null , '處理結果已提交櫃台'  ) ;




        // dispatch( set_Side_Panel(false , null ,{} ) ) ;

    };

    // 提交鈕失效，先暫時代替 ( 2016.06.16 )
    const handle_Submit = ( ) => {

        const _data = data as any ;

        let service_Id = '' ;
        let api        = '' ;
        if( _data['service_type'] === '基礎' ){ service_Id = _data['basic_id'] ;  api = '/basics' };
        if( _data['service_type'] === '洗澡' ){ service_Id = _data['bath_id'] ;   api = '/bathes' };
        if( _data['service_type'] === '美容' ){ service_Id = _data['beauty_id'] ; api = '/beauties' };

        // 更改欄位
        update_Data( api , service_Id , { shop_status : '洗完等候中' } , '/beautician' , null , '處理結果已提交櫃台'  ) ;

        dispatch( set_Side_Panel(false , null ,{} ) ) ;

    } ;

    useEffect(( ) => {

        // 設定 _ 判斷是否有點選寵物狀態
        set_Has_PetData(data['pet_id'] ? true : false ) ;

    } ,[] ) ;

   return <form onSubmit={ handleSubmit( onSubmit ) }>

             <div className="columns is-multiline is-mobile" >

                 { /* 所有項目皆正常 */ }
                 <div className="column is-12-desktop" >

                     <div className = { is_All_Good ? 'tag is-large is-success' : 'tag is-large hover' }
                          style     = {{ width:"100%" }}
                          onClick   = { () => click_Is_All_Good( is_All_Good ) } >
                         <b> <i className="fas fa-check-circle" ></i> &nbsp; 所 有 檢 查 項 目 皆 正 常 </b>
                     </div>

                 </div>

                 { /* 檢查項目 */}
                 { is_All_Good ||

                     <>
                         <div className="column is-6-desktop">
                             <b className="tag is-medium is-white"> 打 結 : </b> &nbsp; &nbsp;
                             <input type="radio"
                                    value="輕"     {...register("entanglement")} /> 輕 &nbsp; &nbsp; &nbsp; &nbsp;
                             <input type="radio"
                                    value="中"     {...register("entanglement")} /> 中 &nbsp; &nbsp; &nbsp; &nbsp;
                             <input type="radio" value="重"     {...register("entanglement")} /> 重
                         </div>

                         <div className="column is-6-desktop">
                             <b className="tag is-medium is-white"> 廢 毛 : </b> &nbsp; &nbsp;
                             <input type="radio" value="輕"     {...register("doghair")} /> 輕 &nbsp; &nbsp; &nbsp; &nbsp;
                             <input type="radio" value="中"     {...register("doghair")} /> 中 &nbsp; &nbsp; &nbsp; &nbsp;
                             <input type="radio" value="重"     {...register("doghair")} /> 重
                         </div>

                         <div className="column is-6-desktop">
                             <b className="tag is-medium is-white"> 眼 睛 : </b> &nbsp; &nbsp;
                             <input type="radio" value="左眼"     {...register("eye")} /> 左眼 &nbsp; &nbsp; &nbsp; &nbsp;
                             <input type="radio" value="右眼"     {...register("eye")} /> 右眼 &nbsp; &nbsp; &nbsp; &nbsp;
                             <input type="radio" value="兩眼"     {...register("eye")} /> 兩眼
                         </div>

                         <div className="column is-6-desktop">
                             <b className="tag is-medium is-white"> 耳 朵 : </b> &nbsp; &nbsp;
                             <input type="radio" value="左耳"     {...register("ear")} /> 左耳 &nbsp; &nbsp; &nbsp; &nbsp;
                             <input type="radio" value="右耳"     {...register("ear")} /> 右耳 &nbsp; &nbsp; &nbsp; &nbsp;
                             <input type="radio" value="兩耳"     {...register("ear")} /> 兩耳
                         </div>

                         <div className="column is-12-desktop">
                             <b className="tag is-medium is-white"> 身 體 : </b> &nbsp; &nbsp;
                             <input type="checkbox" value="壁蝨"   {...register("body")} /> 壁蝨 &nbsp; &nbsp; &nbsp; &nbsp;
                             <input type="checkbox" value="跳蚤"   {...register("body")} /> 跳蚤 &nbsp; &nbsp; &nbsp; &nbsp;
                             <input type="checkbox" value="建議點藥"   {...register("body")} /> 建議點藥 &nbsp; &nbsp; &nbsp; &nbsp;
                             ( 可複選 )
                         </div>

                         <div className="column is-12-desktop">
                             <b className="tag is-medium is-white"> 皮 膚 : </b> &nbsp; &nbsp;
                             <input type="checkbox" value="略紅"   {...register("skin")} /> 略紅 &nbsp; &nbsp; &nbsp; &nbsp;
                             <input type="checkbox" value="紅點"   {...register("skin")} /> 紅點 &nbsp; &nbsp; &nbsp; &nbsp;
                             <input type="checkbox" value="結痂"   {...register("skin")} /> 結痂 &nbsp; &nbsp; &nbsp; &nbsp;
                             <input type="checkbox" value="傷口"   {...register("skin")} /> 傷口 &nbsp; &nbsp; &nbsp; &nbsp;
                             <input type="checkbox"
                                    value="建議看醫生"   {...register("skin")} /> 建議看醫生 &nbsp; &nbsp; &nbsp; &nbsp;

                             ( 可複選 )
                         </div>

                         <div className="column is-12-desktop">
                             <b className="tag is-medium is-white"> 會 兇 : </b> &nbsp; &nbsp;
                             <input type="checkbox"
                                    value="擠肛門腺" {...register("aggressive")} /> 擠肛門腺 &nbsp; &nbsp; &nbsp; &nbsp;
                             <input type="checkbox"
                                    value="碰頭"     {...register("aggressive")} /> 碰頭 &nbsp; &nbsp; &nbsp; &nbsp;
                             <input type="checkbox"
                                    value="剪指甲"   {...register("aggressive")} /> 剪指甲 &nbsp; &nbsp; &nbsp; &nbsp;
                             <input type="checkbox"
                                    value="清耳朵"   {...register("aggressive")} /> 清耳朵 &nbsp; &nbsp; &nbsp; &nbsp;
                             <input type="checkbox"
                                    value="其他"     {...register("aggressive")} /> 其他 &nbsp; &nbsp; &nbsp; &nbsp;
                             ( 可複選 )
                         </div>

                     </>

                 }

             </div>

             <hr/>

             { /* 美容師後續處理 */ }
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

                 { /* 評分選項 */ }
                 { rating_Options }

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
               {/*<div className="has-text-centered" >*/}
               {/*    <button disabled={ !has_PetData }  type="submit" className="button is-primary relative is-medium" style={{top: "-10px"}} >*/}
               {/*        提交表單*/}
               {/*    </button>*/}
               {/*</div> <br/>*/}

               <div className="has-text-centered" >
                   <button disabled={ !has_PetData } onClick = { handle_Submit }   className="button is-primary relative is-medium" style={{top: "-10px"}} >
                       提交表單
                   </button>
               </div> <br/>

          </form>

};

export default Inform_Customer_Options