import React, {FC} from "react" ;
import { Edit_Form_Type } from "utils/Interface_Type"
import useSection_Folding from "hooks/layout/useSection_Folding";



/* 洗澡單選項 */
const Bath_Form : FC<Edit_Form_Type> = ({ register , errors , isDirty , isValid } ) => {

    const { is_folding , Folding_Bt } = useSection_Folding() ;  // 收折區塊

    return <>

                <b className="tag is-large is-success"> <i className="fas fa-bath"></i> &nbsp; 洗 澡 </b>

                { /* 收折鈕 */ }
                <label className="label relative" style={{top:"-40px"}}> { Folding_Bt }  </label>

                { /* 是否收折 : 客戶資料 */ }
                { is_folding ||

                    <>

                        <br/><br/>

                        <div className="columns is-multiline is-mobile">

                            <div className="column is-2-desktop"><b className="tag is-light is-large"> 第一次洗澡 </b></div>
                            <div className="column is-10-desktop">
                                <input type="radio" value="第一道"  {...register("bath_Option_1")} /> 第一道  &nbsp; &nbsp;
                                <input type="radio" value="伊斯特除蚤_皮膚"  {...register("bath_Option_1")} /> 伊斯特除蚤_皮膚   &nbsp; &nbsp;
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

                        <br/>
                        <hr/>
                        <br/>

                        <div className="columns is-multiline is-mobile">

                            <div className="column is-2-desktop">
                                <b className="tag is-large is-info is-light">
                                    <i className="fas fa-ruler-combined"></i> &nbsp; 梳廢毛 &nbsp;
                                </b>
                            </div>

                            <div className="column is-10-desktop">
                                &nbsp; &nbsp; <input type="radio" value="輕"  {...register("comb_Fur")} /> 輕  &nbsp; &nbsp;
                                &nbsp; &nbsp; <input type="radio" value="中"  {...register("comb_Fur")} /> 中  &nbsp; &nbsp;
                                &nbsp; &nbsp; <input type="radio" value="重"  {...register("comb_Fur")} /> 重
                            </div>

                            <div className="column is-2-desktop">
                                <b className="tag is-large is-info is-light">
                                    <i className="fas fa-bug"></i> &nbsp; 跳蚤、壁蝨
                                </b>
                            </div>

                            <div className="column is-10-desktop">
                                &nbsp; &nbsp; <input type="radio" value="有"  {...register("comb_Flea")} /> 有
                            </div>

                        </div>

                    </>

                }

                <br/><hr/><br/>

           </>
} ;

export default Bath_Form ;