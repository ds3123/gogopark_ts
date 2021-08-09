
import React, {useEffect, useState} from "react"

import { useDispatch , useSelector } from "react-redux";

import { set_Use_Plan , set_Current_Plan_Id , set_Current_Plan_Note , set_Current_Plan_Service_Price } from "store/actions/action_Plan"
import axios from "utils/axios";



/*  @ 方案 ( Ex. 包月洗澡 ) 、使用紀錄 */
export const usePlan_Plan_Tag = ( current : string , plans : { month_Bath : any[] , month_Beauty : any[] }  ) => {

    const dispatch = useDispatch() ;

    // 是否已點選 : ( 包月洗澡 ) 使用此方案
    const is_Plan_Used = useSelector( ( state : any ) => state.Plan.is_Plan_Used ) ;

    // 目前在寵物區，"品種" 下拉選項，所選擇的品種 Id
    const current_Species_Id  = useSelector(( state : any ) => state.Pet.current_Species_Id ) ;

    // 所點選的方案頁籤 : 索引 ( index ) 、是否已點選 ( is_On )
    const [ clicked_Tag , set_Clicked_Tag ] = useState<{ index : null | number , is_On : boolean }>({
                                                                                                                 index : null  ,
                                                                                                                 is_On : false ,
                                                                                                               }) ;


    // 所點選使用方案之 : 基本價格、使用一次價格、結餘金額
    const [ amount , set_Amount ] = useState({
                                                          initial_Price : 0 ,  // 購買方案時的基本價格
                                                          used_Amount   : 0 ,  // 已使用金額
                                                          single_Price  : 0 ,  // 點選使用方案後，該次所佔用金額
                                                          balance       : 0    // 結餘金額
                                                        }) ;


    // 方案使用紀錄標籤
    const [ plan_Tags , set_Plan_Tags ] = useState<any[]>([] ) ;


    // 目前品種下拉選項，所選擇的品種 Id 資料 ( for 查詢該品種名稱 )
    const [ current_Species , set_Current_Species ] = useState( { name : '' } ) ;


    // 類型 for click_Use_Bath_Tag()
    type Plan = {
                    index        : number ;
                    is_On        : boolean ;
                    species_Name : string ;

                    plan_id      : string ;
                    plan_note    : string ;

                    plan_price   : number ;
                    used_Amount  : number ;
                }


    // 點選 _ 使用此方案標籤
    const click_Use_Bath_Tag = ( obj : Plan ) => {

        const { index , is_On , species_Name , plan_id , plan_note , plan_price , used_Amount  } = obj ;

        // 驗證 _ 品種是否符合
        if( current_Species['name'] !== species_Name ){
            alert('所選擇寵物品種，不符合購買方案的適用品種') ;
            return false ;
        }

        
        // 設定 _ 使用此方案服務，所花費的金額
        dispatch( set_Current_Plan_Service_Price( Math.round( plan_price / 4 ) ) ) ; // 四捨五入



        set_Amount({ ...amount ,
                              initial_Price : plan_price ,
                              used_Amount   : used_Amount ,
                         }) ;



        // 設定 _ 目前所點選方案 : 資料表 ( plans ) id
        dispatch( set_Current_Plan_Id( plan_id ) ) ;

        // 目前選擇 : 方案備註  Ex. 洗澡第 1 次
        dispatch( set_Current_Plan_Note( plan_note ) ) ;




        // 設定 _ 是否已點選方案標籤 ( for 表單提交驗證 )
        dispatch( set_Use_Plan(is_Plan_Used ? false : true ) ) ;

        // 設定 _ 點選後樣式 state
        set_Clicked_Tag({ ...clicked_Tag , index : index , is_On : is_On } ) ;

    } ;


    // 設定 _ 目前寵物區欄位，下拉品種 Id ( for 驗證 : 寵物區所下拉選擇的品種，是否與套用方案所點選的品種相符合 )
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


    // 設定 _ 所要回傳的方案使用紀錄標籤類型 : 包月洗澡 or 包月美容
    useEffect(( ) => {


       if( current === '洗澡' ){

           const arr = plans['month_Bath'].concat( plans['month_Beauty'] ) ; // 在新增洗澡中，也可使用方案 "包月美容" 下的洗澡


         //  console.log( arr )

           set_Plan_Tags( arr ) ;



       }

       if( current === '美容' ){

           set_Plan_Tags( plans['month_Beauty'] ) ;

       }

    } , [ current , plans ] ) ;



    const tag = { boxShadow : "0px 1px 2px 1px rgba(0,0,0,.2)" , borderRadius : "20px"} ;




    return  plan_Tags.map( ( x : any , y : number) => {

                // # 包月洗澡、美容 _ 可使用額度設定
                // 包月洗澡
                let quota_Bath  = 0 ;
                if( x['plan_type'] === '包月洗澡' ) quota_Bath = 4 ;
                if( x['plan_type'] === '包月美容' ) quota_Bath = 3 ;

                //console.log( x )


                // 包月美容
                const quota_Beauty = 1 ;


                { /*  for 洗澡區塊  */ }
                if( current === '洗澡' && (  x['plan_type'] === '包月洗澡' || x['plan_type'] === '包月美容' ) ){

                    // 已使用 _ 包月洗澡方案次數 ( 資料表 : plan_used_records )
                    const used_Num = x['plan_used_records'].filter( ( x:any ) => x['service_type'] === '洗澡' ).length ;

                    // 加總 _ 已使用紀錄的金額
                    let  used_Amount = 0 ;
                    x['plan_used_records'].forEach( ( x : any ) => used_Amount += x['service_price'] ) ;


                    // console.log( used_Amount )

                    // 欲傳給 click_Use_Bath_Tag 函式的參數
                    const params = {
                                        index        : y ,                              // 目前資料列索引
                                        is_On        : !clicked_Tag['is_On'] ,          // 是否已點選
                                        species_Name : x['pet_species']['name'] ,       // 品種名稱

                                        plan_id      : x['id'] ,                        // 方案資料表( plans ) id
                                        plan_note    : x['plan_type'] === '包月洗澡' ? `包月洗澡第 ${ used_Num + 1 } 次` : `包月美容，洗澡第 ${ used_Num + 1 } 次` ,  // 方案備註

                                        plan_price   : x['plan_basic_price'] ,
                                        used_Amount  : used_Amount
                                  } ;

                    return  <b key = { y } className="tag is-medium m_Left_10 m_Bottom_15 is-white pointer" style={ tag } >

                                { x['plan_type'] } &nbsp; ( { x['pet_species']['name'] } ) &nbsp;

                                { /* 使用 _ 未額滿  */ }
                                { used_Num !== quota_Bath &&

                                    <b className = { `tag is-rounded f_10 ${ clicked_Tag['index'] === y && clicked_Tag['is_On'] === true ? 'is-success' : 'is-success is-light' }` }
                                       onClick   = { () => click_Use_Bath_Tag( params ) } >

                                        { ( clicked_Tag['index'] === y && clicked_Tag['is_On'] === true )  &&
                                               <span>
                                                       { used_Num + 1 } / { quota_Bath } &nbsp;
                                                       ( 餘額 : {  x['plan_basic_price'] - used_Amount - ( x['plan_basic_price'] / 4 )  } 元 ) &nbsp; &nbsp;
                                                       已使用 &nbsp;
                                               </span>
                                        }


                                        { ( clicked_Tag['is_On'] === false || ( clicked_Tag['index'] !== y && clicked_Tag['is_On'] === true  ) ) &&
                                                <span>
                                                       { used_Num } / { quota_Bath }     &nbsp;
                                                       ( 餘額 : { x['plan_basic_price'] - used_Amount } 元 ) &nbsp; &nbsp;
                                                       點選使用 &nbsp;
                                                </span>
                                        }

                                    </b>

                                }

                                { /*  使用 _ 已額滿  */ }
                                { used_Num !== quota_Bath || <b className="tag is-rounded is-danger f_10"> { used_Num } / { quota_Bath } &nbsp; 額度使用完畢 </b> }

                            </b> ;

                }


                { /*  for 美容區塊  */ }
                if( current === '美容' && x['plan_type'] === '包月美容'  ){

                    // 已使用 _ 包月美容方案次數 ( 資料表 : plan_used_records )
                    const used_Num = x['plan_used_records'].filter( ( x:any ) => x['service_type'] === '美容' ).length ;

                    // 加總 _ 已使用紀錄的金額
                    let  used_Amount = 0 ;
                    x['plan_used_records'].forEach( ( x : any ) => used_Amount += x['service_price'] ) ;

                    // 欲傳給 click_Use_Bath_Tag 函式的參數
                    const params = {
                                        index        : y ,                               // 目前資料列索引
                                        is_On        : !clicked_Tag['is_On'] ,           // 是否已點選
                                        species_Name : x['pet_species']['name'] ,        // 品種名稱
                                        plan_id      : x['id'] ,                         // 方案資料表( plans ) id
                                        plan_note    : `包月美容第 ${ used_Num + 1} 次` , // 方案備註

                                        plan_price   : x['plan_basic_price'] ,
                                        used_Amount  : used_Amount
                                    } ;


                    return  <b key = { y } className="tag is-medium  m_Left_10 m_Bottom_15 is-white  pointer" style={ tag } >

                                { x['plan_type'] } &nbsp; ( { x['pet_species']['name'] } ) &nbsp;

                                { /* 未額滿  */ }
                                { used_Num !== quota_Beauty &&

                                    <b className = { `tag is-rounded f_10 ${ clicked_Tag['index'] === y && clicked_Tag['is_On'] === true ? 'is-danger' : 'is-danger is-light' }` }
                                       onClick   = { () => click_Use_Bath_Tag( params ) } >

                                        { ( clicked_Tag['index'] === y && clicked_Tag['is_On'] === true )  &&
                                                 <span>
                                                     { used_Num + 1 } / { quota_Beauty } &nbsp;
                                                     ( 餘額 : { x['plan_basic_price'] } 元 ) &nbsp; &nbsp;
                                                     已使用 &nbsp;
                                                 </span>
                                        }

                                        { ( clicked_Tag['is_On'] === false || ( clicked_Tag['index'] !== y && clicked_Tag['is_On'] === true  ) ) &&
                                                  <span>
                                                      { used_Num } / { quota_Beauty } &nbsp;
                                                      ( 餘額 : { x['plan_basic_price'] } 元 ) &nbsp; &nbsp;
                                                      點選使用 &nbsp;
                                                  </span>
                                        }

                                    </b>

                                }

                                { /*  已額滿  */ }
                                { used_Num !== 1 || <b className="tag is-rounded is-danger f_10"> { used_Num } / { quota_Beauty } &nbsp; 額度使用完畢 </b> }

                           </b> ;


                }


           })

} ;


