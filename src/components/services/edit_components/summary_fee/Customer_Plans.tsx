
import React, { FC , useEffect , useState} from "react"
import { useDispatch , useSelector } from "react-redux";

import { usePlan_Plan_Tag } from "hooks/layout/usePlans_Records"
import { set_Invalid_To_Plan } from "store/actions/action_Form_Validator"
import axios from "utils/axios";

import { set_Customer_Plans_Records } from "store/actions/action_Customer"


type Plan = {

  current       : string ;  // 目前所在服務標籤
  paymentMethod : string ;  // 付款方式
  register      : any ;     // Reach Hook Form 欄位註冊函式
  setValue      : any ;     // Reach Hook Form 欄位註冊函式

}


// @ 客戶所購買方案 ( Ex. 包月洗澡、包月美容 )
const Customer_Plans : FC< Plan > = ( { current , paymentMethod , register , setValue } ) => {

    const dispatch = useDispatch() ;

    // 客戶 _ 方案 ( Ex. 包月洗澡、美容 )、使用紀錄 ( 由 Customer_Form.tsx 中查詢設定 )
    const Customer_Plans_Records = useSelector(( state : any ) => state.Customer.Customer_Plans_Records ) ;

    // 目前在寵物區，"品種" 下拉選項，所選擇的品種 Id
    const current_Species_Id     = useSelector(( state : any ) => state.Pet.current_Species_Id ) ;

    // 使用本次方案的 _ 價格 ( 點選標籤 "使用此方案" 後設定 )
    const current_Plan_Service_Price   = useSelector(( state : any ) => state.Plan.current_Plan_Service_Price ) ;



    // 是否已點選 : 包月洗澡、包月美容方案標籤中 "使用此方案" ( 由 usePlans_Records.tsx 中，點選標籤後設定 --> 作為後續判斷 _ 表單是否可提交，判斷依據之一 )
    const is_Plan_Used           = useSelector(( state : any ) => state.Plan.is_Plan_Used ) ;

    // 客戶所購買 _ 方案
    const [ plans , set_Plans ]  = useState({
                                              month_Bath   : []  , // 包月洗澡
                                              month_Beauty : []  , // 包月美容
                                            }) ;

    // 方案使用紀錄標籤 : 包月洗澡、包月美容
    const plan_Tags = usePlan_Plan_Tag( current , plans ) ;


    // 目前品種下拉選項，所選擇的品種 Id 資料 ( for 查詢該品種名稱 )
    const [ current_Species , set_Current_Species ] = useState( { name : '' } ) ;


    // 設定 _ 客戶所購買方案 ( 篩選出 : '包月洗澡'、'包月美容' )
    useEffect(( ) => {

        if( Customer_Plans_Records.length ){

            const month_Bath   = Customer_Plans_Records.filter( ( x : any ) => x['plan_type'] === '包月洗澡' ) ;
            const month_Beauty = Customer_Plans_Records.filter( ( x : any ) => x['plan_type'] === '包月美容' ) ;

            set_Plans({ ...plans , month_Bath : month_Bath , month_Beauty : month_Beauty } ) ;

        }else{

            // State
            set_Plans({ ...plans , month_Bath : [] , month_Beauty : [] } ) ;

        }


        return ( ) => {

            // State
            set_Plans({ ...plans , month_Bath : [] , month_Beauty : [] })


        }



    } , [ Customer_Plans_Records ] ) ;



    // 設定 _　付款方式 ( Ex. 包月洗澡、美容 ) ，作為表單是否可提交的驗證邏輯
    useEffect(( ) => {

        // 已選擇 "包月洗澡" 或 "包月洗澡" ， 並是否點選 _ 套用方案
        if( ( ( current === '洗澡' && paymentMethod === '包月洗澡') || ( current === '美容' && paymentMethod === '包月美容') ) && !is_Plan_Used ){
            dispatch( set_Invalid_To_Plan(true ) ) ;
        }else{
            dispatch( set_Invalid_To_Plan(false ) ) ;
        }

        return ( ) => {

            dispatch( set_Invalid_To_Plan(false ) ) ;           // for 表單驗證

        }

    } , [ current , paymentMethod , is_Plan_Used ] ) ;

    // 依照目前寵物區塊，品種下拉所選擇的品種 Id，查詢該品種名稱
    useEffect(() : any => {

        let is_Mounted = true ;

        if( current_Species_Id ){

            axios.get( `/pet_species/show_by_col_param/id/${ current_Species_Id }` ).then(res => {

                if( is_Mounted ){

                    if( res.data.length > 0 ){
                        set_Current_Species({ ...current_Species , name : res.data[0]['name'] } ) ;
                    }else{
                        set_Current_Species({ ...current_Species , name : '' } ) ;
                    } ;

                }

            }) ;

        }

        return () => is_Mounted = false


    } ,[ current_Species_Id ] ) ;


    // 設定 _ 使用本次方案的 _ 價格
    useEffect(( ) => {

       setValue( 'current_Plan_Used_Fee' , current_Plan_Service_Price) ;

    } , [ current_Plan_Service_Price ] ) ;



    useEffect(( ) => {

        // Redux ( 清楚客戶方案紀錄  有問題，再研究 08.09 )
        //dispatch( set_Customer_Plans_Records([]) ) ;


    } ,[] )


    return <>

                { /* # 是否購買方案 : 有  */ }
                { ( plans['month_Bath'].length > 0 || plans['month_Beauty'].length > 0 ) &&

                    <>

                        <span className="tag is-large is-white m_Bottom_10">

                          <b>
                              客戶 : <span className="fDred"> { ( Customer_Plans_Records.length > 0 && Customer_Plans_Records[0]['customer'] ) ? Customer_Plans_Records[0]['customer']['name'] : '' } </span>

                              / 選擇品種 :
                              { current_Species['name'] ?
                                  <span className="fDred"> { current_Species['name'] } </span> :
                                  <span className="fRed"> 尚未選擇品種                  </span>
                              }  /

                              此次價格 : <input type="number relative" { ...register( "current_Plan_Used_Fee" ) } className="input" style={{ width:"80px" , top:"-5px" }} /> 元

                          </b> <br/>

                        </span>

                        { plan_Tags }  { /* 方案 _ 點選使用 / 紀錄標籤  */ }  &nbsp; &nbsp;

                    </>

                }


                { /* # 是否購買方案 : 無  */ }
                { ( current === '洗澡' && plans['month_Bath'].length === 0 )  &&
                   <span className="tag is-large is-danger m_Left_15"> <b> <i className="fas fa-exclamation"></i> &nbsp;無任何購買 : 包月洗澡方案 </b> </span>
                }

                { ( current === '美容' && plans['month_Beauty'].length === 0 ) &&
                   <span className="tag is-large is-danger m_Left_15"> <b> <i className="fas fa-exclamation"></i> &nbsp;無任何購買 : 包月美容方案 </b> </span>
                }

           </>


} ;

export default Customer_Plans