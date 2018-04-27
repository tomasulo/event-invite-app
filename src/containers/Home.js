import React, {Component} from "react";
import {Container, Header, List} from "semantic-ui-react";
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
        return [{}].concat(events).map(
            (event, i) =>
                <List.Item key={i}>
                    <List.Icon name='github' size='large' verticalAlign='middle'/>
                    <List.Content>
                        {/*<List.Header as='a'>{event.eventId}</List.Header>*/}
                        <List.Description as='a' href={`/events/${event.eventId}`}>{event.title}</List.Description>
                    </List.Content>
                </List.Item>
        );
    }

    renderEvents() {
        return (
            <Container text style={{marginTop: '4em'}}>
                <Header as='h1'>Your Events</Header>
                <List divided relaxed>
                    {!this.state.isLoading && this.renderEventsList(this.state.events)}
                </List>
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

