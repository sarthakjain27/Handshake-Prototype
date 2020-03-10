import React from 'react';
import axios from 'axios';
import {
  Col, Button, FormGroup, Label, Input, FormText,
} from 'reactstrap';
import { serverIp, serverPort } from '../../../config';
import CustomNavBar from '../../NavBar/CustomNavBar';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company_name: localStorage.getItem('company_name'),
      city: localStorage.getItem('city'),
      cstate: localStorage.getItem('state'),
      country: localStorage.getItem('country'),
      description: localStorage.getItem('description'),
      contact_phone: localStorage.getItem('contact_phone'),
      contact_email: localStorage.getItem('contact_email'),
      selectedFile: null,
    };
    this.editProfileHandlerSubmit = this.editProfileHandlerSubmit.bind(this);
    this.companyNameChangeHandler = this.companyNameChangeHandler.bind(this);
    this.cityChangeHandler = this.cityChangeHandler.bind(this);
    this.stateChangeHandler = this.stateChangeHandler.bind(this);
    this.countryChangeHandler = this.countryChangeHandler.bind(this);
    this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this);
    this.contactPhoneChangeHandler = this.contactPhoneChangeHandler.bind(this);
    this.contactEmailChangeHandler = this.contactEmailChangeHandler.bind(this);
    this.profileFileUploadHandler = this.profileFileUploadHandler.bind(this);
  }

  companyNameChangeHandler(e) {
    this.setState({
      company_name: e.target.value,
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

  descriptionChangeHandler(e) {
    this.setState({
      description: e.target.value,
    });
  }

  contactPhoneChangeHandler(e) {
    this.setState({
      contact_phone: e.target.value,
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

  editProfileHandlerSubmit(e) {
    e.preventDefault();
    if (this.state.company_name === '' || this.state.city === '' || this.state.cstate === '' || this.state.country === '' || this.state.description === '' || this.state.contact_email === '' || this.state.contact_phone === '') {
      window.alert('Please enter all fields');
    } else {
      const fd = new FormData();
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      fd.append('company_id', localStorage.getItem('company_id'));
      fd.append('companyName', this.state.company_name);
      fd.append('city', this.state.city);
      fd.append('cstate', this.state.cstate);
      fd.append('country', this.state.country);
      fd.append('description', this.state.description);
      fd.append('contactPhone', this.state.contact_phone);
      fd.append('contact_email', this.state.contact_email);
      fd.append('file', this.state.selectedFile);
      axios.post(`${serverIp}:${serverPort}/updateCompanyProfile`, fd, config)
        .then((response) => {
          console.log('UpdateCompanyProfile Response Data');
          console.log(response.data);
          if (response.data === 'Error') {
            window.alert('Error in Connecting to Database while updating company details');
          } else {
            window.alert('Profile Updated Successfully');
            axios.post(`${serverIp}:${serverPort}/getCompanyDetails`, { companyId: localStorage.getItem('company_id') })
              .then((resp) => {
                if (resp === 'Error') {
                  window.alert('Error in Connecting to Database while getting Company Details');
                } else {
                  console.log(resp.data);
                  localStorage.setItem('city', resp.data.city);
                  localStorage.setItem('state', resp.data.state);
                  localStorage.setItem('country', resp.data.country);
                  localStorage.setItem('contact_phone', resp.data.contact_phone);
                  localStorage.setItem('contact_email', resp.data.contact_email);
                  localStorage.setItem('profile_picture_url', resp.data.profile_picture_url);
                  localStorage.setItem('company_name', resp.data.company_name);
                  localStorage.setItem('description', resp.data.description);
                  window.location.href = '/companyProfile';
                }
              }).catch((error) => {
                console.log(`In catch of axios post call to getCompanyDetails  api ${error}`);
                window.alert('Error in Profile component of Company while Getting company Details axios Post call');
              });
          }
        }).catch((err) => {
          console.log(`In catch of axios post call to updateCompanyProfile  api ${err}`);
          window.alert('Error in Profile component of Company axios Post call');
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
                <Input type="file" name="profilePicture" id="profilePicture" accept="image/*" onChange={this.profileFileUploadHandler} required />
                <FormText color="muted">
                  Upload new Profile Picture. Leave it to keep the previous one.
                </FormText>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="companyName" sm={2}>Company Name</Label>
              <Col sm={6}>
                <Input type="text" name="companyName" id="companyName" value={this.state.company_name} onChange={this.companyNameChangeHandler} required />
              </Col>
            </FormGroup>
            <br />
            <FormGroup row>
              <Label for="contactEmail" sm={2}>Contact Email</Label>
              <Col sm={3}>
                <Input type="email" name="contactEmail" id="contactEmail" value={this.state.contact_email} onChange={this.contactEmailChangeHandler} required />
              </Col>
              <Label for="contactPhone" sm={2}>Contact Phone</Label>
              <Col sm={3}>
                <Input type="number" name="contactNumber" id="contactNumber" value={this.state.contact_phone} onChange={this.contactPhoneChangeHandler} required />
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
              <Label for="exampleText" sm={2}>Company Description</Label>
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

export default Profile;
