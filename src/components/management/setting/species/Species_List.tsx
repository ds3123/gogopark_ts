
import React , { useEffect , useState } from "react"
import {useRead_Employees, useRead_Species} from "hooks/ajax_crud/useAjax_Read"
import {useDispatch} from "react-redux";
import {set_Side_Panel} from "store/actions/action_Global_Layout";
import Update_Species from "components/management/setting/species/edit/Update_Species";
import { useDelete_Pet_Species } from "hooks/ajax_crud/useAjax_Delete"

import {columns_Covert_Pet_Species} from "hooks/ajax_crud/useAjax_Create";
import {useHistory} from "react-router-dom";

// Axios
import axios from "utils/axios";
import rateLimit from 'axios-rate-limit';


/* 寵物品種清單  */
const Service_List = ( ) => {

    const history  = useHistory() ;
    const dispatch = useDispatch() ;

    // 所有寵物品種資料
    const data     = useRead_Species();

    const [ species , set_Species ] = useState( [] ) ;


    const [ timer , set_Timer ] = useState<any>() ;

    // 點選 _ 品種名稱
    const click_Species = ( species : any ) => dispatch( set_Side_Panel(true , <Update_Species /> , { preLoadData : species } ) ) ;

    // 刪除函式
    const delete_Pet_Species = useDelete_Pet_Species() ;

    // 點選 _ 刪除鈕
    const click_Delete = ( species_Id : string ) => delete_Pet_Species( species_Id) ;


    // 資料庫排序處理
    const handle_Order_DataBase = ( data : any ) => {

        // 取得 : 目前位置下， 品種 ( pet_species 資料表 )  ID
        const id_Arr = species.map( x =>  x['id'] ) ;

        let   obj : any = {} ;
        let   i   = 0 ;

        // 將 id_Arr 陣列，與排序後 data 陣列，合併成 1 個物件
        id_Arr.forEach( x => {

            let _obj : any  = {} ;
            _obj['name']      = data[i]['name'] ;
            _obj['serial']    = data[i]['serial'] ;
            _obj['character'] = data[i]['character'] ;
            _obj['size']      = data[i]['size'] ;
            _obj['fur']       = data[i]['fur'] ;
            _obj['note']      = data[i]['note'] ;

            obj[ x ]          = _obj ;

            i ++ ;

        }) ;



        // 限制 Axios 發送 Request
        const http = rateLimit( axios , { maxRequests: 3 , perMilliseconds: 1000, maxRPS: 3 }) ;
        //  http.getMaxRPS() ; // 2


        // 逐個更新 : 依照所取得資料庫 ID，逐步更新為 _ 目前前端資料順序
        for( let x in obj ){

            // 如果有前一次的執行( Timer ID ) --> 先清除( 該動作 )
            if( timer ) clearTimeout( timer ) ;

            // 延後 ( 300 ms ) 執行，並產生該執行的 Timer ID
            const _timer  = setTimeout( ( ) => {

                // axios.put(`/pet_species/${x}`, obj[x]) ;
                http.put(`/pet_species/${x}`, obj[x]) ;

            } , 300 ) ;

            set_Timer( _timer ) ;

        }



    } ;

    // 點選 _ 向上排序
    const click_Up   = ( index : number ) => {

        if( index === 0 ){ alert( '已為第一個項目' ) ; return false ; }

        // # 前端排序 --------------------------

        let _species : any = [ ...species ] ;

        // 取得 _ 所刪除項目
        const deleteItem = _species.splice( index-1 ,1 ) ;

        // 新增 _ 所刪除項目
        _species.splice( index+1 , 0 , deleteItem[0] ) ;


        // # 資料庫處理 --------------------------
        handle_Order_DataBase( _species ) ;


        // 設定、渲染畫面
        set_Species( _species ) ;


        // 重導向
        // history.push("/wrongpath");  // 錯誤路徑
        // history.push( '/management' );


    } ;

    // 點選 _ 向下排序
    const click_Down = ( index : number ) => {

        const maxIndex = ( species.length ) - 1 ;
        if( index === maxIndex ){ alert( '已為最後一個項目' ) ; return false ; }

        // # 前端排序  --------------------------

        let _species : any = [ ...species ] ;

        // 取得 _ 所刪除項目
        const deleteItem = _species.splice( index+1 ,1 ) ;

        // 新增 _ 所刪除項目
        _species.splice( index , 0 , deleteItem[0] ) ;


        // # 資料庫處理 --------------------------
        handle_Order_DataBase( _species ) ;

        // 設定、渲染畫面
        set_Species( _species ) ;


        // 重導向
        // history.push("/wrongpath");  // 錯誤路徑
        // history.push( '/management' );


    } ;



    useEffect( ( ) => {

      if( data.length > 0 )  set_Species( data );

    } , [ data ] ) ;


    // -------------------------------------------------------------

    const left = { textAlign : 'left' } as const ;
    const bt   = { background : 'white' , boxShadow : '0px 0px 4px 1px rgba(100,100,100,.1)' }  as const ;

    return <table className="table is-fullwidth is-hoverable" style={{marginBottom:"150px"}}>

                <thead>
                    <tr>
                        <th> 排 序 </th>
                        <th> 名 稱 </th>
                        <th> 代 號 </th>
                        <th> 代 碼 </th>
                        <th> 體 型 </th>
                        <th> 毛 髮 </th>
                        <th> 備 註 </th>
                        <th> 刪 除 </th>
                    </tr>
                </thead>
                <tbody>
                   {

                       species.map( (x:any,y:any) => {

                          return <tr key={y} style={{ lineHeight : "40px" }}>
                                    <td className='relative'>
                                        <b className="tag is-medium relative is-white" onClick={ () => click_Up(y) }>
                                            <span className="absolute" style={{ top:"0px" , fontSize:"22pt" }}>
                                                <i className="fas fa-sort-up pointer"   ></i>
                                            </span>
                                        </b> &nbsp;&nbsp;
                                        <b className="tag is-medium is-white" onClick={ () => click_Down(y) }>
                                           <span className="absolute" style={{ top:"0px" , fontSize:"22pt" }}>
                                               <i className="fas fa-sort-down" ></i>
                                           </span>
                                        </b>
                                    </td>
                                    <td style={ left }>
                                        <b className="tag is-medium pointer" style={bt} onClick={ () => click_Species( x ) }>  { x['name'] }  </b>
                                    </td>
                                    <td> { x['serial'] }              </td>
                                    <td> { x['character'] }           </td>
                                    <td> { x['size'] }                </td>
                                    <td> { x['fur'] }                 </td>
                                    <td style={ left }> { x['note'] } </td>
                                    <td>
                                        <b className="delete relative" style={{ top:"7px" }}
                                           onClick={ () => { if( window.confirm("確認要刪除此品種 ?") ) click_Delete( x['id'] ) } }>
                                        </b>
                                    </td>
                                 </tr>

                       })

                   }
                </tbody>

          </table>

} ;

export default Service_List ;

