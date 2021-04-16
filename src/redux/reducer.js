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
  shareURL: '',
  temp: {
    photos: {
      entrance: [],
      full: [],
      interior: [],
    },
    locationName: '',
    similarLocationName: '',
    address: '',
    latitude: '',
    longitude: '',
    pinCode: '',
    floors: '',
    description: '',
    phNo: ['', '', ''],
    website: '',
    email: '',
    type: '',
    social: '',
  },
  error: {
    visible: false,
    message: '',
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
      return {
        ...initialState,
        temp: {
          ...initialState.temp,
          photos: {entrance: [], full: [], interior: []},
        },
      };

    case 'USER_RECORD':
      return {...state, locations: action.payload};

    case 'SHARE_URL':
      return {...state, shareURL: action.payload};

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

    case 'DELETE_IMAGE':
      newState = {...state};
      newState.temp.photos[action.payload.type] = [
        ...newState.temp.photos[action.payload.type].filter(
          (_, i) => i !== action.payload.index,
        ),
      ];
      return newState;

    case 'UPDATE_SOCIAL':
      return {...state, social: action.payload};

    case 'UPDATE_ERROR':
      return {...state, error: action.payload};

    default:
      return state;
  }
};
