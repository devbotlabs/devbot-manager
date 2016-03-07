/** In this file, we create a React component which incorporates components provided by material-ui */

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
const LeftNav = require('material-ui/lib/left-nav')
//const {History} = require('react-router');
let Paper = require('material-ui/lib/paper');
let Menu = require('material-ui/lib/menu/menu');
let MenuItem = require('material-ui/lib/menu/menu-item');
import ReactMeteorData from '../mixins/meteor-data';
import SmartBar from './smart-bar'

    
import React, {
    Component,
    PropTypes
} from 'react';


    let injectTapEventPlugin = require('react-tap-event-plugin');
    injectTapEventPlugin();
// easy globals to control the app
window.dialog = {
    title:'hallo',
    body:'bpdyasd',
    cancelLabel: 'cancel',
    submitLabel: 'save',
    
};

window.dialog.show = new ReactiveVar(false);

window.dialog.handleCancel = () => {
console.log('cancel')
    window.dialog.show.set(false);
}
window.dialog.handleSubmit = () => {
console.log('submit')

}
window.dialog.onRequestClose = () => {
console.log('on req closed....')

}

window.dialog.setProps = function(params) {
    _.each(params,(param, key)=>{
        this[key] = param;
    })
}
if(Meteor.isServer) {
    global.dialog = window.dialog
}


// let MenuDivider = require('material-ui/lib/menus/menu-divider');
//require('./app.styl')

let menuItems = _.map(AdminConfig.collections, (collection,
key) => {
    return {
        route: `/collection/${key}`,
        text: key
    }
});
// const AppBar = require('./app-bar.jsx');

const App = React.createClass({
    //mixins: [History],

    // componentWillReceiveProps(nextProps) {
    //     // if we changed routes ...
    //     if ((nextProps.location.key !== this.props.location.key && nextProps.location.state && nextProps.location.state.modal)) {
    //         // save the old children (just like animation)
    //         this.previousChildren = this.props.children
    //     }
    // },
     mixins: [ReactMeteorData ],
    
      getMeteorData() {
        if(Meteor.isClient) {
        
        Meteor.subscribe('__cadmin_collection', 'CAdminSettings', {}, {owner: Meteor.userId()})
        }
      
        return {
            dialog: {
                show: window.dialog.show.get(),
                
            }
        };
      },

    _showLeftNav() {
        this.refs
            .leftNav
            .toggle()
    },
    componentDidMount() {
    },
    _onDialogSubmit(){
        console.log('pfff')
    },

    render() {
        const {dispatch, sideNavOpen} = this.props

        const {pathname} = this.props.location

        console.log('render')
        let customActions = [
            <FlatButton
                label={window.dialog.cancelLabel}
                key={Math.random() * 19827639}
                secondary={true}
                onTouchTap={window.dialog.handleCancel}
                 />,
            <FlatButton
                key={Math.random() * 19827639}
            
                label={window.dialog.submitLabel}
                primary={true}
                onTouchTap={window.dialog.handleSubmit} />
            ];


        return (
            <div>
                <AppBar onLeftIconButtonTouchTap={() => {
                    //dispatch(toggleSideNav());
                }}/>
                <SmartBar>
                </SmartBar>
                <Dialog
                    title={window.dialog.title}
                    actions={customActions}
                    onRequestClose={window.dialog.onRequestClose}
                    open={this.data.dialog.show}
                    >
                    {window.dialog.body}
                </Dialog>
                {this.props.children}
                
            </div>
        )
    }
})

export default App