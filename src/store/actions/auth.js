import { toast } from 'react-toastify';
import axios from 'axios';
import { AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT } from './actionTypes';
import getStatusMessage from '../../utils/status-messages';

const authSuccess = (token) => {
  return {
    type: AUTH_SUCCESS,
    payload: token,
  };
};

const authError = (error) => {
  console.log(error);
  return {
    type: AUTH_ERROR,
    payload: error,
  };
};

const autolLogout = (time) => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, time * 1000);
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');
  return {
    type: AUTH_LOGOUT,
  };
};

const authLogin = () => (dispatch) => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate <= new Date()) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token));
      dispatch(
        autolLogout((expirationDate.getTime() - new Date().getTime()) / 1000)
      );
    }
  }
};

const catchErrorResponse = ({ error: { message } }) => {
  const notificationMessage = getStatusMessage('error', message);
  toast.error(notificationMessage);
};

const catchDefaultErrorResponse = () => {
  const notificationMessage = getStatusMessage('error');
  toast.error(notificationMessage);
};

const showLoginNotification = () => {
  const notificationMessage = getStatusMessage('success', 'AUTH_COMPLITE');
  toast.success(notificationMessage);
};

const auth = (email, password, isLogin) => async (dispatch) => {
  // dispatch(authRequested())
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };

  let url;

  if (isLogin) {
    url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBp80CMUCkmONDaKhZ72z6CAYbRZ-47qh4';
  } else {
    url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBp80CMUCkmONDaKhZ72z6CAYbRZ-47qh4';
  }

  await axios
    .post(url, authData)
    .then(({ data: { idToken, localId, expiresIn } }) => {
      showLoginNotification();
      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

      localStorage.setItem('token', idToken);
      localStorage.setItem('userId', localId);
      localStorage.setItem('expirationDate', expirationDate);
      dispatch(authSuccess(idToken));
      dispatch(autolLogout(expiresIn));
    })
    .catch((error) => {
      if (error.response) {
        catchErrorResponse(error.response.data);
      } else {
        catchDefaultErrorResponse();
      }
      dispatch(authError(error));
    });
};

export { auth, logout, authLogin };
