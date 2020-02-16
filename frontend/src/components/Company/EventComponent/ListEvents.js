import React from 'react';
import CustomNavBar from '../../NavBar/CustomNavBar';
import axios from 'axios';
import Event from './Event';
import {serverIp, serverPort} from '../../../config';

class ListEvents extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      events:[]
    }
  }

  componentDidMount(){
    axios.post(serverIp+':'+serverPort+'/listCompanyCreatedEvents',{companyId:localStorage.getItem('company_id')})
    .then(response => {
      console.log(response.data);
      this.setState({
        events:response.data
      });
    }).catch(err => {
      console.log(`In catch of axios post call to listCompanyCreatedEvents  api ${err}`);
      window.alert('Error in ListEvents component axios Post call');
    })
  }

  eventList(){
    return this.state.events.map((eachEvent)=>{
        //for each object in exercise we are returning an Exercise component and passing three props
        return <Event event={eachEvent} key={eachEvent.event_id}/>
    })
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
          {this.eventList()}
        </div>
      </div>
    );
  }
}

export default ListEvents;
