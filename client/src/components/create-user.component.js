import React, { Component } from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';

const User = props => (
    <li>{props.user.username}</li>
)

const Information = props => {
    if (props.info === 'duplicateUser') {
        return <Alert variant="danger">User Already Exists.
        </Alert>
    } else if (props.info === 'userAdded') {
        return <Alert variant="info">User Added.
        </Alert>
    } else {
        return null;
    }
}

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.goBack = this.goBack.bind(this);
        this.resetClick = this.resetClick.bind(this);

        this.state = {
            username: '',
            users: [],
            info: ''
        }

    }

    resetClick() {
        this.setState({
            username: '',
            info: ''
        })
    }

    componentDidMount() {
        this.getUsers()
    }

    getUsers() {
        axios.get('http://localhost:3000/users')
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
                info: 'duplicateUser'
            })
        } else {
            const newUser = {
                username: this.state.username
            }
            console.log(newUser);
            this.setState({
                username: '',
                users: this.state.users.concat(newUser),
                info: 'userAdded'
            })
            axios.post('http://localhost:3000/users/add', newUser)
                .then(res => console.log(res.data))
                .catch(err => console.log(err))
        }

    }

    goBack() {
        this.props.history.goBack();
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
                            pattern=".{3,}"
                            title="3 characters minimum"
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                        {this.state.error === '' ? null : <Information info={this.state.info} />}
                    </div>
                    <div className="form-group submit-cancel-btn">
                        <input type="submit" value="Create" className="btn btn-primary" />
                        <button type="button" onClick={this.resetClick} className="btn btn-primary" >Reset</button>
                        <button type="button" className="btn btn-primary" onClick={this.goBack}>Cancel</button>
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
