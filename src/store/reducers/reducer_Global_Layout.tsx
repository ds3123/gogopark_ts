import React from "react" ;

/* @ 整體、全局 _ 版面狀態 */
interface ILayout {

    Side_Panel_Open : boolean ;
    Side_Panel_Component : null | JSX.Element ;
    Side_Panel_Props : {}

}

const initState = {

                    // # 左側滑動面板
                    Side_Panel_Open          : false ,  // 是否開啟
                    Side_Panel_Component     : null ,   // 所包含元件
                    Side_Panel_Props         : {} ,     // 所包含元件 _ 屬性

                  } ;




const reducer_Global_Layout = ( state : ILayout = initState , action : any ) => {


    switch( action.type ){

        // # 設定 _ 滑動面板( 左側 )
        case  "SET_SIDE_PANEL" :
            return {
                    ...state ,
                    Side_Panel_Open      : action.is_Open  ,
                    Side_Panel_Component : action.component ,
                    Side_Panel_Props     : action.props
                   } ;

        default : return state ;

    }






} ;

export default reducer_Global_Layout ;

