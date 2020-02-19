import React from 'react';
import CustomNavBar from '../../NavBar/CustomNavBar';
import {serverIp, serverPort} from '../../../config';
import axios from 'axios';
import './StudentHome.css';
import {Row, Col, Button, Form, FormGroup, Label, Input, Media} from 'reactstrap';
import Dropdown from 'react-dropdown';
import SplitPane, { Pane } from 'react-split-pane';
import '../../../../node_modules/react-dropdown/style.css';
import Job from './Job';

class StudentHome extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      searchValue: '',
      selectedOption:'None',
      userOptions:['None','Company Name','Job Title'],
      filteredJobs: [],
      allJobs: []
    }
    this.findJobsHandler = this.findJobsHandler.bind(this);
    this.searchValueChangeHandler = this.searchValueChangeHandler.bind(this);
    this.onChangeSelectedOptionHandler = this.onChangeSelectedOptionHandler.bind(this);
    this.findJobsSearchHandler = this.findJobsSearchHandler.bind(this);
  }

  /*
    filtered jobs is when filters like category (Full time, Part time, On Campus, Internship) and location (city)
    are applied on allJobs so no backend post request is made. 
    On the front end itself filter jobs from allJobs and put into filteredJobs
    always show jobs to user from filteredJobs array
  */
  componentDidMount(){
    axios.post(serverIp+':'+serverPort+'/getPostedJobs',{})
    .then(response => {
      console.log('ComponentDidMount response');
      console.log(response.data);
      this.setState({
        filteredJobs:response.data,
        allJobs:response.data
      });
    }).catch(err => {
      console.log('Error in StudentHome componentDidMount axios post call');
      window.alert('Error in connecting to server');
    })
  }

  searchValueChangeHandler(e){
    this.setState({
      searchValue:e.target.value
    });
  }

  onChangeSelectedOptionHandler(e){
    this.setState({
      selectedOption:e.value
    });
  }

  findJobsHandler(e){
    return this.state.filteredJobs.map((eachJob)=>{
      return <Job job={eachJob} key={eachJob.job_post_id}/>
    })
  }

  findJobsSearchHandler(e){
    e.preventDefault();
    const data = {};
    if(this.state.selectedOption === 'Company Name'){
      data['companyName'] = this.state.searchValue;
    } else if(this.state.selectedOption === 'Job Title'){
      data['title'] = this.state.searchValue;
    }
    axios.post(serverIp+':'+serverPort+'/getPostedJobs',data)
    .then(response => {
      console.log('Response from getPostedJobs');
      console.log(response.data);
      this.setState({
        filteredJobs:response.data,
        allJobs:response.data
      })
    }).catch(err => {
      console.log(`Error in axios post of getPostedJobs on clicking of Search button`);
      window.alert('Error in connecting to the server');
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
        <div data-hook="container" className="style__container___15r1p style__large___3HKaH ">
          <form>
            <div id="postingsFilters">
              <div data-hook="quick-filters">
                <div className="style__card___1rhof style__fitted___5wNfd" data-hook="card">
                  <div className="style__card-item___B1f7m style__medium___2atZe">
                    <div className="style__input-fields___3mtFs">
                      <Form onSubmit={this.findJobsSearchHandler} style={{width:1200}}>
                        <FormGroup row>
                          <Col sm={6}>
                            <Input type="text" name="companyName" id="companyName" placeholder="Company Name or Title" value={this.state.searchValue} onChange={this.searchValueChangeHandler} />
                          </Col>
                          <Col sm={3}>
                            <Dropdown
                                options={this.state.userOptions}
                                onChange={this.onChangeSelectedOptionHandler}
                                value={this.state.selectedOption}
                                required
                            />
                          </Col>
                          <Col sm={3}>
                            <Button color="primary" style={{width:150,height:50}}>Search</Button>
                          </Col>
                        </FormGroup>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="main-div-studentProfile">
              <div className="main-relative-div-studentProfile">
                <div className="row">
                  <div className="col-md-4">
                    
                  </div>
                  <div className="col-md-8">
                    <div className="educationCard">
                      <div className="experienceHeading">
                        {this.findJobsHandler()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default StudentHome;
