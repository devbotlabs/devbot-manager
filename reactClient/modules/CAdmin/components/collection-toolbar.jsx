
/** In this file, we create a React component which incorporates components provided by material-ui */
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link } from 'react-router'
import App from './app'
import Dashboard from './dashboard'
import Collection from './collection'
import CollectionItem from './collection-item'
import {Toolbar,DropDownMenu,ToolbarGroup,ToolbarTitle,FontIcon,ToolbarSeparator,RaisedButton,DropDownIcon} from 'material-ui/lib'
import ReactMeteorData from '../mixins/meteor-data';
const IconMenu = require('material-ui/lib/menus/icon-menu');
const Menu = require('material-ui/lib/menus/menu');
const MenuItem = require('material-ui/lib/menus/menu-item');
const MenuDivider = require('material-ui/lib/menus/menu-divider');
import IconDelete from 'material-ui/lib/svg-icons/action/delete'
import IconSettings from 'material-ui/lib/svg-icons/action/settings'
const ReactTransitionGroup = require('react-addons-transition-group')


require('./collection-toolbar.styl')

const CollectionToolbox = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData(){
            return {

            }
    },
    
    getInitialState: function() {
    return {showMenu:false};
  },


  render() {

      let filterOptions = () => {
          return _.map(this.props._schema, (schema,key) => {
              return { payload: key, text: schema.label }
          })

      }();
      let settingsMenuItems = [
        { payload: 'autoUpdate', text: 'Auto Update' }
      ];

      let iconMenuItems = [
        { payload: '1', text: 'Download' },
        { payload: '2', text: 'More Info' }
      ];
      let limits = [
        { payload: 10, text: '10' },
        { payload: 50, text: '50' },
        { payload: 100, text: '100' }
      ];
      let actions = [
        { payload: 'delete', text: 'Delete' },
        { payload: 'copy', text: 'Copy' }
        
      ]
      
      let actionMenu = this.state.showMenu ? (
      <Menu desktop={true} animated={true} 
        openDirection="bottom-right" 
        onBlur={()=>{
          this.setState({showMenu:false})
        }}
        onItemTouchTap={this.props.onItemAction}
      >
                        <MenuItem payload="delete" leftIcon={<IconDelete />}  primaryText="Delete"  />
                        <MenuItem payload="copy" leftIcon={<IconDelete />}  primaryText="Copy"  />
                      </Menu>
    ) : null;

    return (
        <Toolbar className="collection-toolbar">
        
          <ToolbarGroup key={0}>
            <RaisedButton label="Actions" primary={true} onTouchTap={()=>{
              this.setState({showMenu:!this.state.showMenu})
            }} />
            <ReactTransitionGroup>
                      {actionMenu}
            </ReactTransitionGroup>

            <DropDownMenu menuItems={filterOptions} />
  
            <DropDownMenu menuItems={limits} onChange={this.props.onLimitChange} />
         
          </ToolbarGroup>
          <ToolbarGroup key={1} float="right">
              <ToolbarTitle text={`Counter: ${this.props.cCounter}`} />
                 <DropDownIcon onChange={(e,b,menuItem)=>{
                    let currentSettings = CAdminSettings.findOne({owner: Meteor.userId()})
                    
                      let set = {};
                  
                    if(currentSettings) {
                            if(typeof currentSettings[menuItem.payload] !== 'undefined') {
                          set[menuItem.payload] = !currentSettings[menuItem.payload];
                        }else {
                           set[menuItem.payload] = true
                        }
                        console.log(set)
                        CAdminSettings.update({_id: currentSettings._id }, {$set:set})
                    }else {
                         set[menuItem.payload] = true;
                        set.owner = Meteor.userId();
                        CAdminSettings.insert(set)
                    }
                  
                  
                 }} className="settings-dropdown" iconClassName="fa fa-cogs"  menuItems={settingsMenuItems}>
                 </DropDownIcon>

            <ToolbarSeparator/>
            <RaisedButton 
              label="New Item" 
              primary={true}
              linkButton={true}

              containerElement={<Link to={`/cadmin/collection/${this.props.cname}/create-entry`} />}

               />
          </ToolbarGroup>
        </Toolbar>
    );
  },


});

module.exports = CollectionToolbox;
