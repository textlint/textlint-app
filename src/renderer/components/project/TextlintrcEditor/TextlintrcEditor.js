// MIT © 2017 azu
"use strict";
const React = require("react");
const classnamaes = require("classnames");
const CodeMirror = require("react-codemirror");
require("codemirror/lib/codemirror.css");
require("codemirror/mode/yaml/yaml");
export default class TextlintrcEditor extends React.Component {
    static propTypes = {
        className: React.PropTypes.string,
        value: React.PropTypes.string,
        onChange: React.PropTypes.func
    };

    render() {
        const options = {
            lineNumbers: true,
            mode: "yaml"
        };
        const className = classnamaes("TextlintrcEditor", this.props.className);
        return <div className={className}>
            <CodeMirror
value={this.props.value}
                        onChange={this.props.onChange}
                        options={options}/>
        </div>;
    }
}
