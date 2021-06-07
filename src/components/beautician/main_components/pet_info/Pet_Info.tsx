
import React , { useState }  from "react" ;
import Pet_Info_Title from "components/beautician/main_components/pet_info/Pet_Info_Title"



{ /* 寵物基本資訊 */}
const Pet_Info = ()=>{

  const [ serviceType , set_ServiceType ] = useState("基礎")


  return <div className="columns is-multiline  is-mobile" >

              { /* 標題資訊 */ }
              <div className = "column is-6-desktop relative" >

                  <Pet_Info_Title />

              </div>

              { /* 到店時間、期望離店時間 */ }
              <div className = "column is-6-desktop relative" >

                  <b className="tag is-medium is-white"> <i className="far fa-clock"></i> &nbsp;  到店時間 : </b>
                  <b> { "10:00:00" } </b>  &nbsp; &nbsp; &nbsp; &nbsp;

                  <b className="tag is-medium is-white"> <i className="far fa-clock"></i> &nbsp;  期望離店時間 : </b>
                  <b className="tag is-danger" > { "13:40:00" } </b>

              </div>

              { /* 自備物品 */ }
              <div className = "column is-6-desktop relative"  >
                  <b className="tag is-medium is-white"> <i className="fas fa-gavel"></i>  &nbsp; 自備物品 : </b>
                  <b className="fDred"> 玩具、牽繩 </b>
              </div>

              { /* 主人交代  */ }
              <div className = "column is-6-desktop relative"  >
                  <b className="tag is-medium is-white"> <i className="fas fa-user-tag"></i> &nbsp; 主人交代 : </b>
                  <b className="fDred"> 老狗、給水 </b>
              </div>

              { /*  櫃台備註  */ }
              <div className = "column is-12-desktop relative"  >
                  <b className="tag is-medium is-white"> <i className="fas fa-pencil-alt"></i> &nbsp; 櫃台備註 : </b>
                  <b className="fDred"> 會兇 </b>
              </div>

              { /*  --------------------------------------------------------------------------------------------------  */ }

      { /* 小美容項目 */ }
      <div className = "column is-12-desktop relative"  >

          <b className="tag is-medium is-warning"> <i className="far fa-list-alt"></i> &nbsp; 基礎項目 </b> <br/><br/>
          <span > <b className="tag is-medium is-rounded m_Bottom_10"> 修腳緣 </b> &nbsp; &nbsp; </span>

      </div>

      { /* 大美容項目 */ }
      {  serviceType === '美容'  &&

      <div className = "column is-12-desktop relative" >

         <b className="tag is-medium is-danger"> <i className="fas fa-cut"></i> &nbsp; 大美容項目 </b>  <br/><br/>

      </div>

      }


      { /* 加價美容( 僅洗澡 ) */ }
      { ( serviceType === '洗澡' ) &&

      <div className="column is-6-desktop relative">

          <b className="tag is-medium is-danger"> <i className="fas fa-plus"></i> &nbsp; 加價美容 </b> <br/><br/>

      </div>

      }

      { /* 加價項目 */ }
      { ( ( serviceType === '洗澡' ||　serviceType === '美容' )  ) &&

          <div className = "column is-12-desktop relative" >

              <b className="tag is-medium is-primary"> <i className="fas fa-plus"></i> &nbsp; 加價項目 </b>  <br/><br/>


          </div>

      }



         </div>

} ;


export default Pet_Info