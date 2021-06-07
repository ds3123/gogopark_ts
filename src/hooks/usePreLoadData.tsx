
import React from "react" ;


{ /* 回傳 _ 預先填寫資料 ( for 編輯資料 )  */ }
const usePreLoadData = ( data : any ) => {

   let preLoadData = {} as any ;
   const obj       = data.preLoadData ;

   if( obj ){

      const cus = obj.customer ;
      const pet = obj.pet ;

      preLoadData = {
                        // #客戶資料
                        customer_Id        : cus.id ,
                        customer_Name      : cus.name ,
                        customer_Cellphone : cus.mobile_phone ,
                        customer_Telephone : cus.tel_phone ,
                        customer_Line      : cus.line ,
                        customer_Email     : cus.email ,
                        customer_Address   : cus.address ,

                        // # 寵物資料
                        pet_Serial         : pet.serial ,
                        pet_Name           : pet.name ,
                        pet_Species        : pet.species ,
                        pet_Sex            : pet.sex ,
                        pet_Color          : pet.color ,
                        pet_Weight         : pet.weight ,
                        pet_Age            : pet.age ,

                        // * 調查資料 ( 單選 )
                        injection          : pet.injection ,
                        flea               : pet.flea ,
                        ligate             : pet.ligate ,
                        chip               : pet.chip ,
                        infection          : pet.infection ,
                        together           : pet.together ,
                        drug               : pet.drug ,
                        bite               : pet.bite ,

                        // * 調查資料 ( 複選 : 轉為陣列 )
                        health             : pet.health.split(',') ,
                        feed               : pet.feed.split(',') ,
                        toilet             : pet.toilet.split(',') ,
                        ownerProvide       : pet.ownerProvide.split(',') ,

                        pet_Note           : pet.note

                     } ;

   }


   return preLoadData

};

export default usePreLoadData