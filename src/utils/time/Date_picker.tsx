
import React , { useState , useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment  from "moment";


/*
*
*  @ 利用 DatePicker，輸出成 日期元件
*
*   set_Service_Date ( Function ) --> 取得日期
*   no_Past ( Bool )              --> 決定是否能選取 '過去' 日期
*
*/

const Date_picker = ( {  no_Past = false  }  ) => {


    const today = moment( new Date ).format('YYYY-MM-DD' ) ;  // 今日

    let [ date , set_Date ] = useState<any>( new Date ) ;

    // 選擇日期處理
    const handleChange = ( s_Date : any ) => {

        // 是否選擇 : 過去日期
        const p_Date = moment( s_Date ).format('YYYY-MM-DD' ) ;  // 所選擇日期
        if( no_Past && today > p_Date  ){  alert('不能選擇 過去 日期') ;  return false ;   }

        set_Date( s_Date ) ;  // 設定日期

    } ;



    // 預設先取得 "初始" 服務日期，並監控 服務日期 "後續變化"
    useEffect(() => {

        if( date ){

            const _date = moment( date ).format('YYYY-MM-DD' ) ;  // 所選擇日期

        }

    } ,[ date ] ) ;


    const _style =  { width  :"150px" , zIndex : "33333" } as any ;

    return  <div className="control has-icons-left" style={ _style } >

                <span className="icon is-small is-left"> <i className="far fa-calendar-alt"></i> </span>

                <DatePicker className = "input"
                            selected  = { date }
                            onChange  = { ( s_Date ) => handleChange( s_Date) }  />

            </div>;

} ;


export default Date_picker ;