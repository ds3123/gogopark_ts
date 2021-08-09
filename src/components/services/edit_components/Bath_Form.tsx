import React, { FC , useEffect , useState } from "react" ;
import { Edit_Form_Type } from "utils/Interface_Type"
import useSection_Folding from "hooks/layout/useSection_Folding";
import { useSelector } from "react-redux";


interface IBath extends Edit_Form_Type {

    editType?    : string ;
    serviceData? : any ;

}


/* 洗澡單選項 */
const Bath_Form : FC< IBath > = ( { register , errors  , current , editType, serviceData } ) => {

    // 洗澡價格
    const price = useSelector(( state:any ) => state.Bath.Bath_Price ) ;

    // 服務類型
    const type  = useSelector(( state:any ) => state.Service.current_Create_Service_Type ) ;


    const { is_folding , Folding_Bt } = useSection_Folding( false ) ;  // 收折區塊

    return <>

                <div className="columns is-multiline is-mobile">

                    <div className="column is-2-desktop">

                        <b className="tag is-large is-success"> <i className="fas fa-bath"></i> &nbsp; 洗 澡

                            { /* 顯示 : 洗澡價格 */ }

                            { /* for 新增 */ }
                            { ( price !== 0 && editType !== '編輯' ) &&

                                <>
                                    &nbsp;&nbsp;
                                    <b className="tag is-rounded is-white" style={{ fontSize : "12pt" }} > 小計 : <span style={{color:"red"}}> &nbsp; { price } &nbsp; </span> 元 </b>
                                    &nbsp;&nbsp;
                                    { type && <span> ( { type } ) </span> }
                                </>

                            }

                            { /* for 編輯 */ }
                            { ( editType === '編輯' && current === '洗澡' ) &&

                                <>
                                    &nbsp;&nbsp;
                                    <b className="tag is-rounded is-white" style={{ fontSize : "12pt" }} > 小計 : <span style={{color:"red"}}> &nbsp; { serviceData.bath_fee } &nbsp; </span> 元 </b>
                                </>

                            }

                        </b>

                    </div>

                    {/*<div className="column is-2-desktop">*/}

                    {/*    <div className="control has-icons-left" >*/}
                    {/*        <input className="input" type="number" { ...register( "bath_price" ) } min="0"/>*/}
                    {/*        <span className="icon is-small is-left"> <i className="fas fa-dollar-sign"></i> </span>*/}
                    {/*    </div>*/}

                    {/*</div>*/}

                    {/*<div className= "column is-1-desktop" >*/}
                    {/*    <span className="relative" style={{top:"8px"}}>元</span>*/}
                    {/*</div>*/}

                    { /* 收折鈕 */ }
                    <div className="column is-10-desktop">
                        <label className="label relative" > { Folding_Bt }  </label>
                    </div>

                </div>

                { /* 是否收折 : 客戶資料 */ }
                { is_folding ||

                    <>

                        <br/><br/>

                        <div className="columns is-multiline is-mobile">

                            <div className="column is-2-desktop"> <b className="tag is-light is-large"> 第一次洗澡 </b> </div>
                            <div className="column is-10-desktop">
                                <input type="radio" value="第一道"  {...register("bath_Option_1")} /> 第一道  &nbsp; &nbsp;
                                <input type="radio" value="伊斯特除蚤_皮膚" {...register("bath_Option_1")} /> 伊斯特除蚤_皮膚   &nbsp; &nbsp;
                                <input type="radio" value="貓咪"     {...register("bath_Option_1")} /> 貓咪   &nbsp; &nbsp;
                                <input type="radio" value="自備"     {...register("bath_Option_1")} /> 自備
                            </div>

                            <div className="column is-2-desktop"><b className="tag is-light is-large"> 第二次洗澡 </b></div>
                            <div className="column is-10-desktop">
                                <input type="radio" value="第一道"  {...register("bath_Option_2")} /> 第一道  &nbsp; &nbsp;
                                <input type="radio" value="伊斯特除蚤_皮膚"  {...register("bath_Option_2")} /> 伊斯特除蚤_皮膚 &nbsp; &nbsp;
                                <input type="radio" value="抗氧"  {...register("bath_Option_2")} /> 抗氧  &nbsp; &nbsp;
                                <input type="radio" value="白色"  {...register("bath_Option_2")} /> 白色  &nbsp; &nbsp;
                                <input type="radio" value="護色"  {...register("bath_Option_2")} /> 護色  &nbsp; &nbsp;
                                <input type="radio" value="澎毛"  {...register("bath_Option_2")} /> 澎毛  &nbsp; &nbsp;
                                <input type="radio" value="淡雅"  {...register("bath_Option_2")} /> 淡雅  &nbsp; &nbsp;
                                <input type="radio" value="貓咪"  {...register("bath_Option_2")} /> 貓咪  &nbsp; &nbsp;
                                <input type="radio" value="潤絲"  {...register("bath_Option_2")} /> 潤絲  &nbsp; &nbsp;
                                <input type="radio" value="自備"  {...register("bath_Option_2")} /> 自備
                            </div>

                            <div className="column is-2-desktop"><b className="tag is-light is-large"> 第一次浸泡 </b></div>
                            <div className="column is-10-desktop">
                                <input type="radio" value="滴食鹽水"  {...register("bath_Option_3")} /> 滴食鹽水 &nbsp; &nbsp;
                            </div>

                            <div className="column is-2-desktop"><b className="tag is-light is-large"> 第三次洗澡 </b> <br/> <span
                                className="fDred"> ( 必要時 或 重洗 ) </span></div>
                            <div className="column is-10-desktop">
                                <input type="radio" value="第一道"  {...register("bath_Option_4")} /> 第一道  &nbsp; &nbsp;
                                <input type="radio" value="伊斯特除蚤_皮膚"  {...register("bath_Option_4")} /> 伊斯特除蚤_皮膚  &nbsp; &nbsp;
                                <input type="radio" value="白色"  {...register("bath_Option_4")} /> 白色  &nbsp; &nbsp;
                                <input type="radio" value="護色"  {...register("bath_Option_4")} /> 護色  &nbsp; &nbsp;
                                <input type="radio" value="澎毛"  {...register("bath_Option_4")} /> 澎毛  &nbsp; &nbsp;
                                <input type="radio" value="貓咪"  {...register("bath_Option_4")} /> 貓咪  &nbsp; &nbsp;
                                <input type="radio" value="潤絲"  {...register("bath_Option_4")} /> 潤絲  &nbsp; &nbsp;
                                <input type="radio" value="自備"  {...register("bath_Option_4")} /> 自備
                            </div>

                            <div className="column is-2-desktop"><b className="tag is-light is-large"> 第二次浸泡 </b></div>
                            <div className="column is-10-desktop">
                                <input type="radio" value="滴食鹽水"  {...register("bath_Option_5")} /> 滴食鹽水  &nbsp; &nbsp;
                            </div>

                            <div className="column is-2-desktop"><b className="tag is-light is-large"> 烘 乾 </b></div>
                            <div className="column is-10-desktop">
                                <input type="radio" value="進烘箱" {...register("bath_Option_6")} /> 進烘箱  &nbsp; &nbsp;
                                <input type="radio" value="手吹"  {...register("bath_Option_6")} /> 手吹 &nbsp; &nbsp;
                            </div>

                        </div>


                    </>

                }

                <br/><hr/><br/>

           </>
} ;

export default React.memo( Bath_Form , () => true ) ;