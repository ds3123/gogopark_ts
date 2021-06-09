
import React , { createContext } from "react" ;
import { useSelector , useDispatch } from "react-redux";

// Styled Component
import styled from '@emotion/styled';

// Redux
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;


type MaskProps = {
    active : boolean ;
}


type WrapperProps = {
    active : boolean ;
}


// 遮罩
const Mask = styled.div<MaskProps>`

      display: ${ props => props.active ? 'block' : 'none' } ;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: 98 ;
      cursor:pointer

`;

// 面板
const Panel_Wrapper = styled.div<WrapperProps>`

      border-radius:0px;
      width:70rem;
      overflow:auto;
      overflow-x:hidden;
      position: fixed;
      top: 0;
      bottom: 0;
      right:0em;
      background: #fff; 
      box-shadow: -3px 0 3px rgba(0, 0, 0, 0.04);
      transform: translateX( ${ props => props.active ? '0em' : '70em'} ) ;
      transition: all 0.3s ease-in-out;
      padding: 3rem 2rem;
      z-index:100;

`;


interface PanelContext {

    // 欲透過 Context 傳遞的 props 型別
    customer_Id : string ; // 客戶身分證序號
    pet_Serial  : string ; // 寵物編號

    basic_id    : string ; // 基礎單資料表 id
    bath_id     : string ; // 洗澡單資料表 id
    beauty_id   : string ; // 美容單資料表 id

    create_Data : string ; // 右側編輯面板 ( for 資料_新增 )
    preLoadData : any ;    // 預先填寫資料 ( for 資料_編輯 )

}


// 建立 Context
export const SidePanelContext = createContext<PanelContext>( {} as PanelContext ) ;


/* @ 右側滑動面板 */
const Side_Panel = () => {

    const active    = useSelector( ( state:any ) => state.Layout.Side_Panel_Open ) ;      // 是否開啟
    const component = useSelector( ( state:any ) => state.Layout.Side_Panel_Component ) ; // 所包含元件
    const props     = useSelector( ( state:any ) => state.Layout.Side_Panel_Props ) ;     // 元件屬性
    const dispatch  = useDispatch() ;


    // 關閉 : 遮罩、滑動容器元件
    const close = () => {
        // 還原 store 狀態
        dispatch( set_Side_Panel(false , null ,{} ) ) ;
        document.body.style.position = '' ; // 固定右側卷軸 ( overflow : hidden 沒有效果 )
    } ;

    return <>

             { /* 遮罩 ( 點選 --> 關閉 */ }
             <Mask active = { active } onClick = { () => { close() } } > </Mask>

             { /* 彈出面版 */ }
             <Panel_Wrapper active = { active } >

                 <SidePanelContext.Provider value = { props } >
                     { component }
                 </SidePanelContext.Provider>

             </Panel_Wrapper>

           </>

} ;

export default Side_Panel ;