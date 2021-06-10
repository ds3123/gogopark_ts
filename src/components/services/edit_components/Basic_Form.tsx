import React, {FC, useEffect, useState} from "react" ;
import { Edit_Form_Type } from "utils/Interface_Type"
import { useRead_All_Prices } from "hooks/ajax_crud/useAjax_Read";


/* 基礎單選項 */
const Basic_Form : FC<Edit_Form_Type> = ({ register , errors , isDirty , isValid }  ) => {

   const basicPrices = useRead_All_Prices( ) ;                                               // 基礎所有價格

   const [ basicArr , set_basicArr ] = useState<string[]>( [] ) ;                  // 所點選基礎


   const get_Price = ( title : string  ) => {

       if( basicArr.indexOf( title ) !== -1 ){  // 重複點選同樣選項 --> 刪除

           const _basicArr = [...basicArr] ;

           _basicArr.splice( basicArr.indexOf( title )  , 1 ) ;

           set_basicArr( _basicArr ) ;

       }else if( title === "請選擇" ){          //  修腳緣改回請選擇 -->

           const filter_basicArr = basicArr.filter( x => { return x!== "修腳緣_大狗" && x !== "修腳緣_中狗" && x !== "修腳緣_小狗"  } )

           set_basicArr( filter_basicArr ) ;

       }else if( ( title === "修腳緣_大狗" || title === "修腳緣_中狗" || title === "修腳緣_小狗" ) && basicArr.indexOf("修腳緣") !== -1  ){

           // 以上條件再修改
           const filter_basicArr = basicArr.filter( x => { return x.indexOf("修腳緣") === -1  } )

           set_basicArr( [...filter_basicArr , title ] ) ;

       }else{                                    // 尚未點選 --> 加入

           set_basicArr( [ ...basicArr , title ] ) ;

       }


   }



    useEffect(( ) => {

        console.log( basicArr )

    } ,[ basicArr ]) ;




   return <>
             <b className="tag is-large is-warning" >
                <i className="far fa-list-alt"></i> &nbsp; 基 礎
             </b> <br/><br/>

             <div className="columns is-multiline is-mobile">

               <div className="column is-2-desktop">
                 <input type="checkbox" value = "剪指甲" { ...register( "basic_Option" ) } onChange={ e => get_Price( e.target.value )} /> 剪指甲
               </div>

               <div className="column is-2-desktop">
                 <input type="checkbox" value = "擠肛門腺" { ...register( "basic_Option" ) } onChange={ e => get_Price( e.target.value )} /> 擠肛門腺
               </div>

               <div className="column is-2-desktop">
                 <input type="checkbox" value = "眼周修開" { ...register( "basic_Option" ) } onChange={ e => get_Price( e.target.value )} /> 眼周修開
               </div>

               <div className="column is-2-desktop">
                 <input type="checkbox" value = "拔耳毛、清耳朵" { ...register( "basic_Option" ) } onChange={ e => get_Price( e.target.value )} /> 拔耳毛、清耳朵
               </div>

               <div className="column is-2-desktop">
                 <input type="checkbox" value = "貴賓腳" { ...register( "basic_Option" ) } onChange={ e => get_Price( e.target.value )} /> 貴賓腳
               </div>

               <div className="column is-2-desktop">
                 <input type="checkbox" value = "剃腳底毛" { ...register( "basic_Option" ) } onChange={ e => get_Price( e.target.value )} /> 剃腳底毛
               </div>

               <div className="column is-4-desktop">
                 <input type="checkbox" value = "剃肚子毛" { ...register( "basic_Option" ) } onChange={ e => get_Price( e.target.value )} /> 剃肚子毛 ( 中、大型犬不剃肚毛 )
               </div>

               <div className="column is-8-desktop">

                     修腳緣 &nbsp;
                     <div className="select">
                       <select { ...register( "basic_Option_Foot" ) }  onChange={ e => get_Price( e.target.value )} >
                         <option value="請選擇">請選擇</option>
                         <option value="修腳緣_大狗">大狗</option>
                         <option value="修腳緣_中狗">中狗</option>
                         <option value="修腳緣_小狗">小狗</option>
                       </select>
                     </div>

               </div>

             </div>

             <br/><hr/><br/>

          </>


} ;

export default Basic_Form ;