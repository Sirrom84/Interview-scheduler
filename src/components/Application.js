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
		interviewers: [],
	});
	// console.log("THIS IS STATE INTERVIEWERS", state.interviewers);
	const setDay = (day) => setState({...state, day});

	console.log("STATE", state);
	// console.log("STATE INT", state.appointments);

	const dailyAppointments = getAppointmentsForDay(state, state.day);
	const interviewDay = getInterviewersForDay(state, state.day);
	const schedMap = dailyAppointments.map((apt) => {
		const interview = getInterview(state, apt.interview);
		console.log(
			"THIS IS MY INTERVIEW LOG LETS FIND THE NAME SHALL WE",
			interview
		);
		// console.log("APT", dailyAppointments);
		return (
			<Appointment
				key={apt.id}
				id={apt.id}
				time={apt.time}
				interviewers={interviewDay}
				interview={interview}
				bookInterview={bookInterview}
				cancelInterview={cancelInterview}
				// {...apt}
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
				interviewers: all[2].data,
			}));
		});
	}, []);

	function bookInterview(id, interview) {
		const appointment = {
			...state.appointments[id],
			interview: {...interview},
		};

		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

		setState({
			...state,
			appointments,
		});
		const url = `/api/appointments/${id}`;
		return axios.put(url, appointment).then(() => {
			const days = updateSpots(state.day, state.days, appointments); //use in cancel interview too
			setState({...state, appointments, days});
		});
	}

	function cancelInterview(id, interview) {
		const appointment = {
			...state.appointments[id],
			interview: {...interview},
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};
		const url = `/api/appointments/${appointment.id}`;
		return axios
			.delete(url, {
				id: appointment.id,
				time: appointment.time,
				interview: null,
			})
			.then(() => {
				const days = updateSpots(state.day, state.days, appointments);
				setState({...state, appointments, days});
			});
	}

	const updateSpots = function (day, days, appointments) {
		const dayObj = days.find((item) => item.name === day);

		const appointmentIds = dayObj.appointments;

		let spots = 0;

		for (const id of appointmentIds) {
			const appointment = appointments[id];
			if (!appointment.interview) {
				spots++;
			}
		}
		const newDayObj = {...dayObj, spots};
		const newArray = days.map((item) => (item.name == day ? newDayObj : item));
		return newArray;
	};

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
