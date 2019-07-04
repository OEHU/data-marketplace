import React, { PureComponent, FormEvent, ChangeEvent } from 'react'
import Content from '../components/atoms/Content'
import { Ocean } from '@oceanprotocol/squid'
import axios from 'axios'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import Form from './../components/atoms/Form/Form'
import Input from './../components/atoms/Form/Input'
import Button from './../components/atoms/Button'

interface DeviceProps {
    history: any[],
    ocean: Ocean
}

interface DeviceState {
    checkedDevice: any,
    devices: any[]
}

export default class Devices extends PureComponent<DeviceProps, DeviceState> {

    state = {
        devices: [],
        checkedDevice: ""
    };

    private userDevices: any;

    public componentDidMount() {
        console.log("Component DOES mount", sessionStorage.getItem("devices"));

        if (sessionStorage.getItem("devices")) {
            this.userDevices = JSON.parse(sessionStorage.getItem("devices")!);

            console.log("userDevices after json parse in constructor", this.userDevices);

            console.log(this.userDevices);

            this.setState({
                devices: this.userDevices || []
            });
        } else {
            this.setState({
                devices: []
            });
        }


    }

    public passDevice = (event: FormEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            checkedDevice: event.currentTarget.value
        });
    }

    public submitDevice = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        sessionStorage.setItem("currentDevice", this.state.checkedDevice);
        this.props.history.push("/loggedIn");
    }

    public render() {
        const devices = this.state.devices || [];

        return (
            <Form onSubmit={this.submitDevice}>
                <Input type="radio" name="devices" label="Select the device with the data that you want to publish" required={true} options={devices} onChange={this.passDevice}></Input> 
                <Button primary>Submit</Button> 
            </Form>
        );
    }

}