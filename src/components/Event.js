import React, {Component} from 'react'
import {Container, Header} from "semantic-ui-react";

// TODO inject via environment
const API = 'https://can6ek1adi.execute-api.eu-central-1.amazonaws.com/prod/events/';

export default class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: null,
            loggedIn: false
        };
    }

    componentDidMount() {
        // TODO 404 not found
        fetch(API + this.props.match.params.eventId)
            .then(response => response.json())
            .then(data => this.setState({event: data}));
    }

    render() {
        return (
            <div>
                {this.state.event &&
                <Container text style={{marginTop: '4em'}}>
                    <Header as='h1' dividing>This is event with id {this.state.event.eventId}</Header>
                    <Header as='h3'>{this.state.event.title}</Header>
                    <Header as='h3'> Created by {this.state.event.user}</Header>
                    <p>
                        TODO: picture
                        TODO: description
                        TODO: attendance
                    </p>
                </Container>
                }
            </div>
        );
    }
}