
import React, {useEffect, useState} from "react" ;
import Date_Picker from "templates/form/Date_Picker";

// React Hook Form
import { useForm , SubmitHandler , Controller } from "react-hook-form" ;
import {ICustomer} from "utils/Interface_Type";
import {set_Side_Panel} from "store/actions/action_Global_Layout";
import Update_Service from "components/services/edit/Update_Service";
import {useDispatch} from "react-redux";
import Update_Pet from "components/pets/edit/Update_Pet";
import Update_Customer from "components/customers/edit/Update_Customer";



const data = [

        { service : '基礎' , type : '應收款' , petInfo : 'BoBo ( 秋田犬 )'  , cusName : '李先生' , receivable : 250 , actualPayment : 250 , expense : 0 , admin : '李慧芬' , note : '' } ,
        { service : '洗澡' , type : '應收款' , petInfo : '大黃 ( 德國狼犬 )'  , cusName : '郭宗華' , receivable : 900 , actualPayment : 800 , expense : 0 , admin : '李慧芬' , note : '優惠 ( 新客優惠 / 初次洗澡 )' } ,
        { service : '包月洗澡' , type : '預收款' , petInfo : 'DUDU ( 哈士奇 )' , cusName : '謝佳奇' , receivable : 3000 , actualPayment : 3000 , expense : 0 , admin : '李慧芬' , note : '含 4 次洗澡' } ,
        { service : '美容' , type : '應收款' , petInfo : '小胖( 可卡 )'  , cusName : '李民亨' , receivable : 900 , actualPayment : 900 , expense : 0 , admin : '李慧芬' , note : '' } ,
        { service : '包月美容' , type : '預收款' , petInfo : 'LALA ( 米格魯 )'  , cusName : '黃偉和' , receivable : 1800 , actualPayment : 1800 , expense : 0 , admin : '李慧芬' , note : '含 3 次洗澡、1 次美容' } ,
        { service : '安親' , type : '應收款' , petInfo : '大壯 ( 德國狼犬 )'  , cusName : '林益民' , receivable : 200 , actualPayment : 200 , expense : 0 , admin : '李慧芬' , note : '' } ,
        { service : '住宿' , type : '應收款' , petInfo : '阿福 ( 杜賓 )'  , cusName : '張淑芬' , receivable : 1600 , actualPayment : 1600 , expense : 0 , admin : '李慧芬' , note : '' } ,
        { service : '住宿券'   , type : '預收款' , petInfo : '富貴 ( 拉布拉多 )'  , cusName : '吳國賓' , receivable : 4400 , actualPayment : 4000 , expense : 0 , admin : '李慧芬' , note : '共 11 張住宿券 ( 含 1 張贈送 )' } ,
        { service : '住宿'   , type : '應收款' , petInfo : '富貴 ( 拉布拉多 )'  , cusName : '吳國賓' , receivable : 6700 , actualPayment : 2300 , expense : 0 , admin : '李慧芬' , note : '使用 11 張住宿券 ( 面額 4400 元 ) ' } ,
        { service : '雜支'   , type : '支出款' , petInfo : ''  , cusName : '' , receivable : 0 , actualPayment : 0 , expense : 500 , admin : '李慧芬' , note : '買便當' } ,
        { service : '洗澡'   , type : '退費款' , petInfo : '大黃 ( 德國狼犬 )'  , cusName : '郭宗華' , receivable : 0 , actualPayment : 0 , expense : 800 , admin : '李慧芬' , note : '退費 : 洗澡' } ,

    ] ;


/*  @ 現金帳  */
const Cash_Report = () => {


    const [ actualPayment_Sum , set_ActualPayment_Sum ] = useState( 0 ) ;  // 實收金額總計
    const [ expense_Sum , set_Expense_Sum ]             = useState( 0 ) ;  // 支出金額總計


    const dispatch = useDispatch();


    // React Hook Form
    const { register , setValue , handleSubmit , control , formState: { errors , isDirty , isValid } } = useForm<ICustomer>({
        mode : "all" ,
    }) ;


    // 點選 _ 服務單
    const click_Service  = ( service_Type : string ) => dispatch( set_Side_Panel(true , <Update_Service /> , { service_Type : service_Type ,  preLoadData : data } as { service_Type : string } ) ) ;

    // 點選 : 寵物
    const click_Pet      = () => dispatch( set_Side_Panel(true , <Update_Pet /> , { preLoadData : null } ) ) ;

    // 點選 _ 客戶
    const click_Customer = () => dispatch( set_Side_Panel(true , <Update_Customer /> , { preLoadData : null } ) ) ;


    useEffect(( ) => {

        let aPayment_Sum = 0 ; // 實收總計
        let expe_Sum     = 0 ; // 支出總計

        data.forEach( x => {
            aPayment_Sum += x['actualPayment'] ;
            expe_Sum     += x['expense'] ;
        }) ;

        set_ActualPayment_Sum( aPayment_Sum ) ;
        set_Expense_Sum( expe_Sum ) ;

    } ,[] ) ;


    const way   = {  fontSize : "11pt" , fontWeight : "bold"  } as const ;
    const tLeft = { textAlign:"left"} as const ;
    const blue  = {color:'rgb(0,0,160)'} ;

    return <form >

        { /* 查詢列  */ }
        <div className="columns is-multiline  is-mobile">

            <div className="column is-3-desktop">

                <div className="tag is-large is-white">

                    <b> 報表日期 : </b> &nbsp;
                    <Date_Picker control={control} name="service_Date" default_Date={new Date}/>

                </div>

            </div>

            <div className="column is-3-desktop">

                <span className="tag is-large is-white"> <b> 篩選類別 : </b> &nbsp; </span>

                <div className="select is-small" >

                    {/* <Select> value 值 : 新增狀態 -> '' ; 編輯狀態 -> 調出、設定該服務 Qcode  */}
                    <select style={way} >
                        <option value="全部類別"> 全部類別 </option >
                        <option value="應收款"> 應收款 </option >
                        <option value="預收款"> 預收款 </option >
                        <option value="扣_預收款"> 扣_預收款 </option >
                        <option value="支出款"> 支出款 </option >
                        <option value="退費款"> 退費款 </option >
                    </select>

                </div>

            </div>

            <div className="column is-6-desktop">

                <b className="tag is-large is-white"> 實收總計 : &nbsp;<span className="fDred">{ actualPayment_Sum }</span> &nbsp; 元 </b>  &nbsp; &nbsp;
                <b className="tag is-large is-white"> 支出總計 : &nbsp;<span className="fDred">{ expense_Sum }</span> &nbsp; 元 </b>  &nbsp; &nbsp;
                <b className="tag is-large is-white"> 結餘金額 : &nbsp;<span className="fRed">{ actualPayment_Sum - expense_Sum }</span> &nbsp; 元 </b>

            </div>

        </div>


        <br/><br/><br/>

        { /* 清單 */ }
        <table className="table is-fullwidth is-hoverable">

            <thead>
                <tr>
                    <th> 服 務           </th>
                    <th> 類 別           </th>
                    <th> 寵物名 ( 品種 ) </th>
                    <th> 主人姓名        </th>
                    <th> <b style={blue}> 應收金額 </b> </th>
                    <th> <b style={blue}> 實收金額 </b> </th>
                    <th> <b style={blue}> 支出金額 </b> </th>
                    <th> 經手人          </th>
                    <th> 備 註           </th>
                </tr>
            </thead>

            <tbody>

            { data.map( (x,y) => {

                let sColor = {  } ;

                if( x['service'] === '包月洗澡' || x['service'] === '包月美容' || x['service'] === '住宿券' ) sColor = { background : 'rgba(170,240,120,.1)' } ;
                if( x['type'] === '扣_預收款'  ) sColor = { background : 'rgba(240,170,120,.1)' } ;
                if( x['type'] === '支出款'  ) sColor = { background : 'rgba(240,170,120,.1)' } ;
                if( x['type'] === '退費款'  ) sColor = { background : 'rgba(240,170,120,.1)' } ;

                const bt = { background : 'white' , boxShadow : '0px 0px 4px 1px rgba(100,100,100,.1)' } ;

                return <tr key={y} style={sColor}>
                            <td style={tLeft}>    <span className="tag is-medium pointer" style={bt} onClick={ () => click_Service( x['service'] ) }>   { x['service'] } </span> </td>
                            <td>               { x['type'] }          </td>
                            <td style={tLeft}>
                              { x['petInfo'] && <span className="tag is-medium pointer" style={bt}  onClick = { () => click_Pet() } > { x['petInfo'] } </span>    }
                            </td>
                            <td>
                              { x['cusName'] && <span className="tag is-medium pointer" style={bt} onClick = { () => click_Customer() }> { x['cusName'] }  </span> }
                            </td>
                            <td>  { x['receivable'] }        </td>
                            <td>  { x['actualPayment'] }     </td>
                            <td>  { x['expense'] }           </td>
                            <td>  { x['admin'] }             </td>
                            <td style={tLeft}> { x['note'] } </td>
                       </tr>

            } ) }

            </tbody>

        </table>

        <br/><br/><br/>

    </form>

} ;

export default Cash_Report ;