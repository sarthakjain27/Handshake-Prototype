import React from 'react';
import axios from 'axios';
import CustomNavBar from '../../NavBar/CustomNavBar';
import Event from './Event';
import { serverIp, serverPort } from '../../../config';

class ListEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    axios.post(`${serverIp}:${serverPort}/listCompanyCreatedEvents`, { companyId: localStorage.getItem('company_id') })
      .then((response) => {
        console.log(response.data);
        this.setState({
          events: response.data,
        });
      }).catch((err) => {
        console.log(`In catch of axios post call to listCompanyCreatedEvents  api ${err}`);
        window.alert('Error in ListEvents component axios Post call');
      });
  }

  eventList() {
    // for each object in exercise we are returning an Exercise component and passing three props
    return this.state.events.map((eachEvent) => <Event event={eachEvent} key={eachEvent.event_id} />);
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
                <div className="col-md-4-ListEvents">
                  <div className="experienceHeading">
                    <h2 />
                  </div>
                </div>
                <div className="col-md-8-ListEvents">
                  <div className="educationCard">
                    <div className="experienceHeading">
                      {this.eventList()}
                    </div>
                  </div>
                </div>
                <div className="col-md-4-ListEvents">
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

export default ListEvents;
