
import React from "react"
import moment from "moment" ;


/* @ 服務單 _ 基本資料 ( 服務性質、處理碼、到店日期 ... ) */

interface IInfo {

   service_Status : string ;
   service_Date   : string ;

}

const initSate =  {

    service_Status : "已到店" ,                                           // ( 服務性質 : 已到店、預約_今天、預約_未來  )
    service_Date   : moment( new Date() ).format('YYYY-MM-DD' ) , // 到店(服務)日期 _ 預設 : 今日

} ;


const reducer_Info = (state : IInfo = initSate , action : any )=>{

    switch( action.type ) {


        // 設定 _ 各欄位基本資料
        case action.type   : return { ...state , [ action.type ] : action.data } ;


        default : return state ;

    }

};

export default reducer_Info