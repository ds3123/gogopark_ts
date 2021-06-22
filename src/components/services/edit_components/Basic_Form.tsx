import React, {FC, useEffect, useState} from "react" ;
import { Edit_Form_Type } from "utils/Interface_Type"
import { useRead_All_Prices } from "hooks/ajax_crud/useAjax_Read";
import {useDispatch} from "react-redux";

// Redux
import { set_BasicSumPrice } from "store/actions/action_Basic"


/* 基礎單選項 */
const Basic_Form : FC<Edit_Form_Type> = ({ register , errors , isDirty , isValid }  ) => {

   const dispatch    = useDispatch() ;
   const basicPrices = useRead_All_Prices( ) ; // 讀取 _ 基礎所有價格資料

   //console.log( basicPrices )

   // 所填寫 _ 基礎價格
   const [ price , set_Price ] = useState<number>( 0 ) ;

   // 所點選 _ 基礎選項
   const [ basicArr , set_basicArr ]       = useState<string[]>( [] ) ; // checkbox
   const [ basicSelect , set_basicSelect ] = useState<string>( "" ) ;   // select

    // 取得 _ 所點選 checkbox
    const get_Checkbox = ( title : string  ) => {

       if( basicArr.indexOf( title ) !== -1 ){  // 重複點選同樣選項 --> 刪除

           const _basicArr = [...basicArr] ;
           _basicArr.splice( basicArr.indexOf( title )  , 1 ) ;
           set_basicArr( _basicArr ) ;

       }else{                                    // 尚未點選 --> 加入

           set_basicArr( [ ...basicArr , title ] ) ;

       }

   } ;

    // 取得 _ 所選擇 select
    const get_Select   = ( title : string ) => {

       if( title === "請選擇" ){
           set_basicSelect("") ;
           return false ;
       }

       set_basicSelect( title );

    } ;

    // 查詢 _ 基礎項目價格
    const query_Price = ( item : string ) => {


       const arr = basicPrices.map( x => {

           // console.log( x['price'] )


           return x['item'] === item

       }) ;

      // console.log( arr.length )

    } ;


    useEffect(( ) => {

        let _basicArr = [ ...basicArr ]  ;  // checkbox 加入 select
        if( basicSelect !== "" ) _basicArr = [ ...basicArr , basicSelect  ] ;

        let _price = 0 ;

        if( _basicArr.length > 0 ){

            _basicArr.forEach( x => {

                basicPrices.forEach( y => {

                   const _item = y['item'] as any ;

                   if( x === ( _item.trim() ) ) _price += y['price'] ;

                } )

            })

        }

        set_Price( _price ) ;                     // 設定 _ 價格小計
        dispatch( set_BasicSumPrice( _price ) ) ; // 設定 _ Store

    } ,[ basicArr , basicSelect ] ) ;


   return <>
             <b className="tag is-large is-warning" >

                <i className="far fa-list-alt"></i> &nbsp; 基 礎

                { /* 顯示 : 基礎價格 */ }
                { price !== 0 &&
                  <>
                    &nbsp;&nbsp;
                    <b className="tag is-rounded" style={{ fontSize : "12pt" }}> 小計 : <span style={{color:"red"}}> &nbsp; { price } &nbsp; </span> 元</b>
                  </>
                }

             </b> <br/><br/>

             <div className="columns is-multiline is-mobile">

               <div className="column is-2-desktop">
                 <input type="checkbox" value = "剪指甲" { ...register( "basic_Option" ) } onChange={ e => get_Checkbox( e.target.value )} /> <b>剪指甲</b>
               </div>

               <div className="column is-2-desktop">
                 <input type="checkbox" value = "擠肛門腺" { ...register( "basic_Option" ) } onChange={ e => get_Checkbox( e.target.value )} /> <b>擠肛門腺</b>
               </div>

               <div className="column is-2-desktop">
                 <input type="checkbox" value = "眼周修開" { ...register( "basic_Option" ) } onChange={ e => get_Checkbox( e.target.value )} /> <b>眼周修開</b>
               </div>

               <div className="column is-2-desktop">
                 <input type="checkbox" value = "拔耳毛、清耳朵" { ...register( "basic_Option" ) } onChange={ e => get_Checkbox( e.target.value )} /> <b>拔耳毛、清耳朵</b>
               </div>

               <div className="column is-2-desktop">
                 <input type="checkbox" value = "貴賓腳" { ...register( "basic_Option" ) } onChange={ e => get_Checkbox( e.target.value )} /> <b>貴賓腳</b>
               </div>

               <div className="column is-2-desktop">
                 <input type="checkbox" value = "剃腳底毛" { ...register( "basic_Option" ) } onChange={ e => get_Checkbox( e.target.value )} /> <b>剃腳底毛</b>
               </div>

               <div className="column is-4-desktop">
                 <input type="checkbox" value = "剃肚子毛" { ...register( "basic_Option" ) } onChange={ e => get_Checkbox( e.target.value )} /> <b>剃肚子毛</b> ( 中大型犬一般不剃肚毛 )
               </div>

               <div className="column is-8-desktop">

                     <b>修腳緣</b> &nbsp;
                     <div className="select">
                       <select { ...register( "basic_Option_Foot" ) }  onChange={ e => get_Select( e.target.value )} >
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