import React from "react" ;



// 取得 : 顯示目前時間 ( 格式 _ 時 : 分   Ex. 16 : 30 )
export const get_H_M = () => {

    const hours   = new Date().getHours();
    const minutes = new Date().getMinutes();

    let h = ( hours < 10 )   ? '0'+ hours.toString() : hours ;      // 時
    let m = ( minutes < 10 ) ? '0'+ minutes.toString() : minutes ;  // 分

    const time = h + ' : ' + m ;

    return time

};