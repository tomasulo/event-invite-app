import React, {Component} from "react";
import {Container, Header} from "semantic-ui-react";

const API = 'https://xzy27n57nb.execute-api.eu-central-1.amazonaws.com/prod/events/';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    // componentDidMount() {
    //     if (this.props.isAuthenticated) {
    //         fetch(API)
    //             .then(response => response.json())
    //             .then(data => {
    //                 console.log(data);
    //             });
    //     } else {
    //         console.log("not authenticated")
    //     }
    // }


    render() {
        return (
            <Container text style={{marginTop: '4em'}}>
                <Header as='h1'>RSVP ME - A simple event website</Header>
            </Container>
        );
    }
}

