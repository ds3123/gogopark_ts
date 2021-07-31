

import React , {FC} from "react"



type detail = {

    servicePrice  : number ;

    pickupFee     : number ; // 接送費

    extraItem?    : number ; // 加價項目
    extraBeauty?  : number ; // 加價美容

    adjustAmount? : number ; // 自行調整金額 ( 包月洗澡、包月美容 )

}


/* @ 金額所包含 _ 費用明細 */

const margin = { marginLeft : "10px" , marginBottom : "15px" } ;

// 基礎
export const FeeDetail_Basic : FC< detail > = ( {  pickupFee, servicePrice  } ) => {

        return  <>
                  { servicePrice !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 基礎費 : { servicePrice } 元  </b> }
                  { pickupFee !== 0    && <b className="tag is-medium is-rounded" style={ margin }> 接送費 : { pickupFee } 元     </b> }
                </>

} ;


// 洗澡
export const FeeDetail_Bath : FC< detail > = ( { pickupFee, servicePrice, extraItem , extraBeauty} ) => {

        return  <>
                   { servicePrice !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 洗澡費 :   { servicePrice } 元  </b> }
                   { pickupFee !== 0    && <b className="tag is-medium is-rounded" style={ margin }> 接送費 :   { pickupFee } 元     </b> }
                   { extraItem !== 0    && <b className="tag is-medium is-rounded" style={ margin }> 加價項目 : { extraItem } 元     </b> }
                   { extraBeauty !== 0  && <b className="tag is-medium is-rounded" style={ margin }> 加價美容 : { extraBeauty } 元   </b> }
                </>

} ;


// 美容
export const FeeDetail_Beauty : FC< detail > = ( { pickupFee, servicePrice, extraItem } ) => {

    return  <>
                { servicePrice !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 美容費 :   { servicePrice } 元  </b> }
                { pickupFee !== 0    && <b className="tag is-medium is-rounded" style={ margin }> 接送費 :   { pickupFee } 元     </b> }
                { extraItem !== 0    && <b className="tag is-medium is-rounded" style={ margin }> 加價項目 : { extraItem } 元     </b> }
            </>

} ;


// 方案 : 包月洗澡
export const FeeDetail_Plan_Bath : FC< detail > = ( { servicePrice, adjustAmount , pickupFee } ) => {

    return  <>
                { servicePrice !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 包月洗澡 _ 基本價格 : { servicePrice } 元  </b> }
                { adjustAmount !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 自行調整金額 :        { adjustAmount } 元     </b> }
                { pickupFee !== 0    && <b className="tag is-medium is-rounded" style={ margin }> 接送費 :             { pickupFee } 元     </b> }
            </>

} ;


// 方案 : 包月美容
export const FeeDetail_Plan_Beauty : FC< detail > = ( { servicePrice, adjustAmount , pickupFee } ) => {

    return  <>
                { servicePrice !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 包月美容 _ 基本價格 : { servicePrice } 元  </b> }
                { adjustAmount !== 0 && <b className="tag is-medium is-rounded" style={ margin }> 自行調整金額 :        { adjustAmount } 元  </b> }
                { pickupFee !== 0    && <b className="tag is-medium is-rounded" style={ margin }> 接送費 :             { pickupFee } 元     </b> }
            </>

} ;



