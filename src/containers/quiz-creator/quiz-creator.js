import React, { Component, Fragment } from 'react';
import Input from '../../components/ui/input';
import Button from '../../components/ui/button';
import Select from '../../components/ui/select';
import { createControl, validate, validateForm } from '../../utils/form';
import axios from '../../utils/axios-quiz';

import classes from './quiz-creator.module.scss';

function createOptionControl(number) {
  return createControl({
    label: `Answer ${number}`,
    errorMessage: 'Fill the field',
    id: number
  }, {required: true });
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Type the question',
      errorMessage: 'Fill the field'
    }, {required: true }),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

class QuizCreator extends Component {

  state = {
    quiz: [],
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls(),
  }

  submitHandler = e => {
    e.preventDefault();
  };

  addQuestionHandler = e => {
    e.preventDefault();
    const quiz = this.state.quiz.concat();
    const index = quiz.length + 1;
    const {question, option1, option2, option3, option4} = this.state.formControls;

    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id},
      ]
    };

    quiz.push(questionItem);

    this.setState({
      quiz,
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    });
  };

  createQuizHandler = async e => {
    e.preventDefault();

    try {
      await axios.post('quizes.json', this.state.quiz);

      this.setState({
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls(),
      });

    } catch (error) {
      console.log(error)
    }

  };

  changeHandler = (value, controlName) => {
    const formControls = {...this.state.formControls};
    const control = {
      ...formControls[controlName],
      value: value,
      touched: true,
      valid: validate(value, formControls[controlName].validation),
    };

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
  }

  renderInput() {
    return Object.keys(this.state.formControls).map((controlName, idx) => {
      const {label, value, valid, validation, touched, errorMessage} = this.state.formControls[controlName];

      return (
        <Fragment key={idx}>
          <Input
            label={label}
            value={value}
            valid={valid}
            shouldValidate={!!validation}
            touched={touched}
            errorMessage={errorMessage}
            onChange={e => this.changeHandler(e.target.value, controlName)}
          />
          { idx === 0 && <hr/>}
        </Fragment>
      )
    });
  }

  selectChangeHandler = e => {
    this.setState({
      rightAnswerId: +e.target.value
    })
  }

  render() {
    const select = <Select
                      label="Select right answer"
                      value={this.state.rightAnswer}
                      onChange={this.selectChangeHandler}
                      options={[
                        {text: 1, value: 1},
                        {text: 2, value: 2},
                        {text: 3, value: 3},
                        {text: 4, value: 4},
                      ]}
                    />;
    return (
      <div className={classes.wrapper}>
        <div className={classes.inner}>
          <h1>Create New Test</h1>

          <form onSubmit={this.submitHandler}>

            {this.renderInput()}

            {select}

            <Button
              theme="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Add Question
            </Button>
            <Button
              theme="success"
              onClick={this.createQuizHandler}
              disabled={this.state.quiz.length === 0}
            >
              Create Test
            </Button>
          </form>
        </div>
      </div>
    );
  };
}

export default QuizCreator;
