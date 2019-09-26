import React from "react";
import Axios from "axios";
import {Redirect, NavLink} from "react-router-dom";
import "./login.css"

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username: "",
            password: "",
            loggedIn: false
        }
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
      };

    loginUser = (event)=>{
        event.preventDefault();
        Axios.post("/loginUser", {
            username: this.state.username,
            password: this.state.password,
        }).then((res)=>{
            localStorage.setItem('JWT', res.data.token);
            this.setState({loggedIn: true})
            console.log("logged in")
        }).catch((err)=>{
            console.log(err)
        })
    }

    googleLogin = (event) => {
        event.preventDefault();
        Axios.get("/auth/google").then(res =>{
            console.log(res)
        })
    }

    render(){
        if(!this.state.loggedIn){
            return <div className="container">
            <form>
            <div class="form-group">
            Username: <input type="text" class="form-control" name="username" value={this.state.username} onChange={this.handleChange} />
            </div>
            <div class="form-group">
            Password: <input type="password" class="form-control" name="password" value={this.state.password} onChange={this.handleChange} />
            </div>
            <button type="submit" class="btn btn-success" onClick={this.loginUser}>Login</button>
            <NavLink to="/signup"> Signup </NavLink>
        </form>
        <div className="google-btn-container">
          <a href="/auth/google">
            <div className="google-btn">
              <div className="google-icon-wrapper">
                <img
                  className="google-icon"
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="signin"
                />
              </div>
              <p className="btn-text">
                <b>Log in with Google</b>
              </p>
            </div>
          </a>
        </div>
        </div>
        }
        else {
            return <Redirect to={{pathname: "/books", state: {loggedIn: true}}}/>
        }
    }

}

export default Login;