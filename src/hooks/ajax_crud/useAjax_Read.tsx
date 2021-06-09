import React, {useState, useEffect, useCallback} from "react" ;
import axios from "utils/axios" ;
import { Service_Type_Api } from 'utils/Interface_Type'


/* @ GET : 透過 Ajax _ 取得資料 */

/* # 取得 : 主要服務( 基礎、洗澡、美容 ) 與 客戶、寵物資料  */
export const useRead_Service_Cus_Pet = ( serviceType? : Service_Type_Api ) => {

    const [ data , setData ] = useState( [] ) ;

    // 判斷 _ 要取得單一類型資料，或所有資料
    const api = serviceType ? `/${ serviceType }/show_with_cus_pet/` : '/services/show_with_cus_pet/' ;

    // 取得資料
    useEffect(()=>{

       axios.get( api ).then(res => { setData( res.data ) ; });

    },[]) ;

    return data ;

} ;

