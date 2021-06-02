
import React from "react" ;
import {Dispatch} from "redux";


export const set_Form_test = ( payload : any ) => {

    return ( dispatch : Dispatch ) => {



        console.log( `FFFFFFFFFFF : ${ payload['customer-id'] }` );

             dispatch({

                type      : "FORM_TEST" ,
                payload   : payload

             }) ;

         } ;

} ;