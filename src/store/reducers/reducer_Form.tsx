
import React from "react" ;


const initState = {

} ;


const reducer_Form = (state : any = initState  , action : any ) => {

    switch( action.type ){

        case "CREATE_CUSTOMER" :
            return { ...state , customer : action.payload }

        default : return state ;

    }

} ;




export default reducer_Form