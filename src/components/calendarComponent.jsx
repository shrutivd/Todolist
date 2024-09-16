
import React, { useState } from 'react';
import ManageTask from './manageTask';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarComponent() {
  const [dateValue, setDateValue] = useState(new Date())
  const [manageTask, showManageTask] = useState(false)

  const handleUserInput = (userSelectedDate) =>{
    if(userSelectedDate < new Date){
      alert("Please select today or future date");
      return
    }
   setDateValue(userSelectedDate)
    showManageTask(true)
  }

 return (
    <>
    <Calendar 
    value={dateValue}
    onChange={handleUserInput}
    />
    {manageTask && <ManageTask data={dateValue.toDateString()} />}  
    </>
  );
}

export default CalendarComponent


