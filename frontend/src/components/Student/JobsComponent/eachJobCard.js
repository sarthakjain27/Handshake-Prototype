import React from 'react';
import { Card, Image } from 'react-bootstrap';
import { serverIp, serverPort } from '../../../config';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class EachJobCard extends React.Component {
  constructor(props) {
    super(props);
    this.capitalize = this.capitalize.bind(this);
  }

  capitalize(word, splitParam = ' ') {
    if (word) {
      word = word.split(splitParam).map((eachWord) => eachWord.split(' ').map((each) => each.charAt(0).toUpperCase() + each.substring(1)).join(' '));
      word = word.join(splitParam);
      return word;
    } return '';
  }

  render() {
    if (!localStorage.getItem('userRole')) {
      window.location.href = '/';
    }
    return (
      <div>
        <Card border="primary">
          <Card.Body>
            <Card.Title>
              <Image src={`${serverIp}:${serverPort}/${this.props.job.profile_picture_url}`} rounded style={{ height: 80, width: 80 }} />
              {' '}
              {' '}
              {this.capitalize(this.props.job.job_title)}
              {' '}
              -
              {this.capitalize(this.props.job.city)}
              ,
              {this.capitalize(this.props.job.state)}
              ,
              {this.capitalize(this.props.job.country)}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {this.capitalize(this.props.job.company_name)}
            </Card.Subtitle>
            <Card.Text>
              <Image src={`${serverIp}:${serverPort}/infoLogo.png`} rounded style={{ height: 20, width: 20 }} />
              <i>Status: </i>
              {this.capitalize(this.props.job.status)}
              {' '}
              <br />
              <i>Applying Date: </i>
              {' '}
              {this.props.job.applying_date}
              {' '}
              -
              {' '}
              <i>Application Closes On: </i>
              {' '}
              {this.props.job.application_deadline}
            </Card.Text>
          </Card.Body>
        </Card>
        <br />
      </div>
    );
  }
}

export default EachJobCard;
