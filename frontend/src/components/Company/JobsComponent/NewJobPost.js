import React from 'react';
import CustomNavBar from '../../NavBar/CustomNavBar';
import './NewJobPost.css';

class NewJobPost extends React.Component {

  constructor(props){
    super(props);
    this.state={
      
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
                <div className="main-div">
                    <div className="panel">
                        <h2>Job Details</h2>
                    </div>
                    <form onSubmit={this.onLoginSubmit}>
                        <div className="form-group">
                            <input type="email" 
                                    className="form-control" 
                                    name="username" 
                                    placeholder="Username"
                                    onChange={this.onChangeUserNameHandler}
                                    required />
                        </div>
                        <div className="form-group">
                            <input type="password" 
                                    className="form-control" 
                                    name="password" 
                                    placeholder="Password"
                                    onChange={this.onChangePasswordHandler}
                                    required />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                        <br/>
                        <br/>
                        <br/>
                        <div>
                          Don't have an account ? <a href='/signup'>Create One</a>
                        </div>
                    </form>         
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default NewJobPost;
