import React, { useState } from "react";

//import { NewTask } from "./newTask.js";

//create your first component
export function Home() {
	const [inputValue, setInputValue] = useState("");
	const [taskList, setTaskList] = useState("");
	const [isShown, setIsShown] = useState(false);

	const handleKeyDown = event => {
		if (event.key === "Enter") {
			setTaskList([...taskList, inputValue]);
			setInputValue("");
		}
	};

	function removeTask(taskToRemoveID) {
		taskList.splice(taskToRemoveID, 1);
	}

	return (
		<div className="mt-5">
			<h1 className="display-1 justify-content-center text-center">
				todos
			</h1>
			<div className="justify-content-center">
				<div id="card" className="mx-auto text-center">
					<input
						id="newTaskInput"
						className="newTask"
						type="text"
						onChange={e => setInputValue(e.target.value)}
						value={inputValue}
						onKeyDown={handleKeyDown}
					/>
				</div>
				{taskList[0] === undefined ? (
					<div className="newTask mx-auto row">
						<div className="col-11">No tasks, add a task</div>
					</div>
				) : (
					taskList.map((newTask, index) => (
						<div
							key={index}
							className="newTask mx-auto row"
							onMouseEnter={e => setIsShown(true)}
							onMouseLeave={e => setIsShown(false)}>
							<div className="col-11">{newTask}</div>

							{isShown && (
								<div
									className="removeTask col-1"
									onClick={e => removeTask(index)}>
									X
								</div>
							)}
						</div>
					))
				)}
			</div>
			<div className="itemCounter">
				<div className="inner">{`${taskList.length} Items left`}</div>
			</div>
		</div>
	);
}
