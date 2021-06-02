

import React , { useState } from "react" ;

/*
*
*  @ 今日來店、今日統計
*
*/

const Statistics_Rows = () => {


    const [ today_Shop , set_TodayShop  ] = useState( true );
    const [ today_Stat , set_TodayStat  ] = useState( true );


    const click_Today_Shop = () => {


    } ;

    const click_Today_Stat = () => {


    } ;

    const atype = {

        display      : "inline-block" ,
        width        : "70px",
        height       : "30px" ,
        background   : "white" ,
        borderRadius : "20px" ,
        textAlign    : "center"

    } as const  ;


  return <React.Fragment>

          { /* 今日預約來店 、今日現場來店 */ }
          <div className="columns is-mobile  is-multiline">

              <div className="column is-12-desktop">

                  <div className="tags has-addons" >

                      <b className= { today_Shop ? "tag is-large is-info" : "tag is-large is-info is-light" } onClick={ ()=> click_Today_Shop() }>
                          <i className="far fa-calendar-check"></i> &nbsp; 今日來店
                      </b>

                      { today_Shop &&

                      <React.Fragment>

                           <span className="tag is-large is-light">
                               <b style={atype}> 預 約 </b>  &nbsp; &nbsp;
                               <i className="fas fa-bath"></i> &nbsp; 洗澡 :&nbsp; <b style={{color:"rgb(150,0,0)"}}> 7 </b>
                           </span>

                           <span className="tag is-large is-light">
                               <i className="fas fa-cut"></i> &nbsp; 美容 : &nbsp; <b style={{color:"rgb(150,0,0)"}}> 6 </b>
                           </span>

                           <span className="tag is-large is-light">
                               <b style={atype}> 現 場 </b>  &nbsp; &nbsp;
                               <i className="fas fa-bath"></i> &nbsp; 基礎 :&nbsp; <b style={{color:"rgb(150,0,0)"}}> 3 </b>
                           </span>

                           <span className="tag is-large is-light">
                               <i className="far fa-list-alt"></i> &nbsp; 洗澡 : &nbsp; <b style={{color:"rgb(150,0,0)"}}> 2 </b>
                           </span>

                          <span className="tag is-large is-light">
                              <i className="fas fa-cut"></i> &nbsp; 美容 : &nbsp; <b style={{color:"rgb(150,0,0)"}}> 3 </b>
                          </span>

                          <span className="tag is-large is-black">
                              <i className="far fa-list-alt" ></i>
                          </span>

                      </React.Fragment>

                      }

                  </div>


              </div>

          </div>

          { /* 今日營業統計 */ }
          <div className="columns is-mobile  is-multiline ">

              <div className="column is-12-desktop">

                  <div className="tags has-addons " >

                      <b className= { today_Stat ? "tag is-large is-primary" : "tag is-large is-primary is-light" } onClick={ () => click_Today_Stat() }>
                          <i className="fas fa-calculator"></i> &nbsp; 今日統計
                      </b>

                      {  today_Stat &&

                      <React.Fragment>

                          <span className="tag is-large is-light">
                               <i className="fas fa-bath"></i> &nbsp; 基礎 <b>完</b> &nbsp; :&nbsp; <b
                               style={{color: "rgb(150,0,0)"}}> 3 </b>
                          </span>

                          <span className="tag is-large is-light">
                              <i className="fas fa-bath"></i> &nbsp; 洗澡 <b>完</b> &nbsp; :&nbsp; <b
                              style={{color: "rgb(150,0,0)"}}> 4 </b>
                          </span>

                          <span className="tag is-large is-light">
                              <i className="fas fa-cut"></i> &nbsp; 美容 <b>完</b> &nbsp;: &nbsp; <b
                              style={{color: "rgb(150,0,0)"}}> 5 </b>
                          </span>

                          <span className="tag is-large is-light  is-info">
                              <i className="fas fa-phone-slash"></i> &nbsp; 取消預約 : &nbsp;
                              <b> 0 </b>
                          </span>

                          <span className="tag is-large is-light is-danger" >
                              <i className="fas fa-exclamation"></i> &nbsp; 服務異常 : &nbsp;
                              <b> 4 </b>
                          </span>

                      </React.Fragment>

                      }

                  </div>

              </div>

          </div>

         </React.Fragment>

} ;

export default Statistics_Rows ;