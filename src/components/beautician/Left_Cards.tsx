
import React , { FC , useEffect } from 'react' ;
import useServiceType from 'hooks/layout/useServiceType'
import {useUpdate_Data} from 'hooks/ajax_crud/useAjax_Update';
import {set_Current_Pet } from 'store/actions/action_Beautician'
import {useDispatch, useSelector} from "react-redux";

interface ILeft {
   pet_Arr : any[] ;
}

{ /*  左側 : 等待中、處理中 面板   */ }
const Left_Cards : FC<ILeft>  = ( { pet_Arr } ) => {


    // 資料 _ 是否下載中 ( 與首頁使用同樣的 API )
    const Index_isLoading = useSelector( (state:any) => state.Index.Index_isLoading ) ;

    const dispatch    = useDispatch() ;

    // 更新函式
    const update_Data = useUpdate_Data() ;

    // 到店等候中
    const pets_Wait   = pet_Arr.filter( x => {  return x['shop_status'] === '到店等候中'   } ) ;

    // 到店美容中
    const pets_Beauty = pet_Arr.filter( x => {  return x['shop_status'] === '到店美容中'   } ) ;

    // 取得 : 資料類型樣式
    const get_ServiceType = useServiceType( null , true , 'medium' ) ;


    // 點選 : 列表資料 --> 接換處理狀態
    const click_Pet = ( pet : any ) => {

        let service_Id = '' ;
        let api        = '' ;
        if( pet['service_type'] === '基礎' ){ service_Id = pet['basic_id'] ;  api = '/basics' } ;
        if( pet['service_type'] === '洗澡' ){ service_Id = pet['bath_id'] ;   api = '/bathes' } ;
        if( pet['service_type'] === '美容' ){ service_Id = pet['beauty_id'] ; api = '/beauties' } ;

        // 更改欄位
        if( pet['shop_status'] === '到店等候中' ) update_Data( api , service_Id , { shop_status : '到店美容中' } , '/beautician' ) ;

        // 設定 _ Store
        dispatch( set_Current_Pet( pet ) ) ;

    } ;

    useEffect(( ) => {

       // dispatch( set_Current_Pet( pet ) ) ;

    } ,[] ) ;


    const status    = {

        marginBottom   : "0px" ,
        display        : "flex" ,
        justifyContent : "center" ,
        left           : "13px"

    } ;
    const left_Card = { height : "40vh" , overflow : "auto" , left : "13px" } ;
    const rS        = { width:"100%", marginBottom : "10px" , position:"relative" ,  justifyContent : "left" } as any ;

   return <>
               { /* 到店等候中  */ }
               <div className="tags has-addons relative" style={ status }>
                   <span className="tag is-medium is-link" >   到店等候中   </span>
                   <span className="tag is-medium is-link is-light" >
                       基礎 &nbsp;<b> { 0 } </b>&nbsp;
                       洗澡 &nbsp;<b> { 0 } </b>&nbsp;
                       美容 &nbsp;<b> { 0 } </b>
                   </span>
               </div>

               <div className="card p_10 has-text-centered" style={ left_Card } >

                  { Index_isLoading ||

                      pets_Wait.map( ( x , y ) => {

                          const pet = x['pet'] ;
                          const { color , icon } = get_ServiceType( x['service_type'] ) ;  // 取得樣式

                          return  <b className = { color } key = { y } style = { rS }  onClick = { () => click_Pet( x ) } >
                                     <i className ={ icon } ></i> &nbsp; { pet['name'] } ( { pet['species'] } )
                                     <b className="tag is-rounded is-white absolute" style={{ right:"10px" }}> { x['expected_leave'] } </b>
                                  </b>

                      })
                  }

                   { /* 下載圖示  */ }
                   { Index_isLoading &&

                       <div className="has-text-centered" >
                           <br/><br/><br/><br/><br/><br/>
                           <button className="button is-loading is-white"></button>
                       </div>

                   }

               </div>

               { /* 到店美容中 */ }
               <div className="tags has-addons relative" style={ status }>
                   <span className="tag is-medium is-link" >   到店美容中   </span>
                   <span className="tag is-medium is-link is-light" >
                       基礎 &nbsp;<b> { 0 } </b> &nbsp;
                       洗澡 &nbsp;<b> { 0 } </b> &nbsp;
                       美容 &nbsp;<b> { 0 } </b>
                   </span>
               </div>

               <div className="card p_10" style={ left_Card } >

                   { Index_isLoading ||

                       pets_Beauty.map( ( x , y ) => {

                           const pet = x['pet'] ;
                           const { color , icon } = get_ServiceType( x['service_type'] ) ;  // 取得樣式

                           return  <b className={ color } key={ y } style={ rS }  onClick = { () => click_Pet( x ) } >
                               <i className ={ icon} ></i> &nbsp; { pet['name'] } ( { pet['species'] } )
                               <b className="tag is-rounded is-white absolute" style={{ right:"10px" }}> { x['expected_leave'] } </b>
                           </b>

                       })

                   }

                   { /* 下載圖示  */ }
                   { Index_isLoading &&

                       <div className="has-text-centered" >
                           <br/><br/><br/><br/><br/><br/>
                           <button className="button is-loading is-white"></button>
                       </div>

                   }

               </div>

          </>

} ;


export default Left_Cards