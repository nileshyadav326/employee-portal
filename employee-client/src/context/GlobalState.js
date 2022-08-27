import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import {LIST_USER, ADD_USER, REMOVE_USER, EDIT_USER} from './AppActions';
import webfox from '../services';
// Initial State
const initialState = {
  users: []
}

// Create Context
export const GlobalContext = createContext(initialState);

/*
export const createAction = (type, payload) => ({
  type,
  payload,
});
*/

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  /* common funcation no use of action creators */
  //const actionDispatch = (type, payload) =>  dispatch(createAction(type, payload));
  

  // Actions
  const removeUser = (id) => {
    dispatch({
      type: REMOVE_USER,
      payload: id
    })
  }

  const addUser = (user) => {
    dispatch({
      type: ADD_USER,
      payload: user
    })
  }

  const userList = (user) => {
    dispatch({
      type: LIST_USER,
      payload: user
    })
  }

  const editUser = (user) => {
    dispatch({
      type: EDIT_USER,
      payload: user
    })
  }

  return (
    <GlobalContext.Provider value={{
      users: state.users,
      removeUser,
      addUser,
      editUser,
      userList,
      dispatch,
      //actionDispatch
      //state
      webfox,
    }}>
      {children}
    </GlobalContext.Provider>
  )
}