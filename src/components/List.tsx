import { ChangeEvent, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../hook";
import {
  changeTaskTitle,
  deleteTask,
  editTask,
  setIsCompleted,
  setTasks,
} from "../redux/listSlice";
import { loadTasks, saveTasks } from "../utils/localStorage";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const List = (): JSX.Element => {
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

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const tasksCopy = Array.from(tasks);
    const [reorderedTask] = tasksCopy.splice(result.source.index, 1);
    tasksCopy.splice(result.destination.index, 0, reorderedTask);

    dispatch(setTasks(tasksCopy));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="task-list">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {filtredTasks.map((item, index) => (
              <Draggable
                key={item.id.toString()}
                draggableId={item.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
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
                            item.completed
                              ? "input-task-title decor"
                              : "input-task-title"
                          }
                        />
                      ) : (
                        <p
                          className={
                            item.completed ? "task-title decor" : "task-title"
                          }
                        >
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
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default List;
