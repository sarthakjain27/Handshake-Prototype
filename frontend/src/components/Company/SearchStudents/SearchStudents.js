import React from 'react';
import CustomNavBar from '../../NavBar/CustomNavBar';
import {serverIp, serverPort} from '../../../config';
import {Card, Image} from 'react-bootstrap';
import {Row, Col, Button, FormGroup,Input} from 'reactstrap';
import axios from 'axios';
import Dropdown from 'react-dropdown';
import '../../../../node_modules/react-dropdown/style.css';
import './SearchStudents.css';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class CompanySearchStudents extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      students:[],
      userOption:['Student Name','College Name','Skill Name'],
      selectedOption:'Student Name',
      searchValue:''
    }
    this.searchForStudents = this.searchForStudents.bind(this);
    this.onChangeSelectedOptionHandler = this.onChangeSelectedOptionHandler.bind(this);
    this.searchValueChangeHandler = this.searchValueChangeHandler.bind(this);
    this.displayStudentsHandler = this.displayStudentsHandler.bind(this);
    this.capitalize = this.capitalize.bind(this);
  }

  searchValueChangeHandler(e){
    this.setState({
      searchValue:e.target.value
    });
  }

  onChangeSelectedOptionHandler(e){
    this.setState({
      selectedOption:e.value
    });
  }

  displayStudentsHandler(){
    return this.state.students.map((eachStudent) => {
      return (
        <div>
          <div>
            <Card border="primary">
              <Card.Body>
                <Card.Title>
                  <Image src={serverIp+':'+serverPort+'/'+eachStudent.profile_picture_url}
                            alt='Profile Picture'
                            roundedCircle
                            style={{height:40, width:40}}/> {' '}
                  <a href={'/StudentProfile/'+eachStudent.student_id}>{this.capitalize(eachStudent.student_name)}</a> 
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {this.capitalize(eachStudent.college_name)}
                </Card.Subtitle>
                <Card.Text>
                  <b>Career Objective</b> <br />
                  {eachStudent.career_objective}
                </Card.Text>
              </Card.Body>
            </Card>
            <br />
          </div>
        </div>
      );
    })
  }

  searchForStudents(e){
    e.preventDefault();
    const data = {value:this.state.searchValue};
    if(this.state.selectedOption === 'Student Name'){
      data.searchParam = 'Name';
    } else if(this.state.selectedOption === 'College Name'){
      data.searchParam = 'College Name';
    } else if(this.state.selectedOption === 'Skill Name'){
      data.searchParam = 'Skill';
    } else {
      window.alert('Wrong Paramter Selected');
      window.location.reload();
    }
    axios.post(serverIp+':'+serverPort+'/searchStudents',data)
    .then(response => {
      console.log('searchForStudents in SearchStudents company response');
      console.log(response.data);
      if(response.data === 'Error'){
        window.alert('Error in querying the database');
      } else {
        this.setState({
          students:response.data
        })
      }
    }).catch(err => {
      console.log('Error in axios post call in SearchStudents in Company');
      window.alert('Error in connecting to server');
    })
  }

  capitalize(word, splitParam = ' ') {
    if(word){
      word = word.split(splitParam).map((eachWord) => eachWord.split(' ').map((each) => each.charAt(0).toUpperCase() + each.substring(1)).join(' '));
      word = word.join(splitParam);
      return word;
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
        <div data-hook="container" className="style__container___15r1p style__large___3HKaH ">
            <div id="postingsFilters">
              <div data-hook="quick-filters">
                <div className="style__card___1rhof style__fitted___5wNfd" data-hook="card">
                  <div className="style__card-item___B1f7m style__medium___2atZe">
                    <div className="style__input-fields___3mtFs">
                      <form onSubmit={this.searchForStudents} style={{width:1200}}>
                        <FormGroup row>
                          <Col sm={6}>
                            <Input type="text" name="companyName" id="companyName" 
                                    placeholder="Student Name, College Name or Skill Name" 
                                    value={this.state.searchValue} 
                                    onChange={this.searchValueChangeHandler} 
                                    pattern="^[a-zA-Z]+([ ]{1}[a-zA-Z]+)*$"
                                    title="It can only contain letters, single space character. It must start with letter and cannot end with special character"
                                    required/>
                          </Col>
                          <Col sm={3}>
                            <Dropdown
                                options={this.state.userOption}
                                onChange={this.onChangeSelectedOptionHandler}
                                value={this.state.selectedOption}
                              />
                          </Col>
                          <Col sm={3}>
                            <Button color="primary" style={{width:150,height:50}}>Search</Button>
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
                  
                  <div className="col-md-10">
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

export default CompanySearchStudents;
