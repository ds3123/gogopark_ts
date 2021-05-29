
import React, {useCallback, useEffect, useState} from "react" ;
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { get_Today } from 'utils/time/date' ;



interface IOptionObj {

    title : string ;
    url   : string ;
    color : string ;
    icon  : string ;

}


// 頁面選項
const OptionArr : IOptionObj[] = [

                       { title : "客 戶" , url : "/customers" , color : "is-warning" , icon : "fas fa-user"  } ,
                       { title : "寵 物" , url : "/pets" , color : "is-warning" , icon : "fas fa-dog"  } ,
                       { title : "洗 美" , url : "/services" , color : "is-success" , icon : "fas fa-bath"  } ,
                       { title : "住 宿" , url : "/lodge" , color : "is-success" , icon : "fas fa-home"  } ,
                       { title : "美容師" , url : "/beautician" , color : "is-danger" , icon : "fas fa-cut"  } ,
                       { title : "管理區" , url : "/management" , color : "" , icon : "fas fa-sliders-h"  } ,



                  ] ;



// # 導覽列 _ 選項
const Nav_Options = () => {


    let location = useLocation();  // 取得 : 路徑資訊


    const phoneCall_Record = () => {


    };

    const show_Qcode = () => {



    };

    const add_Data = () => {


    };


    const number = {
        position   : "absolute" ,
        top        : "-7px" ,
        right      : "-7px" ,
        width      : "17px" ,
        height     : "17px" ,
        color      : "white" ,
        background : "red" ,
        fontSize   : ".8em"
    } as const ;              // 斷言為 const


   return  <div id="navbarExampleTransparentExample">

               <div className="navbar-start relative" style={ { top:"30%" , left : "7%" } } >

                   {  /* 業務功能頁面 */
                       OptionArr.map( ( option , index ) => {

                            const optionStyle = option.url === location.pathname ? { boxShadow : "1px 1px 5px 1px rgba(0,0,0,.6)" , borderRadius : "3px" } : {} ;

                            return <React.Fragment key={ index }>
                                     <Link to={ option.url }>
                                       <span style     = { optionStyle }
                                             className = { "tag is-medium is-rounded relative pointer "+option.color }
                                             > <i className={ option.icon }></i> &nbsp; { option.title }
                                       </span> &nbsp; &nbsp;
                                     </Link>
                                   </React.Fragment>

                       })
                   }

                   {/* 功能按鈕 */}
                   <span style={{ marginLeft : '100px' }}>

                       <span className="tag is-medium is-rounded" onClick={ () => show_Qcode() } style={{ background : "rgb(150,0,0)" , color : "white" }}>
                            <i className="fab fa-quora"></i> &nbsp; ( { get_Today().slice(4,8) } )
                        </span> &nbsp; &nbsp; &nbsp;

                       <span className="tag is-medium is-black is-rounded"  onClick={ () => add_Data() }> <i className="fas fa-plus"></i> &nbsp; 新增資料  </span>

                   </span>


               </div>



           </div>



} ;

export default Nav_Options ;
