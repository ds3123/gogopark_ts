import React , { useState , useEffect } from "react" ;
import {useDispatch, useSelector} from "react-redux";
import useBath_Time_Button from "hooks/layout/useBath_Time_Button";
import axios from "utils/axios"
import { set_Existing_Time_Records } from 'store/actions/action_Beautician'


/* 洗澡紀錄_點選按鈕 */
const Bath_Time_Records = () => {

    const dispatch = useDispatch();

    // 目前左側所點選 _ 寵物資訊
    const current_Service    = useSelector(( state : any ) => state.Beautician.Current_Pet ) ;


    const [ current_Service_Id , set_Eurrent_Service_Id ]            = useState('') ;

    const [ current_Existing_Records , set_Current_Existing_Records] = useState<any[]>( [] ) ;



    const [ time_Status , set_Time_Status ] = useState({ 
        
                                                                    // 前置作業
                                                                    pre_Start   : false  ,
                                                                    pre_End     : false ,
                                                            
                                                                    // 基礎 / 小美容
                                                                    basic_Start : false ,
                                                                    basic_End   : false ,
                                                            
                                                                    // # 洗澡 --------------------------
                                                            
                                                                    // 第一次洗澡
                                                                    bath_1_Start : false ,
                                                                    bath_1_End   : false ,
                                                            
                                                                    // 第二次洗澡
                                                                    bath_2_Start : false ,
                                                                    bath_2_End   : false ,
                                                            
                                                                    // 第一次浸泡
                                                                    bath_3_Start : false ,
                                                                    bath_3_End   : false ,
                                                            
                                                                    // 第三次洗澡
                                                                    bath_4_Start : false ,
                                                                    bath_4_End   : false ,
                                                            
                                                                    // 第二次浸泡
                                                                    bath_5_Start : false ,
                                                                    bath_5_End   : false ,
                                                            
                                                                    // # 美容 --------------------------
                                                                    beauty_Start : false ,
                                                                    beauty_End   : false ,
                                                            
                                                                    // # 進烘箱 --------------------------
                                                                    dry_Start    : false ,
                                                                    dry_End      : false ,
        
                                                                  }) ;



    // 前置作業
    const pre_Start = useBath_Time_Button( 'pre_Start' );
    const pre_End   = useBath_Time_Button( 'pre_End' );

    // 基礎 / 小美容
    const basic_Start = useBath_Time_Button( 'basic_Start' );
    const basic_End   = useBath_Time_Button( 'basic_End' );


    // # 洗澡 --------------------------
    // 第一次洗澡
    const bath_1_Start = useBath_Time_Button( 'bath_1_Start' );
    const bath_1_End   = useBath_Time_Button( 'bath_1_End' );

    // 第二次洗澡
    const bath_2_Start = useBath_Time_Button( 'bath_2_Start' );
    const bath_2_End   = useBath_Time_Button( 'bath_2_End' );

    // 第一次浸泡
    const bath_3_Start = useBath_Time_Button( 'bath_3_Start' );
    const bath_3_End   = useBath_Time_Button( 'bath_3_End' );

    // 第三次洗澡
    const bath_4_Start = useBath_Time_Button( 'bath_4_Start' );
    const bath_4_End   = useBath_Time_Button( 'bath_4_End' );

    // 第二次浸泡
    const bath_5_Start = useBath_Time_Button( 'bath_5_Start' );
    const bath_5_End   = useBath_Time_Button( 'bath_5_End' );

    // # 美容 ---------------------------
    const beauty_Start = useBath_Time_Button( 'beauty_Start' );
    const beauty_End   = useBath_Time_Button( 'beauty_End' );

    // # 進烘箱 --------------------------
    const dry_Start    = useBath_Time_Button( 'dry_Start' );
    const dry_End      = useBath_Time_Button( 'dry_End' );

    // ----------------------------------------------------------------------------------------------------

     useEffect(( ) => {

         let service_Id : any  ;  // 服務單資料表 id

         switch( current_Service['service_type'] ){
             case '基礎' : service_Id = current_Service['basic_id']  ; break ;
             case '洗澡' : service_Id = current_Service['bath_id']   ; break ;
             case '美容' : service_Id = current_Service['beauty_id'] ; break ;
         }

         set_Eurrent_Service_Id( service_Id ) ;


         // 取得 _ 該服務類型、服務單 id 下，已存在的時間記錄
         axios.get( `/time_records/show_by_type_id/${ current_Service['service_type'] }/${ service_Id.toString() }` ).then(res => {

            if( res.data.length > 0 ){
               set_Current_Existing_Records( res.data ) ;
               dispatch( set_Existing_Time_Records( res.data ) ) ;
            }else{
               set_Current_Existing_Records([] ) ;
               dispatch( set_Existing_Time_Records( [] ) ) ;
            }

         }) ;

     } ,[ current_Service ] ) ;


     // 尚未完成 ( 如何實現 _ 限制點選 2021.07.12 )
     // 目前服務單，已點選時間紀錄
     useEffect(( ) => {

       if( current_Existing_Records.length > 0 ){

         const pre_Start = current_Existing_Records.filter(x => ( x['button_name'] === 'pre_Start' ) ).length ;
         const pre_End   = current_Existing_Records.filter(x => ( x['button_name'] === 'pre_End' ) ).length ;

         set_Time_Status( pre_Start > 0  ? { ...time_Status , pre_Start : true } : { ...time_Status , pre_Start : false }) ;

       }

       console.log('dd')


     } , [  ]) ;



    // ----------------------------------------------------------------------------------------------------

    const t_Center = { textAlign : "center" , marginBottom : "30px" } as any ;
    const p_Title  = {
                       width      : "100%" ,
                       position   : "absolute" ,
                       top        : "-60px" ,
                       left       : "0px" ,
                       fontWeight : "bold" ,
                       fontSize   : "13pt" ,
                     } as any ;

   return <div className="columns is-multiline is-mobile relative" style={{ top : "10px" }} >

                  <span className="absolute" style={{top:"-80px",left:"30px"}}> 資料表 ID : { current_Service_Id } </span>

               { /* 前置作業 */ }
               <div className="column is-2-desktop relative" style = { t_Center } >

                   <div style={ p_Title } > <span style={ { color : "rgb(80,80,200)" } } > <br/> <b className="fRed">*</b> 前置作業 </span> </div>
                   { pre_Start }
                   { time_Status['pre_Start'] && pre_End }
                   <br/><br/><br/>

               </div>

               { /* 小美容 */ }
               <div className="column is-2-desktop relative" style = { t_Center } >

                   <div style={ p_Title } > <span> <br/> <b className="fRed">*</b> 小美容 </span> </div>
                   { basic_Start }
                   { basic_End }
                   <br/><br/><br/>

               </div>

                { ( current_Service['service_type'] === '洗澡' || current_Service['service_type'] === '美容' ) &&
                 <>

                   { /* 第一次洗澡 */ }
                   <div className="column is-2-desktop relative" style={t_Center}>

                       <div style={p_Title}>
                           <div className="select is-small m_Bottom_5">
                               <select>
                                   <option value="請選擇">請選擇</option>
                               </select>
                           </div> <br/>
                           <b className="fRed">*</b> 第一次洗澡
                       </div>

                       { bath_1_Start }
                       { bath_1_End }

                   </div>

                   { /* 第二次洗澡 */ }
                   <div className="column is-2-desktop relative" style={t_Center}>

                       <div style={p_Title}>
                           <div className="select is-small m_Bottom_5">
                               <select>
                                   <option value="請選擇">請選擇</option>
                               </select>
                           </div> <br/>
                           <b className="fRed">*</b> 第二次洗澡
                       </div>

                       { bath_2_Start }
                       { bath_2_End }

                   </div>

                   { /* 第一次浸泡 */ }
                   <div className="column is-2-desktop relative" style={t_Center}>

                       <div style={p_Title}>
                           <div className="select is-small m_Bottom_5">
                               <select>
                                   <option value="請選擇">請選擇</option>
                               </select>
                           </div> <br/>
                           <b className="fRed">*</b> 第一次浸泡
                       </div>

                       { bath_3_Start }
                       { bath_3_End }

                   </div>

                   { /* 第三次洗澡 */ }
                   <div className="column is-2-desktop relative" style={t_Center}>

                       <div style={p_Title}>
                           <div className="select is-small m_Bottom_5">
                               <select>
                                   <option value="請選擇">請選擇</option>
                               </select>
                           </div> <br/>
                           <b className="fRed">*</b> 第三次洗澡
                       </div>

                       { bath_4_Start }
                       { bath_4_End }

                   </div>

                   { /* 第二次浸泡 */ }
                   <div className="column is-2-desktop relative" style={t_Center}>

                       <div style={p_Title}>
                           <div className="select is-small m_Bottom_5">
                               <select>
                                   <option value="請選擇">請選擇</option>
                               </select>
                           </div> <br/>
                           <b className="fRed">*</b> 第二次浸泡
                       </div>

                       { bath_5_Start }
                       { bath_5_End }

                   </div>

                   { /* 進烘箱 */ }
                   <div className="column is-2-desktop relative" style={t_Center}>

                       <div style={p_Title}>
                           <div className="select is-small m_Bottom_5">
                               <select>
                                   <option value="請選擇">請選擇</option>
                               </select>
                           </div> <br/>
                           <b className="fRed">*</b> 進烘箱
                       </div>

                       { dry_Start }
                       { dry_End }


                   </div>

                 </>

                }

                { /* 大美容 */}
                { current_Service['service_type'] === '美容' &&

                   <div className="column is-2-desktop relative" style = {t_Center} >

                   <div style={p_Title} > <span > <br/> <b className="fRed">*</b> 大美容 </span> </div>

                   { beauty_Start }
                   { beauty_End   }


                   <br/><br/><br/>

                   </div>

               }

        </div>

} ;

export default Bath_Time_Records