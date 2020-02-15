import React from 'react';
import CustomNavBar from '../../NavBar/CustomNavBar';

class CompanyHome extends React.Component {
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

export default CompanyHome;
