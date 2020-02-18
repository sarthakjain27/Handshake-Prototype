import React from 'react';
import {Card, Button} from 'react-bootstrap';

class Education extends React.Component{
  constructor(props){
    super(props);
    this.capitalize = this.capitalize.bind(this);
    this.editEducationDetails = this.editEducationDetails.bind(this);
  }

  capitalize(word,splitParam=' '){
    word = word.split(splitParam).map((eachWord) => {
      return eachWord.split(' ').map((each) => each.charAt(0).toUpperCase() + each.substring(1)).join(' ');
    });
    word = word.join(splitParam);
    return word;
  }

  editEducationDetails(e){
    e.preventDefault();
    sessionStorage.setItem('college_name',this.capitalize(this.props.education.college_name));
    sessionStorage.setItem('city',this.capitalize(this.props.education.city));
    sessionStorage.setItem('state',this.capitalize(this.props.education.state));
    sessionStorage.setItem('country',this.capitalize(this.props.education.country));
    sessionStorage.setItem('degree',this.capitalize(this.props.education.degree));
    sessionStorage.setItem('major',this.capitalize(this.props.education.major));
    sessionStorage.setItem('year_of_passing',this.props.education.year_of_passing);
    sessionStorage.setItem('cgpa',this.props.education.cgpa);
    sessionStorage.setItem('student_id',this.props.education.student_id);
    sessionStorage.setItem('education_id',this.props.education.education_id);
    window.location.href = '/editStudentEducation';
  }

  render(){
    return(
      <div>
        <Card border="primary">
          <Card.Body>
            <Card.Title>{this.capitalize(this.props.education.college_name)}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {this.capitalize(this.props.education.degree)}, {this.capitalize(this.props.education.major)} <br />
              {this.capitalize(this.props.education.city)}, {this.capitalize(this.props.education.state)}, {this.capitalize(this.props.education.country)}
            </Card.Subtitle>
            <Card.Text>
              <b>CGPA: </b>{this.capitalize(this.props.education.cgpa)} <br/>
              <b>Year of Passing: </b>{this.capitalize(this.props.education.year_of_passing)}
            </Card.Text>
            <Button variant="primary" onClick={this.editEducationDetails}>Edit</Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Education;