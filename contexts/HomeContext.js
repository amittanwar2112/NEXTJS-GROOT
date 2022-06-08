import {createContext, useReducer} from 'react';

export const HomeContext = createContext(null);

const initialState = {
  h1: 'Trains'
};

const homeReducer = (state, action) => {
  switch(action.type){
    case 'update_store':
      return Object.assign({}, state, action.data)
    default:
      return state;
  }
};

const HomeContextProvider = (props)=>{
  const [state, dispatch] = useReducer(homeReducer, initialState);
  return (
    <HomeContext.Provider value={{ state, dispatch }}>
      {props.children}
    </HomeContext.Provider>
  );
}

export default HomeContextProvider;