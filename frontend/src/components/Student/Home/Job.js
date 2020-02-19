import React from 'react';
import {Card, Button} from 'react-bootstrap';
import axios from 'axios';
import {serverIp, serverPort} from '../../../config';

class Job extends React.Component{
  constructor(props){
    super(props);
    this.capitalize = this.capitalize.bind(this);
    this.applyForJob = this.applyForJob.bind(this);
    this.companyDetails = this.companyDetails.bind(this);
  }

  capitalize(word,splitParam=' '){
    word = word.split(splitParam).map((eachWord) => {
      return eachWord.split(' ').map((each) => each.charAt(0).toUpperCase() + each.substring(1)).join(' ');
    });
    word = word.join(splitParam);
    return word;
  }

  applyForJob(e){
    e.preventDefault();
    window.alert(`Applying for ${this.props.job.job_title} in ${this.props.job.company_name}`);
  }

  companyDetails(e){
    e.preventDefault();
    window.alert(`${this.props.job.company_name}`);
  }

  render(){
    if (!localStorage.getItem('userRole')) {
      window.location.href = '/';
    }
    return(
      <div>
        <br />
        <Card border="primary">
          <Card.Body>
            <Card.Title>
              {this.capitalize(this.props.job.job_title)} | {this.capitalize(this.props.job.company_name)}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {this.capitalize(this.props.job.job_category)}, ${this.props.job.salary} per year <br />
              <b>Posting Date: </b>{this.props.job.posting_date} <br />
              {this.capitalize(this.props.job.city)}, {this.capitalize(this.props.job.state)}, {this.capitalize(this.props.job.country)}
            </Card.Subtitle>
            <Card.Text>
              <b>Application Deadline: </b> {this.props.job.application_deadline} <br />
              <b>Job Description: </b>{this.props.job.job_category}
            </Card.Text>
            <Button variant="primary" onClick={this.applyForJob}>Apply</Button>{' '}
            <Button variant="info" onClick={this.companyDetails}>Company Info</Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Job;