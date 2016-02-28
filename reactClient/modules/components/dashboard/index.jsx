/** In this file, we create a React component which incorporates components provided by material-ui */

const React = require('react');
const RaisedButton = require('material-ui/lib/raised-button');
const Dialog = require('material-ui/lib/dialog');
const Avatar = require('material-ui/lib/avatar');
const FlatButton = require('material-ui/lib/flat-button');
import {Card, CardHeader, CardTitle, CardMedia, CardActions, CardText} from 'material-ui/lib/card';
const AppBar = require('./app-bar');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
const Colors = require('material-ui/lib/styles/colors');
const AdminConfig = require('../admin-config');
import { Link } from 'react-router';

// const AppBar = require('./app-bar.jsx');

console.log('+++++===123---PAOUSPDIOA+++++')
require('./dashboard.styl')
import {History} from 'react-router'
const Main = React.createClass({
    mixins: [History],

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getInitialState () {
        return {
            muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
        };
    },

    getContext() {
        return {
            muiTheme: this.state.muiTheme
        };
    },

    componentWillMount() {
        let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
            accent1Color: Colors.deepOrange500
        });

        this.setState({
            muiTheme: newMuiTheme
        });
    },

    render() {

        let containerStyle = {};

        let standardActions = [
            {
                text: 'Okay'
            }
        ];

        let availableCollections = function () {
            return AdminConfig.collections
        }
        return (
            <div className="dashboard-view">
                {_.map(availableCollections(), (collection,
                key) => {
                    return <Card>
                        <CardTitle subtitle="Subtitle" title={key}/>

                        <CardText>
                            A very nice collection
                        </CardText>
                        <CardActions>
                            <FlatButton label="Analyse" secondary={true}/>
                            <FlatButton label="Inspect" 
                                linkButton={true}
                                containerElement={<Link to={`/cadmin/collection/${key}?limit=10&skip=0&page=1`} />}
                             primary={true}/>
                            <div className='asd'></div>
                        </CardActions>
                    </Card>;
                })}
                <RaisedButton label="Super Secret Password" onTouchTap={this._handleTouchTap} primary={true}/>

            </div>
        );
    },

    _handleTouchTap() {
        this.refs
            .superSecretPasswordDialog
            .show();
    }
});

module.exports = Main;