
import React , { useState } from "react" ;
import useServiceType from "hooks/useServiceType"
import { Service_Type } from "utils/Interface_Type"


{ /* 寵物標題 */ }
const Pet_Info_Title = () => {

    const [ service_Type , set_Service_Type ] = useState<Service_Type>("基礎") ;
    const [ qCode , set_qCode ]               = useState( "Q01" ) ;
    const { color , icon }                    = useServiceType( service_Type );


    return  <b className={ color }>

                <i className={ icon }></i> &nbsp; { qCode  } &nbsp; 旺財 ( 吉娃娃 ) &nbsp;

                <b className="tag is-white is-rounded" style={{ fontSize : "12pt" }}>
                    <i className =  'fas fa-mars' style     = {{ fontSize:"16pt" }}> 2 </i> &nbsp; 灰色
                </b> &nbsp; &nbsp;

            </b>
    
};


export default Pet_Info_Title
