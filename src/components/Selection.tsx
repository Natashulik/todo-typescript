import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hook";
import { pressButton } from "../redux/selectionSlice";
import { loadSelectedButton, saveSelectedButton } from "../utils/localStorage";

const Selection = (): JSX.Element => {
  const selectedButton = useAppSelector(
    (state) => state.selection.selectedButton
  );
  const dispatch = useAppDispatch();

  const handleButton = (type: string) => {
    dispatch(pressButton(type));
  };

  useEffect(() => {
    const buttonFromLocalStorage = loadSelectedButton();
    if (buttonFromLocalStorage) {
      dispatch(pressButton(buttonFromLocalStorage));
    }
  }, []);

  useEffect(() => {
    saveSelectedButton(selectedButton);
  }, [selectedButton]);

  return (
    <div className="select-wrapper">
      <button
        className={`button-all ${selectedButton === "all" ? "selected" : ""}`}
        onClick={() => handleButton("all")}
      >
        all tasks
      </button>
      <button
        className={`button-completed ${
          selectedButton === "completed" ? "selected" : ""
        }`}
        onClick={() => handleButton("completed")}
      >
        completed
      </button>
      <button
        className={`button-incompleted ${
          selectedButton === "incompleted" ? "selected" : ""
        }`}
        onClick={() => handleButton("incompleted")}
      >
        incompleted
      </button>
    </div>
  );
};

export default Selection;
