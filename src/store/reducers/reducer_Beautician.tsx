
import React from "react"



/* @ 美容師專區  */
interface IBasic {

    is_Admin_Confirmed : boolean ;  // 是否交付櫃台確認
    Current_Pet        : any ;      // 美容師目前所點選寵物

}

const initState = {

    is_Admin_Confirmed : false ,

    Current_Pet : {

        basic_data : '' ,
        basic_foot : '' ,

        pet        : {
                        name    : '' ,
                        serial  : '' ,
                        species : '' ,
                        sex     : '' ,
                        color   : '' ,
                        age     : '' ,
                        note    : ''
                      } ,



    } ,  // 所點選寵物

} ;


const reducer_Beautician = ( state : IBasic = initState , action : any ) => {


    switch( action.type ){

        // # 設定 _ 所點選寵物
        case  "SET_CURRENT_PET" :
            return { ...state , Current_Pet : action.currentPet } ;

        // # 是否交付櫃台確認
        case  "SET_IS_ADMIN_CONFIRMED" :
            return { ...state , is_Admin_Confirmed : action.is_Admin_Confirmed } ;

        default : return state ;

    }


} ;

export default reducer_Beautician ;