import React from 'react';
import {Card, Button} from 'react-bootstrap';

class Post extends React.Component{
  constructor(props){
    super(props);
    this.showStudents = this.showStudents.bind(this);
    this.capitalize = this.capitalize.bind(this);
  }

  showStudents(e){
    //window.alert(`${this.props.post.job_post_id}`);
    sessionStorage.setItem('JobIdForAppliedStudents',this.props.post.job_post_id);
    window.location.href = '/AppliedStudentsInJob';
  }

  capitalize(word){
    if(word){
      word = word.split(' ').map((eachWord) => eachWord.charAt(0).toUpperCase() + eachWord.substring(1)).join(' ');
      return word;
    }
  }

  render(){
    return(
      <div>
        <br/>
        <Card bg="info" text="white" border="primary" className="text-center">
          <Card.Header>{this.capitalize(this.props.post.job_title)} | {this.capitalize(this.props.post.job_category)}</Card.Header>
          <Card.Body>
            <Card.Title>
              Annual Salary: <i>${this.props.post.salary}</i>
            </Card.Title>
            <Card.Text>
              {this.props.post.job_description}
            </Card.Text>
            <Button variant="primary" onClick={this.showStudents}>See Students</Button>
          </Card.Body>
          <Card.Footer >
            <b>Job City: </b> <i>{this.props.post.city}</i> <br/>
            <b>Job State: </b> <i>{this.props.post.state}</i> <br />
            <b>Job Country: </b> <i>{this.props.post.country}</i>
          </Card.Footer>
          <Card.Footer >
            <b>Posting Date: </b> <i>{this.props.post.posting_date}</i> <br/>
            <b>Deadline: </b> <i>{this.props.post.application_deadline}</i>
          </Card.Footer>
        </Card>
        <br/>
      </div>
    );
  }
}

export default Post;