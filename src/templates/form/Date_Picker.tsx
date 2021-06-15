
import React, {FC, useEffect, useState} from "react"
import { useController } from "react-hook-form";
import DatePicker from "react-datepicker";
import moment from "moment";

import {set_Info_Column} from "store/actions/action_Info";
import {useDispatch} from "react-redux";


type DType = {
    control     : any ;
    name         : string ;
    default_Date : any ;
}

// 配合 React-Hook-Form，製作可重複使用 _ 日期套件
const Date_Picker:FC<DType> = ( { control , name, default_Date } ) => {

    const dispatch = useDispatch() ;

    const [ date , set_Date ] = useState<any>( null )

    const { field : { onChange , value } } = useController({

        name ,
        control ,
        rules        : { required : true },
        defaultValue : default_Date ,

    });


    const dStyle = { width  :"150px" } as any ;

    useEffect(() => {

        set_Date( value )


        // 設定 store ( 到店服務日期，以調整 _ 服務性質 )
        const p_Date = moment( value ).format('YYYY-MM-DD' ) as any ;    // 所選擇日期
        if( name === "service_Date" ) dispatch( set_Info_Column( "service_Date" , p_Date ) ) ;

    } ,[ value ] ) ;


    return <div className="control has-icons-left" style={dStyle}>

            <span className="icon is-small is-left"> <i className="far fa-calendar-alt"></i> </span>

            <DatePicker className = "input"
                        onChange  = { ( e) => onChange(e) }
                        selected  = { value } />

           </div>


} ;

export default Date_Picker