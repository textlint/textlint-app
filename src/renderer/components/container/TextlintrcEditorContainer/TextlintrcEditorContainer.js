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
export default class TextlintrcEditorContainer extends React.Component {

    constructor() {
        super();

        this.state = {
            textValue: `{
  "filters": {
    "comments": true,
    "whitelist": {
      "allow": [
        "/{{[a-zA-Z.]*?}}/",
        "と考えるかもしれません"
      ]
    }
  },
  "rules": {
    "ja-no-redundant-expression": true,
    "no-js-function-paren": {
      "allow": [
        "Symbol"
      ]
    },
    "preset-ja-technical-writing": {
      "no-exclamation-question-mark": {
        "allowFullWidthQuestion": true
      }
    },
    "eslint": {
      "configFile": "./config/markdown.eslintrc.js"
    },
    "prh": {
      "rulePaths": [
        "prh.yml"
      ]
    }
  }
}
`
        };
        this.onClickInstall = (event) => {
            const textValue = this.state.textValue;
            locator.context.useCase(UpdateTextlintrcUseCase.create()).execute(textValue).then(() => {
                return locator.context.useCase(InstallTextlintPackageUseCase.create()).execute();
            })
        };
        this.onChangeValue = (value) => {
            locator.context.useCase(UpdateTextlintrcUseCase.create()).execute(value);
        };
        this.onSubmitDirectory = (value) => {
            console.log(value);
        }
    }

    render() {
        /**
         * @type {TextlintrcEditorState}
         */
        const textlintrcEditor = this.props.textlintrcEditor;
        const workingDirectory = textlintrcEditor.workingDirectory;
        const message = textlintrcEditor.isLoading ? "ロード中" : "";
        return <div className="TextlintrcEditorContainer">
            <h1 className="TextlintrcEditorContainer-title ms-font-su ms-fontColor-themePrimary">.textlintrc editor</h1>
            <MessageNotification>{message}</MessageNotification>
            <DirectoryInput defaultDir={workingDirectory} onSubmit={this.onSubmitDirectory}/>
            <TextlintrcEditor
                className="TextlintrcEditorContainer-editor"
                value={this.state.textValue}
                onChange={this.onChangeValue}
            />
            <InstallButton onClick={this.onClickInstall}/>
        </div>;
    }
}