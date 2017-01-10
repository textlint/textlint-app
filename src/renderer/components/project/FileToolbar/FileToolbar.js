// MIT © 2017 azu
"use strict";
const React = require("react");
import {CommandBar} from "office-ui-fabric-react";
/**
 * @param {Array} [items]
 * @param {Array} [farItems]
 * @returns {XML}
 * @constructor
 */
export default function FileToolbar({items =[], farItems = []}) {
    return <CommandBar
        className="FileToolbar"
        isSearchBoxVisible={ false }
        items={items}
        farItems={farItems}
    />
}