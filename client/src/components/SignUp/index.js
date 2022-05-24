import React, { Component } from "react";
import axios from 'axios';

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            form: this.props.isPractitioner ? 'practitioner' : 'patient'
        };
    }

    onchange = (keys, e) => {
        const value = e.target.value;
        const data = this.state.data;

        if (Array.isArray(keys)) {
            if (!data[keys[0]]) {
                data[keys[0]] = {};
            }

            data[keys[0]][keys[1]] = value;
        } else {
            data[keys] = value;
        }
        this.setState(data);

    };

    signUp = () => {
        const data = this.state.data;
        const form = this.state.form;
        data[form]['language'] = 'tr';

        if (this.props.isPractitioner) {
            data[form]['roleId'] = 1;
        }
        // Save user

        axios.post(`http://localhost:5000/signup`, data)
    .then(res => {
        console.log(res);
        console.log(res.data);
    })
    }

    render() {
        return (
            <div>
                <div style={{ display: 'flex'}}>
                    <div style={{flex: 1}}>
                    <h3>Sign Up</h3>
                <div className="mb-3">
                    <label>First name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="First name"
                        onChange={e => this.onchange([this.state.form, 'given'], e)}
                    />
                </div>
                <div className="mb-3">
                    <label>Last name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Last name"
                        onChange={e => this.onchange([this.state.form, 'family'], e)}
                    />
                </div>
                <div className="mb-3">
                    <label>Birthdate</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Birthdate"
                        onChange={e => this.onchange([this.state.form, 'birthdate'], e)}
                    />
                </div>
                <div className="mb-3">
                    <label>Gender</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Gender"
                        onChange={e => this.onchange([this.state.form, 'gender'], e)}
                    />
                </div>
                <div className="mb-3">
                    <label>Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Phone"
                        onChange={e => this.onchange([this.state.form, 'phone'], e)}
                    />
                </div>
                <div className="mb-3">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter username"
                        onChange={e => this.onchange('userId', e)}
                    />
                </div>
                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        onChange={e => this.onchange('email', e)}
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        onChange={e => this.onchange('password', e)}

                    />
                </div>
                    </div>

                    <div style={{flex: 1}}>
                        
                <div className="mb-3">
                    <label>Address</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Address"
                        onChange={e => this.onchange(['address', 'line'], e)}
                    />
                </div>

                <div className="mb-3">
                    <label>City</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="City"
                        onChange={e => this.onchange(['address', 'city'], e)}
                    />
                </div>

                <div className="mb-3">
                    <label>Postal Code</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Postal Code"
                        onChange={e => this.onchange(['address', 'postalCode'], e)}
                    />
                </div>

                <div className="mb-3">
                    <label>Country</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Country"
                        onChange={e => this.onchange(['address', 'country'], e)}
                    />
                </div>
                    </div>
                </div>
                


                <div className="d-grid">
                    <button type="button" className="btn btn-primary" onClick={this.signUp}>
                        Sign Up
                    </button>
                </div>
                <p className="forgot-password text-right">
                    Already registered <a href="/sign-in">sign in?</a>
                </p>
            </div>
        )
    }
}