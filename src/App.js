import React, {Component} from 'react';
import {Button, Form, Grid, Header, Segment} from "semantic-ui-react";
import shortid from "shortid";
import {Redirect} from "react-router-dom";
import {API, Auth} from "aws-amplify";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            user: '',
            title: '',
            eventId: '',
            fireRedirect: false,
            loggedIn: false
        };
    }

    componentWillMount() {
        Auth.signIn("admin@example.com", "Passw0rd!")
            .then(user => console.log(user))
            .catch(err => console.log(err));
    }

    handleChange = (e, {name, value}) => this.setState({[name]: value})

    handleSubmit = async e => {
        e.preventDefault();
        this.setState({eventId: shortid.generate()})
        try {
            await this.createEvent({
                eventId: this.state.eventId,
                user: this.state.user,
                title: this.state.title
            });
        } catch (e) {
            alert(e);
            this.setState({isLoading: false});
        }

        this.setState({fireRedirect: true})
    };

    createEvent(event) {
        return API.post("events", "/events", {
            body: event
        });
    }

    render() {
        const {user, title, eventId, fireRedirect} = this.state

        return (
            <div className='login-form'>


                {/*
            Heads up! The styles below are necessary for the correct render of this example.
            You can do same with CSS, the main idea is that all the elements up to the `Grid`
            below must have a height of 100%.
          */}
                <style>{`
            body > div,
            body > div > div,
            body > div > div > div.login-form {
              height: 100%;
            }
          `}</style>
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
                {fireRedirect && (
                    <Redirect to={'/event/' + eventId}/>
                )}
            </div>
        )
    }
}