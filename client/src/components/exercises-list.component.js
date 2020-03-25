import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = props => (
    <tr>
        <td data-label="Username">{props.exercise.username}</td>
        <td data-label="Description">{props.exercise.description}</td>
        <td data-label="Duration">{props.exercise.duration}</td>
        <td data-label="Date">{props.exercise.date.toDateString()}</td>
        <td data-label="Actions">
            <Link to={{
                pathname: '/edit/' + props.exercise._id,
                state: props.exercise
            }}>edit</Link>
            <button onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</button>
        </td>
    </tr>
)

export default class ExercisesList extends Component {

    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = { exercises: [] };
    }

    componentDidMount() {
        axios.get("/exercises/")
            .then(res => {
                this.setState({ exercises: res.data })
            })
            .catch(err => console.log(err));
    }

    deleteExercise(id) {
        axios.delete('/exercises/' + id)
            .then(res => console.log(res.data));

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exercisesList() {
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise}
                deleteExercise={this.deleteExercise} key={currentexercise._id} />;
        })
    }

    render() {
        return (
            <div>
                <h5>Logged Exercises</h5>
                <div id="exercise-log-table">
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th>Username</th>
                                <th>Description</th>
                                <th>Duration</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.exercisesList()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
