import React, { PureComponent, Component } from 'react'
import Content from '../components/atoms/Content'
import { Ocean } from '@oceanprotocol/squid'
import axios from 'axios'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

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

    public passDevice = (event: { target: { value: any; }; }) => {
        this.setState({
            checkedDevice: event.target.value
        });
    }

    public submitDevice = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        // const ocean = this.context;
        // console.log("OCEAN: ", ocean);


        // TODO: Get a device URL by device ID to filter data by device ID
        // TODO: Use that as the asset URL to send to ocean
        // TODO: Once posted, return to list of assets where we can see the new asset
        //       listed

        sessionStorage.setItem("currentDevice", this.state.checkedDevice);
        this.props.history.push("/loggedIn");
    }

    public render() {
        console.log("devices in render", this.state.devices);

        const devices = this.state.devices || [];

        return (
            <form onSubmit={this.submitDevice}>
                {devices.map(device => (
                    <div className="radio" key={device}>
                        <label>
                            <input type="radio" value={device} onChange={this.passDevice} />
                            {device}
                        </label>
                    </div>
                ))}
                <input type="submit" value="Submit"></input>
            </form>
        );
    }

}