import React from "react";
import PropTypes from "prop-types";

export function NewTask(props) {
	return (
		<div id="card" className="newTask mx-auto">
			{props.task}
		</div>
	);
}

NewTask.propTypes = {
	task: PropTypes.string
};
