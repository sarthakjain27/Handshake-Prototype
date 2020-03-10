import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


// My common components import
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';


// Company Components import
import CompanyHome from './components/Company/Home/CompanyHome';
import NewJobPost from './components/Company/JobsComponent/NewJobPost';
import CompanyProfile from './components/Company/Profile/CompanyProfile';
import EditCompanyProfile from './components/Company/Profile/Profile';
import CompanyListEvents from './components/Company/EventComponent/ListEvents';
import NewEventPost from './components/Company/EventComponent/NewEventPost';
import EventRegisteredStudents from './components/Company/EventComponent/EventRegisteredStudents';
import JobAppliedStudents from './components/Company/Home/JobAppliedStudents';
import SearchStudents from './components/Company/SearchStudents/SearchStudents';


// Student Components import
import StudentHome from './components/Student/Home/StudentHome';
import AppliedJobs from './components/Student/JobsComponent/AppliedJobs';
import StudentListEvents from './components/Student/EventsComponent/ListEvents';
import RegisteredEvents from './components/Student/EventsComponent/RegisteredEvents';
import StudentSearchStudents from './components/Student/SearchStudents/SearchStudents';
import StudentProfile from './components/Student/Profile/StudentProfile';
import EditStudentProfile from './components/Student/Profile/Profile';
import EditStudentEducation from './components/Student/Profile/EditEducation';
import AddEducationStudent from './components/Student/Profile/AddEducation';
import EditStudentProfessionalExperience from './components/Student/Profile/EditExperience';
import AddProfessionalExperienceStudent from './components/Student/Profile/AddExperience';


class AllRoutesCombined extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={SignUp} />

        <Route exact path="/listPostings" component={CompanyHome} />
        <Route exact path="/newJobPost" component={NewJobPost} />
        <Route exact path="/listEvents" component={CompanyListEvents} />
        <Route exact path="/newEventPost" component={NewEventPost} />
        <Route exact path="/companyProfile" component={CompanyProfile} />
        <Route exact path="/editCompanyProfile" component={EditCompanyProfile} />
        <Route exact path="/RegisteredStudentsInEvent" component={EventRegisteredStudents} />
        <Route exact path="/StudentProfile/:id" component={StudentProfile} />
        <Route exact path="/AppliedStudentsInJob" component={JobAppliedStudents} />
        <Route exact path="/searchStudents" component={SearchStudents} />

        <Route exact path="/viewPostedJobs" component={StudentHome} />
        <Route exact path="/appliedJobs" component={AppliedJobs} />
        <Route exact path="/listEventsStudent" component={StudentListEvents} />
        <Route exact path="/registeredEvents" component={RegisteredEvents} />
        <Route exact path="/studentSearchStudents" component={StudentSearchStudents} />
        <Route exact path="/studentProfile" component={StudentProfile} />
        <Route exact path="/editStudentProfile" component={EditStudentProfile} />
        <Route exact path="/editStudentEducation" component={EditStudentEducation} />
        <Route exact path="/addEducationStudentProfile" component={AddEducationStudent} />
        <Route exact path="/editStudentExperience" component={EditStudentProfessionalExperience} />
        <Route exact path="/addExperienceStudentProfile" component={AddProfessionalExperienceStudent} />
        <Route exact path="/viewCompanyProfile/:id" component={CompanyProfile} />
      </Router>
    );
  }
}

ReactDOM.render(<AllRoutesCombined />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
