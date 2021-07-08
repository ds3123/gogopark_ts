
import React from "react"
import Date_Picker from "templates/form/Date_Picker";


// React Hook Form
import { useForm , SubmitHandler , Controller } from "react-hook-form" ;
import { ICustomer } from "utils/Interface_Type";
import { yupResolver } from "@hookform/resolvers/yup";



{ /* 服務異常 */ }
const Service_Error = ( ) => {

    // React Hook Form
    const { register , setValue , handleSubmit , control , formState: { errors , isDirty , isValid } } =
        useForm<ICustomer>({
            mode     : "all" ,
        }) ;


    return <>
                <b className="tag is-large is-danger is-light">
                    <i className="fas fa-exclamation"></i> &nbsp; 服務異常
                </b>

                <br/><br/><br/>

                <div className="columns is-multiline is-mobile relative">


                    { /* 異常日期 */ }
                    <div className="column is-3-desktop">

                        <b className="f_14"> 查詢日期 </b>
                        <Date_Picker control         = { control }
                                     name            = "lodge_CheckIn_Date"
                                     default_Date    = { new Date }  />

                    </div>

                    { /* 異常類別 */ }
                    <div className="column is-2-desktop">

                        <b className="f_14"> 查詢類別 </b>
                        <div className="select">
                            <select >
                                <option value="請選擇">       請選擇       </option>
                                <option value="取消預約">     取消預約     </option>
                                <option value="客人投訴">     客人投訴     </option>
                                <option value="客人態度不佳"> 客人態度不佳 </option>
                                <option value="寵物難以處理"> 寵物難以處理 </option>
                                <option value="其他">        其他         </option>
                            </select>
                        </div>

                    </div>


                </div>

                <br/>

                <table className="table is-fullwidth is-hoverable">
                    <thead>
                    <tr>
                        <th> 服務日期 </th>
                        <th> 異常原因 </th>
                        <th> 服務類別 </th>
                        <th> 主人姓名 </th>
                        <th> 主人手機 </th>
                        <th> 寵物名字 </th>
                        <th> 寵物品種 </th>

                    </tr>

                    </thead>

                    <tbody>

                        <tr><td> 2021-06-30 </td><td>取消預約</td><td>洗澡</td><td>李先生</td><td>0962342123</td><td>旺福</td><td>秋田犬</td></tr>
                        <tr><td> 2021-06-30 </td><td>客人投訴</td><td>美容</td><td>陳美華</td><td>0962342555</td><td>BUBU</td><td>長毛吉娃娃</td></tr>
                        <tr><td> 2021-06-30 </td><td>取消預約</td><td>洗澡</td><td>黃國豪</td><td>0962342123</td><td>胖胖</td><td>德國狼犬</td></tr>


                    </tbody>


                </table>

           </>

} ;

export default Service_Error