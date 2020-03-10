import React from 'react';
import axios from 'axios';
import {
  Col, Button, FormGroup, Label, Input,
} from 'reactstrap';
import Select from 'react-select';
import { serverIp, serverPort } from '../../../config';
import CustomNavBar from '../../NavBar/CustomNavBar';
import 'bootstrap/dist/css/bootstrap.min.css';


class AddEducation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collegeName: '',
      city: '',
      cstate: '',
      country: '',
      degree: '',
      major: '',
      yearOfPassing: '',
      cgpa: '',
      studentId: localStorage.getItem('student_id'),
      allMajors: [{ label: 'Computer Science', value: 'Computer Science' },
        { label: 'Computer Engineering', value: 'Computer Engineering' },
        { label: 'Software Engineering', value: 'Software Engineering' },
        { label: 'Electrical Engineering', value: 'Electrical Engineering' },
        { label: 'Electronics Engineering', value: 'Electronics Engineering' },
        { label: 'Data Science', value: 'Data Science' },
        { label: 'Mechanical Engineering', value: 'Mechanical Engineering' },
        { label: 'Chemical Engineering', value: 'Chemical Engineering' },
        { label: 'Metallurgy Engineering', value: 'Metallurgy Engineering' },
        { label: 'Civil Engineering', value: 'Civil Engineering' }],
    };
    this.collegeNameChangeHandler = this.collegeNameChangeHandler.bind(this);
    this.cityChangeHandler = this.cityChangeHandler.bind(this);
    this.stateChangeHandler = this.stateChangeHandler.bind(this);
    this.countryChangeHandler = this.countryChangeHandler.bind(this);
    this.degreeChangeHandler = this.degreeChangeHandler.bind(this);
    this.majorChangeHandler = this.majorChangeHandler.bind(this);
    this.yearOfPassingChangeHandler = this.yearOfPassingChangeHandler.bind(this);
    this.cgpaChangeHandler = this.cgpaChangeHandler.bind(this);
    this.submitChangeHandler = this.submitChangeHandler.bind(this);
  }

  collegeNameChangeHandler(e) {
    this.setState({
      collegeName: e.target.value,
    });
  }

  cityChangeHandler(e) {
    this.setState({
      city: e.target.value,
    });
  }

  stateChangeHandler(e) {
    this.setState({
      cstate: e.target.value,
    });
  }

  countryChangeHandler(e) {
    this.setState({
      country: e.target.value,
    });
  }

  degreeChangeHandler(e) {
    this.setState({
      degree: e.target.value,
    });
  }

  majorChangeHandler(e) {
    this.setState({
      major: e,
    }, () => {
      console.log(`Selected Major: ${this.state.major.value}`);
      console.log(e);
    });
  }

  yearOfPassingChangeHandler(e) {
    this.setState({
      yearOfPassing: e.target.value,
    });
  }

  cgpaChangeHandler(e) {
    this.setState({
      cgpa: e.target.value,
    });
  }

  submitChangeHandler(e) {
    e.preventDefault();
    if (this.state.collegeName === '' || this.state.city === '' || this.state.cstate === '' || this.state.country === '' || this.state.degree === '' || this.state.major === '' || this.state.yearOfPassing === '' || this.state.cgpa === '') {
      window.alert('Please enter all fields');
    } else {
      const data = {
        collegeName: this.state.collegeName,
        city: this.state.city,
        cstate: this.state.cstate,
        country: this.state.country,
        degree: this.state.degree,
        major: this.state.major.value,
        yearOfPassing: this.state.yearOfPassing,
        cgpa: this.state.cgpa,
        studentId: this.state.studentId,
      };
      axios.post(`${serverIp}:${serverPort}/createEducation`, data)
        .then((response) => {
          console.log('createEducation Response Data');
          console.log(response.data);
          if (response.data === 'Error') {
            window.alert('Error in Connecting to Database while creating education details');
          } else {
            window.alert('Education Created Successfully');
            window.location.href = '/studentProfile';
          }
        }).catch((err) => {
          console.log(`In catch of axios post call to createEducation  api ${err}`);
          window.alert('Error in AddEducation component of Student axios Post call');
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
        <br />
        <div>
          <form onSubmit={this.submitChangeHandler}>
            <FormGroup row>
              <Label for="collegeName" sm={2}>College Name</Label>
              <Col sm={7}>
                <Input type="text" name="collegeName" id="collegeName" value={this.state.collegeName} onChange={this.collegeNameChangeHandler} required />
              </Col>
            </FormGroup>
            <br />
            <FormGroup row>
              <Label for="city" sm={1}>City</Label>
              <Col sm={2}>
                <Input type="text" name="city" id="city" value={this.state.city} onChange={this.cityChangeHandler} required />
              </Col>
              <Label for="state" sm={1}>State</Label>
              <Col sm={2}>
                <Input type="text" name="state" id="state" value={this.state.cstate} onChange={this.stateChangeHandler} required />
              </Col>
              <Label for="country" sm={1}>Country</Label>
              <Col sm={2}>
                <Input type="text" name="country" id="country" value={this.state.country} onChange={this.countryChangeHandler} required />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="degree" sm={2}>Degree</Label>
              <Col sm={3}>
                <Input type="text" name="degree" id="degree" value={this.state.degree} onChange={this.degreeChangeHandler} required />
              </Col>
              <Label for="major" sm={2}>Major</Label>
              <Col sm={4}>
                <Select
                  onChange={this.majorChangeHandler}
                  options={this.state.allMajors}
                  value={this.state.major}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="yearOfPassing" sm={2}>Year Of Passing</Label>
              <Col sm={3}>
                <Input type="text" name="yearOfPassing" id="yearOfPassing" value={this.state.yearOfPassing} onChange={this.yearOfPassingChangeHandler} required />
              </Col>
              <Label for="cgpa" sm={2}>CGPA</Label>
              <Col sm={3}>
                <Input type="text" name="cgpa" id="cgpa" value={this.state.cgpa} onChange={this.cgpaChangeHandler} required />
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 4, offset: 5 }}>
                <Button style={{ width: 150, height: 50 }}>Create</Button>
              </Col>
            </FormGroup>
          </form>
        </div>
      </div>
    );
  }
}

export default AddEducation;
