import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class LoginForm extends Component {
    constructor() {
        super()

        this.state = {
            user: '',
            redirect: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ user: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch(`http://localhost:3030/api/users/${this.state.user}`, { method: 'PUT' })
            .then(data => {
                console.log(data.status, data.statusText)
                this.setState({ redirect: true })
            })
    }

    render() {

        if (this.state.redirect) {
            return <Redirect push to={`/${this.state.user}/notes`} />
        }

        return (
            <div className="container d-flex h-100">
                <div className="row align-items-center w-50 mx-auto">
                    <div className="col-12">

                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control" id="userID" placeholder="Enter user ID" value={this.state.user} onChange={this.handleChange} />
                                <small className="form-text text-muted">Log in and access your notes. If you are a new user just type your name</small>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Log in</button>
                        </form>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginForm