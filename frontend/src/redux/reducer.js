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

export const blockChaiReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_BLOCKCHAIN_DATA_REQ:
      return { loding: true };
    case LOAD_BLOCKCHAIN_DATA_SUCCESS:
      return {
        loding: false,
        accounts: action.payload.accounts,
        todoList: action.payload.todoList,
        taskCount: action.payload.taskCount,
      };
    default:
      return state;
  }
};
