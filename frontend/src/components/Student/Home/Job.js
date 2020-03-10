import React from 'react';
import {
  Card, Button, Modal,
} from 'react-bootstrap';
import {
  Col, Form, FormGroup, Label, Input, FormText,
} from 'reactstrap';
import axios from 'axios';
import { serverIp, serverPort } from '../../../config';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Job extends React.Component {
  constructor(props) {
    super(props);
    this.capitalize = this.capitalize.bind(this);
    this.applyForJob = this.applyForJob.bind(this);
    this.state = {
      applicationShow: false,
      selectedFile: null,
    };
    this.handleApplicationClose = this.handleApplicationClose.bind(this);
    this.resumeFileUploadHandler = this.resumeFileUploadHandler.bind(this);
    this.submitResume = this.submitResume.bind(this);
  }

  resumeFileUploadHandler(e) {
    this.setState({
      selectedFile: e.target.files[0],
    }, () => {
      console.log(this.state.selectedFile);
    });
  }

  handleApplicationClose() {
    this.setState({
      applicationShow: false,
    });
  }

  capitalize(word, splitParam = ' ') {
    if (word) {
      word = word.split(splitParam).map((eachWord) => eachWord.split(' ').map((each) => each.charAt(0).toUpperCase() + each.substring(1)).join(' '));
      word = word.join(splitParam);
      return word;
    } return '';
  }

  applyForJob(e) {
    e.preventDefault();
    this.setState({
      applicationShow: true,
    });
  }

  submitResume(e) {
    e.preventDefault();
    if (this.state.selectedFile === null) {
      window.alert('Please upload your resume');
    } else {
      const fd = new FormData();
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      fd.append('jobPostId', this.props.job.job_post_id);
      fd.append('studentId', localStorage.getItem('student_id'));
      const dt = new Date();
      fd.append('date', `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`);
      fd.append('file', this.state.selectedFile);
      axios.post(`${serverIp}:${serverPort}/applyForJob`, fd, config)
        .then((response) => {
          console.log('Response data from applyForJob post api call from Job.js inside Home of Student');
          console.log(response.data);
          if (response.data === 'Error') {
            window.alert('Error while applying for the job');
          } else if (response.data === 'Already applied') {
            window.alert('You have already applied for this job previously');
          } else {
            window.alert('Successfully applied for the job');
          }
          this.setState({
            applicationShow: false,
          });
        }).catch((err) => {
          console.log(`Error in Job.js inside Home of Student while making applyForJob post api call: ${err}`);
          window.alert('Error in connecting to server');
        });
    }
  }

  render() {
    if (!localStorage.getItem('userRole')) {
      window.location.href = '/';
    }
    return (
      <div>
        <div>
          <br />
          <Card border="primary">
            <Card.Body>
              <Card.Title>
                {this.capitalize(this.props.job.job_title)}
                {' '}
                |
                <a href={`/viewCompanyProfile/${this.props.job.company_id}`}>{this.capitalize(this.props.job.company_name)}</a>
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {this.capitalize(this.props.job.job_category)}
                , $
                {this.props.job.salary}
                {' '}
                per year
                <br />
                <b>Posting Date: </b>
                {this.props.job.posting_date}
                {' '}
                <br />
                {this.capitalize(this.props.job.city)}
                ,
                {this.capitalize(this.props.job.state)}
                ,
                {this.capitalize(this.props.job.country)}
              </Card.Subtitle>
              <Card.Text>
                <b>Application Deadline: </b>
                {' '}
                {this.props.job.application_deadline}
                {' '}
                <br />
                <b>Job Description: </b>
                {this.props.job.job_description}
              </Card.Text>
              <Col sm={{ size: 4, offset: 5 }}>
                <Button variant="primary" onClick={this.applyForJob}>Apply</Button>
              </Col>
            </Card.Body>
          </Card>
        </div>
        <div>
          <Modal show={this.state.applicationShow} onHide={this.handleApplicationClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                Fill Application Details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <FormGroup row>
                  <Label for="resume" sm={2}>Resume File</Label>
                  <Col sm={10}>
                    <Input type="file" name="resume" id="resume" accept="application/pdf" onChange={this.resumeFileUploadHandler} />
                    <FormText color="muted">
                      Please upload pdf only.
                    </FormText>
                  </Col>
                </FormGroup>
                <FormGroup check row>
                  <Col sm={{ size: 4, offset: 3 }}>
                    {/* I am using Button of react-bootstrap and not reactstrap and hence cannot give onSubmit for form and giving onClick of button */}
                    <Button style={{ width: 150, height: 50 }} onClick={this.submitResume}>Apply</Button>
                  </Col>
                </FormGroup>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Job;
