import {useState, useEffect} from "react";
import axios from "axios";

export function useApplicationData() {
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: [],
	});

	const setDay = (day) => setState({...state, day});

	////API fetch////
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

	////Adds created interview to API////
	function bookInterview(id, interview) {
		const appointment = {
			...state.appointments[id],
			interview: {...interview},
		};

		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

		// setState({
		// 	...state,
		// 	appointments,
		// });
		const url = `/api/appointments/${id}`;
		return axios.put(url, appointment).then(() => {
			const days = updateSpots(state.day, state.days, appointments); //use in cancel interview too
			setState({...state, appointments, days});
		});
	}

	////Destroys interview from API////
	function cancelInterview(id, interview) {
		const appointment = {
			...state.appointments[id],
			interview: null,
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};

		const url = `/api/appointments/${appointment.id}`;
		return axios.delete(url).then((res) => {
			let days = updateSpots(state.day, state.days, appointments);
			setState({...state, appointments, days});
		});
	}
	////Updates spots remaining on sidebar////
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
		const newArray = days.map((item) => (item.name === day ? newDayObj : item));
		return newArray;
	};

	const appDataObj = {
		state,
		setDay,
		bookInterview,
		cancelInterview,
		updateSpots,
	};

	return appDataObj;
}
