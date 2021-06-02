
import React from "react" ;


// 必填寫欄位
export const required = ( value : string | number ) =>{

    if( !value || value === "" ) return "此欄位必填" ;
    return undefined ;

} ;


export const allowedNames = ( value : string | number ) =>{

    if( value === "gg" ) return "不能填入此數值" ;
    return undefined ;

} ;