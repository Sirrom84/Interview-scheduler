export function getAppointmentsForDay(state, day) {
	// const found = state.days.find((dayObject) => dayObject.name === day);
	// if (found === undefined) {
	// 	let result = [];

	// 	return result;
	// }
	// const foundMap = found.appointments.map((id) => state.appointments[id]);
	// const timeMap = found.appointments.map((id) => state.appointments[id].time);
	// let result = foundMap;

	// return result;
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
	// const result = [];
	// state.days.forEach((oneDay) => {
	// 	if (day === oneDay.name) {
	// 		oneDay.interviewers.forEach((element) => {
	// 			result.push(state.interviewers[element]);
	// 		});
	// 	}
	// });

	// return result;
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
