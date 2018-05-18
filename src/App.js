import React, {Component} from 'react';
import {Container, Icon, Menu} from "semantic-ui-react";
import Routes from "./Routes";
import {Link, withRouter} from "react-router-dom";
import {Auth} from "aws-amplify";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            isAuthenticating: true,
            activeItem: 'home'
        };
    }

    userHasAuthenticated = authenticated => {
        this.setState({isAuthenticated: authenticated});
    };

    handleItemClick = (e, {name}) => this.setState({activeItem: name});

    handleLogout = async e => {
        await Auth.signOut();
        this.userHasAuthenticated(false);
        this.props.history.push("/login");
    };

    async componentDidMount() {
        try {
            if (await Auth.currentSession()) {
                this.userHasAuthenticated(true);
            }
        }
        catch(e) {
            if (e !== 'No current user') {
                alert(e);
            }
        }

        this.setState({ isAuthenticating: false });
    }

    render() {
        const childProps = {
            isAuthenticated: this.state.isAuthenticated,
            userHasAuthenticated: this.userHasAuthenticated
        };
        const {activeItem} = this.state;
        return (
            !this.state.isAuthenticating &&
            <div>
                <Container text>
                    <Menu pointing secondary>
                        <Menu.Item header as={Link} to='/'><Icon name='group' size='large'/>RSVP</Menu.Item>
                        {this.state.isAuthenticated
                            ? <Menu.Menu position='right'>
                                <Menu.Item name='logout' active={activeItem === 'logout'}
                                           onClick={this.handleLogout}/>
                            </Menu.Menu>
                            : <Menu.Menu position='right'>
                                <Menu.Item name='login' as={Link} to='/login' active={activeItem === 'login'}
                                           onClick={this.handleItemClick}/>
                                < Menu.Item name='signup' as={Link} to='/signup' active={activeItem === 'signup'}
                                            onClick={this.handleItemClick}/>

                            </Menu.Menu>
                        }
                    </Menu>
                    <Routes childProps={childProps}/>
                </Container>
            </div>
        )
    }
}

export default withRouter(App);