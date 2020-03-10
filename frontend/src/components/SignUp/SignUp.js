import React from 'react';
import './SignUp.css';
import axios from 'axios';
import Dropdown from 'react-dropdown';
import { serverIp, serverPort } from '../../config';
import '../../../node_modules/react-dropdown/style.css';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '', // name corresponds to student name for student role and company name for company role
      emailId: '',
      password: '',
      user: 'student',
      userOptions: ['student', 'company'],
      collegeName: '',
      city: '',
      cstate: '',
      country: '',
    };
    this.onChangeNameHandler = this.onChangeNameHandler.bind(this);
    this.onChangeUserNameHandler = this.onChangeUserNameHandler.bind(this);
    this.onChangePasswordHandler = this.onChangePasswordHandler.bind(this);
    this.onChangeUserHandler = this.onChangeUserHandler.bind(this);
    this.onChangeCollegeNameHandler = this.onChangeCollegeNameHandler.bind(this);
    this.onChangeCityHandler = this.onChangeCityHandler.bind(this);
    this.onChangeStateHandler = this.onChangeStateHandler.bind(this);
    this.onChangeCountryHandler = this.onChangeCountryHandler.bind(this);
    this.onSignUpSubmit = this.onSignUpSubmit.bind(this);
  }

  // both company name and student name change will call this handler
  onChangeNameHandler(e) {
    // console.log(e.target);
    this.setState({
      name: e.target.value,
    });
  }

  onChangeUserNameHandler(e) {
    this.setState({
      emailId: e.target.value,
    });
  }

  onChangePasswordHandler(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeUserHandler(e) {
    this.setState({
      user: e.value,
    });
  }

  onChangeCollegeNameHandler(e) {
    this.setState({
      collegeName: e.target.value,
    });
  }

  onChangeCityHandler(e) {
    this.setState({
      city: e.target.value,
    });
  }

  onChangeStateHandler(e) {
    this.setState({
      cstate: e.target.value,
    });
  }

  onChangeCountryHandler(e) {
    this.setState({
      country: e.target.value,
    });
  }

  onSignUpSubmit(e) {
    e.preventDefault();
    const data = {
      emailId: this.state.emailId.toLowerCase(),
      password: this.state.password,
      user: this.state.user,
      name: this.state.name,
    };
    if (this.state.user === 'student') {
      data.collegeName = this.state.collegeName;
    } else {
      data.city = this.state.city;
      data.state = this.state.cstate;
      data.country = this.state.country;
    }


    axios.defaults.withCredentials = true;
    axios.post(`${serverIp}:${serverPort}/signup`, data)
      .then((response) => {
        console.log('SignUp Response Data');
        console.log(response.data);
        if (response.data === 'Exists') {
          window.alert('User already exists in the database. Try another username');
        } else if (response.data === 'Error') {
          window.alert('Error while querying the Database');
        } else {
          window.alert('Successfully Registered');
          window.location.href = '/';
        }
      }).catch((err) => {
        console.log(`In catch of axios post call to signup api ${err}`);
        window.alert('Error in SignUp API axios Post call');
      });
  }

  render() {
    if (localStorage.getItem('userRole') === 'company') {
      window.location.href = '/listPostings';
    } else if (localStorage.getItem('userRole') === 'student') {
      window.location.href = '/viewPostedJobs';
    }
    let differentDiv = (
      <div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="city"
            placeholder="City"
            pattern="^[a-zA-Z0-9]+([ .]{1}[a-zA-Z0-9]+)*$"
            title="It can only contain letters, digits, single space character and period. It must start with alphanumeric characters only."
            onChange={this.onChangeCityHandler}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="state"
            placeholder="State"
            pattern="^[a-zA-Z0-9]+([ .]{1}[a-zA-Z0-9]+)*$"
            title="It can only contain letters, digits, single space character and period. It must start with alphanumeric characters only."
            onChange={this.onChangeStateHandler}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="country"
            placeholder="Country"
            pattern="^[a-zA-Z0-9]+([ .]{1}[a-zA-Z0-9]+)*$"
            title="It can only contain letters, digits, single space character and period. It must start with alphanumeric characters only."
            onChange={this.onChangeCountryHandler}
            required
          />
        </div>
      </div>
    );

    if (this.state.user === 'student') {
      differentDiv = (
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="collegeName"
            placeholder="College Name"
            pattern="^[a-zA-Z0-9]+([ .]{1}[a-zA-Z0-9]+)*$"
            title="It can only contain letters, digits, single space character and period. It must start with alphanumeric characters only."
            onChange={this.onChangeCollegeNameHandler}
            required
          />
        </div>
      );
    }
    return (
      <div className="container">
        <div className="login-form">
          <div className="main-div">
            <div className="panel">
              <h2>Handshake SignUp</h2>
            </div>
            <form onSubmit={this.onSignUpSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  name="username"
                  placeholder={this.state.user === 'student' ? 'Student Username' : 'Company Username'}
                  onChange={this.onChangeUserNameHandler}
                  required
                  autoFocus
                  autoComplete="true"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  pattern=".{6,}"
                  title="Minimum 6 Characters Required"
                  onChange={this.onChangePasswordHandler}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="studentCompanyName"
                  placeholder={this.state.user === 'student' ? 'Student Name' : 'Company Name'}
                  pattern="^[a-zA-Z0-9]+([ .,]{*}[a-zA-Z0-9]+)*$"
                  title="It can only contain letters, digits, single space character, comma and period. It must start with alphanumeric characters only."
                  onChange={this.onChangeNameHandler}
                  required
                />
              </div>
              {differentDiv}
              <div className="form-group">
                <Dropdown
                  options={this.state.userOptions}
                  onChange={this.onChangeUserHandler}
                  value={this.state.user}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Sign Up</button>
              <br />
              <br />
              <br />
              <div>
                <a href="/">Go Back to Login</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
