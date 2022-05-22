import React, { Component } from "react";
export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {}
        };
    }

    onchange = (key, e) => {
        const value = e.target.value;
        const data = this.state.data;
        data[key] = value;
        this.setState(data);

        e.stopPropagation();
    };

    signUp = () => {
        const { data } = this.state;

        console.log(' DATA ', this.state);

        // TODO: Save user
    }

    render() {
        return (
            <div>
                <h3>Sign Up</h3>
                <div className="mb-3">
                    <label>First name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="First name"
                        onChange={e => this.onchange('firstName', e)}
                    />
                </div>
                <div className="mb-3">
                    <label>Last name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Last name"
                        onChange={e => this.onchange('lastName', e)}
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