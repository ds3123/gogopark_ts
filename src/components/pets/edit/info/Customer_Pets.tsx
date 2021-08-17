
import React , { FC } from "react"




interface IPet{

    current               : string | undefined ;
    current_Customer_Pets : any[] ;
    set_Pet_Data          : ( data : any ) => void   // 點選 _ 帶入寵物資料

}


// @ 顯示 _ 客戶所有寵物
const Customer_Pets : FC< IPet > = ( obj) => {

  const { current , current_Customer_Pets , set_Pet_Data } = obj ;



  return <>

            {

              ( current && current_Customer_Pets.length > 0 ) &&

                current_Customer_Pets.map( ( x : any , y : any ) => {

                    return <span key = { y } onClick = { () => set_Pet_Data( x ) } >
                               &nbsp; <b className="tag is-medium pointer m_Bottom_15" > { x['name'] } ( { x['species'] } ) </b> &nbsp; &nbsp;
                           </span>

                })

            }

         </>

} ;

export default Customer_Pets