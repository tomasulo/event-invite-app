import React, {Component} from "react";
import shortid from "shortid";
import {API} from "aws-amplify/lib/index";
import {Button, Form, Grid, Header, Loader, Segment} from "semantic-ui-react";

export default class CreateEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            title: '',
            isLoading: null
        };
    }

    handleChange = (e, {name, value}) => this.setState({[name]: value})

    handleSubmit = async e => {
        e.preventDefault();

        this.setState({isLoading: true});

        let eventId = shortid.generate();

        try {
            await this.createEvent({
                eventId: eventId,
                user: this.state.user,
                title: this.state.title
            });
            console.log("event created");

            this.props.history.push('/event/' + eventId);
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

    render() {
        const {user, title} = this.state;

        return (
            <div className='login-form'>
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
                                    name='user'
                                    value={user}
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    fluid icon='birthday'
                                    iconPosition='left'
                                    placeholder='Eventname'
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

}
