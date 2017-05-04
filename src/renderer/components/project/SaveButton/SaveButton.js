// MIT © 2017 azu
"use strict";
import i18next from "i18next";
const React = require("react");
const classnames = require("classnames");
import { PrimaryButton } from "office-ui-fabric-react";
export default class SaveButton extends React.Component {
    static propTypes = {
        className: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        onClick: React.PropTypes.func.isRequired
    };

    render() {
        return <PrimaryButton
            disabled={this.props.disabled}
            className={classnames("SaveButton", this.props.className)}
            iconProps={{ iconName: "Save" }}
            onClick={this.props.onClick}>
            {i18next.t("Save")}
        </PrimaryButton>;
    }
}
