
import React , { useState }  from "react" ;
import Pet_Info_Title from "components/beautician/main_components/pet_info/Pet_Info_Title"
import {useSelector} from "react-redux";



{ /* 寵物基本資訊 */}
const Pet_Info = ()=>{

  // 目前所點選寵物
  const data       = useSelector( ( state : any ) => state.Beautician.Current_Pet ) ;

  const basicFoot  =  data['basic_foot'] ? data['basic_foot'] : '' ;
  const basicItems = ( data['basic_data'] + basicFoot  ).split(',') ;    // 所點選 _　基礎項目

  return <>

            <div className="columns is-multiline  is-mobile" >

                  { /* 標題資訊 */ }
                  <div className = "column is-6-desktop relative" >

                      <Pet_Info_Title />

                  </div>

                  { /* 到店時間、期望離店時間 */ }
                  <div className = "column is-6-desktop relative" >

                      <b className="tag is-medium is-white"> <i className="far fa-clock"></i> &nbsp;  到店時間 : </b>
                      <b> { data['actual_arrive'] } </b>  &nbsp; &nbsp;

                      <b className="tag is-medium is-white"> <i className="far fa-clock"></i> &nbsp;  期望離店時間 : </b>
                      <b className="tag is-danger is-medium is-light" > { data['expected_leave'] } </b>

                  </div>

                  { /* 自備物品 */ }
                  <div className = "column is-6-desktop relative" >
                      <b className="tag is-medium is-white"> <i className="fas fa-gavel"></i>  &nbsp; 自備物品 : </b>
                      <b className="fDred"> { data['customer_object'] } </b>
                  </div>

                  { /* 主人交代  */ }
                  <div className = "column is-6-desktop relative"  >
                      <b className="tag is-medium is-white"> <i className="fas fa-user-tag"></i> &nbsp; 主人交代 : </b>
                      <b className="fDred"> { data['customer_note'] } </b>
                  </div>

                  { /*  櫃台備註  */ }
                  <div className = "column is-12-desktop relative"  >
                      <b className="tag is-medium is-white"> <i className="fas fa-pencil-alt"></i> &nbsp; 櫃台備註 : </b>
                      <b className="fDred"> { data['admin_note'] } </b>
                  </div>

                  { /*  --------------------------------------------------------------------------------------------------  */ }

          { /* 小美容項目 */ }
          { basicItems.length > 0 &&

              <div className="column is-12-desktop relative">

                  <b className="tag is-medium is-warning"> <i className="far fa-list-alt"></i> &nbsp; 基礎項目 </b> <br/><br/>

                  {
                      basicItems.map((x: string, y: number) => {

                          if( x )  return <span key={y}> <b className="tag is-medium is-rounded m_Bottom_10"> {x} </b> &nbsp; &nbsp; </span>

                      })
                  }

              </div>

          }

          { /* 大美容項目 */ }
          {  data['service_type'] === '美容'  &&

             <div className = "column is-12-desktop relative" >

               <b className="tag is-medium is-danger"> <i className="fas fa-cut"></i> &nbsp; 大美容項目 </b>  <br/><br/>

             </div>

          }


          { /* 加價美容( 僅洗澡 ) */ }
          { ( data['service_type'] === '洗澡' ) &&

              <div className="column is-6-desktop relative">

              <b className="tag is-medium is-danger"> <i className="fas fa-plus"></i> &nbsp; 加價美容 </b> <br/><br/>

          </div>

          }

          { /* 加價項目 */ }
          { ( ( data['service_type'] === '洗澡' ||　data['service_type'] === '美容' )  ) &&

              <div className = "column is-12-desktop relative" >

                  <b className="tag is-medium is-primary"> <i className="fas fa-plus"></i> &nbsp; 加價項目 </b>  <br/><br/>


              </div>

          }



             </div>

            <br/><br/><br/>

         </>
} ;


export default Pet_Info