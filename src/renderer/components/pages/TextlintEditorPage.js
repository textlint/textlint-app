// MIT © 2017 azu
"use strict";
const React = require("react");
const locator = require("textlint-app-locator");
import NavWrapper from "./NavWrapper.js";
import TextlintEditorContainer from "../container/TextlintEditorContainer/TextlintEditorContainer";

export default class TextlintEditorPage extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object
    };

    constructor() {
        super();
        this.state = locator.context.getState();
    }

    componentWillMount() {
        locator.context.onChange(() => {
            this.setState(locator.context.getState());
        });
    }

    render() {
        return <NavWrapper>
            <TextlintEditorContainer {...this.state} />
        </NavWrapper>;
    }
}
