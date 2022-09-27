import { createContext, useReducer } from "react";
var enddat= new Date();
  enddat.setDate(enddat.getDate()+1);
const INITIAL_STATE = {
  destination: "",
  dates: [ {
    startDate: new Date(),
    endDate: enddat,
    key: "selection",
  }],
  options: {
    person: 1,
  },
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};
export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
  return (
    <SearchContext.Provider
      value={{
        destination: state.destination,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
