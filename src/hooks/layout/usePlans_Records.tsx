
import React, {useEffect, useState} from "react"

import {useDispatch, useSelector} from "react-redux";

import { set_Use_Plan_Month_Bath , set_Current_Plan_Id } from "store/actions/action_Plan"
import axios from "utils/axios";




/*  @ 方案 ( Ex. 包月洗澡 ) 、使用紀錄 */
export const usePlan_Month_Bath_Tag = ( plans : { month_Bath : any[] }  ) => {


    const dispatch = useDispatch();

    // 是否已點選 : ( 包月洗澡 ) 使用此方案
    const use_Plan_Month_Bath = useSelector( ( state : any ) => state.Plan.use_Plan_Month_Bath ) ;

    // 目前品種下拉選項，所選擇的品種 Id
    const current_Species_Id  = useSelector(( state : any ) => state.Pet.current_Species_Id ) ;

    // 所點選的方案頁籤 ( 索引 )
    const [ clicked_Tag , set_Clicked_Tag ] = useState<{ index : null | number , is_On : boolean }>({
                                                                                                                 index : null  ,
                                                                                                                 is_On : false ,
                                                                                                               }) ;


    //  // 目前品種下拉選項，所選擇的品種 Id 資料
    const [ current_Species , set_Current_Species ] = useState( { name : '' } ) ;



    // 點選 _ 使用此方案標籤
    const click_Use_Bath_Tag = ( index: null | number , is_On : boolean , species_Name : string , plan_id : string ) => {

        // 設定 _ 目前所點選方案 : 資料表 ( plans ) id
        dispatch( set_Current_Plan_Id( plan_id ) ) ;


        if( current_Species['name'] !== species_Name ){
            alert('所選擇寵物品種，不符合購買方案的適用品種') ;
            return false ;
        }

        // 設定 _ 是否已點選方案標籤 ( for 表單提交驗證 )
        dispatch( set_Use_Plan_Month_Bath(use_Plan_Month_Bath ? false : true ) ) ;

        // 設定 state
        set_Clicked_Tag({ ...clicked_Tag , index : index , is_On : is_On } ) ;


    } ;


    // 設定 _ 目前寵物區欄位，下拉品種 Id
    useEffect(() => {

        if( current_Species_Id ){

            axios.get( `/pet_species/show_by_col_param/id/${ current_Species_Id }` ).then(res => {

                if( res.data.length > 0 ){
                    set_Current_Species({ ...current_Species , name : res.data[0]['name'] } ) ;
                }else{
                    set_Current_Species({ ...current_Species , name : '' } ) ;
                } ;

            }) ;

        }

    } ,[ current_Species_Id ] ) ;


    return  plans['month_Bath'].map( ( x : any , y : number) => {

                // 已使用使包月洗澡次數
                const bath_Num = x['plan_used_records'].filter( ( x:any ) => x['service_type'] === '洗澡' ).length ;

                return  <b key = { y } className="tag is-medium is-success is-light m_Right_15 m_Bottom_15 is-rounded pointer">

                            { x['pet_species']['name'] }  &nbsp;

                            { /* 未額滿  */ }
                            { bath_Num !== 4 &&

                                <b className = { `tag is-rounded f_10 ${ clicked_Tag['index'] === y && clicked_Tag['is_On'] === true ? 'is-success' : 'is-white' }` } onClick = { () => click_Use_Bath_Tag( y , !clicked_Tag['is_On'] , x['pet_species']['name'] , x['id'] ) } >

                                  { ( clicked_Tag['index'] === y  && clicked_Tag['is_On'] === true )                                       && <span> { bath_Num + 1 } / 4 &nbsp; 已經選擇方案  </span> }
                                  { ( clicked_Tag['is_On'] === false || ( clicked_Tag['index'] !== y && clicked_Tag['is_On'] === true  ) ) && <span> { bath_Num } / 4 &nbsp; 使用此方案        </span> }

                                </b>

                            }

                            { /*  已額滿  */ }
                            { bath_Num !== 4 || <b className="tag is-rounded is-danger f_10"> { bath_Num } / 4 &nbsp; 額度使用完畢 </b> }

                        </b>

           })

} ;