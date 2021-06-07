import React, {useState} from "react" ;

// React Hook Form
import { useForm , SubmitHandler } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import { Input } from "templates/form/Input"

import useServiceType from "hooks/useServiceType"
import {Service_Type, Shop_Status} from "utils/Interface_Type" ;



interface Inputs {

   Shop_Status : Shop_Status ;
   Left_Way    : string ;

} ;


// Yup 第三方驗證
const schema = yup.object().shape({


});


{ /* 各項服務 _ 目前狀態 ( 於首頁狀態框中，點選 Qcode )  */ }
const Service_Report = () => {


    const [ service_Type , set_Service_Type ] = useState<Service_Type>("基礎") ;
    const { color , icon }                    = useServiceType( service_Type ) ;

    const { register , handleSubmit , formState : { errors , isDirty , isValid } } = useForm<Inputs>(
                                                                                                       {
                                                                                                         mode     : "all" ,
                                                                                                         resolver : yupResolver( schema ) ,
                                                                                                       }
                                                                                                     ) ;

    // 提交
    const onSubmit : SubmitHandler<Inputs> =  data => {
        console.log( data );
    };

  return  <form onSubmit={ handleSubmit( onSubmit ) }  >

              <div className="columns is-multiline is-mobile" >

                <div className="column is-5-desktop">

                    <b className={ color }> <i className={ icon }></i> &nbsp;  { service_Type } _ Q01 </b>

                    <b className="tag is-large is-white"> 到店狀態 : </b>
                    < div className="select" >
                        <select  { ...register( "Shop_Status" ) }  >
                            <option value="到店等候中"   > 到店等候中   </option>
                            <option value="到店美容中"   > 到店美容中   </option>
                            <option value="洗完等候中"   > 洗完等候中   </option>
                            <option value="已回家( 房 )" > 已回家( 房 ) </option>
                        </select>
                    </div>

                </div>

                <div className="column is-7-desktop">

                    <b className="tag is-large is-white"> 期望離店時間 : &nbsp; <span className="tag is-medium is-danger is-light"> 15:00 </span></b>

                    <b className="tag is-large is-white"> 離店方式 : </b>
                    <div className="select" >
                        <select { ...register( "Left_Way" ) }  >
                            <option value="主人接走" > 主人接走 </option>
                            <option value="司機接送" > 司機接送 </option>
                            <option value="轉回住宿" > 轉回住宿 </option>
                        </select>
                    </div>

                </div>

              </div>

              <hr/>

          </form>

} ;

export default Service_Report ;





