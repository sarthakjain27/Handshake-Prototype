import React from 'react';
import axios from 'axios';
import './StudentHome.css';
// reactstrap button submits the form
import {
  Col, Button, FormGroup, Input,
} from 'reactstrap';
import Dropdown from 'react-dropdown';
import CustomNavBar from '../../NavBar/CustomNavBar';
import { serverIp, serverPort } from '../../../config';
import '../../../../node_modules/react-dropdown/style.css';
import Job from './Job';

class StudentHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      selectedOption: '',
      userOptions: ['Company Name', 'Job Title'],
      filteredJobs: [],
      allJobs: [],
      categoryOptions: ['Full Time', 'Part Time', 'On Campus', 'Internship'],
      selectedCategoryFilter: '',
      filteredCity: '',
    };
    this.findJobsHandler = this.findJobsHandler.bind(this);
    this.searchValueChangeHandler = this.searchValueChangeHandler.bind(this);
    this.onChangeSelectedOptionHandler = this.onChangeSelectedOptionHandler.bind(this);
    this.findJobsSearchHandler = this.findJobsSearchHandler.bind(this);
    this.cityFilter = this.cityFilter.bind(this);
    this.onChangeSelectedCategoryHandler = this.onChangeSelectedCategoryHandler.bind(this);
    this.handleApplyFilter = this.handleApplyFilter.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSearchReset = this.handleSearchReset.bind(this);
  }

  /*
    filtered jobs is when filters like category (Full time, Part time, On Campus, Internship) and location (city)
    are applied on allJobs so no backend post request is made.
    On the front end itself filter jobs from allJobs and put into filteredJobs
    always show jobs to user from filteredJobs array
  */
  componentDidMount() {
    axios.post(`${serverIp}:${serverPort}/getPostedJobs`, {})
      .then((response) => {
        console.log('ComponentDidMount response');
        console.log(response.data);
        this.setState({
          filteredJobs: response.data,
          allJobs: response.data,
        });
      }).catch((err) => {
        console.log(`Error in StudentHome componentDidMount axios post call: ${err}`);
        window.alert('Error in connecting to server');
      });
  }

  searchValueChangeHandler(e) {
    this.setState({
      searchValue: e.target.value,
    });
  }

  onChangeSelectedOptionHandler(e) {
    this.setState({
      selectedOption: e.value,
    });
  }

  onChangeSelectedCategoryHandler(e) {
    this.setState({
      selectedCategoryFilter: e.value,
    });
  }

  cityFilter(e) {
    this.setState({
      filteredCity: e.target.value,
    });
  }

  findJobsHandler() {
    return this.state.filteredJobs.map((eachJob) => <Job job={eachJob} key={eachJob.job_post_id} />);
  }

  handleSearchReset(e) {
    e.preventDefault();
    axios.post(`${serverIp}:${serverPort}/getPostedJobs`, {})
      .then((response) => {
        console.log('handleSearchReset Response');
        console.log(response.data);
        this.setState({
          filteredJobs: response.data,
          allJobs: response.data,
          searchValue: '',
          selectedOption: '',
        });
      }).catch((err) => {
        console.log(`Error in StudentHome componentDidMount axios post call: ${err}`);
        window.alert('Error in connecting to server');
      });
  }

  findJobsSearchHandler(e) {
    e.preventDefault();
    const data = {};
    if (this.state.selectedOption === 'Company Name') {
      data.companyName = this.state.searchValue;
    } else if (this.state.selectedOption === 'Job Title') {
      data.title = this.state.searchValue;
    }
    axios.post(`${serverIp}:${serverPort}/getPostedJobs`, data)
      .then((response) => {
        console.log('Response from getPostedJobs');
        console.log(response.data);
        this.setState({
          filteredJobs: response.data,
          allJobs: response.data,
        });
      }).catch((err) => {
        console.log(`Error in axios post of getPostedJobs on clicking of Search button: ${err}`);
        window.alert('Error in connecting to the server');
      });
  }

  handleReset(e) {
    e.preventDefault();
    const { allJobs } = this.state;
    this.setState({
      filteredJobs: allJobs,
      selectedCategoryFilter: '',
      filteredCity: '',
    });
  }

  handleApplyFilter(e) {
    e.preventDefault();
    console.log(`${this.state.selectedCategoryFilter} | ${this.state.filteredCity}`);
    let category = '';
    if (this.state.selectedCategoryFilter === 'Full Time') category = 'full time';
    else if (this.state.selectedCategoryFilter === 'Part Time') category = 'part time';
    else if (this.state.selectedCategoryFilter === 'On Campus') category = 'on campus';
    else if (this.state.selectedCategoryFilter === 'Internship') category = 'intern';
    if ((category === '') && (this.state.filteredCity === '')) {
      const { allJobs } = this.state;
      this.setState({
        filteredJobs: allJobs,
      });
    } else if (this.state.filteredCity !== '') {
      let filteredJobArray = '';
      if (category === '') {
        filteredJobArray = this.state.allJobs.filter((eachJob) => eachJob.city.toUpperCase().includes(this.state.filteredCity.toUpperCase()));
      } else {
        filteredJobArray = this.state.allJobs.filter((eachJob) => ((eachJob.city.toUpperCase().includes(this.state.filteredCity.toUpperCase())) && (eachJob.job_category === category)));
      }
      this.setState({
        filteredJobs: filteredJobArray,
      });
    } else {
      let filteredJobArray = '';
      filteredJobArray = this.state.allJobs.filter((eachJob) => eachJob.job_category === category);
      this.setState({
        filteredJobs: filteredJobArray,
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
        <div data-hook="container" className="style__container___15r1p style__large___3HKaH ">

          <div id="postingsFilters">
            <div data-hook="quick-filters">
              <div className="style__card___1rhof style__fitted___5wNfd" data-hook="card">
                <div className="style__card-item___B1f7m style__medium___2atZe">
                  <div className="style__input-fields___3mtFs">
                    <form onSubmit={this.findJobsSearchHandler} style={{ width: 1200 }}>
                      <FormGroup row>
                        <Col sm={6}>
                          <Input
                            type="text"
                            name="companyName"
                            id="companyName"
                            placeholder="Company Name or Job Title ..."
                            value={this.state.searchValue}
                            onChange={this.searchValueChangeHandler}
                            pattern="^[a-zA-Z]+([ .]{1}[a-zA-Z]+)*$"
                            title="It can only contain letters, single space character and period. It must start with letter and cannot end with special character"
                            required
                          />
                        </Col>
                        <Col sm={3}>
                          <Dropdown
                            options={this.state.userOptions}
                            onChange={this.onChangeSelectedOptionHandler}
                            value={this.state.selectedOption}
                            placeholder="Given Search Is.."
                            required
                          />
                        </Col>
                        <Col sm={3}>
                          <Button color="primary" style={{ width: 100, height: 40 }}>Search</Button>
                          {' '}
                          <Button color="info" style={{ width: 100, height: 40 }} onClick={this.handleSearchReset}>Reset</Button>
                        </Col>
                      </FormGroup>
                    </form>
                  </div>
                </div>
              </div>
            </div>
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
                        placeholder="Select Job Category...."
                      />
                    </div>
                    <div className="educationCard">
                      <Input type="text" name="cityFilter" id="cityFilter" placeholder="City Filter" value={this.state.filteredCity} onChange={this.cityFilter} />
                    </div>
                    <Col sm={{ offset: 2 }}>
                      <Button color="primary" style={{ width: 100, height: 50 }}>Filter</Button>
                      {' '}
                      <Button color="info" style={{ width: 100, height: 50 }} onClick={this.handleReset}>Reset</Button>
                    </Col>

                  </form>
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

        </div>
      </div>
    );
  }
}

export default StudentHome;
