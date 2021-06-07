
import React from "react";
import { combineReducers } from "redux" ;
import reducer_Global_Layout  from "store/reducers/reducer_Global_Layout"
import reducer_Form from "store/reducers/reducer_Form";


const root_Reducer = combineReducers({

                        // @ 整體、全局 _ 版面狀態
                        "Layout"  : reducer_Global_Layout ,

                        // Redux-Form
                         "Form"   : reducer_Form ,

                     }) ;

export default root_Reducer ;
