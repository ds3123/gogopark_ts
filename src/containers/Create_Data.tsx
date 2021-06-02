import React, {useState} from "react" ;

import Create_Customer from "components/customers/Create_Customer";


interface ITabs {
    title : string ;
    color : string ;
    icon  : string ;
}

// 頁面選項
const tabsArr : IOptionObj[] = [
    { title : "客戶" , color : "is-warning" , icon : "fas fa-user" } ,
    { title : "寵物" , color : "is-warning" , icon : "fas fa-dog"  } ,
    { title : "住宿" , color : "is-success" , icon : "fas fa-home"  } ,
    { title : "安親" , color : "is-success" , icon : "fas fa-id-card-alt"  } ,
    { title : "基礎" , color : "is-info"    , icon : "far fa-list-alt"  } ,
    { title : "洗澡" , color : "is-info"    , icon : "fas fa-bath"  } ,
    { title : "美容" , color : "is-info"    , icon : "fas fa-cut"  } ,
    { title : "方案" , color : "is-danger"  , icon : "fas fa-file-alt"  } ,
    { title : "價格" , color : "is-danger"  , icon : "fas fa-dollar-sign"  } ,
    { title : "品種" , color : "is-danger"  , icon : "fas fa-paw"  } ,
    { title : "員工" , color : "is-danger"  , icon : "fas fa-user-circle"  } ,
] ;


/* @ 新增資料 */
const Create_Data = ( props : any ) => {


    const [ current , set_Current ] = useState('') ; // 目前點選標籤

    const click_Tab = () => {


    } ;



    return <React.Fragment>

        <span> <i className="fas fa-plus-circle"></i> &nbsp;請選擇 : <b onClick={ this.handleClick }>新增資料類型</b>  </span> <br/><br/>
        <div className="columns is-multiline  is-mobile">

            <div className="column is-12-desktop">

                <b className={ tab+type_1 }  style={ fS } onClick={ ()=>this.Click_Add_Tab( '客戶' ) }>   <i className="fas fa-user"></i> &nbsp; 客戶 </b> &nbsp;
                <b className={ tab+type_2 }  style={ fS } onClick={ ()=>this.Click_Add_Tab( '寵物' ) }>   <i className="fas fa-dog"></i> &nbsp; 寵物 </b> &nbsp;
                <b className={ tab+type_3 }  style={ fS } onClick={ ()=>this.Click_Add_Tab( '住宿' ) }>   <i className="fas fa-home"></i> &nbsp; 住宿 </b> &nbsp;
                <b className={ tab+type_4 }  style={ fS } onClick={ ()=>this.Click_Add_Tab( '安親' ) }>   <i className="fas fa-id-card-alt"></i>  &nbsp; 安親 </b> &nbsp;

                <b className={ tab+type_5 }  style={ fS } onClick={ ()=>this.Click_Add_Tab( '基礎單' ) }> <i className="far fa-list-alt"></i> &nbsp; 基礎 </b> &nbsp;
                <b className={ tab+type_7 }  style={ fS } onClick={ ()=>this.Click_Add_Tab( '洗澡單' ) }> <i className="fas fa-bath"></i> &nbsp; 洗澡 </b> &nbsp;
                <b className={ tab+type_8 }  style={ fS } onClick={ ()=>this.Click_Add_Tab( '美容單' ) }> <i className="fas fa-cut"></i> &nbsp; 美容 </b> &nbsp;
                <b className={ tab+type_6 }  style={ fS } onClick={ ()=>this.Click_Add_Tab( '自助洗' ) }> <i className="fas fa-shower"></i> &nbsp; 自助 </b> &nbsp;

                <b className={ tab+type_9 }  style={ fS } onClick={ ()=>this.Click_Add_Tab( '方案單' ) }> <i className="fas fa-file-alt"></i> &nbsp; 方案 </b> &nbsp;
                <b className={ tab+type_10 } style={ fS } onClick={ ()=>this.Click_Add_Tab( '價格單' ) }> <i className="fas fa-dollar-sign"></i> &nbsp; 價格 </b> &nbsp;
                <b className={ tab+type_11 } style={ fS } onClick={ ()=>this.Click_Add_Tab( '品種單' ) }> <i className="fas fa-paw"></i> &nbsp; 品種 </b> &nbsp;
                <b className={ tab+type_12 } style={ fS } onClick={ ()=>this.Click_Add_Tab( '員工單' ) }> <i className="fas fa-user-circle"></i> &nbsp; 員工 </b> &nbsp;

            </div>

        </div> <hr/>


             { /* 表單元件 */ }
             <Create_Customer />

           </React.Fragment>

};

export default Create_Data ;