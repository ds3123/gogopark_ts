

import React from "react"

/*

    @ 顯示 評分 / 星等 ( 客戶 、寵物 )
       參數 :
         average_Rating --> 平均等級 ( 1 ~ 5 等 )
         samples_Sum    --> 評分樣本數 ( 幾個人參與評分 )

 */

const useRating = ( average_Rating : number , samples_Sum  : number ) => {

    let star_Style : any ;

    switch( average_Rating ){

        case 0 : star_Style =  <i className="fas fa-star" style={ { color : "red" } }></i> ; break;
        case 1 : star_Style =  <i className="fas fa-star-half-alt" style={ { color : "red" } }></i> ; break;

        case 2 : star_Style =  <i className="fas fa-star" style={ { color : "rgb(255,227,50)" } }></i> ; break;
        case 3 : star_Style =  <i className="fas fa-star-half-alt" style={ { color : "rgb(255,227,50)" } }></i> ; break;

        case 4 : star_Style =  <i className="fas fa-star-half-alt" style={ { color : "limegreen" } }></i> ; break;
        case 5 : star_Style =  <i className="fas fa-star" style={ { color : "limegreen" } }></i> ; break;

    }

    // 評分標示
    return <span> { star_Style }  <br/> <b> { samples_Sum } </b> </span> ;

} ;


export default useRating