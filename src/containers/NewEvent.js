import React, {Component} from "react";
import shortid from "shortid";
import {API} from "aws-amplify/lib/index";
import {Button, Form, Grid, Header, Loader, Segment} from "semantic-ui-react";

export default class NewEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: '',
            title: '',
            isLoading: null,
            userId: ''
        };
    }

    componentDidMount() {
        if (!this.props.isAuthenticated) {
            console.log("not authenticated");
            this.props.history.push("/login");
        }
    }

    handleChange = (e, {name, value}) => this.setState({[name]: value});

    handleSubmit = async e => {
        e.preventDefault();

        this.setState({isLoading: true});
        let eventId = shortid.generate();
        try {
            let event = {
                eventId: eventId,
                owner: this.state.owner,
                title: this.state.title
            };
            console.log(event);
            this.createEvent(event).then(() => {
                console.log("event created");
                this.props.history.push('/events/' + eventId);
            });
        } catch (e) {
            alert(e);
            this.setState({isLoading: false});
        }
    };

    createEvent(event) {
        return API.post("events", "/events", {
            body: event
        });
    }

    renderCreateEventForm() {
        const {owner, title} = this.state;

        return (
            <div style={{marginTop: '4em'}}>
                <Grid
                    textAlign='center'
                    style={{height: '100%'}}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as='h2' color='teal' textAlign='center'>
                            {' '}Create new event
                        </Header>
                        <Form size='large' onSubmit={this.handleSubmit}>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Your name'
                                    name='owner'
                                    value={owner}
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    fluid icon='birthday'
                                    iconPosition='left'
                                    placeholder='Event title'
                                    name='title'
                                    value={title}
                                    onChange={this.handleChange}
                                />
                                <Button color='teal' fluid size='large'>Create</Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
                <Loader active={this.state.isLoading}/>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderCreateEventForm()}
            </div>
        );
    }

}
