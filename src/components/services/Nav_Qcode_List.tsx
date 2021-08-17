
import React, {useEffect, useState} from "react"

import Date_picker from "utils/time/Date_picker";
import { get_Week_Day , get_Date_Cal } from "utils/time/date";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import { useRead_Date_Services } from "hooks/ajax_crud/useAjax_Read";
import {set_Side_Panel} from "store/actions/action_Global_Layout";

import Update_Service from "components/services/edit/Update_Service";


{ /* 導覽列 _ Q 碼列表 */}
const Nav_Qcode_List = ( ) => {

    const _service_Date = useSelector( ( state : any ) => state.Info.service_Date ) ;  // 預設今日
    const dispatch      = useDispatch();

    // 查詢日期
    let [ service_Date , set_Service_Date ] = useState( _service_Date );


    // 查詢期間 : 當天、隔天、後天 等 3 個日期 ( 星期 )
    let date_1   = moment( service_Date ).format( 'YYYY-MM-DD' )  ;
    let date_1_W = get_Week_Day( date_1 ) ;

    let date_2   = moment( get_Date_Cal( date_1 , 1 ) ).format( 'YYYY-MM-DD' ) ;
    let date_2_W = get_Week_Day( date_2 ) ;

    let date_3   = moment( get_Date_Cal( date_1 , 2 ) ).format( 'YYYY-MM-DD' ) ;
    let date_3_W = get_Week_Day( date_3 ) ;

    let date_next = moment( get_Date_Cal( date_1 , 3 ) ).format( 'YYYY-MM-DD' ) ;
    let date_prev = moment( get_Date_Cal( date_1 , -3 ) ).format( 'YYYY-MM-DD' ) ;

    // 取得 _ 特定日期，服務單資料
    const date_Service_1 = useRead_Date_Services( date_1 ) ;
    const date_Service_2 = useRead_Date_Services( date_2 ) ;
    const date_Service_3 = useRead_Date_Services( date_3 ) ;


    // 下一個查詢期間
    const next = () => { set_Service_Date( date_next ); } ;

    // 上一個查詢期間
    const prev = () => { set_Service_Date( date_prev );  } ;


    // 點選 _ 資料單
    const show_Service = ( data : any ) => {

        dispatch( set_Side_Panel(true ,
                                   <Update_Service /> ,
                                   { source_Page : 'Q_Code_List' ,service_Type : data['service_type'] ,  preLoadData : data } as { service_Type : string }
                                ) ) ;

    } ;


    // 生成 _ 預設 Qcode ( Q01 ~ Q60 )
    const set_Default_Arr = ( ) => {

        const arr = [] ;

        for( let i=1 ; i<=60 ; i++ ){
            let num = ( i < 10 ) ? '0'+ i.toString() : i.toString() ;
            arr.push( num ) ;
        }

        return arr

    } ;

    // 設定 _ 服務標籤 : 內容
    const set_Tag_Service = ( date_Service : any[] , x : string ) => {

        let service : any = null ;

        // 為預設特 Q 碼，配上 服務內容
        date_Service.forEach( y => { if( y['q_code'] === x ){ service = y }  }) ;

        return service

    } ;

    // 設定 _ 服務標籤 : icon、顏色
    const set_Tag_Style = ( service : { service_type : string } ) => {

        let style = { icon : '' , color : 'is-gray' } ;

        if( service && service['service_type'] === '基礎' ){
            style.icon  = 'fas fa-list-alt' ;
            style.color = 'is-warning' ;
        }

        if( service && service['service_type'] === '洗澡' ){
            style.icon  = 'fas fa-bath' ;
            style.color = 'is-success' ;
        }

        if( service && service['service_type'] === '美容' ){
            style.icon  = 'fas fa-cut' ;
            style.color = 'is-danger' ;
        }

        if( service && ( service['service_type'] === '一般安親' || service['service_type'] === '住宿_提早抵達' || service['service_type'] === '住宿_延後帶走' ) ){
            style.icon  = 'fas fa-baby-carriage' ;
            style.color = 'is-link' ;
        }

        return style ;


    } ;

    // 生成 _ Qcode 服務列表
    const set_Qcode_List = ( date_Service : any[] ) => {

       const arr = set_Default_Arr() ;

       return arr.map(( x , i) => {

                       const service = set_Tag_Service( date_Service , x ) ;  // 為預設特定 Q 碼，配上服務內容
                       const style   = set_Tag_Style( service );              // 設定 _ 服務標籤 icon、顏色

                       return <div className="title is-6" key={ i } >

                                   <b className="tag is-medium is-white pointer" > Q{ x } </b> &nbsp;

                                   { /* 服務標籤 */ }
                                   { ( service && service['service_type'] && service['pet'] ) &&

                                       <b className= { `tag is-medium is-light ${ style['color'] } pointer` } onClick={ () => show_Service( service ) } >
                                           <i className={ style['icon'] }></i> &nbsp; { service['service_type'] } &nbsp;

                                           { service['pet']['name'] } ( { service['pet']['species'] } )

                                       </b>

                                   }

                               </div> ;

                   })

    } ;


    useEffect(( ) => {

      // 設定 _ 特定查詢日期
      set_Service_Date( _service_Date ) ;

    } ,[ _service_Date ] ) ;


   return <>
              { /* 日期、前後調整    */ }
              <div className="columns is-mobile  is-multiline">

                  { /* 查詢日期 */ }
                  <div className="column is-4-desktop">

                      <br/>
                      <div className="tag is-large is-white">
                          <b> 查詢日期 : </b> &nbsp;
                          <Date_picker no_Past = { false }   set_Service_Date = { set_Service_Date } />
                      </div>

                  </div>

                  <div className="column is-4-desktop"> </div>

                  { /* 向前、向後 調整日期 */ }
                  <div className="column is-4-desktop"> <br/>

                      <span style={{ float : "right" }}>  &nbsp; &nbsp;
                          <span className="tag is-large is-success pointer" onClick={ () => prev() }> &lt; </span> &nbsp; &nbsp;
                          <span className="tag is-large is-success pointer" onClick={ () => next() }> &gt; </span>
                      </span>

                  </div>

              </div>

              { /* 3 個日期 Q 碼欄  */ }
              <div className="columns is-mobile  is-multiline">

                  { /*  第 1 天 */ }
                  <div className="column is-4-desktop">

                       <br/>
                       <span className="tag is-large relative" style={{color: "black"}}>
                          <i className="far fa-calendar-alt"></i> &nbsp;&nbsp;  <b>  { date_1 }&nbsp;( { date_1_W } )  </b>
                       </span>  <br/><br/><br/>

                       { set_Qcode_List( date_Service_1 ) }

                  </div>

                  { /*  第 2 天 */ }
                  <div className="column is-4-desktop">

                      <br/>
                      <span className="tag is-large" style={{color: "black"}}>
                          <i className="far fa-calendar-alt"></i> &nbsp;&nbsp; <b> { date_2 }&nbsp;( { date_2_W } )  </b>
                      </span>   <br/><br/><br/>

                      { set_Qcode_List( date_Service_2 ) }

                  </div>

                  { /*  第 3 天 */ }
                  <div className="column is-4-desktop">

                      <br/>
                      <span className="tag is-large" style={{color: "black"}}>
                          <i className="far fa-calendar-alt"></i> &nbsp;&nbsp; <b> { date_3 }&nbsp;( { date_3_W } ) </b>
                      </span> <br/><br/><br/>

                      { set_Qcode_List( date_Service_3 ) }

                  </div>


              </div>

              <br/><br/><br/><br/>

          </>

} ;

export default Nav_Qcode_List