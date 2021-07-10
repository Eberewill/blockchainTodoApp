import React, { useEffect, useState } from "react";
import Web3 from "web3";
import "./App.css";
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from "./config";

function App() {
  const [account, setAccount] = useState("");

  const [todoList, setTodoList] = useState("");

  const [taskCount, setTaskCount] = useState("");

  const [tasks, setTasks] = useState([]);
  const [loading, setloading] = useState(false);

  const loadBlockchainData = async () => {
    setloading(true);
    //instantiate a new web3 instance
    const web3 = new Web3("http://localhost:7545");
    //update accoun state
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    //get TodoList Eth smart contract address
    const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
    // update state
    setTodoList(todoList);
    //get TodoList  tskCount property
    const taskCount = await todoList.methods.taskCount().call();
    setTaskCount(taskCount);
    //get Individual Task

    for (let i = 0; i <= taskCount; i++) {
      const eachTask = await todoList.methods.tasks(i).call();

      setTasks([...tasks, eachTask]);
    }
    setloading(false);
  };

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

  useEffect(() => {
    loadBlockchainData();
  }, []);
  return (
    <div className="container">
      {account && console.log(tasks)}
      {loading ? (
        <>Loading</>
      ) : (
        <>
          {" "}
          <div>
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
              <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                  <small>
                    <a className="nav-link" href="#">
                      <span id="account"></span>
                    </a>
                  </small>
                </li>
              </ul>
            </nav>
            <div className="container-fluid">
              <div className="row">
                <main
                  role="main"
                  className="col-lg-12 d-flex justify-content-center"
                >
                  <div id="loader" className="text-center">
                    <p className="text-center">Loading...</p>
                  </div>
                  <div id="content">
                    <form>
                      <input
                        id="newTask"
                        type="text"
                        className="form-control"
                        placeholder="Add task..."
                        required
                      />
                      <input type="submit" hidden="" />
                    </form>
                    <ul id="taskList" className="list-unstyled">
                      {tasks.map((task, key) => {
                        return (
                          <div
                            className="taskTemplate"
                            className="checkbox"
                            key={key}
                          >
                            <label>
                              <input type="checkbox" />
                              <span className="content">{task.content}</span>
                            </label>
                          </div>
                        );
                      })}
                    </ul>
                    <ul id="completedTaskList" className="list-unstyled"></ul>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
