import React from 'react';
import { Card, Button } from 'react-bootstrap';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.showStudents = this.showStudents.bind(this);
    this.capitalize = this.capitalize.bind(this);
  }

  showStudents(e) {
    e.preventDefault();
    // window.alert(`${this.props.post.job_post_id}`);
    sessionStorage.setItem('JobIdForAppliedStudents', this.props.post.job_post_id);
    window.location.href = '/AppliedStudentsInJob';
  }

  capitalize(word) {
    if (word) {
      word = word.split(' ').map((eachWord) => eachWord.charAt(0).toUpperCase() + eachWord.substring(1)).join(' ');
      return word;
    }
    return '';
  }

  render() {
    return (
      <div>
        <br />
        <Card border="primary" className="text-center">
          <Card.Body>
            <Card.Title>
              {this.capitalize(this.props.post.job_title)}
              {' '}
              |
              {this.capitalize(this.props.post.job_category)}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <b>Job Location: </b>
              {' '}
              <i>
                {this.capitalize(this.props.post.city)}
                {', '}
                {this.capitalize(this.props.post.state)}
                {', '}
                {this.capitalize(this.props.post.country)}
                {' '}
              </i>
            </Card.Subtitle>
            <Card.Text>
              {this.props.post.job_description}
            </Card.Text>
            <Button variant="primary" onClick={this.showStudents}>See Students</Button>
          </Card.Body>
          <Card.Footer>
            <b>Posting Date: </b>
            {' '}
            <i>{this.props.post.posting_date}</i>
            {' '}
            {' '}
            <b>Deadline: </b>
            {' '}
            <i>{this.props.post.application_deadline}</i>
          </Card.Footer>
        </Card>
        <br />
      </div>
    );
  }
}

export default Post;
