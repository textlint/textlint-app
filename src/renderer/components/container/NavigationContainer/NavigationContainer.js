// MIT © 2017 azu
"use strict";
const React = require("react");
const classnames = require("classnames");
import {Nav} from "office-ui-fabric-react"
export default class NavigationContainer extends React.Component {
    render() {
        const className = classnames("NavigationContainer", this.props.className);
        return (
            <div className={className}>
                <Nav
                    groups={
                        [
                            {
                                links: [
                                    {
                                        name: 'TextlintApp',
                                        url: 'http://example.com',
                                        key: 'top',
                                        isExpanded: true
                                    },
                                    {
                                        name: 'Textlintrc',
                                        url: 'http://example.com',
                                        key: 'key3',
                                        isExpanded: true
                                    },
                                    {
                                        name: 'Edit',
                                        url: 'http://cnn.com',
                                        onClick: this._onClickHandler2,
                                        icon: 'Edit',
                                        key: 'key8'
                                    }
                                ]
                            }
                        ]
                    }
                    expandedStateText={'expanded'}
                    collapsedStateText={'collapsed'}
                    selectedKey={'key3'}
                />
            </div>
        );
    }
}