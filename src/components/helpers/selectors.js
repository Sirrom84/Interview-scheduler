export function getAppointmentsForDay(state, day) {
	const outputArr = [];
	state.days.forEach((singleday) => {
		if (day === singleday.name) {
			singleday.appointments.forEach((e) => {
				outputArr.push(state.appointments[e]);
			});
		}
	});
	return outputArr;
}

export function getInterviewersForDay(state, day) {
	const outputArr = [];
	state.days.forEach((singleday) => {
		if (day === singleday.name) {
			singleday.interviewers.forEach((e) => {
				outputArr.push(state.interviewers[e]);
			});
		}
	});
	return outputArr;
}

export function getInterview(state, interview) {
	if (interview === null) {
		return null;
	}

	let resultOj = {};
	resultOj.student = interview.student;
	resultOj.interviewer = state.interviewers[interview.interviewer];

	return resultOj;
}
