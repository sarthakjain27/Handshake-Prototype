import React from 'react';
import {
  Card, Modal, Image,
} from 'react-bootstrap';
import axios from 'axios';
import { serverIp, serverPort } from '../../../config';
import CustomNavBar from '../../NavBar/CustomNavBar';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './NewEventPost.css';

class EventRegisteredStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registeredStudents: [],
    };
    this.returnRegisteredStudents = this.returnRegisteredStudents.bind(this);
    this.capitalize = this.capitalize.bind(this);
  }

  componentDidMount() {
    axios.post(`${serverIp}:${serverPort}/getStudentsRegisteredInAEvent`, { eventId: sessionStorage.getItem('EventIdForRegisteredStudents') })
      .then((response) => {
        console.log('Response data in componentDidMount');
        console.log(response.data);
        this.setState({
          registeredStudents: response.data,
        });
      }).catch((err) => {
        console.log(`Error in componentDidMount of RegisteredStudents: ${err}`);
        window.alert('Error in connecting to server');
      });
  }

  capitalize(word, splitParam = ' ') {
    if (word) {
      word = word.split(splitParam).map((eachWord) => eachWord.split(' ').map((each) => each.charAt(0).toUpperCase() + each.substring(1)).join(' '));
      word = word.join(splitParam);
      return word;
    }
    return '';
  }

  returnRegisteredStudents() {
    return this.state.registeredStudents.map((eachStudent) => {
      let imgSrc = `${serverIp}:${serverPort}/default.png`;
      if (eachStudent.profile_picture_url !== '') {
        imgSrc = `${serverIp}:${serverPort}/${eachStudent.profile_picture_url}`;
      }
      return (
        <div>
          <div>
            <Card border="primary">
              <Card.Body>
                <Card.Title>
                  <Image
                    src={imgSrc}
                    alt="Student Profile Picture"
                    roundedCircle
                    style={{ height: 40, width: 40 }}
                  />
                  {' '}
                  {' '}
                  <a href={`/StudentProfile/${eachStudent.student_id}`}>{this.capitalize(eachStudent.student_name)}</a>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {this.capitalize(eachStudent.college_name)}
                </Card.Subtitle>
                <Card.Text>
                  <b>Career Objective</b>
                  {' '}
                  <br />
                  {eachStudent.career_objective}
                </Card.Text>
              </Card.Body>
            </Card>
            <br />
          </div>
          <div>
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {this.capitalize(eachStudent.student_name)}
                  {' '}
                  <Image
                    src={`${serverIp}:${serverPort}/${eachStudent.profile_picture_url}`}
                    alt="Student Profile Picture"
                    roundedCircle
                    style={{ height: 50, width: 50 }}
                  />
                  {' '}
                  <br />

                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <b>College Name: </b>
                {this.capitalize(eachStudent.college_name)}
                {' '}
                <br />
                <b>Career Objective </b>
                {' '}
                <br />
                {eachStudent.career_objective}
                {' '}
                <br />
                {' '}
                <br />
                <b>Location: </b>
                {' '}
                <i>
                  {this.capitalize(eachStudent.city)}
                  ,
                  {' '}
                  {this.capitalize(eachStudent.state)}
                  ,
                  {' '}
                  {this.capitalize(eachStudent.country)}
                </i>
                {' '}
                <br />
                <b>Contact Phone: </b>
                {' '}
                <i>{eachStudent.contact_phone}</i>
                {' '}
                <br />
                <b>Contact Email: </b>
                {' '}
                <i>{eachStudent.contact_email}</i>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <div>
          <CustomNavBar />
        </div>

        <div className="main-div-studentProfile">
          <div className="main-relative-div-studentProfile">
            <div className="row">
              <div className="col-md-4">
                <div className="experienceHeading">
                  <h2>Some Random Thing to Add Here Later</h2>
                </div>
              </div>
              <div className="col-md-8">
                <div className="educationCard">
                  <div className="experienceHeading">
                    {this.returnRegisteredStudents()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventRegisteredStudents;
