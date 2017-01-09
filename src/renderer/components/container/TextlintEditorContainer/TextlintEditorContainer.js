// MIT © 2017 azu
"use strict";
const React = require("react");
import TextlintEditor from "../../project/TextlintEditor/TextlintEditor";
// state
import {TextlintrcEditorState} from "../../../store/TextlintrcEditor/TextlintrcEditorStore";
export default class TextlintEditorContainer extends React.Component {
    static propTypes = {
        textlintrcEditor: React.PropTypes.instanceOf(TextlintrcEditorState).isRequired
    };

    render() {
        /**
         * @type {TextlintrcEditorState}
         */
        const textlintrcEditor = this.props.textlintrcEditor;
        return <TextlintEditor
            textlintrcFilePath={textlintrcEditor.filePath}
            modulesDirectory={textlintrcEditor.modulesDirectory}
        />;
    }
}
