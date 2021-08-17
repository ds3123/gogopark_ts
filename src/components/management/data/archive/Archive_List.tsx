
import React, {useEffect, useState} from "react"
import Customers from "components/management/data/archive/Customers"
import Pets from "components/management/data/archive/Pets"
import Services from "components/management/data/archive/Services"

import cookie from "react-cookies";




// 分類標籤
const tabs = [ '客 戶' , '寵 物' , '洗 美' , '方 案' , '住 宿' , '安 親' ] ;


// @ 封存列表
const Archive_List = ( ) => {

    // 目前點選標籤
   const [ current_Tab , set_Current_Tab ]         = useState( tabs[0] ) ;

   // 目前點選標籤，相對應元件
   const [ current_Element , set_Current_Element ] = useState< JSX.Element | null >( null )

   // 點選 _ 標籤
   const click_Tab = ( tab : string ) => {

       // 設定 _ 標籤樣式
       set_Current_Tab( tab )

       // 回傳標籤相對應元件
       switch ( tab ) {

           case tabs[0] : set_Current_Element( <Customers /> ) ; break ;
           case tabs[1] : set_Current_Element( <Pets /> ) ; break ;
           case tabs[2] : set_Current_Element( <Services /> ) ; break ;
           case tabs[3] : set_Current_Element( null ) ; break ;
           case tabs[4] : set_Current_Element( null ) ; break ;
           case tabs[5] : set_Current_Element( null ) ; break ;

       }

   } ;

   // 設定 _ 目前顯示頁面元件
   useEffect(( ) => {

     set_Current_Element( <Customers /> )

   } ,[] ) ;


   // 設定 _ 回復封存、刪除資料後，更新頁面並自動點選相對應頁籤
   useEffect(( ) => {

       // Cookie
       const redirect = cookie.load('after_Edit_Archive') ;

       // 點選 _ 相對應頁籤
       if( redirect && redirect === '寵物' ) click_Tab( '寵 物' ) ;
       if( redirect && redirect === '洗美' ) click_Tab( '洗 美' ) ;

       //click_Tab('洗 美')

   } ,[] ) ;



  const bar = { width:"100%", top:"-15px" , padding:"0px" , justifyContent : "left"  } ;

  return <>

            <b className="tag is-large relative is-white" style={ bar } >

              {
                  tabs.map( ( x , y ) => {

                     return <b key={ y } className = { `tag pointer is-medium ${ current_Tab === x ? 'is-primary' : 'is-white' } `   }
                                         style     = {{ marginRight : "35px" }}
                                         onClick   = { () => click_Tab( x ) } >

                               { x }

                            </b>

                  })

              }


            </b>

            <br/><br/><br/>


            { current_Element }

         </>


} ;

export default Archive_List