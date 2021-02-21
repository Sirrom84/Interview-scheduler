import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
	const array = props.days.map((day) => {
		console.log("HERE IS DAY LIST DAY", day);
		return (
			<DayListItem
				key={day.id}
				name={day.name}
				spots={day.spots}
				selected={day.name === props.day}
				setDay={props.setDay}
			/>
		);
	});
	return <ul>{array}</ul>;
}
