// MIT © 2017 azu
"use strict";
const React = require("react");
const classnames = require("classnames");
import {Nav} from "office-ui-fabric-react";
import TextlintLogo from "../../project/TextlintLogo/TextlintLogo";
export default class NavigationContainer extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object
    };

    static propTypes = {
        className: React.PropTypes.string,
        currentPath: React.PropTypes.string,
        routes: React.PropTypes.arrayOf(React.PropTypes.object)
    };

    render() {
        const className = classnames("NavigationContainer", this.props.className);
        const routes = this.props.routes;
        const currentPath = this.props.currentPath;
        const groups = [
            {
                links: routes.map(route => {
                    return {
                        name: route.name,
                        title: ">",
                        url: route.path,
                        key: route.path,
                        onClick: event => {
                            event.preventDefault();
                            if (route.path !== currentPath) {
                                this.context.router.push(route.path);
                            }
                        }
                    };
                })
            }
        ];
        return (
            <div className={className}>
                <TextlintLogo className="NavigationContainer-logo"/>
                <Nav
                    className="NavigationContainer-nav"
                    groups={groups}
                    expandedStateText={"expanded"}
                    collapsedStateText={"collapsed"}
                    selectedKey={currentPath}
                />
            </div>
        );
    }
}
