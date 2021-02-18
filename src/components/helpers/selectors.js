export function getAppointmentsForDay(state, day) {
	const found = state.days.find((dayObject) => dayObject.name === day);
	if (found === undefined) {
		let result = [];

		return result;
	}
	const foundMap = found.appointments.map((id) => state.appointments[id]);
	const timeMap = found.appointments.map((id) => state.appointments[id].time);
	let result = foundMap;

	return result;
}

export function getInterview(state, interview) {
	if (interview === null) {
		return null;
	}

	let interviewerId = interview.interviewer;

	const interviewerObj = state.interviewers[interviewerId];

	interview["interviewer"] = interviewerObj;

	return interview;
}
