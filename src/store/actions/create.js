import { CREATE_QUIZ_QUESTION, CREATE_QUIZ_RESET } from "./actionTypes";
import axios from "../../utils/axios-quiz";

const createQuizQuestion = item => {
  return {
    type: CREATE_QUIZ_QUESTION,
    payload: item
  }
};

const resetCreateQuiz = () => {
  return {
    type: CREATE_QUIZ_RESET
  }
};

const finishCreateQuiz = () => async (dispatch, getState) => {
  // dispatch(quizesRequested())
  try {
    await axios.post('quizes.json', getState().create.quiz);
    dispatch(resetCreateQuiz());
  } catch (error) {
    console.log(error);
    // dispatch(quizesError(error));
  }
};

export {createQuizQuestion, finishCreateQuiz};