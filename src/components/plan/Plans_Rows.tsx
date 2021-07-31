import React, {useEffect, useState} from "react"

import useServiceType from "hooks/layout/useServiceType";
import {set_Side_Panel} from "store/actions/action_Global_Layout";
import {useDispatch} from "react-redux";

import Update_Plan from "components/plan/edit/Update_Plan";




const Plans_Rows = ( props : any ) => {

    const { data } = props ;

    const dispatch = useDispatch();


    // console.log( data )

    // 客戶資料
    const customer = data['customer'] ? data['customer'] : {} ;

    // 寵物品種資料
    const pet_species = data['pet_species'] ? data['pet_species'] : {} ;


    // 方案使用紀錄
    const plan_used_records = data['plan_used_records'] ;


    // 方案類型欄位 : 顏色、Icon
    const { color , icon }  = useServiceType( data[ 'plan_type' ] , false , 'medium' );


    // 方案 _ 已使用次數
    const [ used_Record , set_Used_Record ] = useState({
                                                                    bath   : 0 , // 洗澡
                                                                    beauty : 0   // 美容
                                                                  }) ;

    // 計算 _ 方案已使用次數
    useEffect(() => {

       if( plan_used_records.length > 0 ){

           const bath_Num   = plan_used_records.filter( ( x:any ) => x['service_type'] === '洗澡' ).length ;
           const beauty_Num = plan_used_records.filter( ( x:any ) => x['service_type'] === '美容' ).length ;

           set_Used_Record( { ...used_Record , bath : bath_Num , beauty : beauty_Num } ) ;

       }

    } ,[] ) ;


    // 點選 _ 方案類型
    // const click_Service = () => dispatch( set_Side_Panel(true , <Update_Service /> , { service_Type : data['service_type'] ,  preLoadData : data } as { service_Type : string } ) ) ;
    const click_Plan_Type          = () => dispatch( set_Side_Panel(true , <Update_Plan /> , {  preLoadData : data } ) ) ;


    // 點選 _ 客戶資訊
    const click_Customer_Name      = () => dispatch( set_Side_Panel(true , null , { } ) ) ;


    // 點選 _ 使用情形 : 洗澡
    const click_UsedRecords_Bath   = () => dispatch( set_Side_Panel(true , null , { } ) ) ;


    // 點選 _ 使用情形 : 美容
    const click_UsedRecords_Beauty = () => dispatch( set_Side_Panel(true , null , { } ) ) ;



    const left = { textAlign:"left" } as const ;

    return  <tr>
               <td>
                   <b className = { color+" pointer" } onClick = { click_Plan_Type } >
                       <i className = { icon } ></i> &nbsp;   { data['plan_type'] }
                   </b>
               </td>
               <td>
                   { customer['name'] &&
                     <b className="tag is-medium pointer" onClick = { click_Customer_Name } >
                         {  customer['name'] } ( { customer['mobile_phone'] } )
                     </b>
                   }
               </td>
               <td> { pet_species['name'] }             </td>
               <td> { data['plan_fee_total'] } 元       </td>
               <td> { data['created_at'].slice(0,10) }  </td>
               <td>                                     </td>
               <td>                                     </td>
               <td style={ left }>

                   { data['plan_type'] === '包月洗澡' &&

                       <b className="tag is-medium is-success is-light is-rounded pointer" onClick={click_UsedRecords_Bath}>
                           洗 澡 &nbsp; <b className="tag is-rounded is-success"> { used_Record['bath'] } / 4 </b>
                       </b>

                   }

                   { data['plan_type'] === '包月美容' &&

                       <>
                           <b className="tag is-medium is-success is-light is-rounded pointer" onClick={click_UsedRecords_Bath}>
                               洗 澡 &nbsp; <b className="tag is-rounded is-success"> { used_Record['bath'] } / 3 </b>
                           </b>
                           &nbsp; &nbsp;
                           <b className="tag is-medium is-danger is-light is-rounded pointer" onClick = { click_UsedRecords_Beauty } >
                               美 容 &nbsp; <b className="tag is-rounded is-danger"> { used_Record['beauty'] } / 1 </b>
                           </b>
                       </>

                   }

               </td>
               <td> <i className="fas fa-download pointer"></i> </td>
            </tr>

} ;

export default Plans_Rows