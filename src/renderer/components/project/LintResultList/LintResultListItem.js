// MIT © 2017 azu
"use strict";
const React = require("react");
const suitcssClassnames = require("suitcss-classnames");
const className = require("classnames");
/**
 * @typedef {Object} LintResultListItemProps
 * @property {string} message
 * @property {number} startLine
 * @property {number} startCh
 * @property {boolean} isFixable
 */
/**
 * @param {LintResultListItemProps} item
 * @returns {XML}
 * @constructor
 */
export default function LintResultListItem({item}) {
    const className = suitcssClassnames({
        component: "LintResultListItem",
        states: {
            "is-error": true,
            "is-fixable": item.isFixable
        }
    });
    return (
        <div className={className} onClick={item.onClick}>
            <span className='ms-ListItem-tertiaryText'>{item.message}</span>
            <span className='ms-ListItem-metaText'>@{`${item.startLine}:${item.startCh}`}</span>
        </div>
    );
}
