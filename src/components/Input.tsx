import { useAppSelector, useAppDispatch } from "../hook";
import { setNewTask } from "../redux/listSlice";
import { setIsEmpty, setInputText } from "../redux/inputSlice";
import { ChangeEvent } from "react";

const Input = (): JSX.Element => {
  const { text, isEmpty } = useAppSelector((state) => state.input);

  const dispatch = useAppDispatch();

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(setInputText(event.target.value));
  }

  const handleClick = () => {
    if (text) {
      const newTask = {
        id: Date.now(),
        title: text,
        completed: false,
        editMode: false,
      };
      dispatch(setNewTask(newTask));
      dispatch(setInputText(""));
      dispatch(setIsEmpty(false));
    } else {
      dispatch(setIsEmpty(true));
    }
  };

  return (
    <div className="new-task_block">
      <input
        className="new-task"
        value={text}
        onChange={onChange}
        placeholder={isEmpty ? "Add task" : ""}
      />
      <button className="button-add" onClick={handleClick}>
        Add
      </button>
    </div>
  );
};

export default Input;
