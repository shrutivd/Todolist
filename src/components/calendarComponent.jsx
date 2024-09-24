import React, { useState } from "react";
import ManageTask from "./manageTask";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalendarComponent() {
	const [dateValue, setDateValue] = useState(new Date());
	const [manageTask, showManageTask] = useState(false);
	const [showCalendar, setShowCalendar] = useState(true);


	const handleUserInput = (userSelectedDate) => {
		if (userSelectedDate < new Date()) {
			alert("Please select today or future date");
			return;
		}
		setShowCalendar(false);
		setDateValue(userSelectedDate);
		showManageTask(true);
	};

	return (
		<>
			{showCalendar && (
				<Calendar value={dateValue} onChange={handleUserInput} />
			)}
			<div>
				{manageTask && (
					<ManageTask
						className="content-center"
						data={dateValue.toDateString()}
					/>
				)}
			</div>
			
		</>
	);
}

export default CalendarComponent;
