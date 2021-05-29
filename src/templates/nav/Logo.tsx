
import React from "react" ;
import {Link} from "react-router-dom";

// # 導覽列 Logo
const Logo = () => {


  return <div className="navbar-brand">

              <Link className="navbar-item" to="/">
                  <i className="fas fa-home fa-3x"></i>  &nbsp; &nbsp;
                  <span className="title"> 狗狗公園 </span>
              </Link>

              { /* Menu_Icon ( Mobile ) */ }
              <div className="navbar-burger burger" data-target="navbarExampleTransparentExample" >
                  <span></span> <span></span> <span></span>
              </div>

          </div>

} ;

export default Logo ;