// MIT © 2017 azu
"use strict";

const React = require("react");
import {
    MessageBar,
    MessageBarType
} from "office-ui-fabric-react";
export default class MessageNotification extends React.Component {
    static propTypes = {
        children: React.PropTypes.element
    };

    render() {
        if (!this.props.children) {
            return null;
        }
        return <MessageBar>{this.props.children}</MessageBar>;
    }
}
