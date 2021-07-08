
import React , { FC , useEffect } from "react" ;
import { string_Short } from "utils/string/edit_string"
import {useDispatch, useSelector} from "react-redux";
import { set_Side_Panel } from "../../store/actions/action_Global_Layout";
import Service_Report from "components/index/Service_Report";
import Update_Customer from "components/customers/edit/Update_Customer";
import Update_Pet from "components/pets/edit/Update_Pet";
import useRating from "hooks/layout/useRating";


import { Service_Type } from "utils/Interface_Type"


interface IService {
    data : any
}

const Service_Rows : FC<IService> = ( { data } ) => {

    const dispatch = useDispatch() ;

    // 首頁詳細模式 ( 展開所有統計資料 )
    const is_Detail_Mode = useSelector( ( state : any ) => state.Index.is_Detail_Mode ) ;

    const rating_1 = useRating( 5  , 5 ) ;
    const rating_2 = useRating( 1  , 10 ) ;

    const customer     = data['customer'] ;
    const pet          = data['pet'] ;
    customer.customer_relation = [ data['customer_relative'] ? data['customer_relative'] : {} ] ;

    // 基礎、洗澡、美容 [ basic、bath、beauty ]
    const service_Type = data['service_type'] ;
    const q_Code       = data['q_code'] ;

    // 客戶 [ customer ]
    const cus_Name     = customer ? customer['name'] : {} ;

    // 寵物 [ pet ]
    const pet_Name     = pet ? pet['name'] : '' ;
    const pet_Species  = pet ? pet['species'] : '' ;

    let style          = '' ;
    if( service_Type === '基礎' ) style = 'is-warning' ;
    if( service_Type === '洗澡' ) style = 'is-success' ;
    if( service_Type === '美容' ) style = 'is-danger' ;

    // 點選 _ Qcode
    const click_Qcode    = () => dispatch( set_Side_Panel(true , <Service_Report /> , { service_Type : service_Type , preLoadData : data  } as { service_Type : Service_Type  } ) ) ;

    // 點選 _ 客戶
    const click_Customer = () => dispatch( set_Side_Panel(true , <Update_Customer /> , { preLoadData : customer } ) ) ;

    // 點選 _ 寵物
    const click_Pet      = () => dispatch( set_Side_Panel(true , <Update_Pet /> ,{ preLoadData : data.pet } ) ) ;


    useEffect(() => {

      // click_Qcode() ;

    } ,[] ) ;

    // ------------------------------------------------------------------------------------------------------

    let tagStyle = 'tag '+style+' is-medium is-light is-rounded pointer f_11' ;
    const rating = { top:"-3px" , left : "-5px" , fontSize:"9pt" } as const ;

    return <div className="title is-6" style={{ marginBottom : "20px" }} >

               <span className={ tagStyle } onClick={ click_Qcode } >Q{ q_Code }</span>  &nbsp; &nbsp;

               <span className="relative tag is-medium pointer f_11"  onClick={ click_Pet } >

                 { is_Detail_Mode &&  <span className="absolute" style={ rating }>  { rating_1 } </span> }

                 { pet_Name } ( { string_Short( pet_Species ) } )

               </span> &nbsp; &nbsp;

               <span className="relative tag is-medium pointer f_11"  onClick={ click_Customer } >

                   { is_Detail_Mode &&  <span className="absolute" style={ rating }>  { rating_2 } </span> }
                   { cus_Name }

               </span>

           </div> ;

} ;

export default Service_Rows ;