
import React from "react";
import { combineReducers } from "redux" ;
import reducer_Global_Layout  from "store/reducers/reducer_Global_Layout"
import reducer_Basic from "store/reducers/reducer_Basic";
import reducer_Extra_Service_Fee from "store/reducers/reducer_Extra_Service_Fee";
import reducer_Info from "store/reducers/reducer_Info"
import reducer_Customer from "store/reducers/reducer_Customer";


const root_Reducer = combineReducers({

                         // @ 整體、全局 _ 版面狀態
                         "Layout"    : reducer_Global_Layout ,

                         // @ 服務單資料
                         "Basic"     : reducer_Basic ,             // 基礎單

                         "Info"      : reducer_Info ,              // 基本資料 ( 服務性質、處理碼、到店日期 ... )

                         "Extra_Fee" : reducer_Extra_Service_Fee , // 服務額外費用( Ex. 接送費 )


                        // @ 客戶
                         "Customer"  : reducer_Customer ,

                     }) ;

export default root_Reducer ;
