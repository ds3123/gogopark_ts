import React, {FC, useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { Scheduler , DayView , WeekView , MonthView , Appointments , DateNavigator ,  TodayButton , Toolbar, ViewSwitcher,} from '@devexpress/dx-react-scheduler-material-ui';
import moment from 'moment' ;
import { ILodge } from 'utils/Interface_Type'




// 今日
const today = moment( new Date ).format('YYYY-MM-DD') ;


interface InUse {

   lodgeNumber : string ;   // 房間編號
   daysInUse   : string[] ; // 此房間編號下，使用的日期

}



{ /* @ 住宿空間使用情形  */ }
const Lodge_Calendar : FC<ILodge> = ( { lodgeNumber , lodgeCheckIn_Date , lodgeCheckOut_Date , lodgeData} ) => {


    const [ data , set_Data ] = useState<any[]>([] );    // 目前住宿資料



    useEffect(( ) => {


       // * 設定 _ 目前住宿情形 ( fon Calendar )
       set_Data( lodgeData ) ;


    } ,[ lodgeData ] ) ;



    return  <>

                  <Paper>

                    <Scheduler data={ data } height={ 800 } >

                        <ViewState defaultCurrentDate={ today } defaultCurrentViewName="Month" />

                        <MonthView />
                        <WeekView startDayHour={9} endDayHour={21} />
                        <DayView  startDayHour={9} endDayHour={21} />

                        <Toolbar />
                        <DateNavigator />
                        <TodayButton />
                        <ViewSwitcher />
                        <Appointments />

                    </Scheduler>

                 </Paper>

           </>



} ;

export default Lodge_Calendar