import Web3 from "web3";
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from "../config";

import {
  LIST_TODO_REQ,
  LIST_TODO_SUCCESS,
  LOAD_BLOCKCHAIN_DATA_REQ,
  LOAD_BLOCKCHAIN_DATA_SUCCESS,
  CREATE_TODO_REQ,
  CREATE_TODO_SUCCESS,
  TOGGLE_TODO_REQ,
  TOGGLE_TODO_SUCCESS,
} from "./constants";

export const loadBlockchainData = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOAD_BLOCKCHAIN_DATA_REQ,
    });

    const web3 = new Web3("http://localhost:7545");
    //update accoun state
    const accounts = await web3.eth.getAccounts();

    const todoList = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);

    //get TodoList  tskCount property
    const taskCount = await todoList.methods.taskCount().call();

    //for (let i = 0; i <= taskCount; i++) {
    // const eachTask = await todoList.methods.tasks(i).call();

    //  setTasks([...tasks, eachTask]);

    dispatch({
      type: LOAD_BLOCKCHAIN_DATA_SUCCESS,
      payload: { accounts, todoList, taskCount },
    });
  } catch (error) {}
};
