
import React from "react" ;


{ /*  左側 : 等待中、處理中 面板   */ }
const Left_Cards = () => {


    const status = {
        marginBottom   : "0px" ,
        display        : "flex" ,
        justifyContent : "center" ,
        left           : "13px"
    };

    const left_Card  = { height : "35vh" , overflow : "auto" , left : "13px"  } ;


   return <>
               { /* 等待中 */ }
               <div className="tags has-addons relative" style={ status }>
                   <span className="tag is-medium is-link" >   等待中   </span>
                   <span className="tag is-medium is-link is-light" >
                       基礎 &nbsp;<b> { 1 } </b>&nbsp;
                       洗澡 &nbsp;<b> { 1 } </b>&nbsp;
                       美容 &nbsp;<b> { 1 } </b>
                   </span>
               </div>

               <div className="card p_10 relative has-text-centered" style={ left_Card } >




               </div>

               { /* 處理中 */ }
               <div className="tags has-addons relative" style={ status }>
                   <span className="tag is-medium is-link" >   處理中   </span>
                   <span className="tag is-medium is-link is-light" >
                       基礎 &nbsp;<b> { 1 } </b> &nbsp;
                       洗澡 &nbsp;<b> { 1 } </b> &nbsp;
                       美容 &nbsp;<b> { 1 } </b>
                   </span>
               </div>

               <div className="card p_10 relative has-text-centered" style={ left_Card } >



               </div>

          </>

} ;


export default Left_Cards