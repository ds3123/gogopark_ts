import React from "react" ;


/* @ 住宿  */
interface ILodge {



}

const initState = {



} ;


const reducer_Lodge = ( state : ILodge = initState , action : any ) => {


    switch( action.type ){

        // // # 設定 _ 該房間，是否在選定的時間內，已被使用
        // case  "SET_IS_ROOM_INUSE" :
        //     return { ...state , is_Room_InUse : action.is_Room_InUse } ;

        default : return state ;

    }




} ;

export default reducer_Lodge ;
