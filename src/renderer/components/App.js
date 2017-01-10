// MIT © 2017 azu
"use strict";
const React = require("react");
const locator = require("textlint-app-locator");
//
import {Router, hashHistory, Route} from "react-router";
// page
import NavWrapper from "./pages/NavWrapper";
export default class App extends React.Component {

    render() {
        const routes = NavWrapper.routes.map(routeObject => {
            return <Route key={routeObject.path} path={routeObject.path} component={routeObject.Component}/>;
        });
        return <Router history={hashHistory}>
            {routes}
        </Router>;
    }
}
