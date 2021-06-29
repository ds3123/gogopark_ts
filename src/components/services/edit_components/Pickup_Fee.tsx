
import React, {FC, useEffect} from "react" ;
import { Edit_Form_Type } from "utils/Interface_Type"
import { set_PickupFee } from "store/actions/action_Extra_Service_Fee"
import { useDispatch } from "react-redux";

/* 接送費 */
const Pickup_Fee : FC<Edit_Form_Type> = ({ register , current, setValue } ) => {

   const dispatch = useDispatch() ;

   // 取得、設定接送費
   const get_Fee = ( fee : any ) => {

       if( isNaN( fee ) ){ // 非數字
           dispatch( set_PickupFee( 0 ) ) ;
           return false ;
       }

       if( !fee ){ // 空字串
          dispatch( set_PickupFee( 0 ) ) ;
          return false ;
       }

       dispatch( set_PickupFee( fee ) ) ;

   };


    // 新增類別變動
    useEffect(( ) => {

        // 將接送費歸零
        dispatch( set_PickupFee( 0 ) ) ;
        setValue( 'pickup_Fee' , ''  ) ;

    } ,[ current ] ) ;





    return <>

            <div className="columns is-multiline is-mobile">

               <div className= "column is-2-desktop" >
                   <b className="tag is-large is-danger is-light">
                       <i className="fas fa-truck-pickup"></i> &nbsp; 接送費
                   </b>
               </div>

               <div className= "column is-2-desktop" >

                  <input type="text" className="input" { ...register( "pickup_Fee" ) } onChange={ e => get_Fee( e.target.value ) }/>

               </div>

               <div className= "column is-1-desktop" >
                   <span className="relative" style={{top:"8px"}}>元</span>
               </div>

               <div className= "column is-7-desktop relative" >
                   <span className='absolute' style={{ fontSize:'10pt',left:'-40px' }}> * 人工判斷 ( 5 公里內，機車 100 元 / 汽車 200 元 ) </span>
               </div>

            </div>

            <hr/>

          </>

} ;

export default Pickup_Fee ;

