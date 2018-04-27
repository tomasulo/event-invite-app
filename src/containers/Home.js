import React, {Component} from "react";
import {Container, Header} from "semantic-ui-react";
import {API} from "aws-amplify/lib/index";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            events: []
        };
    }

    async componentDidMount() {
        if (!this.props.isAuthenticated) {
            console.log("not authenticated");
            this.props.history.push("/login");
            return;
        }

        try {
            const events = await this.events();
            this.setState({events});
            console.log(events);
        } catch (e) {
            console.log(e)
        }
    }

    events() {
        return API.get("events", "/events");
    }

    render() {
        return (
            <Container text style={{marginTop: '4em'}}>
                <Header as='h1'>RSVP ME - A simple event website</Header>
            </Container>
        );
    }
}

