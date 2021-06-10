
import React from "react" ;
import { Service_Type } from "utils/Interface_Type"



{ /* 依據不同服務單，回傳相對應的 _ 標籤顏色、icon */ }
const useServiceType = ( serviceType : Service_Type ) => {

   let obj = {} as any ;

   if( serviceType === "基礎" ){
       obj.color = "tag is-medium is-warning is-light" ;
       obj.icon  = "far fa-list-alt"
   }

    if( serviceType === "洗澡" ){
       obj.color = "tag is-medium is-success is-light" ;
       obj.icon  = "fas fa-bath"
    }

    if( serviceType === "美容" ){
       obj.color = "tag is-medium is-danger is-light" ;
       obj.icon  = "fas fa-cut"
    }

    return obj ;

} ;

export default useServiceType ;