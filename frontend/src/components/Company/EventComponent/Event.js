import React from 'react';
import {Card, Button} from 'react-bootstrap';

class Event extends React.Component{
  constructor(props){
    super(props);
    this.showStudents = this.showStudents.bind(this);
    this.capitalize = this.capitalize.bind(this);
    this.convertTime = this.convertTime.bind(this);
    this.convertDate = this.convertDate.bind(this);
  }

  showStudents(e){
    window.alert(`${this.props.post.event_id}`)
    window.location.href='/newEventPost';
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
      return (hourMinutes[0]-1)+':'+hourMinutes[1]+' PM';
    } else {
      return hourMinutes[0]+':'+hourMinutes[1]+' PM';
    }
  }

  convertDate(date){
    const yearMonthDay = date.split('/');
    return yearMonthDay[1]+'/'+yearMonthDay[2]+'/'+yearMonthDay[0];
  }

  render(){
    return(
      <div>
        <br/>
        <Card bg="info" text="white" border="primary" className="text-center">
    <Card.Header>{this.capitalize(this.props.event.event_name)} | {this.convertDate(this.props.event.date)} | {this.convertTime(this.props.event.time)}</Card.Header>
          <Card.Body>
            <Card.Title>
              Location: {this.capitalize(this.props.event.street)}, {this.capitalize(this.props.event.city)}, {this.capitalize(this.props.event.state)}, {this.capitalize(this.props.event.country)}, {this.capitalize(this.props.event.zipcode)}
            </Card.Title>
            <Card.Text>
              {this.props.event.description}
            </Card.Text>
            <Button variant="primary" onClick={this.showStudents}>See Registered Students</Button>
          </Card.Body>
          <Card.Footer >
            <b>Eligible Majors: </b> <i>{this.capitalize(this.props.event.eligibility,',')}</i>
          </Card.Footer>
        </Card>
        <br/>
      </div>
    );
  }
}

export default Event;