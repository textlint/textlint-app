// MIT © 2017 azu
"use strict";
const React = require("react");
const locator = require("textlint-app-locator");
import TextlintrcEditor from "../../project/TextlintrcEditor/TextlintrcEditor";
import InstallButton from "../../project/InstallButton/InstallButton";
import DirectoryInput from "../../project/DirectoryInput/DirectoryInput";
import MessageNotification from "../../project/MessageNotification/MessageNotification";
// use-case
import InstallTextlintPackageUseCase from "../../../use-case/workspace/InstallTextlintPackageUseCase";
import UpdateTextlintrcUseCase from "../../../use-case/textlintrc/UpdateTextlintrcUseCase";
// state
import {TextlintrcEditorState} from "../../../store/TextlintrcEditor/TextlintrcEditorStore";
export default class TextlintrcEditorContainer extends React.Component {

    static propTypes = {
        textlintrcEditor: React.PropTypes.instanceOf(TextlintrcEditorState).isRequired
    };

    constructor() {
        super();

        this.onClickInstall = event => {
            return locator.context.useCase(InstallTextlintPackageUseCase.create()).execute();
        };
        this.onChangeValue = value => {
            locator.context.useCase(UpdateTextlintrcUseCase.create()).execute(value);
        };
        this.onSubmitDirectory = value => {
            console.log(value);
        };
    }

    render() {
        /**
         * @type {TextlintrcEditorState}
         */
        const textlintrcEditor = this.props.textlintrcEditor;
        const workingDirectory = textlintrcEditor.workingDirectory;
        const message = textlintrcEditor.isLoading ? "ロード中" : "";
        return <div className="TextlintrcEditorContainer">
            <h1 className="TextlintrcEditorContainer-title ms-font-xxl ms-fontColor-themePrimary">.textlintrc</h1>
            <MessageNotification>{message}</MessageNotification>
            <DirectoryInput defaultDir={workingDirectory} onSubmit={this.onSubmitDirectory}/>
            <TextlintrcEditor
                className="TextlintrcEditorContainer-editor"
                value={textlintrcEditor.textValue}
                onChange={this.onChangeValue}
            />
            <InstallButton onClick={this.onClickInstall}/>
        </div>;
    }
}
