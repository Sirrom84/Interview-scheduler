import React, {Fragment} from "react";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

export default function Appointment(props) {
	const EMPTY = "EMPTY";
	const SHOW = "SHOW";
	const CREATE = "CREATE";
	const EDIT = "EDIT";

	const {mode, transition, back} = useVisualMode(
		props.interview ? SHOW : EMPTY
	);

	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer,
		};
		console.log("THIS IS INT IN SAVE", interview);
		props.bookInterview(props.id, interview);
		transition(SHOW);
		// });
		// console.log("SAVE CLICKED");
	}
	console.log("PROPS", props);
	return (
		<article className="appointment">
			<Header time={props.time}></Header>
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && (
				<Show
					student={props.interview.student}
					interviewer={props.interview.interviewer.name}
					onEdit={() => transition(EDIT)}
				/>
			)}
			{mode === CREATE && (
				<Form
					interviewers={props.interviewers}
					onSave={save}
					onCancel={() => {
						back();
					}}
				/>
			)}
			{mode === EDIT && (
				<Form
					name={props.interview.student}
					interviewers={props.interviewers}
					interviewer={props.interview.interviewer.id}
					onSave={save}
					onCancel={back}
				/>
			)}
		</article>
	);
}
