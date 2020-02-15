import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';


// My common components import
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';


// Company Components import
import CompanyHome from './components/Company/Home/CompanyHome';
import NewJobPost from './components/Company/JobsComponent/NewJobPost';
import CompanyProfile from './components/Company/Profile/CompanyProfile';
import CompanySearchStudents from './components/Company/SearchStudents/SearchStudents';
import CompanyListEvents from './components/Company/EventComponent/ListEvents';
import NewEventPost from './components/Company/EventComponent/NewEventPost';


// Student Components import
import StudentHome from './components/Student/Home/StudentHome';
import AppliedJobs from './components/Student/JobsComponent/AppliedJobs';
import StudentListEvents from './components/Student/EventsComponent/ListEvents';
import RegisteredEvents from './components/Student/EventsComponent/RegisteredEvents';
import StudentSearchStudents from './components/Student/SearchStudents/SearchStudents';
import StudentProfile from './components/Student/Profile/StudentProfile';


class AllRoutesCombined extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={SignUp} />

        <Route exact path="/listPostings" component={CompanyHome} />
        <Route exact path="/newJobPost" component={NewJobPost} />
        <Route exact path="/companySearchStudents" component={CompanySearchStudents} />
        <Route exact path="/listEvents" component={CompanyListEvents} />
        <Route exact path="/newEventPost" component={NewEventPost} />
        <Route exact path="/companyProfile" component={CompanyProfile} />

        <Route exact path="/viewPostedJobs" component={StudentHome} />
        <Route exact path="/appliedJobs" component={AppliedJobs} />
        <Route exact path="/listEventsStudent" component={StudentListEvents} />
        <Route exact path="/registeredEvents" component={RegisteredEvents} />
        <Route exact path="/studentSearchStudents" component={StudentSearchStudents} />
        <Route exact path="/studentProfile" component={StudentProfile} />
      </Router>
    );
  }
}

ReactDOM.render(<AllRoutesCombined />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
