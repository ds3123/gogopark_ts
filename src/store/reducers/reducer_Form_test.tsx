
import React from "react" ;


const initState = {

    user : {  }

} ;


const reducer_Form_test = ( state : any = initState  , action : any ) => {

    switch( action.type ){

        case "FORM_TEST" :
            return { ...state , user : action.payload }

        default : return state ;

    }

} ;




export default reducer_Form_test