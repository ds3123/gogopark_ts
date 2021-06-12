
import React , {FC} from "react" ;

type TI = {
    type     : string ;
    name     : string ;
    label    : string ;
    icon     : string ;
    register : any ;
    error    : any ;
    asterisk : boolean ;
    columns  : string ;
    onChange? : any
};

export const Input : FC<TI> = ({ register,type,name,label,icon,error, asterisk, columns, onChange = ()=>{} , ...inputProps }) => {

    return   <div className= { `column is-${columns}-desktop ${ ( asterisk ? "required" : "" ) }` }  >

               <p className="relative"> { label } &nbsp; <b style={{color:"red"}}> { error?.message } </b>  </p>

               <div className="control has-icons-left" >

                  <span className="icon is-small is-left"> <i className={ icon }></i> </span>

                  <input className="input" type={ type } { ...register( name ) }  {...inputProps } onChange = { e => onChange( e ) } />

               </div>

            </div>


} ;


