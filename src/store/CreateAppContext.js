import React, { createContext, useReducer } from "react";

const CreateAppContext = (reducer, action, intialState) => {
  const Context = createContext();
  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, intialState);
    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }
    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };
  return { Context, Provider };
};

export { CreateAppContext };
