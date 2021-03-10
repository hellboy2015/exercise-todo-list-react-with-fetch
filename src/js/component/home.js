import React, { useState } from "react";

import { NewTask } from "./newTask.js";

//create your first component
export function Home() {
	const [inputValue, setInputValue] = useState("");
	const [taskList, setTaskList] = useState("");

	const handleKeyDown = event => {
		if (event.key === "Enter") {
			setTaskList([...taskList, inputValue]);
			setInputValue("");
		}
    };
    function keyGenerator() {
        return Math.floor(Math.random()*50);
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
					<NewTask task="No tasks, add a task" />
				) : (
					taskList.map(newTask => <NewTask key={keyGenerator()} task={newTask} />)
				)}
			</div>
			<div className="itemCounter">
				<div className="inner">{"4 Items left"}</div>
			</div>
		</div>
	);
}
