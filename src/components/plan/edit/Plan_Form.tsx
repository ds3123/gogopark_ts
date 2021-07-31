
import React, { FC , useEffect , useState } from "react"
import { Edit_Form_Type } from "utils/Interface_Type";
import { useRead_Species } from "hooks/ajax_crud/useAjax_Read";
import { useDispatch } from "react-redux";
import { set_month_bath_price , set_month_beauty_price , set_lodge_coupon_price , set_current_plan_type , set_Self_Adjust_Amount , set_Service_Pickup_Fee } from 'store/actions/action_Plan'
import axios from "utils/axios" ;



interface IPlan extends Edit_Form_Type {

    editType?    : string ;
    serviceData? : any ;

}



{ /* @ 方案表單欄位  */}
const Plan_Form : FC< IPlan > = ( { register , setValue , errors , current, editType, serviceData  } ) => {

     const dispatch = useDispatch() ;

     // 取得 _ 所有寵物品種資料
     const petSpecies = useRead_Species() ;


     const [ show_History , set_Show_History ] = useState( false ) ;   // 是否顯示


     // 目前所選擇 : 方案類型
     const [ current_Plan_Type , set_Current_Plan_Type ]   = useState('') ;

     // 目前所選擇 : 品種 ( 在 pet_species 資料表的 id )
     const [ current_Species_Id , set_Current_Species_Id ] = useState<string>('') ;

     const [ current_Species , set_Current_Species ]       = useState({

                                                                       // 某品種，包月洗澡 :
                                                                       bath_month    : 0 ,    // 基本價格

                                                                       bath_adjust   : 0 ,    // 自訂增、減金額
                                                                       bath_pickup   : 0 ,    // 接送費
                                                                       bath_total    : 0 ,    // 共計費用


                                                                       // 某品種，包月美容 :
                                                                       beauty_month  : 0 ,    // 基本價格

                                                                       beauty_adjust : 0 ,    // 自訂增、減金額
                                                                       beauty_pickup : 0 ,    // 接送費
                                                                       beauty_total  : 0 ,    // 共計費用

                                                                     }) ;


     // 住宿券數量
     const [ coupon_Num , set_Coupon_Num ] = useState( 0 ) ;


     // 點選 _ 顯示歷史紀錄 ( 包月洗澡、包月美容 )
     const click_Show_History = ( ) => set_Show_History( !show_History ) ;

     // 取得 _ 方案類型
     const get_Plan_Type = ( type : string ) => {

         // * 初始化
         setValue( 'plan_Pet_Species' , '請選擇' ) ;                                                                   // 將寵物品種，設回請選擇
         set_Current_Species( { ...current_Species  , bath_month : 0 , beauty_month : 0 } ) ;
         setValue( 'plan_Lodge_Coupon' , '' ) ;                                                                        // 住宿券數量 ( input )
         set_Coupon_Num( 0 ) ;                                                                                   // state
         dispatch( set_current_plan_type( type === '請選擇' ? '' : type ) ) ;
         dispatch( set_month_bath_price(0 ) ) ;
         dispatch( set_month_beauty_price(0 ) ) ;
         dispatch( set_lodge_coupon_price(0 ) ) ;

         // 設定目前方案類型
         set_Current_Plan_Type(type === '請選擇' ? '' : type ) ;

     } ;

     // 取得 _ 品種 id ( 在 species 資料表的 id )
     const get_Species_Id = ( id : string ) => set_Current_Species_Id( id ) ;


     // 取得 _ 自訂增減金額 ( for 包月洗澡、包月美容 )
     const get_Self_Adjust_Amount = ( type : 'bath_adjust' | 'beauty_adjust' , price : number) => {

         const _price = price ? price : 0 ;

         set_Current_Species({...current_Species , [ type ] : _price }) ;
         dispatch( set_Self_Adjust_Amount( _price ) ) ;


     } ;

     // 取得 _ 接送費 ( for 包月洗澡、包月美容 )
     const get_Pickup_Fee = ( type : 'bath_pickup' | 'beauty_pickup' , price : number ) => {

         const _price = price ? price : 0 ;

         set_Current_Species({ ...current_Species , [ type ] : _price } ) ;
         dispatch( set_Service_Pickup_Fee( _price ) ) ;

     } ;

     // 取得 _ 住宿券數量
     const get_Coupon_Num = ( num : number ) => set_Coupon_Num( num ) ;


     // 設定 _ 所選擇品種，其相對應的 : "包月洗澡"、"包月美容" 價格
     useEffect(( ) => {

       if( current_Species_Id && current_Species_Id !== '請選擇' ){

           // 藉由該寵物品種資料表 ( pet_species ) id 欄位值，查詢 _ 相對應的各種服務價錢 ( 資料表 : service_prices )
           axios.get( `/service_prices/show_specie_id_prices/${ current_Species_Id }` ).then(res => {

               // 包月洗澡
               const bath_Month   = res.data.filter( ( x : any ) => x['service_type'] === '洗澡' && x['service_plan'] === '包月洗澡' )[0] ;

               // 包月美容
               const beauty_Month = res.data.filter( ( x : any ) => x['service_type'] === '美容' && x['service_plan'] === '包月美容' )[0] ;

               // 設定 state
               set_Current_Species({ ...current_Species ,
                                             bath_month   : bath_Month['service_price'] ,
                                             beauty_month : beauty_Month['service_price']
                                         }) ;

               // 設定 store
               dispatch( set_month_bath_price( bath_Month['service_price'] )     ) ;
               dispatch( set_month_beauty_price( beauty_Month['service_price'] ) ) ;

           }) ;

       }

     } ,[ current_Species_Id ] ) ;


    // 設定 _ 住宿券價格
     useEffect(( ) => {

       dispatch( set_lodge_coupon_price( 4000*coupon_Num ) ) ;

     } ,[ coupon_Num ] ) ;


     const box = {
                   width:'80%' ,
                   minHeight:'300px' ,
                   top : '-150px' ,
                   left:'10%',
                   background:'white' ,
                   padding : '20px' ,
                   boxShadow : '0px 0px 7px 2px rgba(0,0,0,.2)' , zIndex:200 } as const ;

     const del = {
                    background:'red' ,
                    float:'right' ,
                  } as const;


     return <div className="relative">

                 { /* 歷史紀錄清單  */ }
                 <br/><br/>

                 { show_History &&

                     <div className="absolute" style={ box } >

                         <b className="delete" style={del} onClick={ click_Show_History }></b>

                         <b className="tag is-large is-success is-light ">   歷史紀錄 : 包月洗澡 &nbsp;
                             <span className="tag is-rounded is-white f_12"> 江慶府 ( 091234343 ) </span>
                         </b> <br/><br/>

                         <table className="table is-fullwidth is-hoverable">

                            <thead>
                               <tr>
                                   <th> 購買日期 </th>
                                   <th> 方案類別 </th>
                                   <th> 寵物品種 </th>
                                   <th> 基本價格 </th>
                                   <th> 調整金額 </th>
                                   <th> 接送費用 </th>
                                   <th> 總計價格 </th>
                               </tr>
                            </thead>

                            <tbody>
                                <tr> <td> 2021-06-10 </td><td>包月洗澡</td><td>德國狼犬</td><td>3400</td><td>150</td><td>0</td><td>3550</td></tr>
                                <tr> <td> 2021-03-10 </td><td>包月洗澡</td><td>德國狼犬</td><td>3400</td><td>100</td><td>0</td><td>3500</td></tr>
                                <tr> <td> 2021-01-10 </td><td>包月洗澡</td><td>德國狼犬</td><td>3400</td><td>100</td><td>0</td><td>3500</td></tr>
                                <tr> <td> 2020-12-10 </td><td>包月洗澡</td><td>德國狼犬</td><td>3400</td><td>100</td><td>0</td><td>3500</td></tr>
                                <tr> <td> 2020-10-10 </td><td>包月洗澡</td><td>德國狼犬</td><td>3400</td><td>0</td><td>0</td><td>3400</td></tr>
                            </tbody>

                         </table>

                     </div>

                 }

                { /* 標題 */ }
                <label className="label " style={{ fontSize : "1.3em" }} >

                    <b className="tag is-large is-danger" > <i className="fas fa-file-alt"></i> &nbsp; 方 案 </b> &nbsp; &nbsp; &nbsp;

                    { /* 客戶最近一次消費紀錄 : 包月洗澡 ( 再修改 2021.07.28 )  */ }
                    { ( current_Plan_Type === '包月洗澡' && current_Species['bath_month'] !== 0 && editType !== '編輯' ) &&

                        <b className="tag is-medium is-success is-light">
                            最近一次 _ 包月洗澡 : 2021-06-10 / &nbsp; 3550 元 &nbsp; ( 德國狼犬 ) &nbsp;  &nbsp;
                            <span className="tag is-white is-rounded f_10 pointer" onClick={ click_Show_History } >
                                <i className="fas fa-list f_11"></i> &nbsp; 檢視歷史紀錄
                            </span>
                        </b>

                    }

                </label>

                <br/>

                <div className="columns is-multiline is-mobile">

                     { /* 方案類型 */ }
                     <div className="column is-3-desktop">

                         { /* for 新增  */ }
                         { editType === '編輯' ||

                            <>
                                <p> <b>方案類型</b> &nbsp; <b style={{color:"red"}} > { errors.plan_Type?.message } </b> </p>
                                <div className="select">
                                    <select { ...register( "plan_Type" ) } onChange={ e => get_Plan_Type( e.target.value ) } >
                                        <option value="請選擇">   請選擇    </option>
                                        <option value="包月洗澡"> 包月洗澡  </option>
                                        <option value="包月美容"> 包月美容  </option>
                                        <option value="住宿券">   住宿券    </option>
                                    </select>
                                </div>
                            </>

                         }

                         { /* for 編輯 */ }
                         { editType === '編輯' &&  <div className="f_14"> 方案類型 : <b className="fDblue"> { serviceData.plan_type }  </b> </div>  }

                     </div>

                     { /* # 依條件顯示元件 ------------------------------------------------------------------------------- */ }

                        { /* 寵物品種 */ }

                            { ( current_Plan_Type === '包月洗澡' || current_Plan_Type === '包月美容' || editType === '編輯' ) &&

                                <>

                                    { /* for 新增 */ }
                                    { editType === '編輯' ||

                                       <div className="column is-3-desktop">

                                            <p> <b> 寵物品種 </b> &nbsp; <b style={{ color: "red" }} > { errors.plan_Pet_Species?.message } </b> </p>

                                            <div className="select">
                                                <select {...register("plan_Pet_Species")} onChange={e => get_Species_Id(e.target.value)}>
                                                    <option value="請選擇"> 請選擇 </option>
                                                    { petSpecies.map((x, y) => <option value={x['id']} key={y}> {x['serial']} _ {x['name']} </option>) }
                                                </select>
                                            </div>

                                        </div>

                                    }

                                    { /* for 編輯 */ }
                                    { editType === '編輯' &&  <div className="column is-3-desktop f_14"> 寵物品種 : <b className="fDblue"> { serviceData.pet_species.name }  </b> </div>  }


                                </>

                            }

                        { /* ------------------------------------------------------------------------------------------------------------------------------------ */ }


                            { /* # for 新增 : 包月洗澡、包月美容  */ }

                                { /* 包月洗澡價格 */ }

                                    { ( current_Plan_Type === '包月洗澡' && current_Species['bath_month'] !== 0 ) &&

                                        <>

                                             { /* 基本價格 */ }
                                             <div className="column is-6-desktop ">
                                                <span className="tag is-white is-large relative" style={{ top:"20px" }}>
                                                    <b>基本價格</b> &nbsp;  :  &nbsp;
                                                    <b className="fRed f_12"> { current_Species['bath_month'] } 元 </b> &nbsp; &nbsp; &nbsp;
                                                    <span className='f_12'>  * 含 4 次洗澡 ( 需 3 個月內使用完畢 )  </span>
                                                </span>
                                             </div>

                                             { /* 自訂 : 加 / 減 金額 */ }
                                             <div className="column is-2-desktop ">

                                                 <p> <b> 自訂 : 加 / 減 金額 </b> &nbsp; <b style={{color:"red"}}> { errors.plan_Pet_Species?.message } </b> </p>
                                                 <div className="control has-icons-left" >
                                                     <span className="icon is-small is-left"> <i className="fas fa-calculator"></i> </span>
                                                     <input className='input' type='number' {...register("plan_Adjust_Amount")}  step='50' onChange={ e => get_Self_Adjust_Amount('bath_adjust' , parseInt(e.target.value) )} />
                                                 </div>

                                             </div>

                                             <div className="column is-1-desktop "> <span className="m_Top_30"> 元 </span> </div>

                                             { /* 接送費 */ }
                                             <div className="column is-2-desktop ">

                                                 <p> <b> 接送費 </b> &nbsp; <b style={{color:"red"}}> { errors.plan_Pet_Species?.message } </b> </p>
                                                 <div className="control has-icons-left" >
                                                     <span className="icon is-small is-left"> <i className="fas fa-truck-pickup"></i> </span>
                                                     <input className='input' type='number' {...register("plan_Pickup_Fee")}  min='0' step='50' onChange={ e => get_Pickup_Fee('bath_pickup' , parseInt(e.target.value) )} />
                                                 </div>

                                             </div>

                                             <div className="column is-1-desktop "> <span className="m_Top_30"> 元 </span> </div>

                                             { /* 包月洗澡 _ 共計 */ }
                                             <div className="column is-2-desktop ">
                                                    <span className="tag is-large relative" style={{ top:"20px" }}>
                                                    <b> 包月洗澡 _ 共計 </b> &nbsp;  :  &nbsp;
                                                    <b className="tag is-white is-rounded fRed f_12">
                                                        { current_Species['bath_month'] + current_Species['bath_adjust'] + current_Species['bath_pickup'] } 元
                                                    </b>
                                                </span>
                                             </div>

                                        </>

                                    }


                                { /* 包月美容價格 */ }

                                    { ( current_Plan_Type === '包月美容' && current_Species['beauty_month'] !== 0 ) &&

                                        <>

                                            { /* 基本價格 */ }
                                            <div className="column is-6-desktop ">
                                                <span className="tag is-white is-large relative" style={{ top:"20px" }}>
                                                    <b>基本價格</b> &nbsp; 價格 :  &nbsp;
                                                    <span className='absolute f_12' style={{ top:'-25px' , left:'0px' }}> * 含 1 次美容、3 次洗澡 ( 需 3 個月內使用完畢 ) </span>
                                                    <b className="tag is-white is-rounded fRed f_12"> { current_Species['beauty_month'] } 元 </b>
                                                </span>
                                            </div>

                                            { /* 自訂 : 加 / 減 金額 */ }
                                            <div className="column is-2-desktop ">

                                                <p> <b> 自訂 : 加 / 減 金額 </b> &nbsp; <b style={{color:"red"}}> { errors.plan_Pet_Species?.message } </b> </p>

                                                <div className="control has-icons-left" >
                                                    <span className="icon is-small is-left"> <i className="fas fa-calculator"></i> </span>
                                                    <input className='input' type='number' {...register("plan_Adjust_Amount")}  step='50' onChange={ e => get_Self_Adjust_Amount('beauty_adjust' , parseInt(e.target.value) )} />
                                                </div>

                                            </div>

                                            <div className="column is-1-desktop "> <span className="m_Top_30"> 元 </span> </div>

                                            { /* 接送費 */ }
                                            <div className="column is-2-desktop ">

                                                <p> <b> 接送費 </b> &nbsp; <b style={{color:"red"}}> { errors.plan_Pet_Species?.message } </b> </p>
                                                <div className="control has-icons-left" >
                                                    <span className="icon is-small is-left"> <i className="fas fa-truck-pickup"></i> </span>
                                                    <input className='input' type='number' {...register("plan_Pickup_Fee")}  min='0' step='50' onChange={ e => get_Pickup_Fee('beauty_pickup' , parseInt(e.target.value) )}  />
                                                </div>

                                            </div>

                                            <div className="column is-1-desktop "> <span className="m_Top_30"> 元 </span> </div>

                                            <div className="column is-2-desktop ">
                                                <span className="tag is-large relative" style={{ top:"20px" }}>
                                                <b> 包月美容 _ 共計 </b> &nbsp;  :  &nbsp;
                                                    <b className="tag is-white is-rounded fRed f_12">
                                                        { current_Species['beauty_month'] + current_Species['beauty_adjust'] + current_Species['beauty_pickup'] } 元
                                                    </b>
                                            </span>
                                            </div>


                                        </>

                                    }

                            { /* # for 編輯 : 包月洗澡、包月美容  */ }

                                { editType === '編輯' &&

                                    <>

                                        { /* 基本價格 */ }
                                        <div className="column is-6-desktop">
                                            <div className="f_14"> 基本價格 : <b className="fDred"> { serviceData.plan_basic_price } </b> 元 </div>
                                        </div>

                                        { /* 自訂 : 加 / 減 金額 */ }
                                        <div className="column is-3-desktop">
                                            <div className="f_14"> 自訂加 / 減 金額 : <b className="fDred"> { serviceData.plan_adjust_price } </b> 元 </div>
                                        </div>

                                        { /* 接送費 */ }
                                        <div className="column is-3-desktop">
                                            <div className="f_14"> 接送費 : <b className="fDred"> { serviceData.pickup_fee } </b> 元 </div>
                                        </div>

                                    </>

                                }



                        { /* ------------------------------------------------------------------------------------------------------------------------------------ */ }


                        { /* 住宿券 */ }
                        {  current_Plan_Type === '住宿券'  &&

                            <>

                                <div className="column is-2-desktop">
                                    <div className="control has-icons-left m_Top_20" >
                                        <span className="icon is-small is-left"> <i className="fas fa-ticket-alt"></i> </span>
                                        <input className='input' type='number'{ ...register( "plan_Lodge_Coupon_Number" ) }  min="0" step="1" onChange={ e => get_Coupon_Num( parseInt( e.target.value ) ) } />
                                    </div>
                                </div>

                                <div className="column is-1-desktop">
                                    <span className='m_Top_25'> 本 </span>
                                </div>

                                { coupon_Num > 0 &&
                                    <div className="column is-7-desktop">
                                        <span className="tag is-large relative" style={{ top:"20px" }}>
                                            <b>住宿券</b> &nbsp; 價格 :  &nbsp;
                                            <span className='absolute f_12' style={{ top:'-25px' , left:'0px' }}> * 4,000 元 / 本 ( 贈送 1 張 400 元 ; 面值共 4,400 元 ) </span>
                                            <b className="tag is-white is-rounded fRed f_12"> { coupon_Num*4000 } 元 </b>
                                        </span>
                                    </div>
                                }

                            </>

                        }

                </div>

                <br/>

            </div>

} ;

export default Plan_Form