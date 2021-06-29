
import React, {useEffect, useState,FC} from "react" ;
import {useSelector} from "react-redux";
import { useRead_Qcode_Service_Date } from "hooks/ajax_crud/useAjax_Read";
import {Edit_Form_Type} from "utils/Interface_Type";


const Qcode_Select_Options : FC<Edit_Form_Type> = ( { register } )  => {


    // 特定日期，所有服務，已被使用的 Q 碼
    const Qcodes_Used_By_Date = useRead_Qcode_Service_Date() ;

    // 可供使用的 Q_code
    let [ available_Qcode , set_Ava_Q ] = useState<any[]>([]);


   /* --------- 當天 / 目前 _ 可供使用 Q Number ( START ) ---------  */

    // 建立 _ 預設 : Q 碼編號 ( 1 ~ 60 )
    let default_Q_arr = [] as any[] ;

    for( let i = 1 as any ; i <= 60 ; i++ ){
        if( i<10 ){ i = '0'+i ; }  // 小於 10 , 加 "0"
        default_Q_arr.push( i.toString() ) ;
    }

    useEffect(( ) => {

        const _Qcodes_Used_By_Date =  [...Qcodes_Used_By_Date] as string[] ; // 確認型別 ( 否則會出現 never )

        // 取得 : 目前可供使用 Q Number
        const avaiable_Q_Arr = default_Q_arr.filter( ( x  ) => {  return _Qcodes_Used_By_Date.indexOf( x ) === -1 ; } ) ;

        set_Ava_Q( avaiable_Q_Arr ) ;

    } ,[ Qcodes_Used_By_Date ] ) ;

    const way = {  fontSize : "11pt" , top : "-3px" , fontWeight : "bold" , color : "rgb(150,0,0)"  } ;


    return  <div className="tag is-large is-white">

                <span> 到店處理碼 ( Q ) : </span> &nbsp;
                <div className="select is-small" >

                   <select  {...register( "shop_Q_Code" )} style = { way } >
                        {
                           available_Qcode.map( (x,y) => {
                              return <option key={y} value={x} > {x} </option>
                           } )
                        }
                   </select>

                </div>

             </div>

} ;

export default Qcode_Select_Options ;