import React, {Fragment} from "react";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import Form from "./Form";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETE = "DELETE";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
	const {mode, transition, back} = useVisualMode(
		props.interview ? SHOW : EMPTY
	);

	function save(name, interviewer) {
		const interview = {
			student: name,
			interviewer,
		};
		transition(SAVING);
		props
			.bookInterview(props.id, interview)
			.then(() => {
				transition(SHOW);
			})
			.catch((error) => {
				transition(ERROR_SAVE, true);
			});
	}
	function deleteAppointment(id, interview) {
		transition(DELETE);
		props
			.cancelInterview(props.id, interview)
			.then(() => {
				transition(EMPTY);
			})
			.catch((error) => {
				transition(ERROR_DELETE, true);
			});
	}

	return (
		<article className="appointment">
			<Header time={props.time} />
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && (
				<Show
					student={props.interview.student}
					interviewer={props.interview.interviewer.name}
					onEdit={() => transition(EDIT)}
					onDelete={() => {
						transition(CONFIRM);
					}}
				/>
			)}
			{mode === CREATE && (
				<Form //need to make create
					interviewers={props.interviewers}
					onSave={save}
					onCancel={() => {
						back();
					}}
				/>
			)}
			{mode === SAVING && <Status message="Saving..." />};
			{mode === CONFIRM && (
				<Confirm
					onConfirm={deleteAppointment}
					onCancel={() => {
						transition(SHOW);
					}}
				/>
			)}
			{mode === DELETE && <Status message="Deleting..." />};
			{mode === EDIT && (
				<Form
					name={props.interview.student}
					interviewers={props.interviewers}
					interviewer={props.interview.interviewer.id}
					onSave={(name, interviewer) => save(name, interviewer)}
					onCancel={() => {
						transition(SHOW);
					}}
				/>
			)}{" "}
			{mode === ERROR_SAVE && (
				<Error
					message="Error on Save. Appointment not saved."
					onClose={() => {
						transition(EDIT);
					}}
				/>
			)}
			{mode === ERROR_DELETE && (
				<Error
					message="Error on Delete. Could not delete apointment at this time."
					onClose={() => {
						transition(CONFIRM);
					}}
				/>
			)}
		</article>
	);
}
