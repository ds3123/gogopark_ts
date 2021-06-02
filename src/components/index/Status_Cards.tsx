
import React from "react" ;
import { Shop_Status  } from 'utils/Interface_Type'
import Service_Rows from "components/index/Service_Rows";




interface IStatus {

    shop_Status : Shop_Status ;
    pet_Arr     : {}[] ;
    service_Sum : { basic_Num : number ; bath_Num : number ; beauty_Num : number }

}


/* @ 到店狀態  */
const Status_Cards = ( props : IStatus ) => {

     const { shop_Status , pet_Arr , service_Sum  } = props ;
     const { basic_Num , bath_Num , beauty_Num }    = service_Sum ;


    // 各階段標題 Icon
    let title_Icon  ;
    if( shop_Status === '到店等候中' ){   title_Icon = <i className="fas fa-store"></i> ; }
    if( shop_Status === '到店美容中' ){   title_Icon = <i className="fas fa-cut"></i> ; }
    if( shop_Status === '洗完等候中' ){   title_Icon = <i className="fas fa-dog"></i> ; }
    if( shop_Status === '已回家( 房 )' ){ title_Icon = <i className="fas fa-store-alt"></i> ; }


    const boxShadow = { boxShadow : "1px 1px 4px 1px rgba(0,0,0,.2)" , position : "absolute" , top : "-35px" } as const ;
    const way_Leave = { textAlign : "right" , marginBottom : "0px" , fontSize : "11pt" } as const ;


    return  <div className="card" style={{ height:"550px"}}>

              <div className="card-content">

                  { /* 標題統計 */ }
                  <div className="media">

                      <div className="media-content">

                          <div className="level" >

                              <span className="level-item ">

                                <span className="tag is-large" style={ boxShadow } >

                                    { title_Icon } &nbsp;&nbsp;<b> { shop_Status }

                                </b> </span>

                                <div className="relative"  >

                                   <b className="tag is-medium is-light is-rounded"> 基 礎 &nbsp; <b className="tag is-rounded is-warning"> { basic_Num }  </b>  </b> &nbsp;
                                   <b className="tag is-medium is-light is-rounded"> 洗 澡 &nbsp; <b className="tag is-rounded is-success"> { bath_Num }   </b>  </b> &nbsp;
                                   <b className="tag is-medium is-light is-rounded"> 美 容 &nbsp; <b className="tag is-rounded is-danger"> { beauty_Num  } </b>  </b>

                                </div>

                              </span>

                          </div>

                      </div>

                  </div>

                  { /* 項目內容 */ }
                  <div className="media">

                      <div className="media-content">

                          <div className="card-frame">

                              {
                                  pet_Arr.map( ( x : any , y : number ) => {

                                      if( x['shop_status'] !== shop_Status  ) return ;

                                      let service_id = '' ;  // 資料表( 基礎、洗澡、美容 )
                                      if( x['service_type'] === '基礎' ) service_id = x['basic_id'] ;
                                      if( x['service_type'] === '洗澡' ) service_id = x['bath_id'] ;
                                      if( x['service_type'] === '美容' ) service_id = x['beauty_id'] ;

                                      return <React.Fragment key={y}>

                                                  { /* 等候方式 & 離店方式 ( for 洗完等候中 ) */ }
                                                  <div style={ way_Leave }  >
                                                      {  x['shop_status'] === '洗完等候中' &&
                                                          <div>
                                                              <b> { x['wait_way'] } </b> &nbsp; / &nbsp;
                                                              <span style = {  x['way_leave'] === '接送員接送' ? { color : "rgb(180,120,60)" } : {color:"rgba(0,0,0,.5)"}  }  >
                                                                          <b> { x['way_leave'] } </b> &nbsp; { x['expected_leave'] }
                                                                       </span>
                                                          </div>
                                                      }
                                                  </div>

                                                  { /* 服務項目 */ }
                                                  <Service_Rows service_id  = { service_id }
                                                                shop_Status = { shop_Status }
                                                                 data         = { x }/>

                                             </React.Fragment>

                                  })
                              }

                          </div>

                      </div>

                  </div>

              </div>

           </div> ;


} ;

export default Status_Cards ;