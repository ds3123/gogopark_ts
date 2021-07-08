import React from "react" ;


/* @ 登入頁面  */
interface ISignin {

    Signin_Data : {
                    employee_type : string ;
                    account       : string ,
                    password      : string ,
                    nickname      : string ,

                    employee_name : string ,
                    employee_id   : string ,
                   } ,

}

const initState = {

    // 登入成功資料
    Signin_Data : {

                     employee_type : '' ,
                     account       : '' ,
                     password      : '' ,
                     nickname      : '' ,

                     employee_name : '' ,
                     employee_id   : '' ,

                  } ,

} ;


const reducer_Signin = ( state : ISignin = initState , action : any ) => {

    switch( action.type ){

        // # 設定 _ 登入成功的帳號資料
        case  "SET_SIGNIN_DATA" : return { ...state , Signin_Data : action.Signin_Data} ;

        default : return state ;

    }

} ;

export default reducer_Signin ;
