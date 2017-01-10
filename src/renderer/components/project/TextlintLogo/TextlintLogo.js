// MIT © 2017 azu
"use strict";
const src = require("./textlint-logo.png");
const React = require("react");
export default class TextlintLogo extends React.Component {
    render() {
        return <img src={src} alt="textlint" {...this.props}/>
    }
}
