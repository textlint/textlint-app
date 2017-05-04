// MIT © 2017 azu
"use strict";
const React = require("react");
import i18next from "i18next";
import {
    TextField,
    DefaultButton,
    Label
} from "office-ui-fabric-react";
export default class DirectoryInput extends React.Component {
    static propTypes = {
        onSubmit: React.PropTypes.func.isRequired,
        defaultDir: React.PropTypes.string
    };

    constructor() {
        super();
        this.state = {
            value: undefined
        };

        this._onChanged = value => {
            if (!value) {
                return;
            }
            return this.setState({
                value
            });
        };

    }

    render() {
        const submit = () => {
            this.props.onSubmit(this.state.value);
        };
        return <div className="DirectoryInput">
            <Label>{i18next.t("You can set .textlintrc working directory.")}</Label>
            <div className="DirectoryInput-main">
                <TextField
                    className='DirectoryInput-textField'
                    label="Working directory"
                    defaultValue={this.props.defaultDir}
                    onChanged={this._onChanged}
                />
                <DefaultButton
                    className="DirectoryInput-submitButton"
                    onClick={submit}>
                    {i18next.t("Load")}
                </DefaultButton>
            </div>
        </div>;
    }
}
