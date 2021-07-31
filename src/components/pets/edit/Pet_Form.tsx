import React, {FC, useEffect, useState} from "react"

import { Edit_Form_Type } from "utils/Interface_Type"
import { Input } from "templates/form/Input";
import { useRead_Species } from "hooks/ajax_crud/useAjax_Read";
import { get_Today } from "utils/time/date";
import { get_RandomInt } from "utils/number/number";

import useSection_Folding from "hooks/layout/useSection_Folding" ;


import axios from "utils/axios" ;

// Redux
import { useDispatch , useSelector } from "react-redux";
import { set_IsExisting_Pet , set_Current_Species_Select_Id } from "store/actions/action_Pet" ;
import { set_Bath_Price } from "store/actions/action_Bath"
import { set_Beauty_Price } from "store/actions/action_Beauty"
import { set_Current_Create_Service_Type } from "store/actions/action_Service"





{ /* 寵物表單欄位  */ }
const Pet_Form : FC<Edit_Form_Type> = ( { register , setValue , errors , current, pet_Species_id } ) => {

   const dispatch = useDispatch() ;


   // 取得 _ 所有寵物品種資料
   const petSpecies = useRead_Species() ;

   // 收折區塊
   const { is_folding , Folding_Bt } = useSection_Folding( false ) ;

   // 客戶單，目前所填入客戶的所有寵物
   const current_Customer_Pets = useSelector(( state:any ) => state.Customer.Current_Customer_Pets ) ;

   // 資料庫( 資料表 bath ) _ 該客戶有洗澡單紀錄( for 判斷是否為 "初次洗澡" )
   const Has_Bath_Records = useSelector(( state:any ) => state.Customer.Has_Bath_Records ) ;


   //-------------------------------------------

    // 目前所選擇品種 _ species 資料表的 id
    const [ current_Species_Id , set_Current_Species_Id ] = useState("") ;

    // 目前所選擇品種 _ service_prices 資料表的服務價格
    const [ current_Species_Prices , set_Current_Species_Prices ] = useState({
                                                                                          first_Bath    : 0 , // 初次洗澡
                                                                                          single_Bath   : 0 , // 單次洗澡
                                                                                          month_Bath    : 0 , // 包月洗澡
                                                                                          single_Beauty : 0 , // 單次美容
                                                                                          month_Beauty  : 0 , // 包月美容
                                                                                       }) ;

    // 目前服務類別
    const [ current_Service , set_Current_Service ] = useState({
                                                                            is_First_Bath    : false ,
                                                                            is_Single_Bath   : false ,
                                                                            is_Single_Beauty : false ,
                                                                         }) ;

    // 變動處理 _ 品種下拉選單
    const get_Species_Id = ( species_Id : string ) => {


        dispatch( set_Current_Species_Select_Id( species_Id ) ) ;  // Redux ( for Summary_Fee 付款方式為包月洗澡、美容時，設定所選擇品種  )
        set_Current_Species_Id( species_Id ) ;                     // State

        if( species_Id === '請選擇' ) return false ;

        // 取得 _ 所選擇品種，相對應的各種服務價格
        axios.get( `/service_prices/show_specie_id_prices/${ species_Id }` ).then( res => {

           const _data = res.data ;

           let priceArr : any = {
                                   first_Bath    : 0 ,
                                   single_Bath   : 0 ,
                                   month_Bath    : 0 ,
                                   single_Beauty : 0 ,
                                   month_Beauty  : 0
                                } ;

           // 有資料
           if( _data.length > 0 ){

               _data.forEach( ( x : any ) => {

                      const sName  = x['service_name'] ;
                      const sPrice = x['service_price'] ;

                      if( sName === '初次洗澡優惠價格' ) priceArr['first_Bath'] = sPrice ;
                      if( sName === '單次洗澡價格' )     priceArr['single_Bath'] = sPrice ;
                      if( sName === '包月洗澡價格' )     priceArr['month_Bath'] = sPrice ;
                      if( sName === '單次美容價格' )     priceArr['single_Beauty'] = sPrice ;
                      if( sName === '包月美容價格' )     priceArr['month_Beauty'] = sPrice ;

               }) ;

               // # 設定 State
               set_Current_Species_Prices({ ...current_Species_Prices ,
                                                     first_Bath    : priceArr['first_Bath'] ,
                                                     single_Bath   : priceArr['single_Bath'] ,
                                                     month_Bath    : priceArr['month_Bath'] ,
                                                     single_Beauty : priceArr['single_Beauty'] ,
                                                     month_Beauty  : priceArr['month_Beauty'] ,
                                                 }) ;

               return false

           }

            // 沒有資料 ( 回復預設值 )
            set_Current_Species_Prices({ ...current_Species_Prices ,
                                                 first_Bath    : 0 ,
                                                 single_Bath   : 0 ,
                                                 month_Bath    : 0 ,
                                                 single_Beauty : 0 ,
                                                 month_Beauty  : 0 ,
                                              }) ;


        })

    } ;

    // 點選 _ 帶入舊寵物資料
    const set_Pet_Data = ( pet : any ) => {

          // 取得 _ 該寵物 pet_species 資料表資料 ( 為取得品種 id )
          const _pet = petSpecies.filter( x => x['name'] === pet['species'] )[0] ;

          try{

              // 設定 store : 資料庫，有 _ 該寵物
              dispatch( set_IsExisting_Pet( true ) ) ;

              // for Summary_Fee 付款方式為包月洗澡、美容時，設定所選擇品種
              dispatch( set_Current_Species_Select_Id( _pet['id'] ) ) ;  // Redux

              // 基本資料
              setValue( "pet_Serial"   , pet['serial']  , { shouldValidate: true } ) ;
              setValue( "pet_Name"     , pet['name']    , { shouldValidate: true } ) ;

              setValue( "pet_Species"  , _pet['id'] , { shouldValidate: true } ) ;

              setValue( "pet_Sex"      , pet['sex']     , { shouldValidate: true } ) ;
              setValue( "pet_Color"    , pet['color']   , { shouldValidate: true } ) ;
              setValue( "pet_Weight"   , pet['weight']  , { shouldValidate: true } ) ;
              setValue( "pet_Age"      , pet['age']     , { shouldValidate: true } ) ;

              // 調查資料 ( 單選 )
              setValue( "injection" , pet['injection'] , { shouldValidate: true } ) ;
              setValue( "flea"      , pet['flea']      , { shouldValidate: true } ) ;
              setValue( "ligate"    , pet['ligate']    , { shouldValidate: true } ) ;
              setValue( "chip"      , pet['chip']      , { shouldValidate: true } ) ;
              setValue( "infection" , pet['infection'] , { shouldValidate: true } ) ;
              setValue( "together"  , pet['together']  , { shouldValidate: true } ) ;
              setValue( "drug"      , pet['drug']      , { shouldValidate: true } ) ;
              setValue( "bite"      , pet['bite']      , { shouldValidate: true } ) ;

              // 調查資料 ( 複選 : 轉為陣列 )
              setValue( "health"       , pet['health'] ? pet['health'].split(',') : []             , { shouldValidate: true } ) ;
              setValue( "feed"         , pet['feed'] ? pet['feed'].split(',') : []                 , { shouldValidate: true } ) ;
              setValue( "toilet"       , pet['toilet'] ? pet['toilet'].split(',') : []             , { shouldValidate: true } ) ;
              setValue( "ownerProvide" , pet['ownerProvide'] ? pet['ownerProvide'].split(',') : [] , { shouldValidate: true } ) ;

              // 備註
              setValue( "pet_Note" , pet['note'] , { shouldValidate: true } ) ;


          }catch(error){

              alert( "寵物品種資料，發生錯誤" )

          }

    } ;


    // 設定 _ 隨機寵物編號 ( '新增'時，才設定 )
    useEffect(( ) => {

        if( current ){

            const randomId = `P_${ get_Today() }_${ get_RandomInt(1000) }` ;
            dispatch( set_IsExisting_Pet( false ) ) ;    // 設定 store : 資料庫，沒有 _ 該寵物
            setValue( "pet_Serial" , randomId  ) ;            // 設定 input 欄位值

        }

    } , [] ) ;


    // 設定 _ 目前服務類別
    useEffect(() => {

      // # 設定 _ 目前服務類別 : 所屬性質 ( 初次洗澡、單次洗澡、單次美容 )

      // 初次洗澡
      const is_First_Bath    = current === '洗澡' && !Has_Bath_Records && ( current_Species_Id && current_Species_Id !== '請選擇' ) as boolean  ;

      // 單次洗澡
      const is_Single_Bath   = current === '洗澡' && Has_Bath_Records && ( current_Species_Id && current_Species_Id !== '請選擇' ) as boolean ;

      // 單次美容 ( 條件再檢查 2021.07.24 )
      const is_Single_Beauty = current === '美容' && ( current_Species_Id && current_Species_Id !== '請選擇' )  as boolean  ;

      set_Current_Service({ ...current_Service ,

                                    is_First_Bath    : is_First_Bath ,
                                    is_Single_Bath   : is_Single_Bath ,
                                    is_Single_Beauty : is_Single_Beauty ,

                                }) ;

    } ,[ current , current_Species_Id , Has_Bath_Records ] ) ;


    // # 設定 _ 價格 ( for 洗澡 / 美容標題列、結算價格 )
    useEffect(( ) => {

        // 初始還原
        dispatch( set_Bath_Price( 0 ) ) ;
        dispatch( set_Beauty_Price( 0 ) ) ;
        dispatch( set_Current_Create_Service_Type('' ) ) ;

        // 初次洗澡
        if( current_Service['is_First_Bath'] ){
            dispatch( set_Bath_Price( current_Species_Prices['first_Bath'] ) ) ;
            dispatch( set_Current_Create_Service_Type( '初次洗澡優惠' ) ) ;
        }

        // 單次洗澡
        if( current_Service['is_Single_Bath'] ){
            dispatch( set_Bath_Price( current_Species_Prices['single_Bath'] ) ) ;
            dispatch( set_Current_Create_Service_Type( '單次洗澡' ) ) ;
        }

        // 單次美容
        if( current_Service['is_Single_Beauty'] ){
            dispatch( set_Beauty_Price( current_Species_Prices['single_Beauty'] ) ) ;
            dispatch( set_Current_Create_Service_Type( '單次美容' ) ) ;
        }

    } ,[ current_Service , current_Species_Prices ] ) ;

    //
    useEffect(( ) => {

       /*
          # for 編輯 _ 寵物 時，設定 : " 品種 " 下拉選項( Ajax 取得 )
            * 因 Pet_Form 載入時，Ajax 資料尚未取得( 若以 React Hook Form 的 defaultValues，無法成功設定 _ 預設值 )
            * 需取得資料後，再以 setValue() 單獨設定預設值
       */

       if( !current && pet_Species_id )  setValue('pet_Species' , pet_Species_id ) ;

    } , [ pet_Species_id ] ) ;


   return <>

               { /* 寵物基本資料 */ }
               <label className="label relative" style={{ fontSize : "1.3em" }}>

                   <i className="fas fa-dog"></i> &nbsp; 寵物資料

                   { Folding_Bt } { /* 收折鈕 */ }

                   { /* # 目前服務狀態 ( 初次洗澡 | 單次洗澡 | 單次美容 ) ，相對應服務價格  ---------------------- */ }

                       { /* 初次洗澡優惠價格 */ }
                       { current_Service['is_First_Bath'] &&

                           <div className="absolute"  style={{ top : "-38px", left:"150px" , width:"70%", height:"35px" }}>
                               <b className="tag is-medium is-white" style={{color:'rgb(0,180,0)'}}>
                                   <i className="fas fa-comment-dots"></i> &nbsp; 此客戶寵物為 _ <span style={{color:"rgb(180,0,0)"}}> &nbsp; 初次洗澡 </span>，優惠價格為 :&nbsp;
                                     <span style={{color:"rgb(180,0,0)"}}> { current_Species_Prices['first_Bath'] } </span>&nbsp;元
                               </b>
                           </div>

                       }

                       { /* 單次洗澡價格 */ }
                       { current_Service['is_Single_Bath'] &&

                           <div className="absolute"  style={{ top : "-38px", left:"150px" , width:"70%", height:"35px" }}>
                               <b className="tag is-medium is-white" style={{color:'rgb(0,180,0)'}} >
                                   <i className="fas fa-comment-dots"></i> &nbsp; 此客戶寵物為 _ <span style={{color:"rgb(180,0,0)"}}> 單次洗澡 </span>，價格為 : &nbsp;
                                   <span style={{color:"rgb(180,0,0)"}}> { current_Species_Prices['single_Bath'] } </span>&nbsp;元
                               </b>
                           </div>

                       }

                       { /* 單次美容價格 */ }
                       { current_Service['is_Single_Beauty'] &&

                           <div className="absolute"  style={{ top : "-38px", left:"150px" , width:"70%", height:"35px" }}>
                               <b className="tag is-medium is-white" style={{color:'rgb(0,180,0)'}} >
                                   <i className="fas fa-comment-dots"></i> &nbsp; 此客戶寵物為 _ <span style={{color:"rgb(180,0,0)"}}> 單次美容 </span>，價格為 : &nbsp;
                                   <span style={{color:"rgb(180,0,0)"}}> { current_Species_Prices['single_Beauty'] }  </span>&nbsp;元
                               </b>
                           </div>

                       }

                   { /* ---------------------------------------------------------------------- */ }

                   { /* 客戶所有寵物 */ }
                   {

                     ( current && current_Customer_Pets.length > 0 ) &&

                       current_Customer_Pets.map( ( x : any , y : any ) => {

                           return <span key = { y } onClick = { () => set_Pet_Data( x ) } >
                                     &nbsp; <b className="tag is-medium pointer m_Bottom_15" > { x['name'] } ( { x['species'] } ) </b> &nbsp; &nbsp;
                                  </span>

                       })

                   }

               </label> <br/>

               { /* 是否收折 */ }
               { is_folding ||

                   <>

                       <div className="columns is-multiline  is-mobile">

                           { /* 編號 */ }
                           <div className=  'column is-3-desktop'  >

                               <p className="relative"> 編號  </p>
                               <div className="control has-icons-left" >
                                   <span className="icon is-small is-left"> <i className="fas fa-list-ol"></i> </span>
                                   <input  className="input" type='text' { ...register( 'pet_Serial' ) }    />
                               </div>

                           </div>

                           { /* 名字 */ }
                           <Input type="text" name="pet_Name" label="名 字" register={register} error={errors.pet_Name}
                                  icon="fas fa-paw" asterisk={true} columns="3" />

                           { /* 品種 */ }
                           <div className="column is-3-desktop required">

                               <p> 品 種 &nbsp; <b style={{color: "red"}}> {errors.pet_Species?.message} </b></p>

                               <div className="control has-icons-left">

                                   <div className="select">

                                       <select {...register("pet_Species")} onChange={ e => get_Species_Id(e.target.value)}>
                                           <option value="請選擇">請選擇</option>
                                           {
                                               petSpecies.map((x, y) => {


                                                   return <option value = { x['id'] }
                                                                  key   = { y } >
                                                                  {x['serial']} _ { x['name'] }  { x['character'] ? `( ${ x['character'] } )` : '' }
                                                          </option> ;

                                               })
                                           }
                                       </select>
                                   </div>

                                   <div className="icon is-small is-left"> <i className="fas fa-cat"></i> </div>

                               </div>

                           </div>

                           { /* 性別  */ }
                           <div className="column is-3-desktop">

                               <p> 性 別 &nbsp; <b style={{color: "red"}}> {errors.pet_Sex?.message} </b></p>

                               <div className="control has-icons-left">

                                   <div className="select">
                                       <select {...register("pet_Sex")}  >
                                           <option value="請選擇">請選擇</option>
                                           <option value="公">公</option>
                                           <option value="母">母</option>
                                           <option value="不確定">不確定</option>
                                       </select>
                                   </div>

                                   <div className="icon is-small is-left">
                                       <i className="fas fa-venus-mars"></i>
                                   </div>

                               </div>

                           </div>

                           <Input type="text" name="pet_Color" label="毛 色" register={register} error={errors.pet_Color}
                                  icon="fas fa-eye-dropper" asterisk={false} columns="3" />
                           <Input type="text" name="pet_Weight" label="體 重 (kg)" register={register} error={errors.pet_Weight}
                                  icon="fas fa-weight" asterisk={false} columns="3" />
                           <Input type="text" name="pet_Age" label="年 紀 (歲)" register={register} error={errors.pet_Age}
                                  icon="fas fa-pager" asterisk={false} columns="3" />

                       </div>

                       <br/>

                       { /* Radio 單選 */}
                       <div className="columns is-multiline  is-mobile">

                           <div className="column is-6-desktop">
                               <b> 每年預防注射 : </b> &nbsp;
                               <input type="radio" value="有"     {...register("injection")} /> 有    &nbsp; &nbsp;
                               <input type="radio" value="無"     {...register("injection")} /> 無    &nbsp; &nbsp;
                               <input type="radio" value="不確定" {...register("injection")} /> 不確定
                           </div>

                           <div className="column is-6-desktop">
                               <b> 滴除蚤 : </b> &nbsp;
                               <input type="radio" value="有"     {...register("flea")} /> 有    &nbsp; &nbsp;
                               <input type="radio" value="無"     {...register("flea")} /> 無    &nbsp; &nbsp;
                               <input type="radio" value="代送獸醫除蚤" {...register("flea")} /> 代送獸醫除蚤 &nbsp; &nbsp;
                               <input type="radio" value="不確定" {...register("flea")} /> 不確定
                           </div>

                           <div className="column is-6-desktop">
                               <b> 結 紮 : </b> &nbsp;
                               <input type="radio" value="有"     {...register("ligate")} /> 有     &nbsp; &nbsp;
                               <input type="radio" value="無"     {...register("ligate")} /> 無     &nbsp; &nbsp;
                               <input type="radio" value="發情中" {...register("ligate")} /> 發情中 &nbsp; &nbsp;
                               <input type="radio" value="不確定" {...register("ligate")} /> 不確定
                           </div>

                           <div className="column is-6-desktop">
                               <b> 晶 片 : </b> &nbsp;
                               <input type="radio" value="有"     {...register("chip")} /> 有    &nbsp; &nbsp;
                               <input type="radio" value="無"     {...register("chip")} /> 無    &nbsp; &nbsp;
                               <input type="radio" value="不確定" {...register("chip")} /> 不確定
                           </div>

                           <div className="column is-6-desktop">
                               <b> 傳染病 : </b> &nbsp;
                               <input type="radio" value="有"     {...register("infection")} /> 有    &nbsp; &nbsp;
                               <input type="radio" value="無"     {...register("infection")} /> 無    &nbsp; &nbsp;
                               <input type="radio" value="不確定" {...register("infection")} /> 不確定
                           </div>

                           <div className="column is-6-desktop">
                               <b> 與其他狗共處 : </b> &nbsp;
                               <input type="radio" value="可"     {...register("together")} /> 可    &nbsp; &nbsp;
                               <input type="radio" value="否"     {...register("together")} /> 否    &nbsp; &nbsp;
                               <input type="radio" value="不確定" {...register("together")} /> 不確定
                           </div>

                           <div className="column is-6-desktop">
                               <b> 服藥中 : </b> &nbsp;
                               <input type="radio" value="是"     {...register("drug")} /> 是    &nbsp; &nbsp;
                               <input type="radio" value="否"     {...register("drug")} /> 否    &nbsp; &nbsp;
                               <input type="radio" value="不確定" {...register("drug")} /> 不確定
                           </div>

                           <div className="column is-6-desktop">
                               <b> 咬 人 : </b> &nbsp;
                               <input type="radio" value="會"     {...register("bite")} /> 會    &nbsp; &nbsp;
                               <input type="radio" value="不會"   {...register("bite")} /> 不會  &nbsp; &nbsp;
                               <input type="radio" value="不一定" {...register("bite")} /> 不一定，須小心  &nbsp; &nbsp;
                               <input type="radio" value="不確定" {...register("bite")} /> 不確定
                           </div>

                       </div>

                       <b style={{color: "rgb(0,0,150)"}}> * 以下選項可複選 --- </b>

                       { /* Checkbox 複選、備註 */}
                       <div className="columns is-multiline is-mobile">

                           <div className="column is-6-desktop">
                               <b> 健 康 : </b> &nbsp;
                               <input type="checkbox" value="良好" {...register("health")} /> 良好 &nbsp; &nbsp;
                               <input type="checkbox" value="關節" {...register("health")} /> 關節 &nbsp; &nbsp;
                               <input type="checkbox" value="皮膚" {...register("health")} /> 皮膚 &nbsp; &nbsp;
                               <input type="checkbox" value="過敏" {...register("health")} /> 過敏 &nbsp; &nbsp;
                               <input type="checkbox" value="其他" {...register("health")} /> 其他 &nbsp; &nbsp;
                           </div>

                           <div className="column is-6-desktop">
                               <b> 餵食方式 : </b> &nbsp;
                               <input type="checkbox" value="飼料" {...register("feed")} /> 飼料 &nbsp; &nbsp;
                               <input type="checkbox" value="罐頭" {...register("feed")} /> 罐頭 &nbsp; &nbsp;
                               <input type="checkbox" value="鮮食" {...register("feed")} /> 鮮食 &nbsp; &nbsp;
                               <input type="checkbox" value="其他" {...register("feed")} /> 其他 &nbsp; &nbsp;
                           </div>

                           <div className="column is-6-desktop">
                               <b> 如廁方式 : </b> &nbsp;
                               <input type="checkbox" value="戶外" {...register("toilet")} /> 戶外 &nbsp; &nbsp;
                               <input type="checkbox" value="室內" {...register("toilet")} /> 室內 &nbsp; &nbsp;
                               <input type="checkbox" value="尿布" {...register("toilet")} /> 尿布 &nbsp; &nbsp;
                               <input type="checkbox" value="其他" {...register("toilet")} /> 其他 &nbsp; &nbsp;
                           </div>

                           <div className="column is-12-desktop">
                               <b> 飼主提供 : </b> &nbsp;
                               <input type="checkbox" value="飼料" {...register("ownerProvide")} /> 飼料 &nbsp; &nbsp;
                               <input type="checkbox" value="罐頭" {...register("ownerProvide")} /> 罐頭 &nbsp; &nbsp;
                               <input type="checkbox" value="零食" {...register("ownerProvide")} /> 零食 &nbsp; &nbsp;
                               <input type="checkbox" value="睡墊" {...register("ownerProvide")} /> 睡墊 &nbsp; &nbsp;
                               <input type="checkbox" value="項圈" {...register("ownerProvide")} /> 項圈 &nbsp; &nbsp;
                               <input type="checkbox" value="胸背" {...register("ownerProvide")} /> 胸背 &nbsp; &nbsp;
                               <input type="checkbox" value="牽繩" {...register("ownerProvide")} /> 牽繩 &nbsp; &nbsp;
                               <input type="checkbox" value="提籃" {...register("ownerProvide")} /> 提籃 &nbsp; &nbsp;
                               <input type="checkbox" value="玩具" {...register("ownerProvide")} /> 玩具 &nbsp; &nbsp;
                               <input type="checkbox" value="其他" {...register("ownerProvide")} /> 其他 &nbsp; &nbsp;
                           </div>

                           <div className="column is-12-desktop">

                               <textarea className="textarea" {...register("pet_Note")} placeholder="備註事項"
                                         style={{color: "rgb(0,0,180)", fontWeight: "bold"}}/>

                           </div>

                       </div>

                       <br/>

                   </>

               }

          </>

} ;

export default Pet_Form ;
