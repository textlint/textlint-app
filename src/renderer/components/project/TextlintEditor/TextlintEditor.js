// MIT © 2017 azu
"use strict";
// node
const remote = require("electron").remote;
const createValidator = remote.require("textlint-app-textlint-to-codemirror");
const debug = require("debug")("textlint-app:TextlintEditor");
const debounce = require("lodash.debounce");
// main
const React = require("react");
const CodeMirror = require("react-codemirror");
require("codemirror/mode/markdown/markdown.js");
require("codemirror/addon/lint/lint.js");
require("codemirror/addon/lint/lint.css");
// search
require("codemirror/addon/dialog/dialog.css");
require("codemirror/addon/search/matchesonscrollbar.css");
require("codemirror/addon/dialog/dialog.js");
require("codemirror/addon/search/searchcursor.js");
require("codemirror/addon/search/search.js");
require("codemirror/addon/scroll/annotatescrollbar.js");
require("codemirror/addon/search/matchesonscrollbar.js");
require("codemirror/addon/search/jump-to-line.js");
export default class TextlintEditor extends React.Component {
    static propTypes = {
        modulesDirectory: React.PropTypes.string,
        textlintrcFilePath: React.PropTypes.string,
        value: React.PropTypes.string,
        onChange: React.PropTypes.func,
        onLintError: React.PropTypes.func
    };

    constructor() {
        super();

        /**
         * @private
         */
        this._CodeMirror = null;
        this.state = {
            textValue: ""
        };
        this.updateValue = this._updateValue.bind(this);
        this.validator = this._createValidator();
    }

    jumpToPos({line, ch}) {
        if(!this._CodeMirror){
            return;
        }
        const codeMirror = this._CodeMirror.getCodeMirror();
        codeMirror.focus();
        codeMirror.setCursor({line, ch});
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.textValue !== nextState.textValue) {
            return true;
        }
        if (this.props.value !== nextProps.value) {
            return true;
        }
        return false;
    }

    componentWillReceiveProps(props) {
        if (this.props.value !== props.value) {
            this._updateValue(props.value);
        }
        if (this.props.textlintrcFilePath !== props.textlintrcFilePath ||
            this.props.modulesDirectory !== props.nodeModulesDirectory
        ) {
            this.validator = debounce(this._createValidator({
                textlintrcFilePath: props.textlintrcFilePath,
                nodeModulesDirectory: props.modulesDirectory
            }), 300);
        }
    }

    componentDidMount() {
        if (this._CodeMirror) {
            const codeMirror = this._CodeMirror.getCodeMirror();
            codeMirror.getScrollerElement().style.minHeight = "30em";
            codeMirror.refresh();
        }
    }

    render() {
        const options = {
            lineNumbers: true,
            lineWrapping: true,
            mode: "markdown",
            extraKeys: {"Alt-F": "findPersistent"},
            gutters: ["CodeMirror-lint-markers"],
            lint: {
                "getAnnotations": this.validator,
                "async": true
            }
        };
        return <div className="TextlintEditor">
            <CodeMirror
                ref={(c) => this._CodeMirror = c }
                value={this.state.textValue}
                onChange={this.updateValue}
                options={options}/>
        </div>;
    }

    /**
     * @param {string}value
     * @private
     */
    _updateValue(value) {
        if (this.state.textValue !== value) {
            this.setState({
                textValue: value
            });
        }
    }

    /**
     *
     * @param {string} [textlintrcFilePath]
     * @param {string} [nodeModulesDirectory]
     * @returns {function()}
     * @private
     */
    _createValidator({
        textlintrcFilePath,
        nodeModulesDirectory
    } = {}) {
        if (!textlintrcFilePath || !nodeModulesDirectory) {
            return (text, callback) => {
                callback([]);
            }
        }
        const validator = createValidator({textlintrcFilePath, nodeModulesDirectory});
        let isLinting = false;
        return (text, callback) => {
            if (!text) {
                return callback([]);
            }
            if (isLinting) {
                return;
            }
            isLinting = true;
            validator(text).then(results => {
                isLinting = false;
                debug(`Found ${results.length} Errors`);
                const copiedResults = results.map(result => {
                    return {
                        from: {
                            line: result.from.line,
                            ch: result.from.ch
                        },
                        to: {
                            line: result.to.line,
                            ch: result.to.ch
                        },
                        message: result.message,
                        severity: result.severity
                    }
                });
                callback(copiedResults);
                this.props.onLintError(copiedResults);
            }).catch(error => {
                debug(error);
            });
        };
    }
}
