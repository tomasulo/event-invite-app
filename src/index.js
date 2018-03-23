import React from 'react';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import Event from './components/Event';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Amplify, {Auth} from "aws-amplify";
import config from "./config";

Amplify.configure({
    Auth: {
        mandatorySignIn: false,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
    },
    API: {
        endpoints: [
            {
                name: "events",
                endpoint: config.apiGateway.URL,
                region: config.apiGateway.REGION
            },
        ]
    }
});

ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={App}/>
            <Route path="/event/:eventId" component={Event}/>
        </div>
    </Router>
    ,
    document.getElementById('root')
);

