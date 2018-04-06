import React, {Component} from "react";
import {Auth} from "aws-amplify";
import {Button, Form, Grid, Header, Segment} from "semantic-ui-react";
import {Redirect} from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            isAuthenticated: false,
        };
    }

    handleChange = (e, {name, value}) => this.setState({[name]: value})


    handleSubmit = async event => {
        event.preventDefault();

        try {
            await Auth.signIn(this.state.email, this.state.password);
            this.props.userHasAuthenticated(true);
            this.props.history.push("/");
        } catch (e) {
            alert(e.message);
        }
    };

    render() {

        const {isAuthenticated} = this.state

        return (
            <div className='login-form'>
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
                            {' '}Log-in to your account
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    name='email'
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='E-mail address'
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    fluid
                                    name='password'
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    onChange={this.handleChange}
                                />

                                <Button color='teal' fluid size='large' onClick={this.handleSubmit}>Login</Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
                {isAuthenticated && (
                    <Redirect to={'/events/new'}/>
                )}
            </div>
        );
    }
}

