
import React, { FC , useEffect , useState} from "react"
import {get_Interval_Dates, get_Type_Dates, get_Week_Day} from "utils/time/date";
import { ILodge } from 'utils/Interface_Type'


// 房型價格
interface ILodge_Price{
    room_Type        : string ; // 房型
    ordinary_Day     : number ; // 平日
    ordinary_Holiday : number ; // 假日
    national_Holiday : number ; // 國定假日
}


// 國定假日
const national_Holidays_Setting = [
    { title : '端午節' , date : '2021-06-14' }
] ;



// 房型價格 ( 平日、假日、國定假日 )
const lodge_Price : ILodge_Price[] = [

    { room_Type : '大房' , ordinary_Day : 800 , ordinary_Holiday : 900 , national_Holiday : 1000 } ,
    { room_Type : '中房' , ordinary_Day : 640 , ordinary_Holiday : 720 , national_Holiday : 800 } ,
    { room_Type : '小房' , ordinary_Day : 560 , ordinary_Holiday : 630 , national_Holiday : 700 } ,

    { room_Type : '大籠' , ordinary_Day : 480 , ordinary_Holiday : 540 , national_Holiday : 600 } ,
    { room_Type : '中籠' , ordinary_Day : 400 , ordinary_Holiday : 450 , national_Holiday : 500 } ,
    { room_Type : '小籠' , ordinary_Day : 320 , ordinary_Holiday : 360 , national_Holiday : 400 } ,

];


{ /* @ 住宿價格計算 */ }
const Lodge_Price : FC<ILodge> = ( { lodgeType , lodgeNumber , lodgeCheckIn_Date , lodgeCheckOut_Date  } ) => {

    const [ national_Holidays , set_National_Holidays ] = useState( [] ) ; // 國定假日( 系統設定 )
    const [ holidays          , set_Holidays ]          = useState( [] ) ; // 假日 ( 五、六、日 )
    const [ ordinary_Days     , set_Ordinary_Days ]     = useState( [] ) ; // 平日 ( 一、二、三、四 )

    // 目前所選擇房間類型，所相對應的相關價格
    const [ currentPrice , set_CurrentPrice ] = useState({
                                                                     room_Type        : '' ,
                                                                     ordinary_Day     : 0 ,   // 平日
                                                                     ordinary_Holiday : 0 ,   // 假日
                                                                     national_Holiday : 0     // 國定假日
                                                                   }) ;


    // 設定 : 平日、假日、國定假日
    useEffect(( ) => {

        const interval = get_Interval_Dates( lodgeCheckIn_Date , lodgeCheckOut_Date ) ;

        // 取得 : 某日期，所屬型態( 平日、假日、國定假日 )
        const typeDates = get_Type_Dates( interval , national_Holidays_Setting ) as any;

        set_National_Holidays( typeDates['國定假日'] ) ;
        set_Holidays( typeDates['假日'] ) ;
        set_Ordinary_Days( typeDates['平日'] ) ;

    } ,[ lodgeCheckIn_Date , lodgeCheckOut_Date ]) ;

    // 設定 : 所選擇房間類型，其對應的相關價格
    useEffect(( ) => {

        lodge_Price.forEach( x => {

           if( x['room_Type'] === lodgeType ){

              set_CurrentPrice({ ...currentPrice ,
                                        room_Type        : x['room_Type'] ,
                                        ordinary_Day     : x['ordinary_Day'] ,     // 平日
                                        ordinary_Holiday : x['ordinary_Holiday'] , // 假日
                                        national_Holiday : x['national_Holiday']   // 國定假日
                                     })

           }

        })


    } ,[ lodgeType ] ) ;


    const blue = {color:"darkblue"} ;

    return  <div>

                { lodgeType &&

                    <>
                        <b className="tag is-medium is-rounded relative" style={{ left:"-20px" }}> &nbsp; &nbsp;

                                        <>  房型 : &nbsp;<b style={blue}>{ lodgeType }</b> &nbsp;
                                          <span style={{ fontWeight:"normal" , fontSize:"11pt" , color:"darkorange" }}> &nbsp;&nbsp;
                                                平日 : { currentPrice['ordinary_Day'] } ( 元 / 日 ) 、
                                                假日 : { currentPrice['ordinary_Holiday'] } ( 元 / 日 ) 、
                                                國定假日 : { currentPrice['national_Holiday'] } ( 元 / 日 )
                                          </span>   &nbsp; &nbsp;
                                        </>

                        </b> <br/><br/>
                    </>
                }

                <br/>


                { /* 平 日 */ }
                { ordinary_Days.length > 0 &&

                    <>
                        <b className="m_Bottom_15">
                            <span style={{ color:"rgb(150,0,0)" , fontSize:"14pt" }}> 平 日</span> &nbsp;
                            <span style={{ color:"gray" , fontSize:"11pt" }}>( 一 ~ 四 ) </span> &nbsp; &nbsp;
                        </b>

                        { lodgeType &&
                            <span style={{float:"right"}}>
                                平日共 <b style={{ color:"darkblue" }}> { ordinary_Days.length } </b> 天 ，
                                小計 : <b style={{ color:"red" }}>{ currentPrice['ordinary_Day'] * ( ordinary_Days.length ) }</b> 元
                            </span>
                        }


                        <br/>

                        {
                          ordinary_Days.map( (x,y)=>{
                            return <span key={y}> <b className="tag is-medium m_Bottom_10"> { x } ( { get_Week_Day(x) } ) </b> &nbsp; </span>
                          })
                        }

                        <br/><br/>

                    </>

                }

                { /* 假 日 */ }
                { holidays.length > 0 &&

                    <>

                        <b className="m_Bottom_15">
                            <span style={{ color:"rgb(150,0,0)" , fontSize:"14pt" }}> 假 日</span> &nbsp;
                            <span style={{ color:"gray" , fontSize:"11pt" }}>( 五 ~ 日 ) </span> &nbsp; &nbsp;
                        </b>

                        { lodgeType &&
                            <span style={{float: "right"}}>
                                假日共 <b style={{color: "darkblue"}}> {holidays.length} </b> 天 ，
                                小計 : <b style={{color: "red"}}>{currentPrice['ordinary_Holiday'] * (holidays.length)}</b> 元
                            </span>
                        }

                        <br/>
                        {
                            holidays.map( (x,y)=>{
                                return <span key={y}> <b className="tag is-medium m_Bottom_10"> { x } ( { get_Week_Day(x) } ) </b> &nbsp; </span>
                            })
                        }

                        <br/><br/>

                    </>

                }

                { /* 國定假日 */ }
                { national_Holidays.length > 0 &&

                    <>

                        <b className="m_Bottom_15">
                            <span style={{ color:"rgb(150,0,0)" , fontSize:"14pt" }}> 國定假日</span> &nbsp; &nbsp;
                        </b>

                        { lodgeType &&
                            <span style={{float: "right"}}>
                               國定假日共 <b style={{color: "darkblue"}}> {national_Holidays.length} </b> 天 ，
                                小計 : <b
                                style={{color: "red"}}>{currentPrice['national_Holiday'] * (national_Holidays.length)}</b> 元
                            </span>
                        }


                        <br/>
                        {
                            national_Holidays.map( (x,y)=>{
                                return <span key={y}> <b className="tag is-medium m_Bottom_10"> { x } ( { get_Week_Day(x) } ) </b> &nbsp; </span>
                            })
                        }

                        <br/><br/>


                    </>

                }


                { lodgeType &&
                        <span style={{float: "right"}}>
                                    住宿日期共 <b
                            style={{color: "darkblue"}}>  {(ordinary_Days.length) + (holidays.length) + (national_Holidays.length)} </b> 天，
                                    金額共計 : <b style={{color: "red"}}>
                                                {(currentPrice['ordinary_Day'] * (ordinary_Days.length)) + (currentPrice['ordinary_Holiday'] * (holidays.length)) + (currentPrice['national_Holiday'] * (national_Holidays.length))}
                                              </b> 元
                                </span>

                }

            </div>

} ;

export default Lodge_Price