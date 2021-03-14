import React, { useState, useEffect } from "react";
import { NewTask } from "./newTask";

//import { NewTask } from "./newTask.js";

//create your first component
export function Home() {
	const [inputValue, setInputValue] = useState("");
	const [taskList, setTaskList] = useState("");
	const [isShown, setIsShown] = useState(false);
	const [taskId, setTaskId] = useState(0);
	const [isDone, setIsDone] = useState(false);

	useEffect(() => {
		fetchTasks();
	}, []);

	const fetchTasks = async () => {
		const result = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/hellboy2015"
		);

		const data = await result.json();
		setTaskList(data);
		setTaskId(data[data.length - 1].id + 1);
	};

	const handleKeyDown = event => {
		if (event.key === "Enter") {
			setTaskId(taskId + 1);

			if (inputValue === "") {
				alert("Task can't be empty");
			} else {
				updateSeverTasks([
					...taskList,
					{ id: taskId, label: inputValue, done: isDone }
				]);
				setInputValue("");
			}
		}
	};

	function updateSeverTasks(test) {
		var requestOptions = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(test),
			redirect: "follow"
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/hellboy2015",
			requestOptions
		)
			.then(response => response.text())
			.then(fetchTasks)
			.catch(error => console.log("error", error));
	}

	function removeTask(taskToRemoveID) {
		updateSeverTasks(taskList.filter(task => task.id !== taskToRemoveID));
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
					taskList.map(newTask => (
						<NewTask
							id={newTask.id}
							key={newTask.id}
							task={newTask.label}
							myFunction={removeTask}
						/>
					))
				)}
			</div>
			<div className="itemCounter">
				<div className="inner">{`${taskList.length} Items left`}</div>
			</div>
		</div>
	);
}
