
import React , { useState } from "react" ;
import useServiceType from "hooks/layout/useServiceType"
import { Service_Type } from "utils/Interface_Type"
import {useSelector} from "react-redux";


{ /* 寵物標題 */ }
const Pet_Info_Title = () => {

    // 目前所點選寵物
    const Current_Pet = useSelector( ( state : any ) => state.Beautician.Current_Pet ) ;
    const pet         = Current_Pet['pet'] ;


    const { color , icon }                    = useServiceType( Current_Pet['service_type'] );


    return  <b className = { color } >

                <i className={ icon }></i> &nbsp; Q{ Current_Pet['q_code']  } &nbsp;&nbsp;{ pet['name'] } ( { pet['species'] } ) &nbsp;

                <b className="tag is-white is-rounded" style = {{ fontSize : "12pt" }}> { pet['sex'] } </b> &nbsp;

                { pet['color'] &&
                  <><b className="tag is-white is-rounded" style = {{ fontSize : "12pt" }}> { pet['color'] } </b> &nbsp;</>
                }

                { pet['age'] &&
                  <><b className="tag is-white is-rounded" style = {{ fontSize : "12pt" }}> { pet['age'] } 歲 </b> </>
                }

            </b>

};


export default Pet_Info_Title
