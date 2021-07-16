
import React, {FC , useState , useEffect } from "react"
import {Edit_Form_Type} from "utils/Interface_Type";
import {Input} from "templates/form/Input";
import {useRead_Species} from "hooks/ajax_crud/useAjax_Read";


type species = {

    species_Id? : number ;

}

type Price = Edit_Form_Type & species ;


{ /* 價格表單欄位  */ }
const Price_Form : FC<Price> = ( { register  , errors , setValue , current , species_Id } ) => {

   // 取得 _ 所有寵物品種資料
    const petSpecies = useRead_Species() ;

    const [ create_Way , set_Create_Way ] = useState<'寵物品種'|'個別項目'>( '寵物品種' ) ;


    // 點選 _ 新增方式
    const click_Way = ( way : '寵物品種'|'個別項目' ) => set_Create_Way( way ) ;



    useEffect(( ) => {

      /*
         # for 編輯價格時 _ 設定 : " 指定品種 " 下拉選項( Ajax 取得 )
           * 因 Price_Form 載入時，Ajax 資料尚未取得( 已 React Hook Form 的 defaultValues，無法成功設定預設值 )
           * 需取得資料後，再以 setValue() 單獨設定預設值
      */
      if( !current && species_Id  && petSpecies.length > 0 ){

         setValue('price_Species_Id' , species_Id ) ;

      }

    } ,[ petSpecies ]) ;

   return <>


            { /* 新增選項 */ }
            <div className="columns is-multiline  is-mobile">

              <div className="column is-12-desktop">

                <span className="relative" style={{ left:"-12px" }} >

                 <b className="tag is-medium is-white"> 新增價格方式 :</b> &nbsp;&nbsp;

                 <b className={ `tag pointer is-medium is-success ${ create_Way === '寵物品種' ? '' : 'is-light' }` } onClick = { () => click_Way('寵物品種') } >
                     <i className="fas fa-cat"></i> &nbsp; 寵物品種
                 </b> &nbsp;&nbsp;&nbsp;&nbsp;

                 <b className={ `tag pointer is-medium is-success ${ create_Way === '個別項目' ? '' : 'is-light' }` } onClick = { () => click_Way('個別項目') }>
                     <i className="fas fa-list"></i> &nbsp; 個別項目
                 </b>

                </span>


              </div>

            </div>

            <br/>

            { /* 寵物品種  */ }
            { create_Way === '寵物品種' &&

              <div className="columns is-multiline  is-mobile">

                  { /* 指定品種 */ }
                  <div className="column is-12-desktop">

                      <p> 指定<span style={{color:'rgb(0,0,180)'}}>品種</span> &nbsp; <b style={{color: "red"}}> {errors.price_Species_Id?.message} </b></p>
                      <div className="control has-icons-left">

                          <div className="select">
                              <select {...register("price_Species_Id")} >
                                  <option value={ 0 } >無</option>
                                  {

                                      petSpecies.map((x:any, y:any) => {

                                          return <option value = {x['id']}
                                                         key   = {y} >
                                              {x['serial']} _ { x['name'] }  { x['character'] ? `( ${ x['character'] } )` : '' }
                                          </option> ;

                                      })

                                  }

                              </select>
                          </div>

                          <div className="icon is-small is-left"> <i className="fas fa-cat"></i> </div>

                      </div>

                  </div>

                  <Input type="number" name="price_Fist_Bath" label="初次洗澡優惠" register={register} error={errors.price_Fist_Bath}
                         icon="fas fa-dollar-sign" asterisk={false} columns="2" />

                  <Input type="number" name="price_Single_Bath" label="單次洗澡" register={register} error={errors.price_Single_Bath}
                         icon="fas fa-dollar-sign" asterisk={true} columns="2" />

                  <Input type="number" name="price_Month_Bath" label="包月洗澡" register={register} error={errors.price_Month_Bath}
                         icon="fas fa-dollar-sign" asterisk={false} columns="2" />

                  <div className="column is-1-desktop"></div>

                  <Input type="number" name="price_Single_Beauty" label="單次美容" register={register} error={errors.price_Single_Beauty}
                         icon="fas fa-dollar-sign" asterisk={true} columns="2" />

                  <Input type="number" name="price_Month_Beauty" label="包月美容" register={register} error={errors.price_Month_Beauty}
                         icon="fas fa-dollar-sign" asterisk={false} columns="2" />

              </div>

            }

            { /* 個別項目 */ }
            { create_Way === '個別項目' &&

                <div className="columns is-multiline  is-mobile">

                    { /* 服務類別 */ }
                    <div className="column is-3-desktop required">

                        <p> 服務類別 &nbsp;
                            <b style={{ color: "red" }}> { errors.price_Type?.message } </b>
                        </p>

                        <div className="control has-icons-left">

                            <div className="select">
                                <select { ...register("price_Type") } >
                                   <option value="請選擇">請選擇</option>
                                   <option value="基礎">基 礎</option>
                                   <option value="洗澡">洗 澡</option>
                                   <option value="美容">美 容</option>
                                   <option value="安親">安 親</option>
                                   <option value="住宿">住 宿</option>
                                   <option value="接送">接 送</option>
                                </select>
                            </div>

                            <div className="icon is-small is-left"> <i className="fas fa-globe"></i> </div>

                        </div>

                    </div>

                    { /* 指定方案 */ }
                    <div className="column is-3-desktop">

                        <p> 指定<span style={{color:'rgb(0,0,180)'}}>方案</span> &nbsp; <b style={{color: "red"}}> {errors.price_Plan?.message} </b></p>
                        <div className="control has-icons-left">

                            <div className="select">
                                <select { ...register("price_Plan") } >
                                    <option value="無">無</option>
                                    <option value="包月洗澡">包月洗澡</option>
                                    <option value="包月美容">包月美容</option>
                                    <option value="初次洗澡優惠"> 初次洗澡優惠 </option>
                                </select>
                            </div>

                            <div className="icon is-small is-left"> <i className="fas fa-file-alt"></i> </div>

                        </div>

                    </div>

                    { /* 指定品種 */ }
                    <div className="column is-6-desktop">

                        <p> 指定<span style={{color:'rgb(0,0,180)'}}>品種</span> &nbsp; <b style={{color: "red"}}> {errors.price_Species_Id?.message} </b></p>
                        <div className="control has-icons-left">

                            <div className="select">
                                <select {...register("price_Species_Id")} >
                                    <option value={ 0 } >無</option>
                                    {

                                        petSpecies.map((x:any, y:any) => {

                                            return <option value = {x['id']}
                                                           key   = {y} >
                                                    {x['serial']} _ { x['name'] }  { x['character'] ? `( ${ x['character'] } )` : '' }
                                                   </option> ;

                                        })

                                    }

                                </select>
                            </div>

                            <div className="icon is-small is-left"> <i className="fas fa-cat"></i> </div>

                        </div>

                    </div>

                    <Input type="text" name="price_Item" label="服務名稱" register={register} error={errors.price_Item}
                           icon="fas fa-cut" asterisk={true} columns="3" />

                    <Input type="number" name="price_Amount" label="服務價格" register={register} error={errors.price_Amount}
                           icon="fas fa-dollar-sign" asterisk={true} columns="3" />

                    <Input type="text" name="price_Note" label="備 註" register={register} error={errors.price_Note}
                           icon="fas fa-edit" asterisk={false} columns="6" />

                </div>

            }

          </>


};

export default Price_Form



