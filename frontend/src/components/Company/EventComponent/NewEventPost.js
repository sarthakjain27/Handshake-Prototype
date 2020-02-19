import React from 'react';
import CustomNavBar from '../../NavBar/CustomNavBar';
import './NewEventPost.css';
import DatePicker from 'react-datepicker';
import Dropdown from 'react-dropdown';
import axios from 'axios';
import {serverIp, serverPort} from '../../../config';
import '../../../../node_modules/react-datepicker/dist/react-datepicker.css';
import '../../../../node_modules/react-dropdown/style.css';
import TimePicker from 'react-time-picker';
import Select from "react-select";

class NewEventPost extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      eventName: '',
      description: '',
      date: new Date(),
      street: '',
      city: '',
      cstate: '',
      country: '',
      zipcode: '',
      time: '',
      selectedMajors: [],
      allMajors: [{label:'Computer Science', value:'Computer Science'},
                  {label:'Computer Engineering', value:'Computer Engineering'},
                  {label:'Software Engineering', value:'Software Engineering'},
                  {label:'Electrical Engineering', value:'Electrical Engineering'},
                  {label:'Electronics Engineering', value:'Electronics Engineering'},
                  {label:'Data Science', value:'Data Science'},
                  {label:'Mechanical Engineering', value:'Mechanical Engineering'},
                  {label:'Chemical Engineering', value:'Chemical Engineering'},
                  {label:'Metallurgy Engineering',value:'Metallurgy Engineering'},
                  {label:'Civil Engineering',value:'Civil Engineering'}]
    }
    this.eventNameChangeHandler = this.eventNameChangeHandler.bind(this);
    this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this);
    this.dateChangeHandler = this.dateChangeHandler.bind(this);
    this.streetChangeHandler = this.streetChangeHandler.bind(this);
    this.cityChangeHandler = this.cityChangeHandler.bind(this);
    this.stateChangeHandler = this.stateChangeHandler.bind(this);
    this.countryChangeHandler = this.countryChangeHandler.bind(this);
    this.zipcodeChangeHandler = this.zipcodeChangeHandler.bind(this);
    this.timeChangeHandler = this.timeChangeHandler.bind(this);
    this.eligibilityChangeHandler = this.eligibilityChangeHandler.bind(this);
    this.onSubmitCreateEvent = this.onSubmitCreateEvent.bind(this);
  }

  eventNameChangeHandler = e => {
    this.setState({
      eventName:e.target.value
    })
  }

  descriptionChangeHandler = e => {
    this.setState({
      description:e.target.value
    })
  }

  dateChangeHandler = e => {
    this.setState({
      date:e
    })
  }

  streetChangeHandler = e => {
    this.setState({
      street:e.target.value
    })
  }

  cityChangeHandler = e => {
    this.setState({
      city:e.target.value
    })
  }

  stateChangeHandler = e => {
    this.setState({
      cstate: e.target.value
    })
  }

  countryChangeHandler = e => {
    this.setState({
      country:e.target.value
    })
  }

  zipcodeChangeHandler = e => {
    this.setState({
      zipcode:e.target.value
    })
  }

  timeChangeHandler = e => {
    this.setState({
      time:e
    })
  }

  eligibilityChangeHandler = e => {
    if(e===null){
      this.setState({
        selectedMajors:[]
      })
    }else{
      this.setState({
        selectedMajors:e
      })
    }
  }

  onSubmitCreateEvent = e => {
    e.preventDefault();
    if(this.state.eventName === '' || this.state.description === '' || this.state.street === '' || this.state.city === '' || this.state.cstate === '' || this.state.country === '' || this.state.zipcode === '' || this.state.time === '' || this.state.selectedMajors.length === 0){
      window.alert('Please fill all details. Make sure you select atleast one of the major')
    } else {
      let formatted_date = this.state.date.getFullYear()
      // getMonth() returns 0 based answer
      if(this.state.date.getMonth()<9){
        formatted_date = formatted_date+'/'+'0'+(this.state.date.getMonth()+1);
      } else {
        formatted_date = formatted_date+'/'+(this.state.date.getMonth()+1);
      }

      if(this.state.date.getDate()<10){
        formatted_date = formatted_date+'/'+'0'+this.state.date.getDate();
      } else {
        formatted_date = formatted_date+'/'+this.state.date.getDate();
      }

      let selectedM=[]
      this.state.selectedMajors.forEach((eachObj)=>{
          selectedM.push(eachObj.value)
      })
      const data = {
        eventName: this.state.eventName,
        description: this.state.description,
        street: this.state.street,
        city: this.state.city,
        cstate: this.state.cstate,
        country: this.state.country,
        zipcode: this.state.zipcode,
        companyId: localStorage.getItem('company_id'),
        time: this.state.time, // time goes like military hours 13:00, 14:00, 16:00 see Event.js of company to convert in AM/PM
        date: formatted_date,
        eligibility: JSON.stringify(selectedM)
      }
      console.log(data)
      axios.defaults.withCredentials = true;
      axios.post(serverIp+':'+serverPort+'/createEvent',data)
      .then(response => {
        console.log('Login Response Data');
        console.log(response.data);
        if (response.data === 'Error') {
          window.alert('Error in Connecting to Database');
        } else {
          window.alert('Event Created Successfully');
          window.location.href = '/listEvents';
        }
      }).catch(err => {
        console.log(`In catch of axios post call to createEvent  api ${err}`);
        window.alert('Error in NewEventPost component axios Post call');
      })
    }
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
        <div className="container">
            <div className="login-form">
                <div className="main-div-createJobPost">
                    <div >
                        <h2>Event Details</h2>
                    </div>
                    <form onSubmit={this.onSubmitCreateEvent}>
                        <div className="form-group">
                            <input type="text" 
                                    className="form-control" 
                                    name="eventName" 
                                    placeholder="Event Name"
                                    pattern="^[a-zA-Z0-9]+([ .]{1}[a-zA-Z0-9]+)*$"
                                    title="Event Name can only contain letters, digits and single space character. It must start with alphanumeric characters only."
                                    onChange={this.eventNameChangeHandler}
                                    required />
                        </div>
                        <div className="form-group">
                          <label>Event Details: 
                            <textarea
                                  rows="8"
                                  cols="32"
                                  style={{fontSize:14}}
                                  name="eventDescription" 
                                  placeholder="Event Description"
                                  onChange={this.descriptionChangeHandler}
                                  required />
                          </label>
                        </div>
                        <div className="form-group">
                            <label>Event Date: </label>
                              <DatePicker 
                                  className="form-control"
                                  selected={this.state.date}
                                  onChange={this.dateChangeHandler}
                                  required/>
                        </div>
                        <div className="form-group">
                          <input type="text" 
                                className="form-control" 
                                name="street" 
                                placeholder="Street"
                                pattern="^[a-zA-Z0-9]+([ .,]{1}[a-zA-Z0-9]+)*$"
                                title="It can only contain letters, single space character and period. It must start with letter only."
                                onChange={this.streetChangeHandler}
                                required />
                        </div>
                        <div className="form-group">
                          <input type="text" 
                                className="form-control" 
                                name="city" 
                                placeholder="Event City"
                                pattern="^[a-zA-Z]+([ .]{1}[a-zA-Z]+)*$"
                                title="It can only contain letters, single space character and period. It must start with letter only."
                                onChange={this.cityChangeHandler}
                                required />
                        </div>
                        <div className="form-group">
                          <input type="text" 
                                className="form-control" 
                                name="state" 
                                placeholder="Event State"
                                pattern="^[a-zA-Z]+([ .]{1}[a-zA-Z]+)*$"
                                title="It can only contain letters, single space character and period. It must start with letter only."
                                onChange={this.stateChangeHandler}
                                required />
                        </div>
                        <div className="form-group">
                          <input type="text" 
                                className="form-control" 
                                name="country" 
                                placeholder="Event Country"
                                pattern="^[a-zA-Z]+([ .]{1}[a-zA-Z]+)*$"
                                title="It can only contain letters, single space character and period. It must start with letter only."
                                onChange={this.countryChangeHandler}
                                required />
                        </div>
                        <div className="form-group">
                          <input type="number" 
                                className="form-control" 
                                name="zipcode" 
                                placeholder="Zipcode"
                                onChange={this.zipcodeChangeHandler}
                                required />
                        </div>
                        <div>
                          Select Time:{' '}
                          <TimePicker 
                            onChange = {this.timeChangeHandler}
                            value = {this.state.time}
                            required
                          /> <br />
                        </div>
                        <div className="form-group">
                            <label>Select Eligibility</label>
                            <Select
                                isMulti
                                required
                                onChange={this.eligibilityChangeHandler}
                                options={this.state.allMajors}
                                value={this.state.selectedMajors}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Post Job Opening</button>
                    </form>         
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default NewEventPost;
