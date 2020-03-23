import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditExercise extends Component {
    constructor(props) {
        super(props);
        //this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.goBack = this.goBack.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date()
        }
    }

    componentDidMount() {
        this.setState({
            username: this.props.location.state.username,
            description: this.props.location.state.description,
            duration: this.props.location.state.duration,
            date: new Date(this.props.location.state.date)
        })

    }

    // onChangeUsername(e) {
    //     this.setState({
    //         username: e.target.value
    //     })
    // }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }

    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    goBack() {
        this.props.history.goBack();
    }

    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);

        axios.post('/exercises/update/' + this.props.match.params.id, exercise)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h5>Edit Exercise Log</h5>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: {this.state.username}</label>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input type="number"
                            required
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date : </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <div className="form-group submit-cancel-btn">
                        <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                        <button type="button" value="Cancel" className="btn btn-primary" onClick={this.goBack}>Cancel</button>
                    </div>
                </form>
            </div>
        );
    }
}
