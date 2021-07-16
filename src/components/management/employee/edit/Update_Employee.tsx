
import React, {useContext, useEffect, useState} from "react"
import {SidePanelContext} from "templates/panel/Side_Panel";
import {SubmitHandler, useForm} from "react-hook-form";
import {IEmployee} from "utils/Interface_Type";
import {yupResolver} from "@hookform/resolvers/yup";
import { schema_Employee }  from "utils/validator/form_validator" ;
import {useUpdate_Data} from "hooks/ajax_crud/useAjax_Update";
import Date_Picker from "templates/form/Date_Picker";

import { Bar , Line , Doughnut } from 'react-chartjs-2';


// for 直條圖
const data_Bar = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const options_Bar = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

// for 折線圖
const data_Line = {

    labels   : ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets : [
                    {
                        label           : "",
                        data            : [33, 53, 85, 41, 44, 65],
                        fill            : true,
                        backgroundColor : "rgba(75,192,192,0.2)",
                        borderColor     : "rgba(75,192,192,1)"
                    },
                    {
                        label       : "Second dataset",
                        data        : [33, 25, 35, 51, 54, 76],
                        fill        : false,
                        borderColor : "#742774"
                    }
                 ]

} ;

// for 甜甜圈
const data_Doughnut = {

    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],

};




{ /*  編輯客戶 */}
const Update_Employee = ( ) => {

    const value = useContext( SidePanelContext ) ;                               // 取得 context 值
    const data  = value.preLoadData ;

    const [ data_Id , set_Data_Id ]           = useState('' ) ;        // 資料表 id
    const [ employeeType , set_EmployeeType ] = useState('' ) ;        // 員工類型

    // 表單類型
    const [ formType , set_FormType ]         = useState<'基本資料'|'操作紀錄'|'績效紀錄'>('基本資料') ;


    // React Hook Form
    const { register , control , setValue , handleSubmit , formState: { errors , isDirty , isValid } } =
        useForm<IEmployee>({

            mode          : "all" ,
            resolver      : yupResolver( schema_Employee ) ,
            defaultValues : {
                               employee_Type        : data['employee_type'] ,
                               employee_Account     : data['account'] ,
                               employee_Password    : data['password'] ,
                               employee_Nickname    : data['nickname'] ,

                               employee_Name        : data['employee_name'] ,
                               employee_Id          : data['employee_id'] ,
                               employee_MobilePhone : data['employee_mobile_phone'] ,
                               employee_Address     : data['employee_address'] ,
                            }

        }) ;

    // ---------------------------------------------------------------------------------------------------

    // 更新函式
    const update_Data = useUpdate_Data() ;

    // 取得 _ 員工類別
    const get_Employee_Type = ( type : string ) => set_EmployeeType( type ) ;

    // 取得 _ 員工類別
    const get_Form_Type = ( type : '基本資料'|'操作紀錄'|'績效紀錄' ) =>  set_FormType( type ) ;


    // 提交表單
    const onSubmit : SubmitHandler<IEmployee> = ( data : any ) => {

       // 更新 _ 客戶
       update_Data( "/employees" , data_Id , data , "/management" , "員工" ) ;

    } ;


    // 設定 _ 資料表 id 、員工類型
    useEffect(( ) => {

       set_Data_Id( data['id'] ) ;                 // 資料表 id
       set_EmployeeType( data['employee_type'] ) ; // 員工類型


    } ,[]);

    const left = { textAlign : "left" } as const ;

    return <form onSubmit = { handleSubmit( onSubmit ) } >

                { /* 標題 */ }
                <label className="label relative" style={{ fontSize : "1.3em"  }} >
                    <i className="fas fa-user"></i> &nbsp; 員工資料 &nbsp;
                </label> <br/>

                { /* 表單類型頁籤  */ }
                <b className = { `tag is-medium is-success pointer ${ formType === '基本資料' ? '' : 'is-light' }` }  onClick={ () => get_Form_Type('基本資料') } >
                    <i className="fas fa-file-alt"></i> &nbsp; 基本資料
                </b> &nbsp; &nbsp; &nbsp;

                <b className = { `tag is-medium is-success pointer ${ formType === '操作紀錄' ? '' : 'is-light' }` } onClick={ () => get_Form_Type('操作紀錄') } >
                    <i className="fas fa-edit"></i> &nbsp; 操作紀錄
                </b> &nbsp; &nbsp; &nbsp;

                <b className = { `tag is-medium is-success pointer ${ formType === '績效紀錄' ? '' : 'is-light' }` } onClick={ () => get_Form_Type('績效紀錄') } >
                    <i className="fas fa-chart-pie"></i> &nbsp; 績效紀錄
                </b>

                <br/> <br/>

                { /*  員工資料  */ }

                { formType === '基本資料' &&

                    <>

                        <div className="columns is-multiline is-mobile">

                            { /* 類別 */ }
                            <div className="column is-2-desktop required">
                                <p> <b> 類 別 </b> <b style={{color: "red"}}>{errors.employee_Type?.message}</b> </p>
                                <div className="select">
                                    <select { ...register( "employee_Type" ) } onChange={ e => get_Employee_Type( e.target.value  ) } >
                                        <option value="請選擇"> 請選擇 </option>
                                        <option value="管理員"> 管理員 </option>
                                        <option value="美容師"> 美容師 </option>
                                        <option value="櫃台行政"> 櫃台行政 </option>
                                        <option value="接送人員"> 接送人員 </option>
                                        <option value="測試帳號"> 測試帳號 </option>
                                        <option value="其他"> 其他 </option>
                                    </select>
                                </div>
                            </div>

                            { /* 帳號 */ }
                            <div className="column is-2-desktop required">
                                <p> <b> 帳 號 </b> <b style={{color: "red"}}>{errors.employee_Account?.message}</b> </p>
                                <input className='input' type='text' {...register("employee_Account")} />
                            </div>

                            { /* 密碼 */ }
                            <div className="column is-2-desktop required">
                                <p> <b> 密 碼 </b> &nbsp; <b style={{color:"red"}}> { errors.employee_Password?.message } </b>  </p>
                                <input className='input' type='text' {...register("employee_Password")} />
                            </div>

                            { /* 暱稱 */ }
                            <div className="column is-2-desktop">
                                <p> <b> 暱稱 / 別名 </b> </p>
                                <input className='input' type='text' {...register("employee_Nickname")} />
                            </div>

                            <div className="column is-4-desktop"></div>
                            <div className="column is-2-desktop"></div>

                            { ( employeeType === '美容師' || employeeType === '櫃台行政' || employeeType === '接送人員'  ) &&

                            <>

                                { /* 姓名 */ }
                                <div className="column is-2-desktop required">
                                    <p> <b> 姓 名 </b> </p>
                                    <input className='input' type='text' {...register("employee_Name")} />
                                </div>
                                { /* 身分證字號 */ }
                                <div className="column is-2-desktop required">
                                    <p> <b> 身分證字號 </b> </p>
                                    <input className='input' type='text' {...register("employee_Id")} />
                                </div>
                                { /* 手機號碼 */ }
                                <div className="column is-2-desktop required">
                                    <p> <b> 手機號碼 </b> </p>
                                    <input className='input' type='text' {...register("employee_MobilePhone")} />
                                </div>

                                { /* 通訊地址*/ }
                                <div className="column is-4-desktop">
                                    <p> <b> 通訊地址 </b> </p>
                                    <input className='input' type='text' {...register("employee_Address")} />
                                </div>

                            </>

                            }

                        </div>

                        <br/><br/><br/>

                        { /* 提交按鈕 */ }
                        <div className="has-text-centered" >
                            <button disabled={ !isValid } type="submit" className="button is-primary relative is-medium" style={{top: "-10px"}} >
                                提交表單
                            </button>
                        </div> <br/><br/>

                    </>

                }

                { /* 操作紀錄  */ }
                { formType === '操作紀錄' &&

                   <>

                       <div className="columns is-multiline is-mobile">

                           <div className="column is-2-desktop">
                               <p> <b> 操作日期 </b> <b style={{color: "red"}}>{errors.employee_Type?.message}</b> </p>
                               <Date_Picker control      = { control }
                                            name         = "employee_Birthday"
                                            default_Date = { new Date } />
                           </div>

                           <div className="column is-10-desktop"></div>

                           <div className="column is-12-desktop">

                               <table className="table is-fullwidth is-hoverable">

                                   <thead>
                                       <tr>
                                           <th>序 號</th>
                                           <th>執行時間</th>
                                           <th>功能區塊</th>
                                           <th>執行內容</th>
                                           <th>備 註</th>
                                       </tr>
                                   </thead>

                                   <tbody>
                                      <tr><td> 1 </td><td> 10:30 </td><td> 洗澡單 </td><td>新增 _ 洗澡單</td><td style={left}>客戶 : 陳國祥 &nbsp;/&nbsp; 寵物 : 大福 ( 德國狼犬 )</td></tr>
                                      <tr><td> 2 </td><td> 13:15 </td><td> 洗澡單 </td><td>編輯 _ 洗澡單</td><td style={left}>客戶 : 李慧芬 &nbsp;/&nbsp; 寵物 : 小白 ( 長毛吉娃娃 )</td></tr>
                                      <tr><td> 3 </td><td> 14:15 </td><td> 美容單 </td><td>新增 _ 美容單</td><td style={left}>客戶 : 黃珮君 &nbsp;/&nbsp; 寵物 : BoBo ( 貴賓 )</td></tr>
                                      <tr><td> 4 </td><td> 15:00 </td><td> 安親單 </td><td>新增 _ 安親單</td><td style={left}>客戶 : 李明華 &nbsp;/&nbsp; 寵物 : 胖胖 ( 貴賓 )</td></tr>
                                      <tr><td> 5 </td><td> 16:25 </td><td> 住宿單 </td><td>新增 _ 住宿單</td><td style={left}>客戶 : 陳建國 &nbsp;/&nbsp; 寵物 : 招財 ( 秋田 )</td></tr>
                                      <tr><td> 6 </td><td> 18:47 </td><td> 美容單 </td><td>新增 _ 美容單</td><td style={left}>客戶 : 張慧芸 &nbsp;/&nbsp; 寵物 : Money ( 拉布拉多 )</td></tr>


                                   </tbody>




                               </table>


                           </div>

                       </div>



                   </>

                }


                { /* 績效紀錄  */ }
                { formType === '績效紀錄' &&

                    <>

                       <br/><br/>

                       <div className="columns is-multiline is-mobile">

                           <div className="column is-12-desktop">
                               <Line type='line' data={ data_Line } /> <br/>
                           </div>

                        </div>

                        <br/><br/><br/>

                        <div className="columns is-multiline is-mobile">

                            <div className="column is-12-desktop">
                               <Bar type='bar' data={data_Bar} options={options_Bar} />
                            </div>

                        </div>

                        <br/><br/><br/><br/><br/>


                        <div className="columns is-multiline is-mobile">

                            <div className="column is-offset-2-desktop is-8-desktop">
                               <Doughnut type='doughnut' data={ data_Doughnut } />
                            </div>

                        </div>

                        <br/><br/><br/><br/><br/>

                    </>



                }

            </form>


} ;

export default Update_Employee