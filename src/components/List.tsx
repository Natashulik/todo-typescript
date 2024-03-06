import { ChangeEvent, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hook";
import {
  changeTaskTitle,
  deleteTask,
  editTask,
  setIsCompleted,
  setTasks,
} from "../redux/listSlice";
import { loadTasks, saveTasks } from "../utils/localStorage";

const Task = (): JSX.Element => {
  const selectedButton = useAppSelector(
    (state) => state.selection.selectedButton
  );
  const tasks = useAppSelector((state) => state.list.tasks);

  const dispatch = useAppDispatch();

  const filtredTasks =
    selectedButton === "completed"
      ? tasks.filter((item) => item.completed)
      : selectedButton === "incompleted"
      ? tasks.filter((item) => !item.completed)
      : tasks;

  const changeInput = (id: number, event: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTaskTitle({ id, newTitle: event.target.value }));
  };

  const handleDeleteTask = (id: number) => {
    dispatch(deleteTask(id));
  };

  const toggle = (id: number, editMode: boolean) => {
    dispatch(editTask(id));
  };

  function todoCompleted(id: number, isCompleted: boolean) {
    dispatch(setIsCompleted({ id, completed: isCompleted }));
  }

  useEffect(() => {
    const tasksFromLocalStorage = loadTasks();
    if (tasksFromLocalStorage.length > 0) {
      dispatch(setTasks(tasksFromLocalStorage));
    }
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  return (
    <>
      {filtredTasks.map((item) => (
        <div className="task-wrap" key={item.id}>
          <input
            type="checkbox"
            className="checkbox"
            checked={item.completed ? true : false}
            onChange={() => todoCompleted(item.id, item.completed)}
          />
          {item.editMode ? (
            <input
              value={item.title}
              onChange={(event) => changeInput(item.id, event)}
              className={
                item.completed ? "input-task-title decor" : "input-task-title"
              }
            />
          ) : (
            <p className={item.completed ? "task-title decor" : "task-title"}>
              {item.title}
            </p>
          )}
          <button
            className="button-edit"
            onClick={() => toggle(item.id, item.editMode)}
          >
            {item.editMode ? "✔" : "✎"}{" "}
          </button>
          <button
            className="button-edit"
            onClick={() => handleDeleteTask(item.id)}
          >
            ✖
          </button>
        </div>
      ))}
    </>
  );
};

export default Task;
