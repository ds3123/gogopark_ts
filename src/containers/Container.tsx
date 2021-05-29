import React from "react" ;
import { useLocation } from "react-router";
import Nav from "templates/nav/Nav"

// 容器元件
const Container = ( props : any ) => {

   const { pathname } = useLocation() ; // 頁面路徑

   return <article className= { pathname === '/' ? "container is-fluid" : "container" }  style={{ top : "120px" }}>

            { /* 導覽列 */ }
            <Nav/>

            { /* 各個 URL 路徑下，頁面主要元件 */ }
            { props.children  }

          </article> ;


};

export default Container ;
