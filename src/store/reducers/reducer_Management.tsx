import React from "react" ;


/* @ 管理區  */
interface IManagement {

    Current_Second_Tab : string ;

}

const initState = {

    Current_Second_Tab : '' ,  // 目前須點選的第 2 層標籤

} ;


const reducer_Management = ( state : IManagement = initState , action : any ) => {


    switch( action.type ){

        // # 設定 _ 目前須點選的第 2 標籤
        case "SET_CURRENT_SECOND_TAB" : return { ...state , Current_Second_Tab : action.Current_Second_Tab } ;

        default : return state ;

    }

} ;

export default reducer_Management ;
