// MIT © 2017 azu
"use strict";
const React = require("react");
import { Button } from 'office-ui-fabric-react';
export default class InstallButton extends React.Component {
    static propsTypes = {
        onClick: React.PropTypes.func.isRequired
    };

    render() {
        return <Button className="InstallButton" onClick={this.props.onClick}>
            インストール
        </Button>
    }
}