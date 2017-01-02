// MIT © 2017 azu
"use strict";
const React = require("react");
const locator = require("textlint-app-locator");
import TextlintrcEditor from "../../project/TextlintrcEditor/TextlintrcEditor";
import InstallButton from "../../project/InstallButton/InstallButton";
// use-case
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
            console.log(textValue);
        };
        this.onChangeValue = (value) => {
            locator.context.useCase(UpdateTextlintrcUseCase.create()).execute(value);
        };
    }

    render() {
        return <div className="TextlintrcEditorContainer">
            <h1 className="TextlintrcEditorContainer-title">.textlintrc editor</h1>
            <InstallButton onClick={this.onClickInstall}/>
            <TextlintrcEditor
                value={this.state.textValue}
                onChange={this.onChangeValue}
            />
        </div>;
    }
}