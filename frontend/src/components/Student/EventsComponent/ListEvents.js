import React from 'react';
import axios from 'axios';
import {
  Col, Button, Input,
} from 'reactstrap';
import { serverIp, serverPort } from '../../../config';
import CustomNavBar from '../../NavBar/CustomNavBar';
import '../../../../node_modules/react-dropdown/style.css';
import EventCard from './EventCard';
import './ListEvents.css';

class StudentListEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      filteredEvents: [],

    };
    this.returnEventsCards = this.returnEventsCards.bind(this);
    this.searchValueChangeHandler = this.searchValueChangeHandler.bind(this);
    this.findEventsSearchHandler = this.findEventsSearchHandler.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    axios.post(`${serverIp}:${serverPort}/getAllEvents`, {})
      .then((response) => {
        console.log('ComponentDidMount response in ListEvents.js of Student');
        console.log(response.data);
        return response;
      }).then((response) => {
        axios.post(`${serverIp}:${serverPort}/getStudentAllEducation`, { studentId: localStorage.getItem('student_id') })
          .then((resp) => {
            console.log('getStudentAllEducation');
            console.log(resp.data);
            // storing education to enable/disable apply button in Event Card based on eligibility
            sessionStorage.setItem('educationSetFromListEvents', JSON.stringify(resp.data));
            this.setState({

              filteredEvents: response.data,

            });
          }).catch((err) => {
            console.log(`Error in getStudentAllEducation post call in ListEvents componentDidMount axios post call: ${err}`);
            window.alert('Error in connecting to server');
          });
      }).catch((err) => {
        console.log(`Error in ListEvents componentDidMount axios getAllEvents post call: ${err}`);
        window.alert('Error in connecting to server');
      });
  }

  returnEventsCards() {
    return this.state.filteredEvents.map((eachEvent) => <EventCard event={eachEvent} key={eachEvent.event_id} showRegisterButton />);
  }

  searchValueChangeHandler(e) {
    this.setState({
      searchValue: e.target.value,
    });
  }

  handleReset(e) {
    e.preventDefault();
    axios.post(`${serverIp}:${serverPort}/getAllEvents`, {})
      .then((response) => {
        console.log('handleReset response in ListEvents.js of Student');
        this.setState({
          filteredEvents: response.data,

          searchValue: '',
        });
      }).catch((err) => {
        console.log(`Error in ListEvents handleReset axios getAllEvents post call: ${err}`);
        window.alert('Error in connecting to server');
      });
  }

  findEventsSearchHandler(e) {
    e.preventDefault();
    const data = {
      eventName: this.state.searchValue,
    };
    axios.post(`${serverIp}:${serverPort}/getSearchedEvent`, data)
      .then((response) => {
        console.log('Response from getSearchedEvent');
        console.log(response.data);
        this.setState({
          filteredEvents: response.data,

        });
      }).catch((err) => {
        console.log(`Error in axios post of getSearchedEvent on clicking of Search button: ${err}`);
        window.alert('Error in connecting to the server');
      });
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
        <div>
          <div className="main-div-studentProfile">
            <div className="main-relative-div-studentProfile">
              <div className="row">
                <div className="col-md-4">
                  <div className="experienceHeading">
                    <h2>Search Events</h2>
                  </div>
                  <form onSubmit={this.findEventsSearchHandler}>
                    <Input type="text" name="searchEvent" id="searchEvent" placeholder="Search Event" value={this.state.searchValue} onChange={this.searchValueChangeHandler} required />
                    {' '}
                    <br />
                    <Col sm={{ offset: 2 }}>
                      <Button color="primary" style={{ width: 100, height: 40 }}>Search</Button>
                      {' '}
                      <Button color="info" style={{ width: 100, height: 40 }} onClick={this.handleReset}>Reset</Button>
                    </Col>
                  </form>
                </div>
                <div className="col-md-8">
                  <div className="educationCard">
                    <div className="experienceHeading">
                      {this.returnEventsCards()}
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

export default StudentListEvents;
