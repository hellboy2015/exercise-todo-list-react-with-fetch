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
		const getTasks = async () => {
			const tasksFromServer = await fetchTask();
			setTaskList(tasksFromServer);
			setTaskId(tasksFromServer[tasksFromServer.length - 1].id + 1);
		};
		getTasks();
	}, []);

	useEffect(
		taskList => {
			myTest();
		},
		[taskList]
	);

	const fetchTask = async () => {
		const result = await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/hellboy2015"
		);

		const data = await result.json();
		return data;
	};

	function myTest() {
		updateSeverTasks(taskList);
	}

	const handleKeyDown = async event => {
		if (event.key === "Enter") {
			await setTaskId(taskId + 1);

			if (inputValue === "") {
				alert("Task can't be empty");
			} else {
				await setTaskList([
					...taskList,
					{ id: taskId, label: inputValue, done: isDone }
				]);
				setInputValue("");
			}
		}
	};

	async function updateSeverTasks(tasksToUpdate) {
		await fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/hellboy2015",
			{
				method: "PUT",
				body: JSON.stringify(tasksToUpdate),
				headers: {
					"Content-Type": "application/json"
				}
			}
		).then(resp => {
			return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
		});
	}
	async function removeTask(taskToRemoveID) {
		await setTaskList(taskList.filter(task => task.id !== taskToRemoveID));
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
