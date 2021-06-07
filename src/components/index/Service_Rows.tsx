
import React , { FC , useEffect } from "react" ;
import { string_Short } from "utils/string/edit_string"
import { useDispatch } from "react-redux";
import { set_Side_Panel } from "../../store/actions/action_Global_Layout";
import Edit_Data from "../../containers/Edit_Data";
import Service_Report from "components/index/Service_Report";


interface IService {
    service_id  : string ;
    shop_Status : string ;
    data        : any
}

const Service_Rows : FC<IService> = ( { service_id , shop_Status , data }) => {

    const dispatch = useDispatch() ;

    // console.log( data ) ;

    // 基礎、洗澡、美容 [ basic、bath、beauty ]
    const service_Type = data['service_type'] ;
    const q_Code       = data['q_code'] ;

    // 客戶 [ customer ]
    const cus_Name     = data['customer']['name'] ;
    const cus_ID       = data['customer']['id'] ;

    // 寵物 [ pet ]
    const pet_Name     = data['pet']['name'] ;
    const pet_Serial   = data['pet']['serial'] ;
    const pet_Species  = data['pet']['species'] ;

    let style          = '' ;
    if( service_Type === '基礎' ) style = 'is-warning' ;
    if( service_Type === '洗澡' ) style = 'is-success' ;
    if( service_Type === '美容' ) style = 'is-danger' ;


    // 點選 _ Qcode
    const click_Qcode    = () => dispatch( set_Side_Panel(true , <Service_Report /> ,{ customer_Id : cus_ID , preLoadData : data  } ) ) ;

    // 點選 _ 客戶
    const click_Customer = () => dispatch( set_Side_Panel(true , <Edit_Data /> ,{ customer_Id : cus_ID , preLoadData : data } ) ) ;

    // 點選 _ 寵物
    const click_Pet      = () => dispatch( set_Side_Panel(true , <Edit_Data /> ,{ pet_Serial : pet_Serial , preLoadData : data } ) ) ;


    useEffect( () => {

        click_Qcode() ;

    } ,[] ) ;


    // ------------------------------------------------------------------------------------------------------

    let tagStyle = 'tag '+style+' is-medium is-light is-rounded pointer' ;

    const star = { position : "absolute" , top : "0px" , left : "13px" } as const ;

    return <p className="title is-6">

               <span className={ tagStyle } onClick={ click_Qcode } > { q_Code } </span>  &nbsp;

               <span className="relative tag is-medium pointer"  onClick={ click_Customer } >
                   { cus_Name }
               </span>  &nbsp;

               <span className="relative tag is-medium pointer"  onClick={ click_Pet } >
                  { pet_Name } ( { string_Short ( pet_Species ) } )
               </span>

           </p> ;


} ;

export default Service_Rows ;