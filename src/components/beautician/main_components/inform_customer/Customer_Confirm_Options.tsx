import React from "react" ;

import { useForm , SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema_Customer } from "utils/validator/form_validator";
import { set_Is_Admin_Confirmed } from 'store/actions/action_Beautician'
import {useDispatch} from "react-redux";
import {set_Side_Panel} from "store/actions/action_Global_Layout";


type Inputs = {
    plus_item : string ;
} ;


{ /* 主人確認面板  */ }
const Customer_Confirm_Options = () => {

    const dispatch = useDispatch() ;

    // React Hook Form
    const { register , handleSubmit , formState: { errors , isDirty , isValid } } =
        useForm<Inputs>( { mode: "all" , resolver : yupResolver( schema_Customer ) } ) ;


    const onSubmit : SubmitHandler<Inputs> = data => {

        console.log( data );

    } ;

    // 點選 : 交付櫃台詢問主人
    const click_Confirm = ( ) => {

        // 開啟 : 詢問中狀態列
        dispatch( set_Is_Admin_Confirmed( true ) ) ;

        // 關閉 : 右側面板
        dispatch( set_Side_Panel(false , null ,{} ) ) ;

    } ;


    return <form onSubmit={ handleSubmit( onSubmit ) }>

             <div className="columns is-multiline is-mobile" >

                 <div className="column is-12-desktop" >

                    <b className="tag is-large is-info is-light">  <i className="fas fa-bath"></i> &nbsp;  洗澡 _ 加價項目 </b> &nbsp; &nbsp;

                 </div>

                 <div className="column is-3-desktop" >
                     <input type="radio" value = "梳廢毛_中" { ...register( "plus_item" ) } /> &nbsp;梳廢毛 _ 中 ( 100 元 )
                 </div>

                 <div className="column is-3-desktop" >
                     <input type="radio" value = "梳廢毛_重" { ...register( "plus_item" ) } /> &nbsp;梳廢毛 _ 重 ( 200 元 )
                 </div>

                 <div className="column is-3-desktop" >
                     <input type="radio" value = "梳廢毛_剃光" { ...register( "plus_item" ) } /> &nbsp;梳廢毛_剃光 ( 轉大美容_報價 )
                 </div>

                 <div className="column is-3-desktop" >
                     <input type="radio" value = "跳蚤、壁蝨" { ...register( "plus_item" ) } /> &nbsp;跳蚤、壁蝨 ( 200 元 )
                 </div>

             </div>

             <br/>

             <div className="columns is-multiline is-mobile" >

                 <div className="column is-12-desktop" >

                     <div className=  "tag is-large hover" style={{ width:"100%" }}  onClick = { () => click_Confirm() } >
                         <b> <i className="fas fa-user-check" ></i> &nbsp; 交 付 櫃 台 詢 問 主 人 </b>
                     </div>

                 </div>

             </div>

           </form>

} ;


export default Customer_Confirm_Options