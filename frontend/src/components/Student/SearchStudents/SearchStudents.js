import React from 'react';
import { Card, Image } from 'react-bootstrap';
import {
  Col, Button, FormGroup, Input,
} from 'reactstrap';
import axios from 'axios';
import Dropdown from 'react-dropdown';
import { serverIp, serverPort } from '../../../config';
import CustomNavBar from '../../NavBar/CustomNavBar';
import '../../../../node_modules/react-dropdown/style.css';
import './SearchStudents.css';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class StudentSearchStudents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      filteredStudents: [],
      userOption: ['Student Name', 'College Name'],
      selectedOption: '',
      searchValue: '',
      selectedMajorFilter: '',
      filterMajor: ['Computer Science', 'Computer Engineering', 'Software Engineering', 'Electrical Engineering', 'Electronics Engineering', 'Data Science', 'Mechanical Engineering', 'Chemical Engineering', 'Metallurgy Engineering', 'Civil Engineering'],
    };
    this.searchForStudents = this.searchForStudents.bind(this);
    this.onChangeSelectedOptionHandler = this.onChangeSelectedOptionHandler.bind(this);
    this.searchValueChangeHandler = this.searchValueChangeHandler.bind(this);
    this.displayStudentsHandler = this.displayStudentsHandler.bind(this);
    this.capitalize = this.capitalize.bind(this);
    this.handleApplyFilter = this.handleApplyFilter.bind(this);
    this.handleResetFilter = this.handleResetFilter.bind(this);
    this.onChangeSelectedMajorHandler = this.onChangeSelectedMajorHandler.bind(this);
    this.handleSearchReset = this.handleSearchReset.bind(this);
  }

  componentDidMount() {
    axios.get(`${serverIp}:${serverPort}/getAllStudents`)
      .then((response) => {
        console.log('ComponentDidMount response data in Search students in Student folder');
        console.log(response.data);
        if (response.data === 'Error') {
          console.log('Error in component did mount of search students of student');
          window.alert('Error in querying the database');
        } else {
          this.setState({
            students: response.data,
            filteredStudents: response.data,
          });
        }
      }).catch((err) => {
        console.log(`Error in axios call of component did mount of search students of student: ${err}`);
        window.alert('Error in connecting to the server');
      });
  }

  handleApplyFilter(e) {
    e.preventDefault();
    if (this.state.selectedMajorFilter === '') {
      window.alert('Please Select a Major!');
    } else {
      let filteredStudentArray = '';
      filteredStudentArray = this.state.students.filter((eachStudent) => eachStudent.allMajors !== null && eachStudent.allMajors.includes(this.state.selectedMajorFilter.toLowerCase()));
      this.setState({
        filteredStudents: filteredStudentArray,
      });
    }
  }

  handleResetFilter(e) {
    e.preventDefault();
    this.setState((state) => ({ filteredStudents: state.students }));
  }

  onChangeSelectedMajorHandler(e) {
    this.setState({
      selectedMajorFilter: e.value,
    });
  }

  searchValueChangeHandler(e) {
    this.setState({
      searchValue: e.target.value,
    });
  }

  onChangeSelectedOptionHandler(e) {
    this.setState({
      selectedOption: e.value,
    });
  }

  displayStudentsHandler() {
    return this.state.filteredStudents.map((eachStudent) => {
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
                    alt="Profile Picture"
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
        </div>
      );
    });
  }

  searchForStudents(e) {
    e.preventDefault();
    const data = { value: this.state.searchValue };
    if (this.state.selectedOption === '') {
      window.alert('Please Select Search Parameter');
    } else if (this.state.selectedOption !== 'Student Name' && this.state.selectedOption !== 'College Name') {
      window.alert('Wrong Paramter Selected');
    } else {
      if (this.state.selectedOption === 'Student Name') {
        data.searchParam = 'Name';
      } else if (this.state.selectedOption === 'College Name') {
        data.searchParam = 'College Name';
      }
      axios.post(`${serverIp}:${serverPort}/searchStudents`, data)
        .then((response) => {
          console.log('searchForStudents in SearchStudents company response');
          console.log(response.data);
          if (response.data === 'Error') {
            window.alert('Error in querying the database');
          } else {
            this.setState({
              students: response.data,
              filteredStudents: response.data,
            });
          }
        }).catch((err) => {
          console.log(`Error in axios post call in SearchStudents in Company: ${err}`);
          window.alert('Error in connecting to server');
        });
    }
  }

  handleSearchReset(e) {
    e.preventDefault();
    axios.get(`${serverIp}:${serverPort}/getAllStudents`)
      .then((response) => {
        console.log('handleSearchReset response data in Search students in Student folder');
        console.log(response.data);
        if (response.data === 'Error') {
          console.log('Error in handle search reset of search students of student');
          window.alert('Error in querying the database');
        } else {
          this.setState({
            students: response.data,
            filteredStudents: response.data,
            searchValue: '',
            selectedOption: '',
          });
        }
      }).catch((err) => {
        console.log(`Error in axios call of handle search reset of search students of student: ${err}`);
        window.alert('Error in connecting to the server');
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

  render() {
    if (!localStorage.getItem('userRole')) {
      window.location.href = '/';
    }
    return (
      <div>
        <div>
          <CustomNavBar />
        </div>
        <div data-hook="container" className="style__container___15r1p style__large___3HKaH ">
          <div id="postingsFilters">
            <div data-hook="quick-filters">
              <div className="style__card___1rhof style__fitted___5wNfd" data-hook="card">
                <div className="style__card-item___B1f7m style__medium___2atZe">
                  <div className="style__input-fields___3mtFs">
                    <form onSubmit={this.searchForStudents} style={{ width: 1200 }}>
                      <FormGroup row>
                        <Col sm={6}>
                          <Input
                            type="text"
                            name="companyName"
                            id="companyName"
                            placeholder="Student Name or College Name ..."
                            value={this.state.searchValue}
                            onChange={this.searchValueChangeHandler}
                            pattern="^[a-zA-Z]+([ ]{1}[a-zA-Z]+)*$"
                            title="It can only contain letters, single space character. It must start with letter and cannot end with special character"
                            required
                          />
                        </Col>
                        <Col sm={3}>
                          <Dropdown
                            options={this.state.userOption}
                            onChange={this.onChangeSelectedOptionHandler}
                            value={this.state.selectedOption}
                            placeholder="Given Search's Paramter is ?"
                          />
                        </Col>
                        <Col sm={3}>
                          <Button color="primary" style={{ width: 100, height: 40 }}>Search</Button>
                          {' '}
                          <Button color="info" style={{ width: 100, height: 40 }} onClick={this.handleSearchReset}>Reset</Button>
                        </Col>
                      </FormGroup>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-div-studentProfile">
            <div className="main-relative-div-studentProfile">
              <div className="row">
                <div className="col-md-4">
                  <div className="experienceHeading">
                    <h2>Apply Filters</h2>
                  </div>
                  <form>
                    <div className="educationCard">
                      <Dropdown
                        options={this.state.filterMajor}
                        onChange={this.onChangeSelectedMajorHandler}
                        value={this.state.selectedMajorFilter}
                        placeholder="Select Major"
                      />
                    </div>
                    <Col sm={{ offset: 2 }}>
                      <Button color="primary" style={{ width: 100, height: 50 }} onClick={this.handleApplyFilter}>Filter</Button>
                      {' '}
                      <Button color="info" style={{ width: 100, height: 50 }} onSubmit={this.handleResetFilter}>Reset</Button>
                    </Col>
                  </form>
                </div>
                <div className="col-md-8">
                  <div className="educationCard">
                    <div className="experienceHeading">
                      {this.displayStudentsHandler()}
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

export default StudentSearchStudents;
