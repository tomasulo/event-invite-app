import React, {Component} from 'react'
import {Container, Form, Header} from "semantic-ui-react";

// TODO inject via environment
const API = 'https://can6ek1adi.execute-api.eu-central-1.amazonaws.com/prod/events/';

const options = [
    {key: 'yes', text: 'Yes', value: 'Yes'},
    {key: 'no', text: 'No', value: 'No'},
    {key: 'maybe', text: 'Maybe', value: 'Maybe'},
];

export default class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: null,
            attendance: [],
            rsvp: '',
            name: ''
        };
        this.updateAttendance = this.updateAttendance.bind(this);
        this.updateRsvp = this.updateRsvp.bind(this);
        this.updateName = this.updateName.bind(this);
    }

    componentDidMount() {
        fetch(API + this.props.match.params.eventId)
            .then(response => response.json())
            .then(data => {
                this.setState({event: data});
                if (data.attendance) {
                    this.setState({attendance: data.attendance});
                }
            });
    }

    updateAttendance = () => {
        this.state.attendance.push({
            name: this.state.name,
            rsvp: this.state.rsvp
        });

        this.setState({
            rsvp: '',
            name: ''
        });

        let payload = {
            attendance: this.state.attendance
        };

        fetch(API + this.props.match.params.eventId + "/attendance", {
            method: 'PUT',
            body: JSON.stringify(payload)
        }).then(response => response.json());
    };

    updateRsvp = (e, {value}) => {
        this.setState({rsvp: value})
    };

    updateName = (e, {value}) => {
        this.setState({name: value})
    };

    render() {
        return (
            <div>
                {this.state.event &&
                <Container text style={{marginTop: '4em'}}>
                    <Header as='h1' dividing>{this.state.event.title}</Header>
                    <Header as='h3'> Created by {this.state.event.user}</Header>
                    <p>
                        TODO: picture
                        TODO: description
                        TODO: date and time
                        TODO: attendance
                        TODO: comments (need to login?)
                    </p>

                    <Header as='h3'>Attendance</Header>

                    <ul>
                        {this.state.attendance.map(function (attendee, index) {
                            return <li key={index}>{attendee.name}: {attendee.rsvp}</li>;
                        })}
                    </ul>

                    <Form onSubmit={this.updateAttendance}>
                        <Form.Group widths='equal'>
                            <Form.Input fluid label='Name' placeholder='Name' onChange={this.updateName}
                                        value={this.state.name}/>
                            <Form.Select label='RSVP' options={options} placeholder='Yes' onChange={this.updateRsvp}
                                         value={this.state.rsvp}/>
                        </Form.Group>
                        <Form.Button>Save</Form.Button>
                    </Form>
                </Container>}
            </div>
        );
    }
}