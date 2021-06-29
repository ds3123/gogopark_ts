import React from "react" ;
import moment from "moment";




// 取得 : 顯示目前時間 ( 格式 _ 時 : 分   Ex. 16 : 30 )
export const get_H_M = () => {

    const hours   = new Date().getHours();
    const minutes = new Date().getMinutes();

    let h = ( hours < 10 )   ? '0'+ hours.toString() : hours ;      // 時
    let m = ( minutes < 10 ) ? '0'+ minutes.toString() : minutes ;  // 分

    const time = h + ':' + m ;

    return time

};


/*
  # 取得 : 特定時間， 加 / 減 _ 小時 後的時間
     * 參數格式 : string  Ex. 2021.06.29
     * 回傳格式 : string  Ex. 18:33 )

*/
export const get_Cal_Hour_Time = ( date : string , hour : number )=>{

    let time = new Date( date ) ;
    time.setTime( time.setHours(time.getHours() + hour ));

    return moment( time ).format('HH : mm') ;

} ;