
import React from "react"



/* @ 美容師專區  */
interface IBasic {

    Current_Pet : any ;

}

const initState = {

    Current_Pet : {

        pet : {

                name    : '' ,
                serial  : '' ,
                species : '' ,
                sex     : '' ,
                color   : '' ,
                age     : '' ,
                note    : '' ,

              } ,



    } ,  // 所點選寵物

} ;


const reducer_Beautician = ( state : IBasic = initState , action : any ) => {


    switch( action.type ){

        // # 設定 _ 所點選寵物
        case  "SET_CURRENT_PET" :
            return {...state , Current_Pet : action.currentPet } ;

        default : return state ;

    }




} ;

export default reducer_Beautician ;