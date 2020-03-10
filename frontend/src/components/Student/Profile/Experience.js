import React from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { serverIp, serverPort } from '../../../config';

class Experience extends React.Component {
  constructor(props) {
    super(props);
    this.capitalize = this.capitalize.bind(this);
    this.editExperienceDetails = this.editExperienceDetails.bind(this);
    this.deleteExperienceDetails = this.deleteExperienceDetails.bind(this);
  }

  capitalize(word, splitParam = ' ') {
    if (word) {
      word = word.split(splitParam).map((eachWord) => eachWord.split(' ').map((each) => each.charAt(0).toUpperCase() + each.substring(1)).join(' '));
      word = word.join(splitParam);
      return word;
    } return '';
  }

  editExperienceDetails(e) {
    e.preventDefault();
    sessionStorage.setItem('company_name', this.capitalize(this.props.experience.company_name));
    sessionStorage.setItem('title', this.capitalize(this.props.experience.title));
    sessionStorage.setItem('city', this.capitalize(this.props.experience.city));
    sessionStorage.setItem('state', this.capitalize(this.props.experience.state));
    sessionStorage.setItem('country', this.capitalize(this.props.experience.country));
    sessionStorage.setItem('start_date', this.props.experience.start_date);
    sessionStorage.setItem('end_date', this.props.experience.end_date);
    sessionStorage.setItem('work_description', this.props.experience.work_description);
    sessionStorage.setItem('student_id', this.props.experience.student_id);
    sessionStorage.setItem('experience_id', this.props.experience.experience_id);
    window.location.href = '/editStudentExperience';
  }

  deleteExperienceDetails(e) {
    e.preventDefault();
    axios.post(`${serverIp}:${serverPort}/deleteProfessionalExperience`, { experienceId: this.props.experience.experience_id })
      .then((response) => {
        if (response.date === 'Error') {
          console.log(`Error in deleting the given experience ${this.props.experience.experience_id}`);
          window.alert('Error in deleting the given experience detail');
        } else {
          window.alert('Experience Deleted Successfully');
          window.location.href = '/studentProfile';
        }
      }).catch((err) => {
        console.log(`Error in Experience component while deleting the experience ${err}`);
      });
  }

  render() {
    if (!localStorage.getItem('userRole')) {
      window.location.href = '/';
    }
    let showDate = '';
    if (this.props.experience.end_date === '') {
      showDate = `${this.props.experience.start_date} - Present`;
    } else {
      showDate = `${this.props.experience.start_date} - ${this.props.experience.end_date}`;
    }

    let buttons = '';
    if (this.props.showButtons) {
      buttons = (
        <div>
          <Button variant="primary" onClick={this.editExperienceDetails}>Edit</Button>
          {' '}
          <Button variant="danger" onClick={this.deleteExperienceDetails}>Delete</Button>
        </div>
      );
    }
    return (
      <div>
        <Card border="primary">
          <Card.Body>
            <Card.Title>{this.capitalize(this.props.experience.company_name)}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {this.capitalize(this.props.experience.title)}
              {' '}
              |
              {showDate}
              <br />
              {this.capitalize(this.props.experience.city)}
              ,
              {this.capitalize(this.props.experience.state)}
              ,
              {this.capitalize(this.props.experience.country)}
            </Card.Subtitle>
            <Card.Text>
              <b>Work Description: </b>
              {this.props.experience.work_description}
            </Card.Text>
            {buttons}
          </Card.Body>
        </Card>
        <br />
      </div>
    );
  }
}

export default Experience;
