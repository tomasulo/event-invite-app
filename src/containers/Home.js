import React, {Component} from "react";
import {Container, Header, List} from "semantic-ui-react";
import {API} from "aws-amplify/lib/index";
import {Link} from "react-router-dom";

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
        } catch (e) {
            alert(e);
        }

        this.setState({isLoading: false});
    }

    events() {
        return API.get("events", "/events");
    }

    renderEventsList(events) {
        console.log(events);

        const listItems = [{}].concat(events).map(
            (event, i) =>
                i !== 0
                    ? <List.Item key={i} as={Link} to={`/events/${event.eventId}`}>
                        <List.Icon name='github' size='large' verticalAlign='middle'/>
                        <List.Content>
                            <List.Header>{event.title}</List.Header>
                            <List.Description>{"Created: " + new Date(event.createdAt).toLocaleString('de-DE')}</List.Description>
                        </List.Content>
                    </List.Item>
                    : <List.Item key={i} as={Link} to={`/events/new`}>
                        <List.Icon name='plus' size='large' verticalAlign='middle'/>
                        <List.Content>
                            <List.Header>Create a new event</List.Header>
                        </List.Content>
                    </List.Item>
        );

        return (
            <List divided relaxed>{listItems}</List>
        );
    }

    renderEvents() {
        return (
            <Container text style={{marginTop: '4em'}}>
                <Header as='h1'>Your Events</Header>
                {!this.state.isLoading && this.renderEventsList(this.state.events)}
            </Container>
        );
    }

    renderLander() {
        return (
            <Container text style={{marginTop: '4em'}}>
                <Header as='h1'>RSVP ME - A simple event website</Header>
            </Container>
        );
    }

    render() {
        return (
            <div className="Home">
                {this.props.isAuthenticated ? this.renderEvents() : this.renderLander()}
            </div>
        );
    }
}

