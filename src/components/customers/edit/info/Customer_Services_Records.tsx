
import React from "react"


// @ 顯示 _ 客戶過去各種服務紀錄 ( 基礎、洗澡、美容 / 顯示在標題列右上方 )
const Customer_Services_Records = ( obj : { current : string | undefined , cus_Records : any } ) => {

    const { current , cus_Records } = obj ;

    const style = { top : "-38px", left:"140px" , width:"70%", height:"35px" } ;
    const tag   = "tag is-medium is-light is-success pointer" ;

    return <>

                { /* 基礎紀錄 */ }
                { ( current === '基礎' && cus_Records['basic'].length > 0 ) &&
                    <div className="absolute" style={ style } >
                        <b className={ tag } >
                            <i className="far fa-list-alt"></i> &nbsp; 過去基礎紀錄 ( 共 { cus_Records['basic'].length } 筆 )
                        </b>
                    </div>
                }

                { /* 洗澡紀錄  */ }
                { ( current === '洗澡' && cus_Records['bath'].length > 0 ) &&
                    <div className="absolute" style={ style } >
                        <b className={ tag } >
                            <i className="fas fa-bath"></i> &nbsp; 過去洗澡紀錄 ( 共 { cus_Records['bath'].length } 筆 )
                        </b>
                    </div>
                }

                { /* 美容紀錄  */ }
                { ( current === '美容' && cus_Records['beauty'].length > 0 ) &&
                    <div className="absolute" style={ style } >
                        <b className={ tag } >
                            <i className="fas fa-cut"></i> &nbsp; 過去美容紀錄 ( 共 { cus_Records['beauty'].length } 筆 )
                        </b>
                    </div>
                }

           </>

} ;

export default Customer_Services_Records