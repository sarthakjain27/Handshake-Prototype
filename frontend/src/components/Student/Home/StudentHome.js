import React from 'react';
import CustomNavBar from '../../NavBar/CustomNavBar';

class StudentHome extends React.Component {
  render() {
    if (!localStorage.getItem('userRole')) {
      window.location.href = '/';
    }
    return (
      <div>
        <CustomNavBar />
      </div>
    );
  }
}

export default StudentHome;
