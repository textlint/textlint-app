// MIT © 2017 azu
"use strict";
const React = require("react");
import LintResultListItem from "./LintResultListItem";
import {List} from "office-ui-fabric-react";
export default class LintResultList extends React.Component {
    render() {
        return <div className="LintResultList " data-is-scrollable={ true }>
            <List
                items={ this.props.items }
                onRenderCell={ (item, index) => (
                    <LintResultListItem item={item}/>
                )}
            />
        </div>
    }

}