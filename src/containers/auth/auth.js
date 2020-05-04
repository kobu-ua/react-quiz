import React, { Component } from 'react';
import Button from '../../components/ui/button';
import Input from '../../components/ui/input';

import classes from './auth.module.scss';
import { connect } from 'react-redux';
import { auth } from '../../store/actions/auth';

const validateEmail = email => {
  const re = new RegExp(/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  return re.test(String(email).toLowerCase());
}

class Auth extends Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Incorrect Email',
        valid: false,
        touched: false,
        validation: {
          require: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Fill password',
        valid: false,
        touched: false,
        validation: {
          require: true,
          minLength: 6
        }
      }
    }
  };

  loginHandler = () => {

    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
    }

    this.props.auth(
      authData.email,
      authData.password,
      true
    );

  };

  registerHandler = () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
    }

    this.props.auth(
      authData.email,
      authData.password,
      false
    );

  };

  submitHandler = (e) => {
    e.preventDefault();
  };

  validateControl(value, validation) {
    if (!validation) {
      return true;
    }
    if (typeof value === 'string') {
      value = value.trim();
    }

    let isValid = true;

    if(validation.required && isValid) {
      isValid = value !== '';
    }

    if(validation.email && isValid) {
      isValid = validateEmail(value);
    }

    if(validation.minLength && isValid) {
      isValid = value.length >= validation.minLength;
    }

    return isValid;
  }

  onChangeHandler = (e, controlName) => {
    const formControls = {...this.state.formControls};
    const control = {
      ...formControls[controlName],
      value: e.target.value,
      touched: true,
    };

    control.valid = this.validateControl(control.value, control.validation);
    formControls[controlName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      formControls,
      isFormValid
    })
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const {type, value, label, valid, touched, errorMessage, validation } = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={type}
          value={value}
          label={label}
          valid={valid}
          touched={touched}
          shouldValidate={!!validation}
          errorMessage={errorMessage}
          onChange={e => this.onChangeHandler(e, controlName)}
        />
      )
    });
  }

  render() {
    return (
      <div className={classes.wrap}>
        <div className={classes.inner}>
          <h1>Sign In</h1>
          <form
            className={classes.form}
            onSubmit={this.submitHandler}>
            {this.renderInputs()}
            <Button
              theme="success"
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Login
            </Button>
            <Button
              theme="primary"
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Sign Up
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
};

export default connect(null, mapDispatchToProps)(Auth);
