import React, {createContext, useContext, useReducer} from "react";

//data layer where all the data is present
export const StateContext = createContext();

//higher order component app is the children, allows us to setup the data layer.
export const StateProvider= ({
    reducer, initialState, children 
}) => (
    <StateContext.Provider value = {useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

//pull info from data layer

export const useStateValue = () => useContext(StateContext);