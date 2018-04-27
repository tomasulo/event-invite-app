import React, {Component} from 'react'
import {Container, Form, Header} from "semantic-ui-react";
import {Attendance} from "./Attendance";
import {Title} from "./Title";

// TODO inject via environment
const API = 'https://xzy27n57nb.execute-api.eu-central-1.amazonaws.com/prod/events/';

const options = [
    {key: 'yes', text: 'Yes', value: 'Yes'},
    {key: 'no', text: 'No', value: 'No'},
    {key: 'maybe', text: 'Maybe', value: 'Maybe'},
];

// TODO move Form handling into Attendance
export default class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: null,
            attendance: [],
            rsvp: 'Yes',
            name: ''
        };
        this.updateAttendance = this.updateAttendance.bind(this);
        this.updateRsvp = this.updateRsvp.bind(this);
        this.updateName = this.updateName.bind(this);
    }

    componentDidMount() {
        fetch(API + this.props.match.params.id)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({event: data});
                if (data.attendance) {
                    this.setState({attendance: data.attendance});
                }
            });
    }

    handleChange = (e, {name, value}) => this.setState({[name]: value});

    updateAttendance = () => {
        this.state.attendance.push({
            name: this.state.name,
            rsvp: this.state.rsvp
        });

        this.setState({
            rsvp: 'Yes',
            name: ''
        });

        fetch(API + this.props.match.params.id + "/attendance", {
            method: 'PUT',
            body: JSON.stringify({
                attendance: this.state.attendance
            })
        }).then(response => console.log(response.json()));
    };

    updateRsvp = (e, {value}) => {
        this.setState({rsvp: value})
    };

    updateName = (e, {value}) => {
        this.setState({name: value})
    };

    render() {
        const {name, rsvp, event, attendance} = this.state;
        return (
            <div>
                {event &&
                <Container text style={{marginTop: '4em'}}>

                    <Title title={event.title} owner={event.owner}/>

                    <Header as='h3'>Description</Header>

                    <Container text>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
                        justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                        ipsum dolor sit amet. </Container>

                    <Header as='h3'>Attendance</Header>

                    <Attendance attendance={attendance}/>

                    <Form onSubmit={this.updateAttendance}>
                        <Form.Group>
                            <Form.Input name='name' width={8} fluid label='Name' placeholder='Name'
                                        onChange={this.handleChange}
                                        value={name}/>
                            <Form.Select name='rsvp' width={1} label='RSVP' options={options} placeholder='Yes'
                                         onChange={this.handleChange}
                                         value={rsvp}/>
                        </Form.Group>
                        <Form.Button>Save</Form.Button>
                    </Form>

                </Container>}
            </div>
        );
    }
}