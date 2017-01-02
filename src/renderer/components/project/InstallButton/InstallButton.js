// MIT © 2017 azu
"use strict";
const React = require("react");
export default class InstallButton extends React.Component {
    static propsTypes = {
        onClick: React.PropTypes.func.isRequired
    };

    render() {
        return <button className="InstallButton" onClick={this.props.onClick}>
            インストール
        </button>
    }
}