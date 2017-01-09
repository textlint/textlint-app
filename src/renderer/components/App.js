// MIT © 2017 azu
"use strict";
const React = require("react");
const locator = require("textlint-app-locator");
import NavigationContainer from "./container/NavigationContainer/NavigationContainer";
import TextlintrcEditorContainer from "./container/TextlintrcEditorContainer/TextlintrcEditorContainer";
import TextlintEditorContainer from "./container/TextlintEditorContainer/TextlintEditorContainer";
export default class App extends React.Component {

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
        return <div className="App">
            <NavigationContainer className="App-nav"/>
            <div className="App-main" role="main">
                <TextlintEditorContainer textlintrcEditor={this.state.textlintrcEditor} />
                <TextlintrcEditorContainer textlintrcEditor={this.state.textlintrcEditor}/>
            </div>
        </div>;
    }
}
