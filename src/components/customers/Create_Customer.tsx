
import React, {FC, useEffect} from "react" ;
import {useDispatch, useSelector} from "react-redux";
import { set_Form_test } from "store/actions/action_Form_test"
import { Field , reduxForm } from "redux-form";
import { required , allowedNames } from "utils/validator/form_validator"

type TI = {
    input : string ;
    meta  : any ;
    label : string ;
}

//const renderInput = ( props : any ) =>  <input type="text" {...props.input} /> ;
//const renderInput : FC<TI> = ( { input , meta } ) =>  <input type="text" {...input} errorMessage={ meta.touched && meta.error} /> ;
const renderInput : FC<TI> = ( { input , meta : { touched , error } , label } ) => {

    return <span>

             <b> { label } </b>
             <input type="text" {...input}  />
             { touched && error && <span style={{color:"red"}}> { error } </span> }

           </span>

} ;

const onSubmit = ( values : any ) => {
     alert( JSON.stringify( values ) ) ;

} ;


// --------------------------------


/* @ 新增_客戶 */
const Create_Customer = ( props : { handleSubmit : any , valid : any } ) => {

    const { handleSubmit , valid } = props ;
    const dispatch = useDispatch() ;

    const data    = useSelector( ( state : any ) => state.Form.user ) ;



    const submit = ( values : any  )=>{

        console.log( values  );
        dispatch( set_Form_test(  values ) ) ;

    } ;



    return <form onSubmit={ handleSubmit( submit )  }>
              { /* <input name="customer-id" type="text" id="customer-id" /> &nbsp;    */ }
              <Field name="customer-id"   component={renderInput}  validate={ [ required  ] }/> <br/><br/>
              <Field name="customer-name" component={renderInput}  validate={ [ required ] }/> <br/><br/>
              <Field name="customer-age"  component={renderInput}  validate={ [ required  ] }/> <br/><br/>

              <button disabled={!valid} type="submit" > Submit </button>

           </form>

} ;


export default reduxForm({

    form : 'userForm',
    onSubmit ,

})( Create_Customer ) ;
