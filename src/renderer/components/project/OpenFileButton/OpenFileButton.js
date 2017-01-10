// MIT © 2017 azu
"use strict";
const React = require("react");
import {Button, ButtonType} from "office-ui-fabric-react";
export default function OpenFileButton({onClick}) {
    return <Button onClick={onClick} icon="OpenFile" buttonType={ ButtonType.command }>
        Open File
    </Button>;
}