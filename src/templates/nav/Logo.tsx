
import React from "react" ;
import {Link} from "react-router-dom";
import logo  from 'imgs/logo.png';


// # 導覽列 Logo
const Logo = () => {


   const lS = { position : "relative" , top:"15px" , width:"300px" , height : "100px"  } as const ;


  return <div className="navbar-brand">


              <Link to="/"> <img src={ logo } width='350px' style={ lS }/> </Link>

              { /* Menu_Icon ( Mobile ) */ }
              <div className="navbar-burger burger" data-target="navbarExampleTransparentExample" >
                  <span></span> <span></span> <span></span>
              </div>

          </div>

} ;

export default Logo ;