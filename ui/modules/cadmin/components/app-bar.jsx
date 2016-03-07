



/** In this file, we create a React component which incorporates components provided by material-ui */

const React = require('react');
import {AppBar,IconButton,FontIcon,FlatButton,Tabs,Tab} from 'material-ui/lib';
import Menu from 'material-ui/lib/menus/menu';
import IconMenu from 'material-ui/lib/menus/icon-menu';

import MenuItem from 'material-ui/lib/menus/menu-item';
import {Link,History} from 'react-router';
const LeftNav = require('./left-nav')

// import History from '../history'


const navigationItem = function () {
    let items;
    if(Meteor.user()) {
        items = [
        <MenuItem
            index={1}
            key={Math.random()*9817263987162}
            primaryText="Settings"
            onClick={(e) => {
                e.preventDefault()
                Meteor.logout( () => {
                    this.history.pushState(null, '/settings')
                })
            }}/>
        ,<MenuItem
             index={3}
            key={Math.random()*9817263987162}
             
              primaryText="Logout"
              onClick={(e) => {
                  e.preventDefault()
                  Meteor.logout( () => {
                      this.history.pushState(null, '/login')
                  })
              }}/>
      ]
    }else {
        items =[
            <MenuItem
                index={1}
            key={Math.random()*9817263987162}
                
                 primaryText="Register"
                 onClick={(e) => {
                     e.preventDefault()
                     this.history.pushState(null, '/register')
                 }}/>
            ,<MenuItem
                 index={2}
            key={Math.random()*9817263987162}
                 
                  primaryText="Login"
                  onClick={(e) => {
                      e.preventDefault()
                      this.history.pushState(null, '/login')
                  }}/>

           ]
    }

    return (<IconMenu iconButtonElement={
          <IconButton iconClassName="fa fa-user"></IconButton>
        }>
        {items}

    </IconMenu>)
}


const dAppBar = React.createClass({
    mixins:[History],

    getInitialState(){
        return {

        }
    },

_handleTabsChange(){
    console.log(this)
},
  render() {


      var mButton = <IconButton onClick={this.props.onLeftIconButtonTouchTap}>
      <FontIcon className='fa fa-bars' />
      </IconButton>
    return (<AppBar
              title="~zod-Admin"
              iconElementLeft={mButton}
              iconElementRight={navigationItem.bind(this)()}/>
    );
  }



});
module.exports = dAppBar;

