// MIT © 2017 azu
"use strict";
import i18next from "i18next";
// node
const remote = require("electron").remote;
const textlintToCodeMirror = require("textlint-message-to-codemirror");
const TextLintEngine = remote.require("textlint").TextLintEngine;
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
        defaultValue: React.PropTypes.string,
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
            textValue: i18next.t(`# Usage

1. Setting .textlintrc. (Go to \`.textlintrc\` tab)
2. Install textlint rules via .textlintrc. (In \`.textlintrc\` tab)
3. Write Texts and Lint! (Here!)
`)
        };
        this.updateValue = this._updateValue.bind(this);
        this.validator = this._createValidator();
    }

    jumpToPos({line, ch}) {
        if (!this._CodeMirror) {
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
            // Workaround for IME position
            // https://github.com/codemirror/CodeMirror/issues/4089
            // https://github.com/BoostIO/Boostnote/commit/8f1c198406d68ef7818a84f4201c6df446e14592
            codeMirror.getInputField().style.marginBottom = "-2em";
            codeMirror.refresh();
        }
    }

    render() {
        const options = {
            lineNumbers: true,
            lineWrapping: true,
            mode: "markdown",
            inputStyle: "textarea",
            extraKeys: {"Alt-F": "findPersistent"},
            gutters: ["CodeMirror-lint-markers"],
            lint: {
                "getAnnotations": this.validator,
                "async": true
            }
        };
        return <div className="TextlintEditor">
            <CodeMirror
                ref={c => this._CodeMirror = c }
                value={this.state.textValue}
                defaultValue={this.props.defaultValue}
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
            this.props.onChange(value);
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
        debug("textlintrcFilePath", textlintrcFilePath, "nodeModulesDirectory", nodeModulesDirectory);
        if (!textlintrcFilePath || !nodeModulesDirectory) {
            return (text, callback) => {
                callback([]);
            };
        }
        const engine = new TextLintEngine({
            configFile: textlintrcFilePath,
            rulesBaseDirectory: nodeModulesDirectory
        });
        let isLinting = false;
        return (text, callback) => {
            if (!text) {
                callback([]);
                return;
            }
            if (isLinting) {
                return;
            }
            isLinting = true;
            engine.executeOnText(text, ".md").then(results => {
                isLinting = false;
                const lintMessages = [];
                results.forEach(result => {
                    result.messages.forEach(message => {
                        lintMessages.push(message);
                    });
                });
                debug(`Found ${lintMessages.length} Errors`);
                const lintErrors = lintMessages.map(textlintToCodeMirror);
                this.props.onLintError({
                    lintMessages,
                    lintErrors
                });
                callback(lintErrors);
            }).catch(error => {
                debug(error);
            });
        };
    }
}
