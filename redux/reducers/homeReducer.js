const initialState = {
  h1: 'Trains'
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'update_store':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};

export default homeReducer;
