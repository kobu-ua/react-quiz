import { AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from "../actions/actionTypes";

const initialState = {
  token: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.payload
      }
    case AUTH_ERROR:
      console.log(action.payload);
      return {
        ...state,
        token: null
      }
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null
      }
    default:
      return state;
  }
};

export default authReducer;