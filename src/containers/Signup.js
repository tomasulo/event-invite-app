import React, {Component} from "react";
import {Button, Form, Grid, Header, Message, Segment} from "semantic-ui-react";
import {Auth} from "aws-amplify";

export default class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            email: "",
            password: "",
            confirmPassword: "",
            confirmationCode: "",
            newUser: null
        };
    }

    handleChange = (e, {name, value}) => this.setState({[name]: value})

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({isLoading: true});

        try {
            const newUser = await Auth.signUp({
                username: this.state.email,
                password: this.state.password
            });
            this.setState({
                newUser
            });
        } catch (e) {
            alert(e.message);
        }

        this.setState({isLoading: false});
    };

    handleConfirmationSubmit = async event => {
        event.preventDefault();

        this.setState({isLoading: true});

        try {
            await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
            await Auth.signIn(this.state.email, this.state.password);

            this.props.userHasAuthenticated(true);
            this.props.history.push("/");
        } catch (e) {
            alert(e.message);
            this.setState({isLoading: false});
        }
    };

    renderSignupForm() {
        return (

            <div className='login-form'>
                <Grid
                    textAlign='center'
                    style={{height: '100%'}}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as='h2' color='teal' textAlign='center'>
                            {' '}Create new account
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    name='email'
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='E-mail address'
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    fluid
                                    name='password'
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                <Button color='teal' fluid size='large' onClick={this.handleSubmit}>Signup</Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }

    renderConfirmationForm() {
        return (
            <div className='login-form'>
                <Grid
                    textAlign='center'
                    style={{height: '100%'}}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as='h2' color='teal' textAlign='center'>
                            {' '}Enter confirmation code
                        </Header>
                        <Form size='large' success>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    name='confirmationCode'
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Confirmation code'
                                    value={this.state.confirmationCode}
                                    onChange={this.handleChange}
                                />
                                <Message
                                    success
                                    header='Confirmation code sent'
                                    content="Please enter the confirmation code from our email"
                                />
                                <Button color='teal' fluid size='large' onClick={this.handleConfirmationSubmit}>Confirm</Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.state.newUser === null
                    ? this.renderSignupForm()
                    : this.renderConfirmationForm()}
            </div>
        );
    }
}

