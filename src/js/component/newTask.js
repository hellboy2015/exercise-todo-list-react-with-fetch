import React, { useState } from "react";
import PropTypes from "prop-types";

export function NewTask(props) {
	const [isShown, setIsShown] = useState(false);

	return (
		<div
			id={"removeTask" + props.id}
			className="newTask mx-auto row"
			onMouseEnter={e => setIsShown(true)}
			onMouseLeave={e => setIsShown(false)}>
			<div className="col-11">{props.task}</div>

			{isShown && (
				<div
					className="removeTask col-1"
					onClick={() => props.myFunction(props.id)}>
					X
				</div>
			)}
		</div>
	);
}

NewTask.propTypes = {
	task: PropTypes.string,
	id: PropTypes.number,
	myFunction: PropTypes.func
};
