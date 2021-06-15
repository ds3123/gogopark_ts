
import React , { useState } from "react" ;
import useServiceType from "hooks/layout/useServiceType"
import { Service_Type } from "utils/Interface_Type"
import {useSelector} from "react-redux";


{ /* 寵物標題 */ }
const Pet_Info_Title = () => {

    // 目前所點選寵物
    const pet = useSelector( ( state : any ) => state.Beautician.Current_Pet )['pet'] ;

    const [ service_Type , set_Service_Type ] = useState<Service_Type>("基礎") ;
    const [ qCode , set_qCode ]               = useState( "Q01" ) ;
    const { color , icon }                    = useServiceType( service_Type );


    return  <b className = { color } >

                <i className={ icon }></i> &nbsp; { qCode  } &nbsp; { pet['name'] } ( { pet['species'] } ) &nbsp;

                <b className="tag is-white is-rounded" style = {{ fontSize : "12pt" }}> { pet['sex'] } </b> &nbsp; &nbsp;

                { pet['color'] &&
                  <><b className="tag is-white is-rounded" style = {{ fontSize : "12pt" }}> { pet['color'] } </b> &nbsp; &nbsp;</>
                }

                { pet['age'] &&
                  <><b className="tag is-white is-rounded" style = {{ fontSize : "12pt" }}> { pet['age'] } 歲 </b> </>
                }

            </b>

};


export default Pet_Info_Title
