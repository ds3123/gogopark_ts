
import React from "react"
import Date_Picker from "templates/form/Date_Picker";


// React Hook Form
import { useForm , SubmitHandler , Controller } from "react-hook-form" ;
import {ICustomer} from "utils/Interface_Type";
import {yupResolver} from "@hookform/resolvers/yup";




{ /* 預約紀錄 */ }
const Appointment_Records = ( ) => {

    // React Hook Form
    const { register , setValue , handleSubmit , control , formState: { errors , isDirty , isValid } } =
                useForm<ICustomer>({
                                       mode : "all" ,
                                   }) ;


    return <>

             <b className="tag is-large is-primary is-light">
                 <i className="fas fa-list"></i> &nbsp; 預約紀錄
             </b>

              <br/><br/><br/>

              <div className="columns is-multiline is-mobile relative">


                  { /* 查詢日期 */ }
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
                              <option value="請選擇"> 請選擇 </option>
                              <option value="基礎"> 基礎 </option>
                              <option value="洗澡"> 洗澡 </option>
                              <option value="美容"> 美容 </option>
                              <option value="安親"> 安親 </option>
                              <option value="住宿"> 住宿 </option>

                          </select>
                      </div>

                  </div>


              </div>

              <br/>

              <table className="table is-fullwidth is-hoverable">
                  <thead>
                  <tr>
                      <th> 預約到店日期 </th>
                      <th> 預約服務類別 </th>
                      <th> 主人姓名 </th>
                      <th> 主人手機 </th>
                      <th> 寵物名字 </th>
                      <th> 寵物品種 </th>

                  </tr>

                  </thead>

                  <tbody>

                    <tr><td> 2021-07-01 </td><td> 洗 澡 </td><td>李先生</td><td>0962342222</td><td>旺福</td><td>秋田犬</td></tr>
                    <tr><td> 2021-07-03 </td><td> 美 容 </td><td>黃美華</td><td>0962342434</td><td>Money</td><td>拉布拉多</td></tr>
                    <tr><td> 2021-07-05 </td><td> 住 宿 </td><td>張國豪</td><td>0962345523</td><td>招財</td><td>長毛吉娃娃</td></tr>

                  </tbody>

              </table>

           </>

} ;

export default Appointment_Records