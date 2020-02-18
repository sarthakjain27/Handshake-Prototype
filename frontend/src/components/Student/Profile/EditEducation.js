import React from 'react';
import CustomNavBar from '../../NavBar/CustomNavBar';
import axios from 'axios';
import {serverIp, serverPort} from '../../../config';
import {Row, Col, Button, Form, FormGroup, Label, Input, Media, FormText} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class EditEducation extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      collegeName: sessionStorage.getItem('college_name'),
      city: sessionStorage.getItem('city'),
      cstate: sessionStorage.getItem('state'),
      country: sessionStorage.getItem('country'),
      degree: sessionStorage.getItem('degree'),
      major: sessionStorage.getItem('major'),
      yearOfPassing: sessionStorage.getItem('year_of_passing'),
      cgpa: sessionStorage.getItem('cgpa'),
      studentId: sessionStorage.getItem('student_id'),
      educationId: sessionStorage.getItem('education_id')
    }
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

  collegeNameChangeHandler = e => {
    this.setState({
      collegeName:e.target.value
    })
  }

  cityChangeHandler = e => {
    this.setState({
      city:e.target.value
    })
  }

  stateChangeHandler = e => {
    this.setState({
      cstate:e.target.value
    })
  }

  countryChangeHandler = e => {
    this.setState({
      country:e.target.value
    })
  }

  degreeChangeHandler = e => {
    this.setState({
      degree:e.target.value
    })
  }

  majorChangeHandler = e => {
    this.setState({
      major:e.target.value
    })
  }

  yearOfPassingChangeHandler = e => {
    this.setState({
      yearOfPassing:e.target.value
    })
  }

  cgpaChangeHandler = e => {
    this.setState({
      cgpa:e.target.value
    })
  }

  submitChangeHandler = e => {
    e.preventDefault();
    if(this.state.collegeName === '' || this.state.city === '' || this.state.cstate === '' || this.state.country === '' || this.state.degree === '' || this.state.major === '' || this.state.yearOfPassing === '' || this.state.cgpa === ''){
      window.alert('Please enter all fields');
    } else {
      const data = {
        collegeName:this.state.collegeName,
        city:this.state.city,
        cstate:this.state.cstate,
        country:this.state.country,
        degree:this.state.degree,
        major:this.state.major,
        yearOfPassing:this.state.yearOfPassing,
        cgpa:this.state.cgpa,
        educationId:this.state.educationId
      }
      axios.post(serverIp+':'+serverPort+'/updateEducation',data)
      .then(response => {
        console.log('updateEducation Response Data');
        console.log(response.data);
        if (response.data === 'Error') {
          window.alert('Error in Connecting to Database while updating education details');
        } else {
          window.alert('Education Updated Successfully');
          sessionStorage.clear();
          window.location.href = '/studentProfile';
        }
      }).catch(err => {
        console.log(`In catch of axios post call to updateEducation  api ${err}`);
        window.alert('Error in EditEducation component of Student axios Post call');
      })
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
        <br/>
        <div>
          <Form onSubmit={this.submitChangeHandler}>
            <FormGroup row>
              <Label for="collegeName" sm={2}>College Name</Label>
              <Col sm={7}>
                <Input type="text" name="collegeName" id="collegeName" value={this.state.collegeName} onChange={this.collegeNameChangeHandler}/>
              </Col>
            </FormGroup>
            <br/>
            <FormGroup row>
              <Label for="city" sm={1}>City</Label>
              <Col sm={2}>
                <Input type="text" name="city" id="city" value={this.state.city} onChange={this.cityChangeHandler}/>
              </Col>
              <Label for="state" sm={1}>State</Label>
              <Col sm={2}>
                <Input type="text" name="state" id="state" value={this.state.cstate} onChange={this.stateChangeHandler}/>
              </Col>
              <Label for="country" sm={1}>Country</Label>
              <Col sm={2}>
                <Input type="text" name="country" id="country" value={this.state.country} onChange={this.countryChangeHandler}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="degree" sm={2}>Degree</Label>
              <Col sm={3}>
                <Input type="text" name="degree" id="degree" value={this.state.degree} onChange={this.degreeChangeHandler}/>
              </Col>
              <Label for="major" sm={2}>Major</Label>
              <Col sm={4}>
                <Input type="text" name="major" id="major" value={this.state.major} onChange={this.majorChangeHandler}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="yearOfPassing" sm={2}>Year Of Passing</Label>
              <Col sm={3}>
                <Input type="text" name="yearOfPassing" id="yearOfPassing" value={this.state.yearOfPassing} onChange={this.yearOfPassingChangeHandler}/>
              </Col>
              <Label for="cgpa" sm={2}>CGPA</Label>
              <Col sm={3}>
                <Input type="text" name="cgpa" id="cgpa" value={this.state.cgpa} onChange={this.cgpaChangeHandler}/>
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col sm={{ size: 4, offset:5 }}>
                <Button style={{width:150,height:50}}>Update</Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

export default EditEducation;