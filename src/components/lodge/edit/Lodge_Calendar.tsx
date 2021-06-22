import React , { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { Scheduler , DayView , WeekView , MonthView , Appointments , DateNavigator ,  TodayButton , Toolbar, ViewSwitcher,} from '@devexpress/dx-react-scheduler-material-ui';
import moment from 'moment' ;

// 今日
const today = moment( new Date ).format('YYYY-MM-DD') ;


// NOTE : 月份需要加 1，才是目前月份
const appointments = [

        {
            title     : 'A01 ( 大房 ) - 富貴 ( 哈士奇 )' ,
            startDate : new Date(2021 ,5, 23) ,
            endDate   : new Date(2021 ,5, 25) ,
        } ,

        {
            title     : 'A02 ( 大房 ) - 招財 ( 秋田犬 )' ,
            startDate : new Date(2021 ,5, 26) ,
            endDate   : new Date(2021 ,5, 28) ,
        } ,


    ] ;

const Lodge_Calendar = () => {

    const [ data , set_Data ] = useState( appointments );


    return  <Paper>

                <Scheduler data={ data } height={800} >

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


} ;

export default Lodge_Calendar