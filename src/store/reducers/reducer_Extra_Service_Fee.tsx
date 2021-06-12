import React from "react" ;


/* @ 各項服務 _ 額外價格  */
interface ILayout {

    Pickup_Fee : number ;

}

const initState = {

    Pickup_Fee  : 0 ,  // 接送費

} ;


const reducer_Extra_Service_Fee = ( state : ILayout = initState , action : any ) => {

    switch( action.type ){

        // # 設定 _ 接送費
        case  "SET_PICKUP_FEE" :
            return {
                     ...state ,
                      Pickup_Fee : action.price
                   } ;

        default : return state ;

    }




} ;

export default reducer_Extra_Service_Fee ;
