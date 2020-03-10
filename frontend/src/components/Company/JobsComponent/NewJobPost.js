import React from 'react';

import './NewJobPost.css';
import DatePicker from 'react-datepicker';
import Dropdown from 'react-dropdown';
import axios from 'axios';
import {
  Col, FormGroup, Label,
} from 'reactstrap';
import CustomNavBar from '../../NavBar/CustomNavBar';
import { serverIp, serverPort } from '../../../config';
import '../../../../node_modules/react-datepicker/dist/react-datepicker.css';
import '../../../../node_modules/react-dropdown/style.css';

class NewJobPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      postingDate: new Date(),
      deadline: new Date(),
      city: '',
      cstate: '',
      country: '',
      salary: '',
      description: '',
      category: '',
      categoryOptions: ['full time', 'part time', 'intern', 'on campus'],
    };
    this.onChangeTitleHandler = this.onChangeTitleHandler.bind(this);
    this.onChangePostingDateHandler = this.onChangePostingDateHandler.bind(this);
    this.onChangeDeadlineHandler = this.onChangeDeadlineHandler.bind(this);
    this.onChangeCityHandler = this.onChangeCityHandler.bind(this);
    this.onChangeStateHandler = this.onChangeStateHandler.bind(this);
    this.onChangeCountryHandler = this.onChangeCountryHandler.bind(this);
    this.onChangeSalaryHandler = this.onChangeSalaryHandler.bind(this);
    this.onChangeDescriptionHandler = this.onChangeDescriptionHandler.bind(this);
    this.onChangeCategoryHandler = this.onChangeCategoryHandler.bind(this);
    this.onPostSubmit = this.onPostSubmit.bind(this);
  }

  onChangeTitleHandler(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangePostingDateHandler(date) {
    this.setState({
      postingDate: date,
    });
  }

  onChangeDeadlineHandler(date) {
    this.setState({
      deadline: date,
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

  onChangeSalaryHandler(e) {
    this.setState({
      salary: e.target.value,
    });
  }

  onChangeDescriptionHandler(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeCategoryHandler(e) {
    this.setState({
      category: e.value,
    });
  }

  onPostSubmit(e) {
    e.preventDefault();
    if (this.state.title === '' || this.state.city === '' || this.state.cstate === '' || this.state.country === '' || this.state.salary === '' || this.state.description === '' || this.state.category === '') {
      window.alert('Please enter all fields');
    } else {
      const data = {
        title: this.state.title,
        postingDate: `${this.state.postingDate.getMonth() + 1}/${this.state.postingDate.getDate()}/${this.state.postingDate.getFullYear()}`,
        deadline: `${this.state.deadline.getMonth() + 1}/${this.state.deadline.getDate()}/${this.state.deadline.getFullYear()}`,
        city: this.state.city,
        cstate: this.state.cstate,
        country: this.state.country,
        salary: this.state.salary,
        description: this.state.description,
        category: this.state.category,
        companyId: localStorage.getItem('company_id'),
      };
      console.log(data);
      axios.defaults.withCredentials = true;
      axios.post(`${serverIp}:${serverPort}/createJobPost`, data)
        .then((response) => {
          console.log('NewJobPost Response Data');
          console.log(response.data);
          if (response.data === 'Error') {
            window.alert('Error in Connecting to Database');
          } else {
            window.alert('Job Posted Successfully');
            window.location.href = '/listPostings';
          }
        }).catch((err) => {
          console.log(`In catch of axios post call to createJobPost  api ${err}`);
          window.alert('Error in NewJobPost component axios Post call');
        });
    }
  }

  render() {
    if (!localStorage.getItem('userRole')) {
      window.location.href = '/';
    }
    return (
      <div>
        <div>
          <CustomNavBar />
        </div>
        <div className="container">
          <div>
            <div className="main-div-createJobPost-NewJobPost">
              <div className="login-form">
                <h2>Job Details</h2>
              </div>
              <form onSubmit={this.onPostSubmit}>
                <FormGroup row>
                  <Col sm={12}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="jobTitle"
                        placeholder="Job Title"
                        pattern="^[a-zA-Z0-9]+([ .]{1}[a-zA-Z0-9]+)*$"
                        title="Book Title can only contain letters, digits and single space character. It must start with alphanumeric characters only."
                        onChange={this.onChangeTitleHandler}
                        required
                        autoFocus
                      />
                    </div>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={2}>Posting Date: </Label>
                  <Col sm={4}>
                    <div className="form-group">
                      <DatePicker
                        className="form-control"
                        selected={this.state.postingDate}
                        onChange={this.onChangePostingDateHandler}
                        required
                      />
                    </div>
                  </Col>
                  <Label sm={2}>Deadline Date: </Label>
                  <Col sm={4}>
                    <div className="form-group">
                      <DatePicker
                        className="form-control"
                        selected={this.state.deadline}
                        onChange={this.onChangeDeadlineHandler}
                        required
                      />
                    </div>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm={4}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        placeholder="Job City"
                        pattern="^[a-zA-Z]+([ .]{1}[a-zA-Z]+)*$"
                        title="It can only contain letters, single space character and period. It must start with letter only."
                        onChange={this.onChangeCityHandler}
                        required
                      />
                    </div>
                  </Col>
                  <Col sm={4}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        placeholder="Job State"
                        pattern="^[a-zA-Z]+([ .]{1}[a-zA-Z]+)*$"
                        title="It can only contain letters, single space character and period. It must start with letter only."
                        onChange={this.onChangeStateHandler}
                        required
                      />
                    </div>
                  </Col>
                  <Col sm={4}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="country"
                        placeholder="Job Country"
                        pattern="^[a-zA-Z]+([ .]{1}[a-zA-Z]+)*$"
                        title="It can only contain letters, single space character and period. It must start with letter only."
                        onChange={this.onChangeCountryHandler}
                        required
                      />
                    </div>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col sm={5}>
                    <div className="form-group">
                      <input
                        type="number"
                        className="form-control"
                        name="salary"
                        placeholder="Annual Salary in USD"
                        title="Please enter only digits."
                        onChange={this.onChangeSalaryHandler}
                        required
                      />
                    </div>
                  </Col>
                  <Col sm={1} />
                  <Col sm={6}>
                    <div className="form-group">
                      <Dropdown
                        options={this.state.categoryOptions}
                        onChange={this.onChangeCategoryHandler}
                        value={this.state.category}
                        placeholder="Job Category"
                        required
                      />
                    </div>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={2}>Job description: </Label>
                  <Col sm={8}>
                    <textarea
                      rows="8"
                      cols="80"

                      name="jobDescription"
                      placeholder="Job Description"
                      onChange={this.onChangeDescriptionHandler}
                      required
                    />
                  </Col>
                </FormGroup>

                <FormGroup check row>
                  <Col sm={{ offset: 5 }}>
                    <button type="submit" className="btn btn-primary">Post Job Opening</button>
                  </Col>
                </FormGroup>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewJobPost;
