import React from "react";
import Input from "./components/Input";
import List from "./components/List";
import Selection from "./components/Selection";

function App() {
  return (
    <div className="App">
      <h1 className="main-title">
        To-do List for <span>girls</span>
      </h1>
      <Input />
      <Selection />
      <List />
    </div>
  );
}

export default App;
