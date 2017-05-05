// MIT © 2017 azu
"use strict";
const React = require("react");
import i18next from "i18next";
const locator = require("textlint-app-locator");
import TextlintrcEditor from "../../project/TextlintrcEditor/TextlintrcEditor";
import InstallButton from "../../project/InstallButton/InstallButton";
import SaveButton from "../../project/SaveButton/SaveButton";
import DirectoryInput from "../../project/DirectoryInput/DirectoryInput";
import MessageNotification from "../../project/MessageNotification/MessageNotification";
import { MessageBar, MessageBarType, Spinner, SpinnerSize } from "office-ui-fabric-react";
// use-case
import InstallTextlintPackageUseCase from "../../../use-case/workspace/InstallTextlintPackageUseCase";
import UpdateTextlintrcUseCase from "../../../use-case/textlintrc/UpdateTextlintrcUseCase";
import UpdateWorkspaceDirectoryUseCase from "../../../use-case/workspace/UpdateWorkspaceDirectoryUseCase";
import WriteToTextlintrcUseCase from "../../../use-case/textlintrc/WriteToTextlintrcUseCase";
import { DismissInstallErrorUseCase } from "../../../use-case/textlintrc/DismissInstallErrorUseCase";
// state
import { TextlintrcEditorState } from "../../../store/TextlintrcEditor/TextlintrcEditorStore";
export default class TextlintrcEditorContainer extends React.Component {

    static propTypes = {
        textlintrcEditor: React.PropTypes.instanceOf(TextlintrcEditorState).isRequired
    };

    constructor() {
        super();

        this.onClickInstall = event => {
            return locator.context.useCase(InstallTextlintPackageUseCase.create()).execute();
        };
        this.onClickSave = event => {
            return locator.context.useCase(WriteToTextlintrcUseCase.create()).execute();
        };
        this.onChangeValue = value => {
            locator.context.useCase(UpdateTextlintrcUseCase.create()).execute(value);
        };
        this.onSubmitDirectory = workingDirectory => {
            if (workingDirectory) {
                locator.context.useCase(UpdateWorkspaceDirectoryUseCase.create()).execute(workingDirectory);
            }
        };
    }

    render() {
        /**
         * @type {TextlintrcEditorState}
         */
        const textlintrcEditor = this.props.textlintrcEditor;
        const workingDirectory = textlintrcEditor.workingDirectory;
        const loadingMessage = textlintrcEditor.isLoading
            ? <Spinner size={ SpinnerSize.large }
                       label='Installing textlint rules...'/>
            : null;
        const errorMessage = textlintrcEditor.installFailureError
            ? <MessageBar messageBarType={ MessageBarType.error } onDismiss={() => {
                locator.context.useCase(DismissInstallErrorUseCase).execute();
            }}>{textlintrcEditor.installFailureError.message}</MessageBar>
            : null;
        return <div className="TextlintrcEditorContainer">
            <h1 className="TextlintrcEditorContainer-title ms-font-xxl ms-fontColor-themePrimary">.textlintrc</h1>
            <ol className="TextlintrcEditorContainer-usage">
                <li>{i18next.t("Set working directory if needed.(Default: use textlint-app working dir)")}</li>
                <li>{i18next.t("Write .textlintrc configuration")}</li>
                <li>{i18next.t("Install textlint rules from the .textlintrc configuration.(Press \"Install\" button)")}</li>
            </ol>
            <MessageNotification>{loadingMessage}</MessageNotification>
            {errorMessage}
            <DirectoryInput defaultDir={workingDirectory} onSubmit={this.onSubmitDirectory}/>
            <TextlintrcEditor
                className="TextlintrcEditorContainer-editor"
                value={textlintrcEditor.textValue}
                onChange={this.onChangeValue}
            />
            <SaveButton
                className="TextlintrcEditorContainer-button"
                disabled={textlintrcEditor.isLoading}
                onClick={this.onClickSave}
            />
            <InstallButton
                className="TextlintrcEditorContainer-button"
                disabled={textlintrcEditor.isLoading}
                onClick={this.onClickInstall}
            />
        </div>;
    }
}
