// MIT © 2017 azu
"use strict";
const React = require("react");
export default function LintResultListItem({item}) {
    return (
        <div className='LintResultListItem is-error' onClick={item.onClick}>
            <span className='ms-ListItem-tertiaryText'>{item.message}</span>
            <span className='ms-ListItem-metaText'>@{`${item.from.line}:${item.from.ch}`}</span>
        </div>
    );
}
