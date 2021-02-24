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
  temp: {
    photos: {
      entrance: [],
      full: [],
      interior: [],
    },
    locationName: null,
    similarLocationName: null,
    address: null,
    latitude: null,
    longitude: null,
    pinCode: null,
    floors: null,
    description: null,
    phNo: [null, null, null],
    website: null,
    email: null,
    type: '',
  },
};

export default (state = initialState, action) => {
  console.log(action);
  let newState = null;

  switch (action.type) {
    case 'LOADING':
      return {...state, loading: action.payload};

    case 'LOGIN':
      return {...state, ...action.payload, loggedIn: true};
    case 'LOGOUT':
      return initialState;

    case 'USER_RECORD':
      return {...state, locations: action.payload};

    case 'UPLOAD_IMAGE':
      newState = {...state};
      newState.temp.photos[action.payload.type] = [
        ...newState.temp.photos[action.payload.type],
        action.payload.path,
      ];
      return newState;

    case 'UPDATE_TEMP':
      newState = {...state};
      newState.temp = {...state.temp, ...action.payload};
      return newState;

    case 'RESET_TEMP':
      return {
        ...state,
        temp: {
          ...initialState.temp,
          photos: {entrance: [], full: [], interior: []},
        },
      };

    default:
      return state;
  }
};
