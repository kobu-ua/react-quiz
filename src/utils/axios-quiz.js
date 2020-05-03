import axios from 'axios';

export default axios.create({
  baseURL: 'https://react-quiz-72fd1.firebaseio.com/'
});