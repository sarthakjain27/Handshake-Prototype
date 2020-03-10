import React from 'react';
import './Login.css';
import axios from 'axios';
import Dropdown from 'react-dropdown';
import { serverIp, serverPort } from '../../config';
import '../../../node_modules/react-dropdown/style.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: '',
      password: '',
      user: '',
      userOptions: ['student', 'company'],
    };
    this.onChangeUserNameHandler = this.onChangeUserNameHandler.bind(this);
    this.onChangePasswordHandler = this.onChangePasswordHandler.bind(this);
    this.onChangeUserHandler = this.onChangeUserHandler.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
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

  onLoginSubmit(e) {
    e.preventDefault();
    if (this.state.user === '') {
      window.alert('Please select a User Role from Dropdown');
    } else {
      const data = {
        emailId: this.state.emailId.toLowerCase(),
        password: this.state.password,
        user: this.state.user,
      };

      axios.defaults.withCredentials = true;
      axios.post(`${serverIp}:${serverPort}/login`, data)
        .then((response) => {
          console.log('Login Response Data');
          console.log(response.data);
          if (response.data === 'User Not Present') {
            window.alert('Given username not present.');
          } else if (response.data === 'Wrong Password') {
            window.alert('Wrong Password given');
          } else if (response.data === 'Error') {
            window.alert('Error in Connecting to Database');
          } else if (response.data === 'Wrong UserRole Given') {
            window.alert('Wrong User Role given from dropdown');
          } else {
            localStorage.setItem('email_id', response.data.email_id);
            localStorage.setItem('city', response.data.city);
            localStorage.setItem('state', response.data.state);
            localStorage.setItem('country', response.data.country);
            localStorage.setItem('contact_phone', response.data.contact_phone);
            localStorage.setItem('contact_email', response.data.contact_email);
            localStorage.setItem('userRole', this.state.user);
            localStorage.setItem('profile_picture_url', response.data.profile_picture_url);
            if (this.state.user === 'company') {
              localStorage.setItem('company_name', response.data.company_name);
              localStorage.setItem('description', response.data.description);
              localStorage.setItem('company_id', response.data.company_id);
              window.location.href = '/listPostings';
            } else {
              localStorage.setItem('student_name', response.data.student_name);
              localStorage.setItem('college_name', response.data.college_name);
              localStorage.setItem('date_of_birth', response.data.date_of_birth);
              localStorage.setItem('career_objective', response.data.career_objective);
              localStorage.setItem('student_id', response.data.student_id);
              window.location.href = '/viewPostedJobs';
            }
          }
        }).catch((err) => {
          console.log(`In catch of axios post call to login api ${err}`);
          window.alert('Error in Login API axios Post call');
        });
    }
  }

  render() {
    if (localStorage.getItem('userRole') === 'company') {
      window.location.href = '/listPostings';
    } else if (localStorage.getItem('userRole') === 'student') {
      window.location.href = '/viewPostedJobs';
    }
    return (
      <div className="container">
        <div className="login-form">
          <div className="main-div">
            <div className="panel">
              <h2>Handshake Login</h2>
              <p>Please enter your username and password</p>
            </div>
            <form onSubmit={this.onLoginSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  name="username"
                  placeholder="Username"
                  onChange={this.onChangeUserNameHandler}
                  required
                  autoFocus
                  autoComplete
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
                <Dropdown
                  options={this.state.userOptions}
                  onChange={this.onChangeUserHandler}
                  value={this.state.user}
                  placeholder="You are a"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Login</button>
              <br />
              <br />
              <br />
              <div>
                Dont have an account ?
                {' '}
                <a href="/signup">Create One</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
