import React from 'react';
import axios from 'axios';
import {
  Col, Button, FormGroup, Label, Input, FormText,
} from 'reactstrap';
import DatePicker from 'react-datepicker';
import { serverIp, serverPort } from '../../../config';
import CustomNavBar from '../../NavBar/CustomNavBar';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentName: localStorage.getItem('student_name'),
      collegeName: localStorage.getItem('college_name'),
      city: localStorage.getItem('city'),
      cstate: localStorage.getItem('state'),
      country: localStorage.getItem('country'),
      contactPhone: localStorage.getItem('contact_phone'),
      contact_email: localStorage.getItem('contact_email'),
      careerObjective: localStorage.getItem('career_objective'),
      // dateOfBirth: new Date(localStorage.getItem('date_of_birth').split('/')[0],localStorage.getItem('date_of_birth').split('/')[1],localStorage.getItem('date_of_birth').split('/')[2]),
      dateOfBirth: new Date(),
      selectedFile: null,
    };

    if (localStorage.getItem('date_of_birth') !== '') {
      this.state.dateOfBirth = new Date(localStorage.getItem('date_of_birth').split('/')[0], parseInt(localStorage.getItem('date_of_birth').split('/')[1]) - 1, localStorage.getItem('date_of_birth').split('/')[2]);
    }

    this.editProfileHandlerSubmit = this.editProfileHandlerSubmit.bind(this);
    this.studentNameChangeHandler = this.studentNameChangeHandler.bind(this);
    this.collegeNameChangeHandler = this.collegeNameChangeHandler.bind(this);
    this.cityChangeHandler = this.cityChangeHandler.bind(this);
    this.stateChangeHandler = this.stateChangeHandler.bind(this);
    this.countryChangeHandler = this.countryChangeHandler.bind(this);
    this.careerObjectiveChangeHandler = this.careerObjectiveChangeHandler.bind(this);
    this.dateOfBirthChangeHandler = this.dateOfBirthChangeHandler.bind(this);
    this.contactPhoneChangeHandler = this.contactPhoneChangeHandler.bind(this);
    this.contactEmailChangeHandler = this.contactEmailChangeHandler.bind(this);
    this.profileFileUploadHandler = this.profileFileUploadHandler.bind(this);
  }

  studentNameChangeHandler(e) {
    this.setState({
      studentName: e.target.value,
    });
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

  careerObjectiveChangeHandler(e) {
    this.setState({
      careerObjective: e.target.value,
    });
  }

  contactPhoneChangeHandler(e) {
    this.setState({
      contactPhone: e.target.value,
    });
  }

  contactEmailChangeHandler(e) {
    this.setState({
      contact_email: e.target.value,
    });
  }

  profileFileUploadHandler(e) {
    this.setState({
      selectedFile: e.target.files[0],
    }, () => {
      console.log(this.state.selectedFile);
    });
  }

  dateOfBirthChangeHandler(date) {
    this.setState({
      dateOfBirth: date,
    });
  }

  editProfileHandlerSubmit(e) {
    e.preventDefault();
    if (this.state.studentName === '' || this.state.collegeName === '' || this.state.city === '' || this.state.cstate === '' || this.state.country === '' || this.state.careerObjective === '' || this.state.contact_email === '' || this.state.contactPhone === '' || this.state.dateOfBirth === '') {
      window.alert('Please enter all fields');
    } else {
      const fd = new FormData();
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      fd.append('student_id', localStorage.getItem('student_id'));
      fd.append('studentName', this.state.studentName);
      fd.append('collegeName', this.state.collegeName);
      fd.append('city', this.state.city);
      fd.append('cstate', this.state.cstate);
      fd.append('country', this.state.country);
      fd.append('careerObjective', this.state.careerObjective);
      fd.append('contactPhone', this.state.contactPhone);
      fd.append('contact_email', this.state.contact_email);
      fd.append('dateOfBirth', `${this.state.dateOfBirth.getFullYear()}/${this.state.dateOfBirth.getMonth() + 1}/${this.state.dateOfBirth.getDate()}`);
      fd.append('file', this.state.selectedFile);
      axios.post(`${serverIp}:${serverPort}/updateStudentProfile`, fd, config)
        .then((response) => {
          console.log('updateStudentProfile Response Data');
          console.log(response.data);
          if (response.data === 'Error') {
            window.alert('Error in Connecting to Database while updating company details');
          } else {
            window.alert('Profile Updated Successfully');
            axios.post(`${serverIp}:${serverPort}/getStudentDetails`, { studentId: localStorage.getItem('student_id') })
              .then((resp) => {
                if (resp === 'Error') {
                  window.alert('Error in Connecting to Database while getting Student Details');
                } else {
                  console.log(resp.data);
                  localStorage.setItem('city', resp.data.city);
                  localStorage.setItem('state', resp.data.state);
                  localStorage.setItem('country', resp.data.country);
                  localStorage.setItem('contact_phone', resp.data.contact_phone);
                  localStorage.setItem('contact_email', resp.data.contact_email);
                  localStorage.setItem('profile_picture_url', resp.data.profile_picture_url);
                  localStorage.setItem('college_name', resp.data.college_name);
                  localStorage.setItem('student_name', resp.data.student_name);
                  localStorage.setItem('career_objective', resp.data.career_objective);
                  localStorage.setItem('date_of_birth', resp.data.date_of_birth);
                  window.location.href = '/studentProfile';
                }
              }).catch((error) => {
                console.log(`In catch of axios post call to getStudentDetails  api ${error}`);
                window.alert('Error in Profile component of Student while Getting student Details axios Post call');
              });
          }
        }).catch((err) => {
          console.log(`In catch of axios post call to updateStudentProfile  api ${err}`);
          window.alert('Error in Profile component of Student axios Post call');
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
          <form onSubmit={this.editProfileHandlerSubmit}>
            <FormGroup row>
              <Label for="profilePicture" sm={2}>Profile Picture</Label>
              <Col sm={10}>
                <Input type="file" name="profilePicture" id="profilePicture" accept="image/*" onChange={this.profileFileUploadHandler} />
                <FormText color="muted">
                  Upload new Profile Picture. Leave it to keep the previous one.
                </FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="studentName" sm={2}>Student Name</Label>
              <Col sm={3}>
                <Input type="text" name="studentName" id="studentName" value={this.state.studentName} onChange={this.studentNameChangeHandler} required />
              </Col>
              <Label for="collegeName" sm={2}>College Name</Label>
              <Col sm={3}>
                <Input type="text" name="collegeName" id="collegeName" value={this.state.collegeName} onChange={this.collegeNameChangeHandler} required />
              </Col>
            </FormGroup>
            <br />
            <FormGroup row>
              <Label for="contactEmail" sm={1}>Contact Email</Label>
              <Col sm={2}>
                <Input type="email" name="contactEmail" id="contactEmail" value={this.state.contact_email} onChange={this.contactEmailChangeHandler} required />
              </Col>
              <Label for="contactPhone" sm={1}>Contact Phone</Label>
              <Col sm={2}>
                <Input type="number" name="contactNumber" id="contactNumber" value={this.state.contactPhone} onChange={this.contactPhoneChangeHandler} required />
              </Col>
              <Label for="dateOfBirth" sm={1}>Date of Birth</Label>
              <Col sm={2}>
                <DatePicker
                  className="form-control"
                  selected={this.state.dateOfBirth}
                  onChange={this.dateOfBirthChangeHandler}
                  required
                />
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
              <Label for="careerObjective" sm={2}>Career Objective</Label>
              <Col sm={8}>
                <Input type="textarea" name="text" id="careerObjective" rows="7" onChange={this.careerObjectiveChangeHandler} value={this.state.careerObjective} required />
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 4, offset: 5 }}>
                <Button style={{ width: 150, height: 50 }}>Update</Button>
              </Col>
            </FormGroup>
          </form>
        </div>
      </div>
    );
  }
}

export default Profile;
