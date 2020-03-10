import React from 'react';
import axios from 'axios';
import { serverIp, serverPort } from '../../../config';
import CustomNavBar from '../../NavBar/CustomNavBar';
import '../../../../node_modules/react-dropdown/style.css';
import EventCard from './EventCard';
import './ListEvents.css';

class RegisteredEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registeredEvents: [],
    };
    this.returnEventsCards = this.returnEventsCards.bind(this);
  }

  componentDidMount() {
    axios.post(`${serverIp}:${serverPort}/getRegisteredEvents`, { studentId: localStorage.getItem('student_id') })
      .then((response) => {
        console.log('ComponentDidMount of RegisteredEvents response');
        console.log(response.data);
        this.setState({
          registeredEvents: response.data,
        });
      }).catch((err) => {
        console.log(`Error in RegisteredEvents.js in ComponenDidMount axios call: ${err}`);
        window.alert('Error in connecting to server');
      });
  }

  returnEventsCards() {
    return this.state.registeredEvents.map((eachEvent) => <EventCard event={eachEvent} key={eachEvent.event_id} showRegisterButton={false} />);
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
                <div className="col-md-4-RegisteredEvents">
                  <div className="experienceHeading">
                    <h2 />
                  </div>
                </div>
                <div className="col-md-8-RegisteredEvents">
                  <div className="educationCard">
                    <div className="experienceHeading">
                      {this.returnEventsCards()}
                    </div>
                  </div>
                </div>
                <div className="col-md-4-RegisteredEvents">
                  <div className="experienceHeading">
                    <h2 />
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

export default RegisteredEvents;
