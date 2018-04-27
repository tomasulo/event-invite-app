import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./components/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import Event from "./components/Event";
import CreateEvent from "./components/CreateEvent";

export default ({childProps}) =>
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps}/>
        <AppliedRoute path="/login" exact component={Login} props={childProps}/>
        <AppliedRoute path="/signup" exact component={Signup} props={childProps}/>
        <AppliedRoute path="/events/new" exact component={CreateEvent} props={childProps}/>
        <AppliedRoute path="/events/:id" exact component={Event} props={childProps}/>

        {/* Finally, catch all unmatched routes */}
        <Route component={NotFound}/>
    </Switch>;



