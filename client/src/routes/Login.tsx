import React, { Component } from 'react'
import Route from '../components/templates/Route'
import Content from '../components/atoms/Content'
import axios from 'axios'

export default class Login extends Component {

    public state = {
        email: '',
        password: '', 
        devices: []
    }

    // checking if user inputted something
    public validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
      }
    
    public handleEmail = (event: { target: { value: any; }; }) => {
        this.setState({
          email: event.target.value
        });
    }

    public handlePassword = (event: { target: { value: any; }; }) => {
        this.setState({
          password: event.target.value
        });
    } 
    
    public handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    }

    public render() {
            return (
                <form onSubmit={this.handleSubmit} className="form">
                    Email: <br/>
                    <input type = "text" name="email" onChange={this.handleEmail}></input> <br/>
                    Password: <br/>
                    <input type = "password" name="password" onChange={this.handlePassword}></input> <br/>
                    <input type="submit" value="Submit"></input>
                </form>
                
                );
        }


}