
import React, { FC , useEffect } from "react"
import { useController } from "react-hook-form" ;
import { TimePicker } from 'antd' ;
import 'antd/dist/antd.css' ;
import moment from "moment" ;


type DType = {
    control      : any ;
    name         : string ;
    default_Time : string ;
}

// 配合 React-Hook-Form，製作可重複使用 _ 時間套件
const Time_Picker:FC<DType> = ( { control , name, default_Time } ) => {

    const { field : { onChange , value } } = useController({

        name ,
        control ,
        rules        : { required : true },
        defaultValue : default_Time ,

    });

    return <TimePicker defaultValue = { moment( value , 'HH:mm') }
                       onChange     = { ( e : any ) => onChange( moment( e['_d'] ).format('HH:mm') ) }
                       format       = { 'HH:mm' }
                       size         = "large"  />

} ;

export default Time_Picker