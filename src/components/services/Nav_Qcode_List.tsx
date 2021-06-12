
import React, {useEffect, useState} from "react"

import Date_picker from "utils/time/Date_picker";
import { get_Week_Day , get_Date_Cal } from "utils/time/date";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import { useRead_Date_Services } from "hooks/ajax_crud/useAjax_Read";
import {set_Side_Panel} from "store/actions/action_Global_Layout";
import Service_History from "components/services/Service_History";

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
    const show_Service = ( ) => {

        dispatch( set_Side_Panel(true , <Service_History /> , { preLoadData : null } ) ) ;

    } ;


    // 預設 Qcode ( Q01 ~ Q60 )
    const arr = [] ;
    for( let i=1 ; i<=60 ; i++ ){
        let num = ( i < 10 ) ? '0'+ i.toString() : i.toString() ;
        arr.push( num ) ;
    }

    useEffect(( ) => {

      // 設定 _ 特定查詢日期
      set_Service_Date( _service_Date ) ;

    } ,[ _service_Date ] ) ;


   return <>
              { /* 日期、前後調整    */ }
              <div className="columns is-mobile  is-multiline">

                  <div className="column is-4-desktop">

                      <br/>
                      <div className="tag is-large is-white">
                          <b> 查詢日期 : </b> &nbsp;
                          <Date_picker no_Past = { false }   set_Service_Date = { set_Service_Date } />
                      </div>

                  </div>

                  <div className="column is-4-desktop"> </div>

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
                       <span className="tag is-large" style={{color: "black"}}>
                          <i className="far fa-calendar-alt"></i> &nbsp;&nbsp;  <b>  { date_1 }&nbsp;( { date_1_W } )  </b>
                       </span>  <br/><br/><br/>

                          {

                              arr.map(( x , i) => {

                                  let obj : any = { pet_id : null } ;
                                  date_Service_1.forEach( y => { if( y['q_code'] === x ){ obj = y } }) ;

                                  return <div className="title is-6" key={ i }>
                                           <b className="tag is-medium is-white pointer" > Q{ x } </b> &nbsp;

                                            {
                                              obj['pet_id'] &&
                                                <b className="tag is-medium is-light is-success pointer" onClick={ show_Service } >
                                                    { obj['pet_id'] }
                                                </b>
                                            }



                                         </div> ;

                              })
                          }


                  </div>

                  { /*  第 2 天 */ }
                  <div className="column is-4-desktop">

                      <br/>
                      <span className="tag is-large" style={{color: "black"}}>
                          <i className="far fa-calendar-alt"></i> &nbsp;&nbsp; <b> { date_2 }&nbsp;( { date_2_W } )  </b>
                      </span>   <br/><br/><br/>

                      <div style={{ position : "relative" , left : "20px" }}>

                          {

                              arr.map(( x , i) => {

                                  let obj : any = { pet_id : null } ;
                                  date_Service_2.forEach( y => { if( y['q_code'] === x ){ obj = y } }) ;

                                  return <div className="title is-6" key={ i }>

                                      <b className="tag is-medium is-white pointer"  > Q{ x } </b> &nbsp;

                                      { obj['pet_id'] &&  <b className="tag is-medium is-light is-success pointer"> { obj['pet_id'] } </b>  }

                                  </div>

                              })
                          }

                      </div>

                  </div>

                  { /*  第 3 天 */ }
                  <div className="column is-4-desktop">

                      <br/>
                      <span className="tag is-large" style={{color: "black"}}>
                          <i className="far fa-calendar-alt"></i> &nbsp;&nbsp; <b> { date_3 }&nbsp;( { date_3_W } ) </b>
                      </span> <br/><br/><br/>

                      <div style={{ position : "relative" , left : "20px" }}>

                          {
                              arr.map(( x , i) => {

                                  let obj : any = { pet_id : null } ;
                                  date_Service_3.forEach( y => { if( y['q_code'] === x ){ obj = y } }) ;

                                  return <div className="title is-6" key={ i }>

                                      <b className="tag is-medium is-white pointer"  > Q{ x } </b> &nbsp;

                                      { obj['pet_id'] &&  <b className="tag is-medium is-light is-success pointer"> { obj['pet_id'] } </b>  }

                                  </div> ;

                              })
                          }

                      </div>

                  </div>


              </div>

              <br/><br/><br/><br/>

          </>

} ;

export default Nav_Qcode_List