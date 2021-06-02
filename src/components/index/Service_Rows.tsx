
import React from "react" ;
import { string_Short } from "utils/string/edit_string"


interface IService {

    service_id  : string ;
    shop_Status : string ;
    data        : any

}

const Service_Rows = ( props:IService ) => {

    const { service_id , shop_Status , data } = props ;

    // 基礎、洗澡、美容 [ basic、bath、beauty ]
    const service_Type = data['service_type'];
    const q_Code       = data['q_code'];
    const report       = data['report'];
    const value        = data['beautician_star'];
    const note         = data['beautician_note'];
    const created_at   = data['created_at'];
    const updated_at   = data['updated_at'];


    // 客戶 [customer]
    let cus_Name     = '' ;
    let cus_ID       = '' ;

    if( data['customer'] ){  // 是否有抓取 : 客戶資料
        cus_Name     = data['customer']['name'] ;
        cus_ID       = data['customer']['id'] ;
    }


    // 寵物 [ pet ]
    let pet_Name     = '' ;
    let pet_Serial   = '' ;
    let pet_Species  = '' ;

    if( data['pet'] ){    // 是否有抓取 : 寵物資料
        pet_Name     = data['pet']['name'] ;
        pet_Serial   = data['pet']['serial'] ;
        pet_Species  = data['pet']['species'] ;
    }

    let style = '' ;
    if( service_Type === '基礎' ) style = 'is-warning';
    if( service_Type === '洗澡' ) style = 'is-success';
    if( service_Type === '美容' ) style = 'is-danger';

    let tagStyle = 'tag '+style+' is-medium is-light is-rounded' ;


    const star = { position : "absolute" , top : "0px" , left : "13px" } as const ;

    return <p className="title is-6">

               <span className={ tagStyle } > { q_Code } </span>  &nbsp;

               <span className="relative tag is-medium"  >
                   { cus_Name }
               </span>  &nbsp;

               <span className="relative tag is-medium"  >
                  { pet_Name } ( { string_Short ( pet_Species ) } )
               </span>

           </p> ;


} ;

export default Service_Rows ;