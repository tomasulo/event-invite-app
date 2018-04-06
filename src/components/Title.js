import React from "react";
import {Header, Icon} from "semantic-ui-react";

export const Title = ({title, user}) => (
    <Header as='h1' icon dividing textAlign='center'>
        <Icon name='users' circular/>
        {title}
        <Header.Subheader>
            Created by {user}
        </Header.Subheader>
    </Header>
);