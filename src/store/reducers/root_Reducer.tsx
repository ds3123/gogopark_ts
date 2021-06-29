
import React from "react";
import { combineReducers } from "redux" ;
import reducer_Global_Layout  from "store/reducers/reducer_Global_Layout"
import reducer_Basic from "store/reducers/reducer_Basic";
import reducer_Extra_Service_Fee from "store/reducers/reducer_Extra_Service_Fee";
import reducer_Info from "store/reducers/reducer_Info"
import reducer_Customer from "store/reducers/reducer_Customer";
import reducer_Pet from "store/reducers/reducer_Pet";
import reducer_Beautician from "store/reducers/reducer_Beautician";
import reducer_Index from "store/reducers/reducer_Index";
import reducer_Service from "store/reducers/reducer_Service";
import reducer_Lodge from "store/reducers/reducer_Lodge";
import reducer_Plan from "store/reducers/reducer_Plan";
import reducer_Care from "store/reducers/reducer_Care";



const root_Reducer = combineReducers({

                         // @ 整體、全局 _ 版面狀態
                         "Layout"     : reducer_Global_Layout ,

                         // @ 首頁
                         "Index"      : reducer_Index ,

                         // @ 服務單資料
                         "Basic"      : reducer_Basic ,             // 基礎單

                         "Service"    : reducer_Service ,           // 洗美頁資料

                         "Info"       : reducer_Info ,              // 基本資料 ( 服務性質、處理碼、到店日期 ... )

                         "Extra_Fee"  : reducer_Extra_Service_Fee , // 服務額外費用( Ex. 接送費 )

                         // @ 美容師專區
                         "Beautician" : reducer_Beautician ,

                         // @ 客戶
                         "Customer"   : reducer_Customer ,

                         // @ 寵物
                         "Pet"        : reducer_Pet ,

                         // @ 安親
                         "Care"       : reducer_Care ,

                         // @ 住宿
                         "Lodge"      : reducer_Lodge ,

                         // @ 方案
                         "Plan"       : reducer_Plan ,


                     }) ;

export default root_Reducer ;
