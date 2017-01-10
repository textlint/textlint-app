// MIT © 2017 azu
"use strict";
const React = require("react");
const classnamaes = require("classnames");
const CodeMirror = require("react-codemirror");
require("codemirror/lib/codemirror.css");
require("codemirror/mode/javascript/javascript");
import {Label} from 'office-ui-fabric-react';
export default class TextlintrcEditor extends React.Component {
    static propTypes = {
        className: React.PropTypes.string,
        value: React.PropTypes.string,
        onChange: React.PropTypes.func
    };

    constructor() {
        super();
        this.state = {
            textValue: ""
        };
    }

    componentWillReceiveProps(props) {
        if (this.state.textValue !== props.value) {
            this.setState({
                textValue: props.value
            });
        }
    }

    render() {
        const options = {
            lineNumbers: true,
            mode: "javascript"
        };
        const className = classnamaes("TextlintrcEditor", this.props.className);
        return <div className={className}>
            <Label>.textlintrc configuration</Label>
            <CodeMirror value={this.state.textValue}
                        onChange={this.props.onChange}
                        options={options}/>
        </div>;
    }
}
