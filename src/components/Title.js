import React from "react";
import {Header, Icon} from "semantic-ui-react";

export const Title = ({title, owner}) => (
    <Header as='h1' icon dividing textAlign='center'>
        <Icon name='users' circular/>
        {title}
        <Header.Subheader>
            Created by {owner}
        </Header.Subheader>
    </Header>
);