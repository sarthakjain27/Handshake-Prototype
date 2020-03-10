import React from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { serverIp, serverPort } from '../../../config';

class Education extends React.Component {
  constructor(props) {
    super(props);
    this.capitalize = this.capitalize.bind(this);
    this.editEducationDetails = this.editEducationDetails.bind(this);
    this.deleteEducationDetails = this.deleteEducationDetails.bind(this);
  }

  capitalize(word, splitParam = ' ') {
    if (word) {
      word = word.split(splitParam).map((eachWord) => eachWord.split(' ').map((each) => each.charAt(0).toUpperCase() + each.substring(1)).join(' '));
      word = word.join(splitParam);
      return word;
    } return '';
  }

  editEducationDetails(e) {
    e.preventDefault();
    sessionStorage.setItem('college_name', this.capitalize(this.props.education.college_name));
    sessionStorage.setItem('city', this.capitalize(this.props.education.city));
    sessionStorage.setItem('state', this.capitalize(this.props.education.state));
    sessionStorage.setItem('country', this.capitalize(this.props.education.country));
    sessionStorage.setItem('degree', this.capitalize(this.props.education.degree));
    sessionStorage.setItem('major', this.capitalize(this.props.education.major));
    sessionStorage.setItem('year_of_passing', this.props.education.year_of_passing);
    sessionStorage.setItem('cgpa', this.props.education.cgpa);
    sessionStorage.setItem('student_id', this.props.education.student_id);
    sessionStorage.setItem('education_id', this.props.education.education_id);
    window.location.href = '/editStudentEducation';
  }

  deleteEducationDetails(e) {
    e.preventDefault();
    axios.post(`${serverIp}:${serverPort}/deleteEducation`, { educationId: this.props.education.education_id })
      .then((response) => {
        if (response.date === 'Error') {
          console.log(`Error in deleting the given education ${this.props.education.education_id}`);
          window.alert('Error in deleting the given education detail');
        } else {
          window.alert('Education Deleted Successfully');
          window.location.href = '/studentProfile';
        }
      }).catch((err) => {
        console.log(`Error in Education component while deleting the education ${err}`);
      });
  }

  render() {
    if (!localStorage.getItem('userRole')) {
      window.location.href = '/';
    }
    let buttons = '';
    if (this.props.showButtons) {
      buttons = (
        <div>
          <Button variant="primary" onClick={this.editEducationDetails}>Edit</Button>
          {' '}
          <Button variant="danger" onClick={this.deleteEducationDetails}>Delete</Button>
        </div>
      );
    }
    return (
      <div>
        <Card border="primary">
          <Card.Body>
            <Card.Title>{this.capitalize(this.props.education.college_name)}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {this.capitalize(this.props.education.degree)}
              ,
              {this.capitalize(this.props.education.major)}
              {' '}
              <br />
              {this.capitalize(this.props.education.city)}
              ,
              {this.capitalize(this.props.education.state)}
              ,
              {this.capitalize(this.props.education.country)}
            </Card.Subtitle>
            <Card.Text>
              <b>CGPA: </b>
              {this.capitalize(this.props.education.cgpa)}
              {' '}
              <br />
              <b>Year of Passing: </b>
              {this.capitalize(this.props.education.year_of_passing)}
            </Card.Text>
            {buttons}
          </Card.Body>
        </Card>
        <br />
      </div>
    );
  }
}

export default Education;
