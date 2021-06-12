
import React from "react" ;
import { Dispatch } from "redux";



/* @ 服務單 _ 基本資料 ( 服務性質、處理碼、到店日期 ... ) */

// # 設定 _ 欄位
export const set_Info_Column = ( column : string , value : string | number ) => {

    return ( dispatch : Dispatch ) => {

                 dispatch({ type : column , data : value }) ;

           } ;

} ;

