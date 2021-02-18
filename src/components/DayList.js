import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
	const array = props.days.map((days) => {
		return (
			<DayListItem
				key={days.id}
				name={days.name}
				spots={days.spots}
				selected={days.name === props.days}
				setDay={props.setDay}
			/>
		);
	});
	return <ul>{array}</ul>;
}
