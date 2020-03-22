import React, { Component } from 'react';
import axios from 'axios';

const User = props => (
    <li key={props.user._id}>{props.user.username}</li>
)

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
		this.getUsers = this.getUsers.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            users: []
        };

    }

    componentDidMount() {
        this.getUsers()
    }
	
	getUsers(){
		axios.get('/users')
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

        const newUser = {
            username: this.state.username
        }

        console.log(newUser);

        axios.post('/users/add', newUser)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

        this.setState({
            username: ''
        })
		
		this.getUsers()

    }

    getUsersList(e) {
        return this.state.users.map(user => {
            return <User user={user} />
        });
    }

    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create New User" className="btn btn-primary" />
                    </div>
                </form>
                <div>
                    <h4>Users : </h4>
                    <ol>{this.getUsersList()}</ol>
                </div>
            </div>
        )
    }
}
