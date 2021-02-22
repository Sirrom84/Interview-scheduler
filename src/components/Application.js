import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";

import {
	getAppointmentsForDay,
	getInterview,
	getInterviewersForDay,
} from "components/helpers/selectors";
import {useApplicationData} from "../hooks/useApplicationData";

export default function Application(props) {
	const {state, setDay, bookInterview, cancelInterview} = useApplicationData();

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
				interview={interview}
				bookInterview={bookInterview}
				cancelInterview={cancelInterview}
			/>
		);
	});

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
				{schedMap} <Appointment key="last" time="5pm" />
			</section>
		</main>
	);
}
