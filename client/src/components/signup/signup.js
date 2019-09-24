import React from "react"
import Axios from "axios"
import {Redirect} from "react-router-dom"

class Signup extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            email: "",
            signedUp: false,
            badPassword: false
        }
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
      };

    signupUser = (event)=>{
        event.preventDefault();
        if(this.state.password !== this.state.confirmPassword){
            this.setState({badPassword: true})
        }
        else{
        Axios.post("/registerUser", {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        }).then((data)=>{
            console.log("signed up")
            this.setState({signedUp: true})
        }).catch((err)=>{
            console.log(err)
        })
    }
    }

    render(){
        if(!this.state.signedUp) {
        return <div className="container">
        <form>
        Username: <input type="text" name="username" class="form-control" value={this.state.username} onChange={this.handleChange} /><br />
        Password: <input type="password" name="password" class="form-control" value={this.state.password} onChange={this.handleChange} /><br />
        Confirm Password: <input type="password" class="form-control" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleChange} /><br />
        Email: <input type="text" name="email" class="form-control" value={this.state.email} onChange={this.handleChange}/><br />
        <button type="submit" className="btn-success" onClick={this.signupUser}>Sign up</button>
        </form>
        <br/>
        <div class="alert alert-danger" role="alert" hidden={!this.state.badPassword}>
            Passwords don't match!
        </div>
    </div>
        }
    else{
        return <Redirect to="/" />
    }
    }
}

export default Signup