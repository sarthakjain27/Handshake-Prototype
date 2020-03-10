import React from 'react';
import './StudentProfile.css';
import axios from 'axios';
import { Tooltip } from 'reactstrap';
import {
  Card, Button,
} from 'react-bootstrap';
import Select from 'react-select';
import { serverIp, serverPort } from '../../../config';
import CustomNavBar from '../../NavBar/CustomNavBar';
import Education from './Education';
import Experience from './Experience';

class StudentProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      education: [],
      experience: [],
      basicDetails: '',
      skills: [],
      allSkills: [{ label: 'JavaScript', value: 'javascript' },
        { label: 'Nodejs', value: 'nodejs' },
        { label: 'Reactjs', value: 'reactjs' },
        { label: 'Java', value: 'java' },
        { label: 'SQL', value: 'sql' },
        { label: 'Python', value: 'python' },
        { label: 'C++', value: 'c++' },
        { label: 'Docker', value: 'docker' },
        { label: 'GIT', value: 'git' },
        { label: 'AWS', value: 'aws' }],
      selectedSkills: [],
      tooltipOpen: false,
    };
    this.capitalize = this.capitalize.bind(this);
    this.editBasicDetails = this.editBasicDetails.bind(this);
    this.addEducation = this.addEducation.bind(this);
    this.displayEducation = this.displayEducation.bind(this);
    this.displayExperience = this.displayExperience.bind(this);
    this.addExperience = this.addExperience.bind(this);
    this.displaySkills = this.displaySkills.bind(this);
    this.skillChangeHandler = this.skillChangeHandler.bind(this);
    this.updateSkills = this.updateSkills.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }

  componentWillMount() {
    if (!this.props.match.params.id) {
      axios.post(`${serverIp}:${serverPort}/getStudentAllEducation`, { studentId: localStorage.getItem('student_id') })
        .then((response) => {
          console.log('getStudentAllEducationResponse');
          console.log(response.data);
          this.setState({
            education: response.data,
          });
        }).then(() => {
          axios.post(`${serverIp}:${serverPort}/getStudentAllProfessionalExperience`, { studentId: localStorage.getItem('student_id') })
            .then((response) => {
              console.log('getStudentAllProfessionalExperience');
              console.log(response.data);
              this.setState({
                experience: response.data,
              });
            }).catch((err) => {
              console.log(`Error in post call of getStudentAllProfessionalExperience: ${err}`);
              window.alert('Error connecting to server');
            });
        }).then(() => {
          axios.post(`${serverIp}:${serverPort}/getStudentSkills`, { studentId: localStorage.getItem('student_id') })
            .then((response) => {
              console.log('getStudentSkills response');
              console.log(response.data);
              this.setState({
                skills: response.data,
              });
            }).catch((err) => {
              console.log(`Error in post call of getStudentSkills ${err}`);
              window.alert('Error connecting to server');
            });
        })
        .catch((err) => {
          console.log(`Error in post call of getStudentAllEducation ${err}`);
          window.alert('Error connecting to server');
        });
    } else {
      console.log(this.props);
      axios.post(`${serverIp}:${serverPort}/getStudentBasicDetails`, { studentId: this.props.match.params.id })
        .then((response) => {
          console.log('getStudentBasicDetails from company');
          console.log(response.data);
          return (response.data);
        }).then((basicInfo) => {
          axios.post(`${serverIp}:${serverPort}/getStudentAllEducation`, { studentId: this.props.match.params.id })
            .then((response) => {
              console.log('getStudentAllEducationResponse');
              console.log(response.data);
              const d = {
                basicInfo,
                education: response.data,
              };
              return d;
            }).then((basicEducationData) => {
              axios.post(`${serverIp}:${serverPort}/getStudentAllProfessionalExperience`, { studentId: this.props.match.params.id })
                .then((response) => {
                  console.log('getStudentAllProfessionalExperience');
                  console.log(response.data);
                  this.setState({
                    experience: response.data,
                    basicDetails: basicEducationData.basicInfo,
                    education: basicEducationData.education,
                  });
                }).catch((err) => {
                  console.log(`Error in post call of getStudentAllProfessionalExperience: ${err}`);
                  window.alert('Error connecting to server');
                });
            }).catch((err) => {
              console.log(`Error in post call of getStudentAllEducation ${err}`);
              window.alert('Error connecting to server');
            });
        }).then(() => {
          axios.post(`${serverIp}:${serverPort}/getStudentSkills`, { studentId: this.props.match.params.id })
            .then((response) => {
              console.log('getStudentSkills response');
              console.log(response.data);
              this.setState({
                skills: response.data,
              });
            }).catch((err) => {
              console.log(`Error in post call of getStudentSkills ${err}`);
              window.alert('Error connecting to server');
            });
        })
        .catch((err) => {
          console.log(`Error in post call of getStudentBasicDetails ${err}`);
          window.alert('Error connecting to server');
        });
    }
  }

  onToggle() {
    const previousState = this.state.tooltipOpen;
    this.setState({
      tooltipOpen: !previousState,
    });
  }

  skillChangeHandler(e) {
    console.log(e);
    if (e === null) {
      this.setState({
        selectedSkills: [],
      }, () => {
        console.log(this.state.selectedSkills);
      });
    } else {
      this.setState({
        selectedSkills: e,
      }, () => {
        console.log(this.state.selectedSkills);
      });
    }
  }

  updateSkills(e) {
    e.preventDefault();
    console.log(this.state.selectedSkills);
    const newSkillSet = [];
    this.state.selectedSkills.forEach((eachSkill) => {
      newSkillSet.push(eachSkill.value);
    });
    console.log(newSkillSet);
    // console.log(JSON.stringify(newSkillSet));
    if (newSkillSet.length === 0) {
      window.alert('Skill Set Cannot be empty. Please select atleast 1 skill to be as your skill');
      window.location.reload();
    } else {
      const data = {
        studentId: localStorage.getItem('student_id'),
        skills: newSkillSet,
      };
      console.log(data);
      axios.defaults.withCredentials = true;
      axios.post(`${serverIp}:${serverPort}/updateSkills`, data)
        .then((response) => {
          console.log('UpdateSkills Response Data');
          console.log(response.data);
          if (response.data === 'Inserted Successfully') {
            window.alert('Skill Set Updated Successfully to new selected skill set');
            window.location.reload();
          } else {
            window.alert('Error in Connecting to Database');
            window.location.reload();
          }
        }).catch((err) => {
          console.log(`In catch of axios post call to createEvent  api ${err}`);
          window.alert('Error in NewEventPost component axios Post call');
        });
    }
  }

  displayEducation() {
    if (!this.props.match.params.id) {
      return this.state.education.map((eachEducation) => <Education education={eachEducation} key={eachEducation.education_id} showButtons />);
      // for each object in exercise we are returning an Exercise component and passing three props
    }
    return this.state.education.map((eachEducation) => <Education education={eachEducation} key={eachEducation.education_id} showButtons={false} />);
    // for each object in exercise we are returning an Exercise component and passing three props
  }

  displayExperience() {
    if (!this.props.match.params.id) {
      return this.state.experience.map((eachExperience) => <Experience experience={eachExperience} key={eachExperience.experience_id} showButtons />);
      // for each object in exercise we are returning an Exercise component and passing three props
    }
    return this.state.experience.map((eachExperience) => <Experience experience={eachExperience} key={eachExperience.experience_id} showButtons={false} />);
    // for each object in exercise we are returning an Exercise component and passing three props
  }

  displaySkills() {
    const capitalizedSkills = this.state.skills.map((eachSkill) => this.capitalize(eachSkill.skill_name));
    return capitalizedSkills.join(', ');
  }

  capitalize(word, splitParam = ' ') {
    if (word) {
      word = word.split(splitParam).map((eachWord) => eachWord.split(' ').map((each) => each.charAt(0).toUpperCase() + each.substring(1)).join(' '));
      word = word.join(splitParam);
      return word;
    } return '';
  }

  editBasicDetails(e) {
    e.preventDefault();
    window.location.href = '/editStudentProfile';
  }

  addEducation(e) {
    e.preventDefault();
    window.location.href = '/addEducationStudentProfile';
  }

  addExperience(e) {
    e.preventDefault();
    window.location.href = '/addExperienceStudentProfile';
  }

  render() {
    if (!localStorage.getItem('userRole')) {
      window.location.href = '/';
    }

    let profile = null;
    if (!this.props.match.params.id) {
      let profileSrc = 'default.png';
      if (localStorage.getItem('profile_picture_url') !== '') {
        profileSrc = localStorage.getItem('profile_picture_url');
      }
      profile = (
        <div className="main-div-studentProfile">
          <div className="main-relative-div-studentProfile">
            <div className="row">
              <div className="col-md-4">
                <Card border="primary">
                  <Card.Img variant="top" src={`${serverIp}:${serverPort}/${profileSrc}`} alt="Profile Picture" style={{ height: 300 }} />
                  <Card.Body>
                    <Card.Title>{this.capitalize(localStorage.getItem('student_name'))}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Date of Birth:
                      {' '}
                      {localStorage.getItem('date_of_birth')}
                      {' '}
                      <br />
                      {this.capitalize(localStorage.getItem('college_name'))}
                      {' '}
                      <br />
                      {this.capitalize(localStorage.getItem('city'))}
                      ,
                      {this.capitalize(localStorage.getItem('state'))}
                      ,
                      {this.capitalize(localStorage.getItem('country'))}
                    </Card.Subtitle>
                    <Card.Text>
                      {this.capitalize(localStorage.getItem('career_objective'))}
                    </Card.Text>
                    <Button variant="primary" onClick={this.editBasicDetails}>Edit</Button>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      <b>Contact Phone:</b>
                      {' '}
                      {localStorage.getItem('contact_phone')}
                    </small>
                    {' '}
                    <br />
                    <small className="text-muted">
                      <b>Contact Email:</b>
                      {' '}
                      {localStorage.getItem('contact_email')}
                    </small>
                  </Card.Footer>
                </Card>
                <br />
                <div className="educationCardSkillSet">
                  <div className="experienceHeading" id="TooltipExample">
                    <h2>Skill Set</h2>
                    <label>Add Skill:</label>
                    <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="TooltipExample" toggle={this.onToggle}>
                      It will update your existing skill set with new skill set you select.
                    </Tooltip>
                    <Select
                      isMulti
                      required
                      onChange={this.skillChangeHandler}
                      options={this.state.allSkills}
                      value={this.state.selectedSkills}
                    />
                    <br />
                    <Button variant="primary" onClick={this.updateSkills}>Update Skill Set</Button>
                  </div>
                  <div className="experienceHeading">
                    <b>Your skills: </b>
                    {this.displaySkills()}
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="educationCardStudentProfile">
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
                <div className="experienceCardStudentProfile">
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
      );
    } else {
      let profileSrc = 'default.png';
      if (this.state.basicDetails.profile_picture_url !== '') {
        profileSrc = this.state.basicDetails.profile_picture_url;
      }
      profile = (
        <div className="main-div-studentProfile">
          <div className="main-relative-div-studentProfile">
            <div className="row">
              <div className="col-md-4">
                <Card border="primary">
                  <Card.Img variant="top" src={`${serverIp}:${serverPort}/${profileSrc}`} alt="Profile Picture" style={{ height: 300 }} />
                  <Card.Body>
                    <Card.Title>{this.capitalize(this.state.basicDetails.student_name)}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Date of Birth:
                      {' '}
                      {this.capitalize(this.state.basicDetails.date_of_birth)}
                      {' '}
                      <br />
                      {this.capitalize(this.state.basicDetails.college_name)}
                      {' '}
                      <br />
                      {this.capitalize(this.state.basicDetails.city)}
                      ,
                      {this.capitalize(this.state.basicDetails.state)}
                      ,
                      {this.capitalize(this.state.basicDetails.country)}
                    </Card.Subtitle>
                    <Card.Text>
                      {this.state.basicDetails.career_objective}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      {' '}
                      <b>Contact Phone:</b>
                      {' '}
                      {this.state.basicDetails.contact_phone}
                    </small>
                    {' '}
                    <br />
                    <small className="text-muted">
                      <b>Contact Email:</b>
                      {' '}
                      {this.state.basicDetails.contact_email}
                    </small>
                  </Card.Footer>
                </Card>
                <br />
                <div className="educationCardSkillSet">
                  <div className="experienceHeading">
                    <h2>Student Skill Set</h2>
                    {this.displaySkills()}
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="educationCardStudentProfile">
                  <div className="experienceHeading">
                    <h2>Education</h2>
                  </div>
                  <div className="experienceHeading">
                    {this.displayEducation()}
                  </div>
                </div>
                <div className="experienceCardStudentProfile">
                  <div className="experienceHeading">
                    <h2>Professional Experience</h2>
                  </div>
                  <div className="experienceHeading">
                    {this.displayExperience()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div>
          <CustomNavBar />
        </div>
        {profile}
      </div>
    );
  }
}

export default StudentProfile;
