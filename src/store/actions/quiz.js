import axios from '../../utils/axios-quiz';
import {
  FETCH_QUIZES_REQUEST,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_FAILURE,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
  FINISH_QUIZ
} from './actionTypes';

const quizesRequested = () => {
  return {
    type: FETCH_QUIZES_REQUEST
  };
};

const quizesLoaded = quizes => {
  return {
    type: FETCH_QUIZES_SUCCESS,
    payload: quizes
  }
}

const quizesError = error => {
  return {
    type: FETCH_QUIZES_FAILURE,
    payload: error
  }
}

const fetchQuizes = () => async dispatch => {
  dispatch(quizesRequested())
  try {
    const response = await axios.get('quizes.json');

    const quizes = [];
    Object.keys(response.data).forEach((key, idx) => {
      quizes.push({
        id: key,
        name: `Test #${idx + 1}`
      })
    });

    dispatch(quizesLoaded(quizes));
  } catch (error) {
    console.log(error);
    dispatch(quizesError(error));
  }
};

const quizLoaded = quiz => {
  return {
    type: FETCH_QUIZ_SUCCESS,
    payload: quiz
  }
}

const fetchQuizById = quizId => async dispatch => {
  dispatch(quizesRequested())
  try {
    const response = await axios.get(`quizes/${quizId}.json`);

    const quiz = response.data;

    dispatch(quizLoaded(quiz))
  } catch (error) {
    console.log(error);
    dispatch(quizesError(error));  }
}

const quizSetState = (answerState, results) => {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results
  }
}

const finishQuiz = () => {
  return {
    type: FINISH_QUIZ
  }
}

const quizNextQuestion = next => {
  return {
    type: QUIZ_NEXT_QUESTION,
    payload: next
  }
};

const isQuizFinished = state => {
  const {quiz, currentQuestion} = state;
  return currentQuestion + 1 === quiz.length;
};

const quizAnswerClick = answerId => (dispatch, getState) => {
  const state = getState().quiz;
  const {answerState, currentQuestion, quiz, results} = state;

  if (answerState) {
    const key = Object.keys(answerState)[0];
    if (answerState[key] === 'success') return;
  }

  const question = quiz[currentQuestion];

  if (question.rightAnswerId === answerId) {
    if (!results[question.id]) {
      results[question.id] = 'success';
    }

    dispatch(quizSetState({[answerId] : 'success'}, results));

    const timeout = window.setTimeout(() => {
      if (isQuizFinished(state)) {
        dispatch(finishQuiz())
      } else {
        dispatch(quizNextQuestion(currentQuestion + 1))
      }
      window.clearTimeout(timeout);
    }, 1000);
  } else {
    results[question.id] = 'error';
    dispatch(quizSetState({[answerId] : 'error'}, results));
  }
};

const retryQuiz = () => {
  return {
    type: QUIZ_RETRY
  }
}

export { fetchQuizes, fetchQuizById, quizAnswerClick, retryQuiz };