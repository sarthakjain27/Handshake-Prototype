import React from 'react';
import {Card, Button, Modal, Image} from 'react-bootstrap';
import {Row, Col, Form, FormGroup, Label, Input, Media, FormText} from 'reactstrap';
import axios from 'axios';
import {serverIp, serverPort} from '../../../config';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class EventCard extends React.Component{
  constructor(props){
    super(props);
    this.capitalize = this.capitalize.bind(this);
    this.convertTime = this.convertTime.bind(this);
    this.convertDate = this.convertDate.bind(this);
    this.registerForEvent = this.registerForEvent.bind(this);
  }

  capitalize(word,splitParam=' '){
    word = word.split(splitParam).map((eachWord) => {
      return eachWord.split(' ').map((each) => each.charAt(0).toUpperCase() + each.substring(1)).join(' ');
    });
    word = word.join(splitParam);
    return word;
  }

  convertTime(time){
    const hourMinutes = time.split(':');
    if(hourMinutes[0]<12){
      return hourMinutes[0]+':'+hourMinutes[1]+' AM';
    } else if(hourMinutes[0]>12){
      return (hourMinutes[0]-12)+':'+hourMinutes[1]+' PM';
    } else {
      return hourMinutes[0]+':'+hourMinutes[1]+' PM';
    }
  }

  convertDate(date){
    const yearMonthDay = date.split('/');
    return yearMonthDay[1]+'/'+yearMonthDay[2]+'/'+yearMonthDay[0];
  }
  
  registerForEvent(e){
    e.preventDefault();
    axios.post(serverIp+':'+serverPort+'/registerForEvent',{studentId:localStorage.getItem('student_id'),eventId:this.props.event.event_id})
    .then(response => {
      console.log('registerForEvent response data');
      console.log(response.data);
      if(response.data === 'Error'){
        window.alert('Error in registering. Please try later');
      } else if(response.data === 'Already applied'){
        window.alert('You have already registered for this event.');
      } else {
        window.alert('Successfully Registered.');
      }
    }).catch(err => {
      console.log(`Error in registerForEvent post call in EventCard of Student: ${err}`);
      window.alert('Error while connecting to server');
    })
  }

  render(){
    if (!localStorage.getItem('userRole')) {
      window.location.href = '/';
    }
    let button = ''
    let eligible = false;
    let currentYear = (new Date()).getFullYear();
    let student_education = JSON.parse(sessionStorage.getItem('educationSetFromListEvents'));
    let eligibility_majors = this.props.event.eligibility.split(',');
    for(let i of student_education){
      if((parseInt(i['year_of_passing'])>=currentYear) && (eligibility_majors.includes(i['major']))){
        eligible = true;
        break;
      }
    }
    if(this.props.showRegisterButton && eligible)
    {
      button = <Button style={{width:100,height:40}} onClick={this.registerForEvent}>Register</Button>
    }
    return(
      <div>
        <br />
        <Card border="primary">
          <Card.Body>
            <Card.Title>
              <Image src={serverIp+':'+serverPort+'/'+this.props.event.profile_picture_url}
                        alt='Company Profile Picture'
                        rounded 
                        style={{height:50, width:50}}/> {' '}
              {this.capitalize(this.props.event.event_name)} | {this.capitalize(this.props.event.company_name)} {' '}
              {button}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <b>Posted Date: </b> {this.convertDate(this.props.event.date)}, {this.convertTime(this.props.event.time)}
            </Card.Subtitle>
            <Card.Text>
              <b>Description</b>  <br />
              {this.props.event.edescription}
            </Card.Text>
            <Card.Footer>
              <b>Location:</b> {this.capitalize(this.props.event.street)}, {this.capitalize(this.props.event.city)}, {this.capitalize(this.props.event.state)}, {this.capitalize(this.props.event.country)}, {this.capitalize(this.props.event.zipcode)}
            </Card.Footer>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default EventCard;