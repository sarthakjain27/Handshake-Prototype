import React from 'react';
import axios from 'axios';
import {
  Col, Button, FormGroup, Label, Input,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import { serverIp, serverPort } from '../../../config';
import CustomNavBar from '../../NavBar/CustomNavBar';

class EditEducation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: sessionStorage.getItem('company_name'),
      title: sessionStorage.getItem('title'),
      city: sessionStorage.getItem('city'),
      cstate: sessionStorage.getItem('state'),
      country: sessionStorage.getItem('country'),
      startDate: new Date(sessionStorage.getItem('start_date').split('/')[0], parseInt(sessionStorage.getItem('start_date').split('/')[1]) - 1, sessionStorage.getItem('start_date').split('/')[2]),
      endDate: new Date(sessionStorage.getItem('end_date').split('/')[0], parseInt(sessionStorage.getItem('end_date').split('/')[1]) - 1, sessionStorage.getItem('end_date').split('/')[2]),
      description: sessionStorage.getItem('work_description'),
      experienceId: sessionStorage.getItem('experience_id'),
    };
    this.companyNameChangeHandler = this.companyNameChangeHandler.bind(this);
    this.titleChangeHandler = this.titleChangeHandler.bind(this);
    this.cityChangeHandler = this.cityChangeHandler.bind(this);
    this.stateChangeHandler = this.stateChangeHandler.bind(this);
    this.countryChangeHandler = this.countryChangeHandler.bind(this);
    this.startDateChangeHandler = this.startDateChangeHandler.bind(this);
    this.endDateChangeHandler = this.endDateChangeHandler.bind(this);
    this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this);
    this.submitChangeHandler = this.submitChangeHandler.bind(this);
  }

  companyNameChangeHandler(e) {
    this.setState({
      companyName: e.target.value,
    });
  }

  titleChangeHandler(e) {
    this.setState({
      title: e.target.value,
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

  startDateChangeHandler(e) {
    this.setState({
      startDate: e,
    });
  }

  endDateChangeHandler(e) {
    this.setState({
      endDate: e,
    });
  }

  descriptionChangeHandler(e) {
    this.setState({
      description: e.target.value,
    });
  }

  submitChangeHandler(e) {
    e.preventDefault();
    // endDate = '' for present job
    if (this.state.companyName === '' || this.state.title === '' || this.state.city === '' || this.state.cstate === '' || this.state.country === '' || this.state.description === '' || this.state.startDate === '') {
      window.alert('Please enter all fields');
    } else {
      const data = {
        companyName: this.state.companyName,
        title: this.state.title,
        city: this.state.city,
        cstate: this.state.cstate,
        country: this.state.country,
        description: this.state.description,
        startDate: `${this.state.startDate.getFullYear()}/${this.state.startDate.getMonth() + 1}/${this.state.startDate.getDate()}`,
        experienceId: this.state.experienceId,
      };
      if (this.state.endDate === '') {
        data.endDate = '';
      } else {
        data.endDate = `${this.state.endDate.getFullYear()}/${this.state.endDate.getMonth() + 1}/${this.state.endDate.getDate()}`;
      }
      axios.post(`${serverIp}:${serverPort}/updateProfessionalExperience`, data)
        .then((response) => {
          console.log('updateProfessionalExperience Response Data');
          console.log(response.data);
          if (response.data === 'Error') {
            window.alert('Error in Connecting to Database while updating experience details');
          } else {
            window.alert('Experience Updated Successfully');
            sessionStorage.clear();
            window.location.href = '/studentProfile';
          }
        }).catch((err) => {
          console.log(`In catch of axios post call to updateProfessionalExperience  api ${err}`);
          window.alert('Error in EditExperience component of Student axios Post call');
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
              <Label for="companyName" sm={2}>Company Name</Label>
              <Col sm={5}>
                <Input type="text" name="companyName" id="companyName" value={this.state.companyName} onChange={this.companyNameChangeHandler} required />
              </Col>
              <Label for="title" sm={1}>Title</Label>
              <Col sm={3}>
                <Input type="text" name="title" id="title" value={this.state.title} onChange={this.titleChangeHandler} required />
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
              <Label for="startDate" sm={1}>Start Date</Label>
              <Col sm={2}>
                <DatePicker
                  className="form-control"
                  selected={this.state.startDate}
                  onChange={this.startDateChangeHandler}
                  required
                />
              </Col>
              <Label for="endDate" sm={1}>End Date</Label>
              <Col sm={2}>
                <DatePicker
                  className="form-control"
                  selected={this.state.endDate}
                  onChange={this.endDateChangeHandler}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleText" sm={2}>Work Description</Label>
              <Col sm={8}>
                <Input type="textarea" name="text" id="exampleText" rows="7" onChange={this.descriptionChangeHandler} value={this.state.description} required />
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

export default EditEducation;
