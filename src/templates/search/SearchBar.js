
import React , { useEffect , useState } from "react";


// @ 搜尋框

const SearchBar = ( { get_Search_Text } ) => {

   let [ text , set_Text ] = useState('') ;

   // 輸入資料變化
   const handleChange = e =>{

       const value = e.target.value ;

       set_Text( value ) ;
       get_Search_Text( value );   // 回傳父元件，所輸入文字

   };

   return <>

               <div className="columns is-multiline is-variable is-12">

                   <div className="column is-offset-8 is-4-desktop">

                       <div className="field has-addons">

                              <span className="control is-expanded">

                                     <input type        = "text"
                                            className   = "input"
                                            placeholder = "請輸入搜尋關鍵字 ..."
                                            value       = { text }
                                            onChange    = { e => handleChange(e) } />

                               </span>

                           <span className="control">  <button className="button"> <i className="fas fa-search"></i> </button>  </span>

                       </div>

                   </div>

               </div>

               <br/><br/>

          </>





};


export default SearchBar;