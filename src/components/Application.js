import React, {useState, useEffect} from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import axios from "axios";

/* "GET_DAYS":         http://localhost:8001/api/days,
"GET_APPOINTMENTS": http://localhost:8001/api/appointments,
"GET_INTERVIEWERS": http://localhost:8001/api/interviewers,*/

// const days = [
// 	{
// 		id: 1,
// 		name: "Monday",
// 		spots: 2,
// 	},
// 	{
// 		id: 2,
// 		name: "Tuesday",
// 		spots: 5,
// 	},
// 	{
// 		id: 3,
// 		name: "Wednesday",
// 		spots: 0,
// 	},
// ];

const appointments = [
	{
		id: 1,
		time: "11am",
		interview: {
			student: "Sally Nguyen",
			interviewer: {
				id: 1,
				name: "Sylvia Palmer",
				avatar: "https://i.imgur.com/LpaY82x.png",
			},
		},
	},
	{
		id: 2,
		time: "12pm",
		interview: {
			student: "Lydia Miller-Jones",
			interviewer: {
				id: 1,
				name: "Sylvia Palmer",
				avatar: "https://i.imgur.com/LpaY82x.png",
			},
		},
	},
	{
		id: 3,
		time: "1pm",
		interview: {
			student: "Aaron Janes",
			interviewer: {
				id: 4,
				name: "Cohana Roy",
				avatar: "https://i.imgur.com/FK8V841.jpg",
			},
		},
	},
	{
		id: 4,
		time: "2pm",
		interview: {
			student: "Robert Morris",
			interviewer: {
				id: 5,
				name: "Sven Jones",
				avatar: "https://i.imgur.com/twYrpay.jpg",
			},
		},
	},
];

const schedMap = appointments.map((apt) => {
	return (
		<Appointment
			key={apt.id}
			time={apt.time}
			interviewer={apt.interviewer}
			{...apt}
		/>
	);
});

export default function Application(props) {
	// const [day, setDay] = useState("Monday");
	const [days, setDays] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:8001/api/days").then((response) => {
			setDays(response.data);
		});
	}, []);

	return (
		<main className="layout">
			<section className="sidebar">
				{/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
				<img
					className="sidebar--centered"
					src="images/logo.png"
					alt="Interview Scheduler"
				/>
				<hr className="sidebar__separator sidebar--centered" />
				<nav className="sidebar__menu">
					<DayList days={days} day={useState} setDay={setDays} />
				</nav>
				<img
					className="sidebar__lhl sidebar--centered"
					src="images/lhl.png"
					alt="Lighthouse Labs"
				/>
			</section>

			<section className="schedule">
				{schedMap} <Appointment key="last" time="5pm" />{" "}
			</section>
		</main>
	);
}
