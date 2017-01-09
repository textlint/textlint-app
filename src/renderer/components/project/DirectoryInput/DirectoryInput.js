// MIT © 2017 azu
"use strict";
const React = require("react");
import {
    TextField
} from "office-ui-fabric-react";
import {
    Button
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
            <TextField
                className='DirectoryInput-textField'
                label="Setting Directory"
                value={this.state.value}
                defaultValue={this.props.defaultDir}
                onChanged={this._onChanged}
            />
            <Button className="DirectoryInput-submitButton" onClick={submit}>決定</Button>
        </div>;
    }
}
