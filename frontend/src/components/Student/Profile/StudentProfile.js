import React from 'react';
import CustomNavBar from '../../NavBar/CustomNavBar';
import './StudentProfile.css';
import {serverIp, serverPort} from '../../../config';
import axios from 'axios';
import {Card, Button, ListGroup, ListGroupItem} from 'react-bootstrap';
import Education from './Education';
import Experience from './Experience';

class StudentProfile extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      education:[],
      experience:[]
    }
    this.capitalize = this.capitalize.bind(this);
    this.editBasicDetails = this.editBasicDetails.bind(this);
    this.addEducation = this.addEducation.bind(this);
    this.displayEducation = this.displayEducation.bind(this);
    this.displayExperience = this.displayExperience.bind(this);
    this.addExperience = this.addExperience.bind(this);
  }

  componentDidMount(){
    axios.post(serverIp+':'+serverPort+'/getStudentAllEducation',{studentId:localStorage.getItem('student_id')})
    .then(response => {
      console.log('getStudentAllEducationResponse');
      console.log(response.data);
      this.setState({
        education:response.data
      })
    }).then(()=>{
      axios.post(serverIp+':'+serverPort+'/getStudentAllProfessionalExperience',{studentId:localStorage.getItem('student_id')})
      .then(response => {
        console.log('getStudentAllProfessionalExperience');
        console.log(response.data);
        this.setState({
          experience:response.data
        })
      }).catch(err => {
        console.log('Error in post call of getStudentAllProfessionalExperience: '+err);
        window.alert('Error connecting to server');
      })
    }).catch(err => {
      console.log('Error in post call of getStudentAllEducation '+err);
      window.alert('Error connecting to server');
    })
  }

  displayEducation(){
    return this.state.education.map((eachEducation)=>{
      //for each object in exercise we are returning an Exercise component and passing three props
      return <Education education={eachEducation} key={eachEducation.education_id}/>
    })
  }

  displayExperience(){
    return this.state.experience.map((eachExperience)=>{
      //for each object in exercise we are returning an Exercise component and passing three props
      return <Experience experience={eachExperience} key={eachExperience.experience_id}/>
    })
  }

  capitalize(word,splitParam=' '){
    word = word.split(splitParam).map((eachWord) => {
      return eachWord.split(' ').map((each) => each.charAt(0).toUpperCase() + each.substring(1)).join(' ');
    });
    word = word.join(splitParam);
    return word;
  }

  editBasicDetails(e){
    e.preventDefault();
    window.location.href = '/editStudentProfile';
  }

  addEducation(e){
    e.preventDefault();
    window.location.href = '/addEducationStudentProfile';
  }

  addExperience(e){
    e.preventDefault();
    window.location.href = '/addExperienceStudentProfile';
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
        <div className="main-div-studentProfile">
          <div className="main-relative-div-studentProfile">
            <div className="row">
              <div className="col-md-4">
                <Card border="primary">
                  <Card.Img variant="top" src={serverIp+':'+serverPort+'/'+localStorage.getItem('profile_picture_url')} alt="Profile Picture" style={{height:300}}/>
                  <Card.Body>
                    <Card.Title>{this.capitalize(localStorage.getItem('student_name'))}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Date of Birth: {localStorage.getItem('date_of_birth')} <br />
                      {this.capitalize(localStorage.getItem('college_name'))} <br/>
                      {this.capitalize(localStorage.getItem('city'))}, {this.capitalize(localStorage.getItem('state'))}, {this.capitalize(localStorage.getItem('country'))}
                    </Card.Subtitle>
                    <Card.Text>
                      {this.capitalize(localStorage.getItem('career_objective'))}
                    </Card.Text>
                    <Button variant="primary" onClick={this.editBasicDetails}>Edit</Button>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">Contact Phone: {localStorage.getItem('contact_phone')}</small> <br />
                    <small className="text-muted">Contact Email: {localStorage.getItem('contact_email')}</small>
                  </Card.Footer>
                </Card>
              </div>
              <div className="col-md-8">
                <div className="educationCard">
                  <div className="experienceHeading">
                    <h2>Education</h2>
                  </div>
                  <div className="experienceHeading">
                    {this.displayEducation()}
                  </div>
                  <div className="style__card-item___B1f7m">
                    <div className="style__card-button___1X6wz">
                      <button className="style__plain___13WSa" onClick={this.addEducation}>
                        <span>Add Education</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="experienceCard">
                  <div className="experienceHeading">
                    <h2>Professional Experience</h2>
                  </div>
                  <div className="experienceHeading">
                    {this.displayExperience()}
                  </div>
                  <div className="style__card-item___B1f7m">
                    <div className="style__card-button___1X6wz">
                      <button className="style__plain___13WSa" onClick={this.addExperience}>
                        <span>Add Experience</span>
                      </button>
                    </div>
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

export default StudentProfile;
