
import React from "react"
import moment from "moment" ;


/* @ 服務單 _ 基本資料 ( 服務性質、處理碼、到店日期 ... ) */

interface IInfo {

   service_Date : string ;

}

const initSate =  {

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