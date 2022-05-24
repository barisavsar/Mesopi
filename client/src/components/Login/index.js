import React, { Component } from "react";
import axios from 'axios';

export default class Login extends Component {
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
    };

    login = async () => {
        const data = this.state.data;

        // TODO: Login user
        const { data: user } = await axios.post(`http://localhost:5000/login`, data);
        debugger
        localStorage.setItem('user', JSON.stringify(user.token));
        localStorage.setItem('userId', JSON.stringify(user.id));
        this.props.handleLogin(user.token);
    }

    render() {
        return (
            <form>
                <div className="mb-3">
                    <label>Email address</label>
                    <input
                        type="userId"
                        className="form-control"
                        placeholder="Username"
                        onChange={e => this.onchange('userId', e)}
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
                <div className="mb-3">
                    <div className="custom-control custom-checkbox">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck1"
                        />
                        <label className="custom-control-label" htmlFor="customCheck1">
                            Remember me
                        </label>
                    </div>
                </div>
                <div className="d-grid">
                    <button type="button" onClick={this.login} className="btn btn-primary">
                        Login
                    </button>
                </div>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        )
    }
}