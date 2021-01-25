const initialState = {
  loading: false,
  loggedIn: false,
  name: null,
  email: null,
  image: null,
  uid: null,
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
      return {...state, ...action.payload, loggedIn: true};
    case 'LOGOUT':
      return initialState;

    default:
      return state;
  }
};
