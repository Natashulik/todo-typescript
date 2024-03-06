import { ChangeEvent } from "react";
import { useAppSelector, useAppDispatch } from "../hook";
import {
  changeTaskTitle,
  deleteTask,
  editTask,
  setIsCompleted,
} from "../redux/listSlice";

const Task = (): JSX.Element => {
  const selectedButton = useAppSelector(
    (state) => state.selection.selectedButton
  );

  const dispatch = useAppDispatch();

  const tasks = useAppSelector((state) => {
    if (selectedButton === "completed") {
      return state.list.tasks.filter((item) => item.completed);
    } else if (selectedButton === "incompleted") {
      return state.list.tasks.filter((item) => !item.completed);
    } else return state.list.tasks;
  });

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

  return (
    <>
      {tasks.map((item) => (
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
