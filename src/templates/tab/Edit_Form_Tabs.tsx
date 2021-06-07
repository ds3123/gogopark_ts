
import React, {createContext, useState, FC, useEffect, useContext} from "react" ;

import { SidePanelContext } from "templates/panel/Side_Panel";


interface ITabs {
    title : string ;
    style : string ;
    icon  : string ;
}

// 頁面選項
const tabsArr : ITabs[] = [
    { title : "客戶" , style : "pointer tag is-large is-warning" , icon : "fas fa-user" } ,
    { title : "寵物" , style : "pointer tag is-large is-warning" , icon : "fas fa-dog"  } ,
    { title : "基礎" , style : "pointer tag is-large is-success" , icon : "far fa-list-alt"  } ,
    { title : "洗澡" , style : "pointer tag is-large is-success" , icon : "fas fa-bath"  } ,
    { title : "美容" , style : "pointer tag is-large is-success" , icon : "fas fa-cut"  } ,
    { title : "安親" , style : "pointer tag is-large is-info"    , icon : "fas fa-id-card-alt"  } ,
    { title : "住宿" , style : "pointer tag is-large is-info"    , icon : "fas fa-home"  } ,
    { title : "方案" , style : "pointer tag is-large is-danger"  , icon : "fas fa-file-alt"  } ,
    { title : "價格" , style : "pointer tag is-large is-danger"  , icon : "fas fa-dollar-sign"  } ,
    { title : "品種" , style : "pointer tag is-large is-danger"  , icon : "fas fa-paw"  } ,
    { title : "員工" , style : "pointer tag is-large is-danger"  , icon : "fas fa-user-circle"  } ,
] ;


interface IProps {
    get_Current_Tab : ( a : string ) => void
}


const Edit_Form_Tabs : FC<IProps> = ( { get_Current_Tab } ) => {

    const value = useContext( SidePanelContext ) ;   // 取得 context 值


    // 分類標籤
    const [ current , set_Current ] = useState( '' ) ; // 目前點選標籤

    // 點選 _ 標籤
    const click_Tab = ( title : string ) => {

        set_Current( title ) ;
        get_Current_Tab( title ) ;  // 回傳 _ 目前點選標籤

    } ;

    useEffect(()=>{

        // 設定 current、回傳 _ 目前點選標籤
        if( value.create_Data ){
            set_Current( value.create_Data ) ;
            get_Current_Tab( value.create_Data ) ;
        }

        if( value.customer_Id ){
            set_Current( '客戶' ) ;
            get_Current_Tab( '客戶' ) ;
        }

        if( value.pet_Serial ){
            set_Current( prevState => '寵物' ) ;
            get_Current_Tab( '寵物' ) ;
        }

        if( value.basic_id ){
            set_Current('基礎') ;
            get_Current_Tab('基礎' ) ;
        }

        if( value.bath_id ){
            set_Current('洗澡') ;
            get_Current_Tab('洗澡' ) ;
        }

        if( value.beauty_id ) {
            set_Current('美容');
            get_Current_Tab('美容' ) ;
        }


    } ,[ value ] ) ;


    return <>

                <span> <i className="fas fa-plus-circle"></i> &nbsp;請選擇 : <b >新增資料類型</b>  </span> <br/><br/>

                <div className="columns is-multiline  is-mobile" >

                    <div className="column is-12-desktop">
                        {
                            tabsArr.map( ( tab , index )=>{

                                const _style = tab['title'] === current ? tab['style'] : tab['style'] + " is-light";

                                return <b key       = { index }
                                          className = { _style }
                                          style     = {{ marginBottom:"15px" , marginRight:"15px" }}
                                          onClick   = { () => click_Tab( tab['title']) }  >
                                          <i className={ tab['icon'] }></i> &nbsp; { tab['title'] }
                                       </b>

                            } )
                        }
                    </div>

                </div>

           </>

} ;


export default Edit_Form_Tabs ;