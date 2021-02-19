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
	return (
		<article className="appointment">
			<Header time={props.time}></Header>
			{mode === EMPTY && <Empty onAdd={() => transition(FORM)} />}
			{mode === SHOW && (
				<Show
					onEdit={() => transition(EDIT)}
					student={props.interview.student}
					interviewer={props.interview.interviewer}
				/>
			)}
			{mode === FORM && (
				<Form
					// name={props.interview.student}
					interviewers={[]}
					// interviewer={props.interview.interviewer.id}
					// onSave={action("OnSave")}
					onCancel={back}
				/>
			)}
			{mode === EDIT && (
				<Form
					name={props.interview.student}
					interviewers={[]}
					interviewer={props.interview.interviewer.id}
					// onSave={action("OnSave")}
					onCancel={back}
				/>
			)}
		</article>
	);
}
