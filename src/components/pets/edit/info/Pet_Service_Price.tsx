
import React from "react"


// @ 顯示 _ 某特定寵物品種，在各種服務( 初次洗澡優惠、單次洗澡、單次美容 ) 下的價格
const Pet_Service_Price = ( obj : { current_Service : any , current_Species_Prices : any } ) => {

  const { current_Service , current_Species_Prices } = obj ;



  const style = { top : "-38px", left:"150px" , width:"70%", height:"35px" } ;
  const tag   = "tag is-medium is-white" ;
  const red   = { color:"rgb(180,0,0)" } ;
  const green = { color:"rgb(0,180,0)" } ;

  return <>

              { /* 初次洗澡優惠價格 */ }
              { current_Service['is_First_Bath'] &&

                  <div className="absolute"  style={ style }>
                      <b className={ tag } style={ green } >
                          <i className="fas fa-comment-dots"></i> &nbsp; 此客戶寵物為 _ <span style={ red }> &nbsp; 初次洗澡 </span>，優惠價格為 :&nbsp;
                          <span style={{color:"rgb(180,0,0)"}}> { current_Species_Prices['first_Bath'] } </span>&nbsp;元
                      </b>
                  </div>

              }

              { /* 單次洗澡價格 */ }
              { current_Service['is_Single_Bath'] &&

                  <div className="absolute"  style={ style }>
                      <b className={ tag } style={ green } >
                          <i className="fas fa-comment-dots"></i> &nbsp; 此客戶寵物為 _ <span style={ red }> 單次洗澡 </span>，價格為 : &nbsp;
                          <span style={ red }> { current_Species_Prices['single_Bath'] } </span>&nbsp;元
                      </b>
                  </div>

              }

              { /* 單次美容價格 */ }
              { current_Service['is_Single_Beauty'] &&

                  <div className="absolute"  style={ style } >
                      <b className={ tag } style={ green } >
                          <i className="fas fa-comment-dots"></i> &nbsp; 此客戶寵物為 _ <span style={ red }> 單次美容 </span>，價格為 : &nbsp;
                          <span style={ red }> { current_Species_Prices['single_Beauty'] }  </span>&nbsp;元
                      </b>
                  </div>

              }

         </>

} ;

export default Pet_Service_Price