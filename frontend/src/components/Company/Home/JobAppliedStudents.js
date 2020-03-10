import React from 'react';
import {
  Card, Button, Modal, Image,
} from 'react-bootstrap';
import axios from 'axios';
import { serverIp, serverPort } from '../../../config';
import CustomNavBar from '../../NavBar/CustomNavBar';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './CompanyHome.css';

class JobAppliedStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registeredStudents: [],
      studentResumeUrl: '',
      studentName: '',
      show: false,
    };
    this.returnRegisteredStudents = this.returnRegisteredStudents.bind(this);
    this.capitalize = this.capitalize.bind(this);
    this.showStudentResume = this.showStudentResume.bind(this);
    this.setReviewStatus = this.setReviewStatus.bind(this);
    this.setDeclineStatus = this.setDeclineStatus.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.goBackToListings = this.goBackToListings.bind(this);
  }

  componentDidMount() {
    axios.post(`${serverIp}:${serverPort}/getStudentsRegisteredInAJob`, { jobPostId: sessionStorage.getItem('JobIdForAppliedStudents') })
      .then((response) => {
        console.log('getStudentsRegisteredInAJob Response data in componentDidMount');
        console.log(response.data);
        this.setState({
          registeredStudents: response.data,
        });
      }).catch((err) => {
        console.log(`Error in componentDidMount of JobAppliedStudents: ${err}`);
        window.alert('Error in connecting to server');
      });
  }

  handleClose() {
    this.setState({
      show: false,
      studentResumeUrl: '',
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

  goBackToListings(e) {
    e.preventDefault();
    window.location.href = '/listPostings';
  }

  showStudentResume(resumeUrl, studentname) {
    // window.alert(resumeUrl);
    this.setState({
      studentResumeUrl: resumeUrl,
      studentName: studentname,
      show: true,
    });
  }

  setReviewStatus(applicationId) {
    axios.post(`${serverIp}:${serverPort}/updateAppliedStudentJobStatus`, { status: 'reviewed', jobApplicationId: applicationId })
      .then((response) => {
        console.log('setReviewStatus response');
        console.log(response.data);
        if (response.data === 'Error') {
          window.alert('Error in updating student job status');
        } else {
          window.alert('Successfully updated student job status');
          window.location.reload();
        }
      }).catch((err) => {
        console.log(`Error in setReviewStatus in JobAppliedStudents component: ${err}`);
        window.alert('Error in connecting to server');
      });
  }

  setDeclineStatus(applicationId) {
    axios.post(`${serverIp}:${serverPort}/updateAppliedStudentJobStatus`, { status: 'declined', jobApplicationId: applicationId })
      .then((response) => {
        console.log('setDeclineStatus response');
        console.log(response.data);
        if (response.data === 'Error') {
          window.alert('Error in updating student job status');
        } else {
          window.alert('Successfully updated student job status');
          window.location.reload();
        }
      }).catch((err) => {
        console.log(`Error in setDeclineStatus in JobAppliedStudents component: ${err}`);
        window.alert('Error in connecting to server');
      });
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
                  {' '}
                  <Button variant="info" name="showStudentResume" onClick={() => this.showStudentResume(eachStudent.resume_file_url, eachStudent.student_name)}>Resume</Button>
                  {' '}
                  <Button variant="success" onClick={() => this.setReviewStatus(eachStudent.jobApplicationId)}>Reviewed</Button>
                  {' '}
                  <Button variant="danger" onClick={() => this.setDeclineStatus(eachStudent.jobApplicationId)}>Decline</Button>
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
              <Card.Footer>
                <b><i>Current Status: </i></b>
                {' '}
                {this.capitalize(eachStudent.status)}
              </Card.Footer>
            </Card>
            <br />
          </div>
        </div>
      );
    });
  }

  render() {
    let resumeShow = <h3>Student did not upload any Resume</h3>;
    if (this.state.studentResumeUrl !== '') {
      resumeShow = <iframe src={`${serverIp}:${serverPort}/${this.state.studentResumeUrl}`} style={{ width: 770, height: 800 }} />;
    }
    return (
      <div>
        <div>
          <CustomNavBar />
        </div>
        <div>
          <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {this.capitalize(this.state.studentName)}
                's Resume
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {resumeShow}
            </Modal.Body>
          </Modal>
        </div>
        <div className="main-div-studentProfile">
          <div className="main-relative-div-studentProfile">
            <div className="row">
              <div className="col-md-4">
                <div className="experienceHeading">
                  <h3><Button style={{ width: 150, height: 50 }} onClick={this.goBackToListings}>Go Back</Button></h3>
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

export default JobAppliedStudents;
