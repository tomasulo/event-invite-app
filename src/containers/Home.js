import React, {Component} from "react";
import {Container, Header} from "semantic-ui-react";

export default class Home extends Component {
    render() {
        return (
            <Container text style={{marginTop: '4em'}}>
                <Header as='h1'>RSVP ME - A simple event website</Header>
            </Container>
        );
    }
}

