import React, {Fragment} from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
	const EMPTY = "EMPTY";
	const SHOW = "SHOW";
	const FORM = "FORM";
	const EDIT = "EDIT";
	const {mode, transition, back} = useVisualMode(
		props.interview ? SHOW : EMPTY
	);

	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer,
		};
		props.bookInterview(props.id, interview);
		console.log("SAVE CLICKED");
	}
	return (
		<article className="appointment">
			<Header time={props.time}></Header>
			{mode === EMPTY && <Empty onAdd={() => transition(FORM)} />}
			{mode === SHOW && (
				<Show
					onEdit={() => transition(EDIT)}
					student={props.interview.student}
					interviewer={props.interviewers}
				/>
			)}
			{mode === FORM && (
				<Form
					// name={props.interview.student}
					interviewers={props.interviewers}
					// interviewer={props.interview.interviewer.id}
					onSave={save}
					onCancel={back}
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
