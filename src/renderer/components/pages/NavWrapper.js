// MIT © 2017 azu
"use strict";
const React = require("react");
import NavigationContainer from "../container/NavigationContainer/NavigationContainer";

import TextlintEditorPage from "./TextlintEditorPage";
import TextlintrcEditorPage from "./TextlintrcEditorPage";
export default class NavWrapper extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object
    };
    static propTypes = {
        children: React.PropTypes.element
    };

    static routes = [
        {
            name: "Edit with textlint",
            path: "/",
            icon: "Edit",
            Component: TextlintEditorPage
        },
        {
            name: "Settings",
            path: "/TextlintrcEditorPage",
            icon: "Settings",
            Component: TextlintrcEditorPage
        }
    ];

    render() {
        const router = this.context.router;
        const currentPath = router.routes[0].path;
        return <div className="App">
            <NavigationContainer
                className="App-nav"
                currentPath={currentPath}
                routes={NavWrapper.routes}/>
            <div className="App-main">
                {this.props.children}
            </div>
        </div>;
    }
}
