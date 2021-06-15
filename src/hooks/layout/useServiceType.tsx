
import React from "react" ;
import { Service_Type } from "utils/Interface_Type"



{ /* 依據不同服務單，回傳相對應的 _ 標籤顏色、icon */ }
const useServiceType = ( serviceType? : Service_Type | null , func? : boolean , size?:'large' | 'medium'  ) => {

   // 回傳 : 函式

   const get_ServiceType = ( _serviceType : Service_Type ) => {

       let _obj = {} as any ;

       if( _serviceType === "基礎" ){
           _obj.color =  size ? `tag is-${ size } is-warning is-light pointer` : 'tag is-large is-warning is-light pointer' ;
           _obj.icon  = "far fa-list-alt"
       }

       if( _serviceType === "洗澡" ){
           _obj.color = size ? `tag is-${ size } is-success is-light pointer` : 'tag is-large is-success is-light pointer' ;
           _obj.icon  = "fas fa-bath"
       }

       if( _serviceType === "美容" ){
           _obj.color = size ? `tag is-${ size } is-danger is-light pointer` : 'tag is-large is-danger is-light pointer' ;
           _obj.icon  = "fas fa-cut"
       }

       return _obj ;

   } ;

   if( func ) return get_ServiceType ;

   // 回傳 : 物件 -------------------------------


   let obj = {} as any ;

   if( serviceType === "基礎" ){
       obj.color =  size ? `tag is-${ size } is-warning is-light pointer` : 'tag is-large is-warning is-light pointer' ;
       obj.icon  = "far fa-list-alt"
   }

    if( serviceType === "洗澡" ){
       obj.color = size ? `tag is-${ size } is-success is-light pointer` : 'tag is-large is-success is-light pointer' ;
       obj.icon  = "fas fa-bath"
    }

    if( serviceType === "美容" ){
       obj.color = size ? `tag is-${ size } is-danger is-light pointer` : 'tag is-large is-danger is-light pointer' ;
       obj.icon  = "fas fa-cut"
    }

    return obj ;

} ;

export default useServiceType ;