import {
  FETCH_QUIZES_REQUEST,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_FAILURE,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
  FINISH_QUIZ
} from "../actions/actionTypes";

const initialState = {
  quizes: [],
  loading: false,
  error: null,
  answerState: null,
  currentQuestion: 0,
  isFinished: false,
  quiz: null,
  results: {},
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUIZES_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        loading: false,
        quizes: action.payload
      }
    case FETCH_QUIZES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        quiz: action.payload
      }
    case QUIZ_SET_STATE:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results
      }
    case FINISH_QUIZ:
      return {
        ...state,
        isFinished: true
      }
    case QUIZ_NEXT_QUESTION:
      return {
        ...state,
        answerState: null,
        currentQuestion: action.payload
      }
    case QUIZ_RETRY:
      return {
        ...state,
        answerState: null,
        currentQuestion: 0,
        isFinished: false,
        results: {}
      }
    default:
      return state;
  }
};

export default quizReducer;