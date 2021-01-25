const initialState = {
  loading: false,
  loggedIn: false,
  username: null,
  email: null,
  locations: {
    deleted: -1,
    uploaded: -1,
    verified: -1,
  },
};

export default (state = initialState, action) => {
  console.log(action);

  switch (action.type) {
    case 'LOADING':
      return {...state, loading: action.payload};

    case 'LOGIN':
      return {...state, loggedIn: true};
    default:
      return state;
  }
};
