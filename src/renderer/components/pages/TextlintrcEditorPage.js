// MIT © 2017 azu
"use strict";
const React = require("react");

const locator = require("textlint-app-locator");
import NavWrapper from "./NavWrapper.js";
import TextlintrcEditorContainer from "../container/TextlintrcEditorContainer/TextlintrcEditorContainer";

export default class TextlintrcEditorPage extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object
    };

    constructor() {
        super();
        this.state = locator.context.getState();
    }

    componentWillMount() {
        this.releaseOnChage = locator.context.onChange(() => {
            this.setState(locator.context.getState());
        });
    }

    componentWillUnmount() {
        if (this.releaseOnChage) {
            this.releaseOnChage();
        }
    }

    render() {
        return <NavWrapper>
            <TextlintrcEditorContainer {...this.state} />
        </NavWrapper>;
    }
}
