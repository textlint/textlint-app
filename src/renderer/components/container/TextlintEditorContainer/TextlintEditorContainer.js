// MIT © 2017 azu
"use strict";
const React = require("react");
const {dialog} = require("electron").remote;
const debounce = require("lodash.debounce");
const markdownExtensions = require("markdown-extensions");
const locator = require("textlint-app-locator");
import TextlintEditor from "../../project/TextlintEditor/TextlintEditor";
import FileToolbar from "../../project/FileToolbar/FileToolbar";
import LintResultList from "../../project/LintResultList/LintResultList";
// state
import {TextlintEditorState} from "../../../store/TextlintEditor/TextlintEditorStore";
import {TextlintrcEditorState} from "../../../store/TextlintrcEditor/TextlintrcEditorStore";
// use-case
import OpenNewFileUseCase from "../../../use-case/textlint-editor/OpenNewFileUseCase.js";
import UpdateTextUseCase from "../../../use-case/textlint-editor/UpdateTextUseCase";
export default class TextlintEditorContainer extends React.Component {
    static propTypes = {
        textlintEditor: React.PropTypes.instanceOf(TextlintEditorState).isRequired,
        textlintrcEditor: React.PropTypes.instanceOf(TextlintrcEditorState).isRequired
    };

    constructor() {
        super();
        /**
         * @type {null|TextlintEditor}
         */
        this.TextlintEditor = null;
        this.state = {
            // codemirror error format
            lintErrors: [],
            // textlint message format
            lintMessages: []
        };
        this.onChangeTextlintEditor = value => {
            locator.context.useCase(UpdateTextUseCase.create()).execute(value);
        };
        this.onLintError = ({lintErrors, lintMessages}) => {
            this.setState({
                lintErrors,
                lintMessages
            });
        };
        this.onClickOpenFile = event => {
            const options = {
                title: "Open File for linting",
                filters: [
                    {name: "Markdown", extensions: markdownExtensions}
                ],
                properties: ["openFile"]
            };
            dialog.showOpenDialog(options, filenames => {
                if (filenames.length <= 0) {
                    return;
                }
                const filename = filenames[0];
                locator.context.useCase(OpenNewFileUseCase.create()).execute(filename);
            });
        };
        this.onClickLintItem = lintError => {
            if (this.TextlintEditor) {
                this.TextlintEditor.jumpToPos({
                    line: lintError.from.line,
                    ch: lintError.from.ch
                });
            }
        };
    }

    /**
     * @param {Function} onOpenFile
     * @returns {[*]}
     */
    createMenuItems({onOpenFile}) {
        return [
            {
                name: "Open File",
                key: "OpenFile",
                icon: "OpenFile",
                onClick: onOpenFile
            }
        ];
    }

    render() {
        /**
         * @type {TextlintrcEditorState}
         */
        const textlintrcEditor = this.props.textlintrcEditor;
        /**
         * @type {TextlintEditorState}
         */
        const textlintEditor = this.props.textlintEditor;
        const items = this.createMenuItems({
            onOpenFile: this.onClickOpenFile
        });
        /**
         * @type {LintResultListItemProps[]}
         */
        const messages = this.state.lintErrors.map((lintError, index) => {
            /**
             * @type {TextLintMessage}
             */
            const lintMessage = this.state.lintMessages[index];
            return {
                message: lintError.message,
                startLine: lintError.from.line,
                startCh: lintError.from.ch,
                isFixable: lintMessage.fix !== undefined,
                onClick: this.onClickLintItem.bind(this, lintError)
            };
        });
        return <div className="TextlintEditorContainer">
            <div className="TextlintEditorContainer-wrapper">
                <div className="TextlintEditorContainer-header">
                    <h1 className="TextlintEditorContainer-title ms-font-xxl ms-fontColor-themePrimary">Edit with
                        textlint</h1>
                    <div className="TextlintEditorContainer-toolbar">
                        <FileToolbar farItems={items}/>
                    </div>
                </div>
                <div className="TextlintEditorContainer-main">
                    <TextlintEditor
                        ref={c => this.TextlintEditor = c }
                        className="TextlintEditorContainer-mainEditor"
                        value={textlintEditor.textContent}
                        defaultValue={textlintEditor.textContent}
                        onChange={this.onChangeTextlintEditor}
                        onLintError={this.onLintError}
                        textlintrcFilePath={textlintrcEditor.filePath}
                        modulesDirectory={textlintrcEditor.modulesDirectory}
                    />
                    <div className="TextlintEditorContainer-mainResult">
                        <h2 className="TextlintEditorContainer-mainResultTitle ms-font-l">Lint Errors</h2>
                        <LintResultList items={messages}/>
                    </div>
                </div>
            </div>
        </div>;
    }
}
