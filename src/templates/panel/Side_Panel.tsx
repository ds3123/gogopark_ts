

import React from "react" ;
import { useSelector , useDispatch } from "react-redux";


// Styled Component
import styled from '@emotion/styled';

// Redux
import { set_Side_Panel } from "store/actions/action_Global_Layout" ;



type WrapperProps = {
    active : boolean
}


// 遮罩
const Mask = styled.div<WrapperProps>`

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
      height:100vh;
      position: fixed;
      top: 0;
      bottom: 0;
      right:0em;
      background: #fff; 
      box-shadow: -3px 0 3px rgba(0, 0, 0, 0.04);
      transform: translateX( ${ props => props.active ? '0em' : '70em'} ) ;
      transition: all 0.3s ease-in-out;
      padding: 1rem 2rem;
      z-index:100;

`;


/* @ 右側滑動面板 */
const Side_Panel = (   ) => {

    const active    = useSelector( ( state:any ) => state.Layout.Side_Panel_Open ) ;      // 是否開啟
    const component = useSelector( ( state:any ) => state.Layout.Side_Panel_Component ) ; // 所包含元件
    const props     = useSelector( ( state:any ) => state.Layout.Side_Panel_Props ) ;     // 元件屬性
    const dispatch  = useDispatch() ;

    // 關閉 : 遮罩、滑動容器元件
    const close = () => {

        // 還原 store 狀態
        dispatch( set_Side_Panel( false , null ,{} )  ) ;


    } ;


    return <React.Fragment>

                { /* 遮罩 ( 點選 --> 關閉 */ }
                <Mask active = { active } onClick = { () => { close(); } } > </Mask>

                { /* 彈出面版 */ }
                <Panel_Wrapper active = { active } > { component } </Panel_Wrapper>

           </React.Fragment>

} ;

export default Side_Panel ;