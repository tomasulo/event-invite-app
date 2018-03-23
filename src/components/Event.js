import React, {Component} from 'react'
import {Container, Header} from "semantic-ui-react";
import {API} from "aws-amplify";
import {Auth} from "aws-amplify/lib/index";

export default class Event extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event: null,
            loggedIn: false
        };
    }

    async componentDidMount() {
        // try {
        //     await
        // } catch (e) {
        //     alert("error during currentSession()" + e);
        // }

        try {
            await Auth.signIn("admin@example.com", "Passw0rd!");
            console.log("Logged in");
        } catch (e) {
            alert("signin problem: " + e);
        }

        try {
            const event = await this.getEvent(this.props.match.params.eventId);
            this.setState({
                event
            });
        } catch (e) {
            alert("error during getEvent: " + e);
        }
    }

    getEvent(id) {
        console.log("Calling get: " + id)
        return API.get("events", `/events/${id}`);
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
                        A container is a fixed width element that wraps your site's content. It remains a constant size
                        and
                        uses <b>margin</b> to center. Containers are the simplest way to center page content inside a
                        grid.
                    </p>
                </Container>
                }
            </div>
        );
    }
}