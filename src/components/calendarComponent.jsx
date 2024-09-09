
import React, { useState } from 'react';
import ManageTask from './manageTask';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarComponent() {
  const [dateValue, setDateValue] = useState(new Date())

  const handleUserInput = (userSelectedDate) =>{
    setDateValue(userSelectedDate)
  }

 return (
    <>
    <Calendar 
    value={dateValue}
    onChange={handleUserInput}
    />
    <div>
      <ManageTask/>
    </div>
    </>
  );
}

export default CalendarComponent


