import React, {useState, useEffect} from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import axios from "axios";
import {
	getAppointmentsForDay,
	getInterview,
	getInterviewersForDay,
} from "components/helpers/selectors";

export default function Application(props) {
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
	});

	const setDay = (day) => setState({...state, day});

	const dailyAppointments = getAppointmentsForDay(state, state.day);
	const interviewDay = getInterviewersForDay(state, state.day);
	const schedMap = dailyAppointments.map((apt) => {
		const interview = getInterview(state, apt.interview);
		return (
			<Appointment
				key={apt.id}
				id={apt.id}
				time={apt.time}
				interviewers={interviewDay}
				interview={apt.interview}
				{...apt}
				bookInterview={bookInterview}
			/>
		);
	});

	function bookInterview(id, interview) {
		console.log(id, interview);
	}

	useEffect(() => {
		Promise.all([
			axios.get("http://localhost:8001/api/days"),
			axios.get("http://localhost:8001/api/appointments"),
			axios.get("http://localhost:8001/api/interviewers"),
		]).then((all) => {
			setState((last) => ({
				...last,
				days: all[0].data,
				appointments: all[1].data,
				interviewers: all[2].data,
			}));
		});
	}, []);

	return (
		<main className="layout">
			<section className="sidebar">
				<img
					className="sidebar--centered"
					src="images/logo.png"
					alt="Interview Scheduler"
				/>
				<hr className="sidebar__separator sidebar--centered" />
				<nav className="sidebar__menu">
					<DayList days={state.days} day={state.day} setDay={setDay} />
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
