import React, {useState, useEffect, useCallback} from "react" ;
import axios from "utils/axios" ;
import { Service_Type_Api } from 'utils/Interface_Type'
import { useSelector } from "react-redux";


/* @ DELETE : 透過 Ajax _ 刪除資料 */
