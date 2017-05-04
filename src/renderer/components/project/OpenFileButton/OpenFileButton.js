// MIT © 2017 azu
"use strict";
const React = require("react");
import { CommandButton } from "office-ui-fabric-react";
export default function OpenFileButton({ onClick }) {
    return <CommandButton onClick={onClick} iconProps={{ iconName: "OpenFile" }}>
        Open File
    </CommandButton>;
}
