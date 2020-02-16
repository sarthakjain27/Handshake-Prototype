import React from 'react';
import CustomNavBar from '../../NavBar/CustomNavBar';
import axios from 'axios';
import Post from './Post';
import {serverIp, serverPort} from '../../../config';

class CompanyHome extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      postings:[]
    }
  }

  componentDidMount(){
    axios.post(serverIp+':'+serverPort+'/listCompanyPostedJobs',{companyId:localStorage.getItem('company_id')})
    .then(response => {
      console.log(response.data);
      this.setState({
        postings:response.data
      });
    }).catch(err => {
      console.log(`In catch of axios post call to listCompanyPostedJobs  api ${err}`);
      window.alert('Error in CompnayHome component axios Post call');
    })
  }

  jobList(){
    return this.state.postings.map((eachPost)=>{
        //for each object in exercise we are returning an Exercise component and passing three props
        return <Post post={eachPost} key={eachPost.job_post_id}/>
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
          {this.jobList()}
        </div>
      </div>
    );
  }
}

export default CompanyHome;
