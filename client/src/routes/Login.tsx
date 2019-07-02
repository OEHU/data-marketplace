import React, { PureComponent, Component } from 'react'
import axios from 'axios'
import Form from './../components/atoms/Form/Form'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
// import { Redirect } from 'react-router-dom'
// import withTracker from '../hoc/withTracker'
// import Publish from './Publish/'

interface LoginProps {
    history: any[]
}

export default class Login extends PureComponent<LoginProps> {
    
    public state = {
        loggedIn: false,
        email: '',
        password: '', 
        devices: ['']
    };

    public validateForm(cb: any) {
        const url = "https://api.oehu.org/account/login";
        
        const user = {
            email: this.state.email, 
            password: this.state.password
        };

        axios.post(url, user)
            .then(
                (res) => {
                    console.log("post request", res);
                     if (res.status == 200) {
                        cb(null, res);
                        console.log("post devices return", res.data.devices);
                        
                    } 
                },
                (err) => {
                    console.log("Could not log in. Try again.", err);
                    cb({message: "Could not log in. Please try again!"}, null);
                });


    }

    public handleEmail = (event: { target: { value: any; }; }) => {
        console.log("email state " + this.state.email);
        this.setState({
          email: event.target.value
        });
    }

    public handlePassword = (event: { target: { value: any; }; }) => {
        console.log("password state " + this.state.password);
        this.setState({  password: event.target.value   });
    } 
    
    public handleSubmit = (event: { preventDefault: () => void; }) => {
        
        event.preventDefault();

        this.validateForm((err: any, result: any) => {
            if (err) {
                alert(err.message);
            } 
            else {
                this.setState ({ 
                    loggedIn: true,
                    devices: result.data.devices
                });
        
                sessionStorage.setItem("email", this.state.email);
                sessionStorage.setItem("devices", JSON.stringify(result.data.devices));
                sessionStorage.setItem("loggedIn", "true");
                console.log("session storage in login page", sessionStorage.getItem("devices"));
                
                this.props.history.push("/devices");
            }
        });
    }

    public toggleLoggedIn() {
        this.setState({
            loggedIn: true
        });
    }

    public render() {
        if (sessionStorage.getItem("loggedIn") == "true") {
            this.toggleLoggedIn();
        }

        return (
            <Form title="Login" onSubmit = {this.handleSubmit}>
                Email: <br/>
                <input type = "text" name="email" onChange={this.handleEmail}></input> <br/>
                Password: <br/>
                <input type = "password" name="password" onChange={this.handlePassword}></input> <br/>
                <input type="submit" value="Submit"></input> 
            </Form>
            );
        }


}