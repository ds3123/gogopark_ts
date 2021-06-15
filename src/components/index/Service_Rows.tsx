
import React , { FC , useEffect } from "react" ;
import { string_Short } from "utils/string/edit_string"
import { useDispatch } from "react-redux";
import { set_Side_Panel } from "../../store/actions/action_Global_Layout";
import Service_Report from "components/index/Service_Report";
import Update_Customer from "components/customers/edit/Update_Customer";
import Update_Pet from "components/pets/edit/Update_Pet";

import { Service_Type } from "utils/Interface_Type"


interface IService {
    data : any
}

const Service_Rows : FC<IService> = ( { data }) => {

    const dispatch = useDispatch() ;

    const customer = data['customer'];
    customer.customer_relation = [ data['customer_relative'] ] ;


    // 基礎、洗澡、美容 [ basic、bath、beauty ]
    const service_Type = data['service_type'] ;
    const q_Code       = data['q_code'] ;

    // 客戶 [ customer ]
    const cus_Name     = customer['name'] ;

    // 寵物 [ pet ]
    const pet_Name     = data['pet']['name'] ;
    const pet_Species  = data['pet']['species'] ;

    let style          = '' ;
    if( service_Type === '基礎' ) style = 'is-warning' ;
    if( service_Type === '洗澡' ) style = 'is-success' ;
    if( service_Type === '美容' ) style = 'is-danger' ;


    // 點選 _ Qcode
    const click_Qcode     = () => dispatch( set_Side_Panel(true , <Service_Report /> , { service_Type : service_Type , preLoadData : data  } as { service_Type : Service_Type  } ) ) ;

    // 點選 _ 客戶
    const click_Customer  = () => dispatch( set_Side_Panel(true , <Update_Customer /> , { preLoadData : customer } ) ) ;

    // 點選 _ 寵物
    const click_Pet       = () => dispatch( set_Side_Panel(true , <Update_Pet /> ,{ preLoadData : data.pet } ) ) ;


    useEffect(() => {

      // click_Qcode() ;

    } ,[] ) ;


    // ------------------------------------------------------------------------------------------------------

    let tagStyle = 'tag '+style+' is-medium is-light is-rounded pointer' ;

    const star = { position : "absolute" , top : "0px" , left : "13px" } as const ;

    return <div className="title is-6" style={{ marginBottom : "20px" }}>

               <span className={ tagStyle } onClick={ click_Qcode } > Q{ q_Code } </span>  &nbsp;

               <span className="relative tag is-medium pointer"  onClick={ click_Pet } >
                  { pet_Name } ( { string_Short ( pet_Species ) } )
               </span> &nbsp;

               <span className="relative tag is-medium pointer"  onClick={ click_Customer } >
                   { cus_Name }
               </span>

           </div> ;


} ;

export default Service_Rows ;