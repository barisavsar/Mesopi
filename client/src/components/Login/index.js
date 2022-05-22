import React, { Component } from "react";
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

    login = () => {
        const { data } = this.state;

        console.log(' DATA ', this.state);

        // TODO: Login user
    }

    render() {
        return (
            <form onSubmit={this.login}>
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
                    <button type="submit" className="btn btn-primary">
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