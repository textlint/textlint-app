// MIT © 2017 azu
"use strict";
// node
const remote = require("electron").remote;
const createValidator = remote.require("/Users/azu/.ghq/github.com/textlint/textlint-app/src/lint.js");
// main
const React = require("react");
const CodeMirror = require("codemirror");
require("codemirror/mode/markdown/markdown.js");
require("codemirror/addon/lint/lint.js");
require("codemirror/addon/lint/lint.css");
export default class TextlintEditor extends React.Component {
    static propTypes = {
        modulesDirectory: React.PropTypes.string,
        textlintrcFilePath: React.PropTypes.string,
    };

    constructor() {
        super();
        this._textareaElement = null;
        this.editor = null;
    }

    componentDidMount() {
        if (this._textareaElement) {
            const validator = this._createValidator({
                textlintrcFilePath: this.props.textlintrcFilePath,
                nodeModulesDirectory: this.props.modulesDirectory
            });
            this.editor = CodeMirror.fromTextArea(this._textareaElement, {
                lineNumbers: true,
                mode: "markdown",
                gutters: ["CodeMirror-lint-markers"],
                lint: {
                    "getAnnotations": validator,
                    "async": true
                }
            });
        }
    }

    render() {
        return <div className="TextlintEditor">
            <textarea id="TextlintEditor-textarea" ref={(c) => this._textareaElement = c }/>
        </div>
    }

    /**
     *
     * @param textlintrcFilePath
     * @param nodeModulesDirectory
     * @returns {function()}
     * @private
     */
    _createValidator({
        textlintrcFilePath,
        nodeModulesDirectory
    }) {
        console.log("textlintrcObject", {textlintrcFilePath, nodeModulesDirectory});
        return (text, callback) => {
            if (!text) {
                return callback([]);
            }
            const validator = createValidator({textlintrcFilePath, nodeModulesDirectory});
            validator(text).then(results => {
                console.log(results);
                callback(results);
            }).catch(error => {
                console.log(error);
                callback([]);
            });
        }
    }
}