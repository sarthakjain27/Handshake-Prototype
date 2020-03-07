import React from 'react';
import CustomNavBar from '../../NavBar/CustomNavBar';
import {serverIp, serverPort} from '../../../config';
import axios from 'axios';
import './AppliedJob.css';
import Dropdown from 'react-dropdown';
import {Row, Col, Button, Form, FormGroup, Label, Input, Media} from 'reactstrap';
import EachJobCard from './eachJobCard';
import '../../../../node_modules/react-dropdown/style.css';

class AppliedJobs extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      filteredJobs:[],
      allJobs:[],
      categoryOptions:['Pending','Reviewed','Declined'],
      selectedCategoryFilter:'',
    }
    this.appliedJobs = this.appliedJobs.bind(this);
    this.handleApplyFilter = this.handleApplyFilter.bind(this);
    this.onChangeSelectedCategoryHandler = this.onChangeSelectedCategoryHandler.bind(this);
    this.handleApplyFilter = this.handleApplyFilter.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount(){
    axios.post(serverIp+':'+serverPort+'/getAppliedJobs',{studentId:localStorage.getItem('student_id')})
    .then(response => {
      console.log('AppliedJobs ComponentDidMount response');
      console.log(response.data);
      this.setState({
        filteredJobs:response.data,
        allJobs:response.data
      });
    }).catch(err => {
      console.log('Error in AppliedJobs componentDidMount axios post call');
      window.alert('Error in connecting to server');
    })
  }

  onChangeSelectedCategoryHandler(e){
    this.setState({
      selectedCategoryFilter:e.value
    })
  }

  appliedJobs(){
    return this.state.filteredJobs.map((eachJob)=>{
      return <EachJobCard job={eachJob} key={eachJob.job_post_id}/>
    })
  }

  handleReset(e){
    e.preventDefault();
    this.setState({
      selectedCategoryFilter:'',
      filteredJobs:this.state.allJobs
    });
  }

  handleApplyFilter(e){
    e.preventDefault();
    // window.alert(`${this.state.selectedCategoryFilter}`);
    console.log(`${this.state.selectedCategoryFilter}`);
    let category = '';
    if(this.state.selectedCategoryFilter === 'Pending')
      category = 'pending';
    else if(this.state.selectedCategoryFilter === 'Reviewed')
      category = 'reviewed';
    else if(this.state.selectedCategoryFilter === 'Declined')
      category = 'declined';
    if(category === ''){
      this.setState({
        filteredJobs:this.state.allJobs
      });
    } else{
      let filteredJobArray = [];
      filteredJobArray = this.state.allJobs.filter(eachJob => eachJob.status.toUpperCase() === category.toUpperCase());
      this.setState({
        filteredJobs:filteredJobArray
      });
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
        <div className="main-div-studentProfile">
          <div className="main-relative-div-studentProfile">
              <div className="row">
              <div className="col-md-4">
                <div className="experienceHeading">
                  <h2>Apply Filters</h2>
                </div>
                <form onSubmit={this.handleApplyFilter}>
                  <div className="educationCard">
                    
                    <Dropdown
                      options={this.state.categoryOptions}
                      onChange={this.onChangeSelectedCategoryHandler}
                      value={this.state.selectedCategoryFilter}
                      placeholder='Select Application Status...'
                    />
                  </div>
                  <Col sm={{offset:2}}>
                    <Button color="primary" style={{width:100,height:50}}>Filter</Button>{' '}
                    <Button color="info" style={{width:100,height:50}} onClick={this.handleReset}>Reset</Button>
                  </Col>
                  
                </form>
              </div>
              <div className="col-md-8">
                <div className="educationCard">
                  <div className="experienceHeading">
                    {this.appliedJobs()}
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

export default AppliedJobs;
