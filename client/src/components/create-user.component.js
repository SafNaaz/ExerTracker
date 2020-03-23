import React, { Component } from 'react';
import axios from 'axios';

const User = props => (
    <li>{props.user.username}</li>
)

const Error = props => (
    <span style={{ color: "red" }}>{props.error}</span>
)

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            users: [],
            error: ''
        };

    }

    componentDidMount() {
        this.getUsers()
    }

    getUsers() {
        axios.get('http://localhost:5000/users')
            .then(res => {
                this.setState({ users: res.data });
            })
            .catch(err => console.log(err));
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        let duplicateUser = this.state.users.filter(user => { return user.username === this.state.username })

        if (duplicateUser.length > 0) {
            this.setState({
                error: 'User Already Exists.'
            })
        } else {
            const newUser = {
                username: this.state.username
            }
            console.log(newUser);
            this.setState({
                username: '',
                users: this.state.users.concat(newUser),
                error: ''
            })
            axios.post('http://localhost:5000/users/add', newUser)
                .then(res => console.log(res.data))
                .catch(err => console.log(err))
        }

    }

    getUsersList(e) {
        return this.state.users.map((user, index) => {
            return <User user={user} key={index} />
        });
    }

    render() {
        return (
            <div>
                <h5>Create New User</h5>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                        <Error error={this.state.error} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create New User" className="btn btn-primary" />
                    </div>
                </form>
                <div>
                    <h5>Users : </h5>
                    <ol>{this.getUsersList()}</ol>
                </div>
            </div>
        )
    }
}