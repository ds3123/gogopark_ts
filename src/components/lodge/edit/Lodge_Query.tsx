
import React, { FC , useEffect , useState} from "react"
import { get_Interval_Dates , get_Type_Dates , get_Week_Day } from "utils/time/date";


interface ICal {

    lodgeType          : string ; // 房型
    lodgeNumber        : string ; // 房號

    // 住房
    lodgeCheckIn_Date  : string ; // 日期
    lodgeCheckIn_Time  : string ; // 時間

    // 退房
    lodgeCheckOut_Date : string ; // 日期
    lodgeCheckOut_Time : string ; // 時間

}


// 國定假日
const national_Holidays_Setting = [

    { title : '端午節' , date : '2021-06-18' }

] ;



{ /* @ 住宿查詢、計算 */ }
const Lodge_Query : FC<ICal> = ({ lodgeType , lodgeNumber , lodgeCheckIn_Date , lodgeCheckOut_Date  } ) => {

   const [ national_Holidays , set_National_Holidays ] = useState( [] ) ; // 國定假日( 系統設定 )
   const [ holidays       , set_Holidays ]             = useState( [] ) ; // 假日 ( 五、六、日 )
   const [ ordinary_Days , set_Ordinary_Days ]         = useState( [] ) ; // 平日 ( 一、二、三、四 )




   useEffect(( ) => {

       const interval = get_Interval_Dates( lodgeCheckIn_Date , lodgeCheckOut_Date ) ;

       // 取得 : 某日期，所屬型態( 平日、假日、國定假日 )
       const typeDates = get_Type_Dates( interval , national_Holidays_Setting ) as any;

       set_National_Holidays( typeDates['國定假日'] ) ;
       set_Holidays( typeDates['假日'] ) ;
       set_Ordinary_Days( typeDates['平日'] ) ;

   } , [ lodgeCheckIn_Date , lodgeCheckOut_Date ]) ;




  return  <div>

              <br/><br/>

               <table className="table is-fullwidth is-hoverable">

                   <thead>
                       <tr>
                           <th> 選 擇      </th>
                           <th> 房 型      </th>
                           <th> 房 號      </th>
                           <th> 可住房天數 </th>
                           <th> 住宿價格   </th>
                           <th> 備 註      </th>
                       </tr>
                   </thead>

                   <tbody>
                      <tr>
                          <td> <b className="tag is-medium">帶入</b> </td>
                          <td> A01 </td>
                          <td> 大房</td>
                          <td></td>
                          <td> </td>
                          <td></td>
                      </tr>
                      <tr>
                          <td> <b className="tag is-medium">帶入</b> </td>
                          <td> B01 </td>
                          <td> 中房</td>
                          <td></td>
                          <td> </td>
                          <td></td>
                      </tr>
                      <tr>
                          <td> <b className="tag is-medium">帶入</b> </td>
                          <td> C01 </td>
                          <td> 小房</td>
                          <td></td>
                          <td> </td>
                          <td></td>
                      </tr>



                   </tbody>

               </table>

             <br/><br/>

          </div>

} ;

export default Lodge_Query