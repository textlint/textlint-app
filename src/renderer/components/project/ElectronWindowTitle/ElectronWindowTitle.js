// MIT © 2017 azu
"use strict";
const React = require("react");
const remote = require("electron").remote;
export default class ElectronWindowTitle extends React.Component {
    static propTypes = {
        children: React.PropTypes.string.isRequired
    };

    shouldComponentUpdate(nextProps) {
        return this.props.children !== nextProps.children;
    }

    componentDidMount() {
        const currentWindow = remote.getCurrentWindow();
        currentWindow.setTitle(this.getTitle());
    }

    componentDidUpdate() {
        const currentWindow = remote.getCurrentWindow();
        currentWindow.setTitle(this.getTitle());
    }

    getTitle() {
        return `textlint app${  this.props.children ? ` [${ this.props.children }]` : ""}`;
    }

    render() {
        return null;
    }
}
