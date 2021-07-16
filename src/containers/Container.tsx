import React from "react" ;
import { useLocation } from "react-router";
import Nav from "templates/nav/Nav"
import Side_Panel from "templates/panel/Side_Panel";
import {Link} from "react-router-dom";
import logo from "../imgs/logo.png";


// 容器元件
const Container = ( props : any ) => {

    const { pathname } = useLocation() ; // 頁面路徑

    const lS = {  width:"300px" , height : "100px"  } as const ;

   return <article className = { pathname === '/' ? "container is-fluid" : "container" }  style={{ top : "120px" }}>

            { /* 導覽列 */ }
            <Nav/>

            { /*  目前系統尚未支援手機版本 */ }
            <div className="columns is-mobile  is-multiline is-hidden-desktop ">
               <div className="column is-12-mobile has-text-centered">

                   <br/><br/>

                   <Link to="/"> <img src={ logo } width='350px' style={ lS }/> </Link>

                   <br/><br/><br/>
                   <b className="tag is-large is-danger"> <i className="far fa-smile-beam" style={{ fontSize : "22pt" }}></i> &nbsp; 目前尚未支援手機版本 </b>
               </div>
           </div>

            <Side_Panel />

            <br/>

            { /* 各個 URL 路徑下，頁面主要元件 */ }
            { props.children  }

          </article> ;


};

export default Container ;
