
import React, {useEffect, useState} from "react" ;
import Main_Card from "components/beautician/Main_Card";
import Left_Cards from "components/beautician/Left_Cards";
import Inform_Cutomer from "components/beautician/main_components/inform_customer/Inform_Customer"

// Hook ( Ajax )
import { useRead_Service_Cus_Pet } from 'hooks/ajax_crud/useAjax_Read'
import {useDispatch, useSelector} from "react-redux";

// Redux
import { set_Current_Beautician } from 'store/actions/action_Beautician'


import cookie from "react-cookies";


/* @ 美容師頁面  */
const Beautician = () => {

    const dispatch = useDispatch();

    // 使用者類別 ( Ex. 櫃台、美容 .... )
    const [ userInfo , set_UserInfo ] = useState<any>( {} ) ;

    // 目前所點選寵物
    const Current_Pet = useSelector( ( state : any ) => state.Beautician.Current_Pet ) ;

    // 判斷是否有點選寵物
    const [ has_PetData , set_Has_PetData ] = useState(false) ;

    // 取得資料 : 服務、客戶、寵物
    const pet_Arr    = useRead_Service_Cus_Pet() ;

    // 篩選出 _ 到店狀態( shop_status ) 為 : "到店等候中" ( 之後加上 "今天" 2021.06.15 )
    const shop_Wait  = pet_Arr.filter( x => { return x['shop_status'] === '到店等候中' || x['shop_status'] === '到店美容中'  ;  } ) ;


    // 點選 _ 美容師姓名
    const click_Beautician = ( beautician : string ) => {

        // 設定 state
        set_UserInfo( { ...userInfo , employee_name : beautician } ) ;

        // Redux 設定 _ 目前美容師
        dispatch( set_Current_Beautician( beautician ) ) ;

    } ;


    useEffect(( ) => {

        // 設定 _ 判斷是否有點選寵物狀態
        set_Has_PetData(Current_Pet['pet_id'] ? true : false ) ;

    } ,[Current_Pet['pet_id']  ] ) ;


    useEffect(( ) => {


        const _cookie = cookie.load( 'userInfo' ) ;
        if( _cookie ){

            // 設定 _ 使用者資訊
            set_UserInfo( _cookie ) ;

            // Redux 設定 _ 目前美容師
            dispatch( set_Current_Beautician( _cookie['employee_name'] ) ) ;

        }

    } , []) ;


    return <div className="relative" style={{ top:"-40px" }}>

                <div className="columns is-multiline  is-mobile">

                    { /* 美容師列表 */}
                    <div className="column is-8-desktop relative">

                        <b className="tag is-medium is-white"> <i className="fas fa-user"></i> &nbsp; 美容師列表 &nbsp; : &nbsp; &nbsp;

                            <b className = { `tag pointer is-medium ${ userInfo['employee_name'] === '吳晨葳' ? 'is-success' : 'hover' }`}
                               onClick   = { () => click_Beautician('吳晨葳' ) } >  吳晨葳
                            </b> &nbsp; &nbsp; &nbsp;

                            <b className = { `tag pointer is-medium ${ userInfo['employee_name'] === '曾馨慧' ? 'is-success' : 'hover' }`}
                               onClick   = { () => click_Beautician('曾馨慧' ) } >  曾馨慧
                            </b> &nbsp; &nbsp; &nbsp;

                            <b className = { `tag pointer is-medium ${ userInfo['employee_name'] === '吳宜芳' ? 'is-success' : 'hover' }`}
                               onClick   = { () => click_Beautician('吳宜芳' ) } >  吳宜芳
                            </b> &nbsp; &nbsp; &nbsp;

                        </b>

                    </div>

                    { /* 告知主人、主人確認 */}
                    <div className="column is-4-desktop relative">
                        <Inform_Cutomer />
                    </div>

                    { /* 左側 : 等待中、處理中 面板 */}
                    <div className="column is-3-desktop relative">
                        <Left_Cards pet_Arr={ shop_Wait } />
                    </div>
                    { /* 右側 : 主要面板 */}
                    { has_PetData &&

                       <div className="column is-9-desktop relative">
                         <Main_Card/>
                       </div>

                    }

                </div>



           </div>

};

export default Beautician ;
