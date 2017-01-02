// MIT © 2017 azu
"use strict";
const React = require("react");
import TextlintrcEditorContainer from "./container/TextlintrcEditorContainer/TextlintrcEditorContainer";
export default class App extends React.Component {

    render() {
        return <div>
            <TextlintrcEditorContainer />
        </div>;
    }
}