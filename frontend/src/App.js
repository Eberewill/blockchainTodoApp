import React, { useEffect, useState } from "react";
import Web3 from "web3";

import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { loadBlockchainData } from "./redux/action";
function App() {
  const dispatch = useDispatch();
  const loadBlockchian = useSelector((state) => state.loadBlockchian);
  //const { loading, accounts, todoList, taskCount } = loadBlockchian;

  /** 
  const createTask = async (content) => {
    setloading(true);
    todoList.methods
      .createTask(content)
      .send({ from: account })
      .once("receipt", (receipt) => {
        setloading(false);
      });
  };

  const toggleCompleted = async (taskId) => {
    setloading(true);
    todoList.methods
      .toggleCompleted(taskId)
      .send({ from: account })
      .once("receipt", (receipt) => {
        setloading(false);
      });
  };
*/
  useEffect(() => {
    dispatch(loadBlockchainData());
  }, [dispatch]);
  return (
    <div className="container">
      {loadBlockchian && console.log(loadBlockchian)}
      {loadBlockchian.loading ? <>Loading</> : <>done</>}
    </div>
  );
}

export default App;
