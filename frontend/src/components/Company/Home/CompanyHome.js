import React from 'react';
import axios from 'axios';
import CustomNavBar from '../../NavBar/CustomNavBar';
import Post from './Post';
import { serverIp, serverPort } from '../../../config';

class CompanyHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postings: [],
    };
  }

  componentDidMount() {
    axios.post(`${serverIp}:${serverPort}/listCompanyPostedJobs`, { companyId: localStorage.getItem('company_id') })
      .then((response) => {
        console.log(response.data);
        this.setState({
          postings: response.data,
        });
      }).catch((err) => {
        console.log(`In catch of axios post call to listCompanyPostedJobs  api ${err}`);
        window.alert('Error in CompnayHome component axios Post call');
      });
  }

  jobList() {
    return this.state.postings.map((eachPost) => <Post post={eachPost} key={eachPost.job_post_id} />);
    // for each object in exercise we are returning an Exercise component and passing three props
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
                <div className="col-md-4-CompanyHome">
                  <div className="experienceHeading">
                    <h2 />
                  </div>
                </div>
                <div className="col-md-8-CompanyHome">
                  <div className="educationCard">
                    <div className="experienceHeading">
                      {this.jobList()}
                    </div>
                  </div>
                </div>
                <div className="col-md-4-CompanyHome">
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

export default CompanyHome;
