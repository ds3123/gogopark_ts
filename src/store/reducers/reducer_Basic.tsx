import React from "react" ;


/* @ 基礎項目  */
interface IBasic {

    Basic_Sum_Price : number ;

}

const initState = {

    Basic_Sum_Price : 0 ,  // 基礎共計價格

} ;


const reducer_Basic = ( state : IBasic = initState , action : any ) => {


    switch( action.type ){

        // # 設定 _ 基礎共計價格
        case  "SET_BASIC_SUM_PRICE" :
            return {
                ...state ,
                Basic_Sum_Price : action.price

            } ;

        default : return state ;

    }




} ;

export default reducer_Basic ;
