const messages = {
  error: {
    INVALID_EMAIL : 'Your email address appears to be malformed.',
    INVALID_PASSWORD : 'Your password is wrong.',
    EMAIL_EXISTS : 'This email address is already in use.',
    EMAIL_NOT_FOUND : 'User with this email doesn\'t exist.',
    USER_NOT_FOUND : 'User with this email doesn\'t exist.',
    USER_DISABLED : 'User with this email has been disabled.',
    TOO_MANY_REQUESTS : 'Too many requests. Try again later.',
    OPERATION_NOT_ALLOWED : 'Signing in with Email and Password is not enabled.',
    DEFAULT : 'An undefined Error happened. Try again later.',
  },
  success: {
    AUTH_COMPLITE : 'Authentication is successful',
    LOGOUT_COMPLITE : 'You are logged out',
    SUCCESS_DEFAULT: 'Successful',
  }
};

const getStatusMessage = (type = 'success', statusCode = 'SUCCESS_DEFAULT', defaultMessage = 'An undefined Error happened.') => {
  if (messages.hasOwnProperty(type) && messages[type].hasOwnProperty(statusCode)) return messages[type][statusCode];
  return defaultMessage;
};

export default getStatusMessage;