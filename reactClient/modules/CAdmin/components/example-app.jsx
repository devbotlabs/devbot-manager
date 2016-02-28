import React, {
    Component,
    PropTypes
} from 'react';
import {Provider, connect} from 'react-redux';
import {Route, Link} from 'react-router';

@connect(state => ({
    routerState: state.router
}))
class App extends Component {
    static propTypes = {
        children: PropTypes.node
    }

    render() {
        const links = [
            '/', '/parent?foo=bar', '/parent/child?bar=baz', '/parent/child/123?baz=foo'
        ].map(l => <p>
            <Link to={l}>{l}</Link>
        </p>);

        return (
            <div>
                <h1>App Container</h1>
                {links}
                {this.props.children}
            </div>
        );
    }
}

module.exports = App