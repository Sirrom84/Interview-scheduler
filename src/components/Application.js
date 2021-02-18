import React, {useState, useEffect} from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import axios from "axios";
import {getAppointmentsForDay} from "components/helpers/selectors";

export default function Application(props) {
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
	});

	const setDay = (day) => setState({...state, day});

	const dailyAppointments = getAppointmentsForDay(state, state.day);

	const schedMap = dailyAppointments.map((apt) => {
		return (
			<Appointment
				key={apt.id}
				time={apt.time}
				interviewer={apt.interviewer}
				{...apt}
			/>
		);
	});

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
				interviwers: all[2].data,
			}));
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
