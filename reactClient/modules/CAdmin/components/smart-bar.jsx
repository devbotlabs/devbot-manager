/** In this file, we create a React component which incorporates components provided by material-ui */

//const {History} = require('react-router');
let Paper = require('material-ui/lib/paper');
import ReactMeteorData from '../mixins/meteor-data';


    
import React, {
    Component,
    PropTypes
} from 'react';

import './smart-bar.styl'

window.showSmartBar = new ReactiveVar(false)

const SmartBar = React.createClass({
     mixins: [ReactMeteorData ],
    
      getMeteorData() {
      
        Tracker.autorun(function(c){
        
            if(showSmartBar.get()) {
            snabbt($('.smart-bar')[0], {
            fromPosition:['100%'],
                    position: ['-100%',0 ],
                    duration: 1200,
                    })
            
            
            
            return;
                snabbt($('.smart-bar')[0], {
                    position: [100, 0, 0],
                    easing: 'ease'
                    }).snabbt({
                    fromRotation: [0, 0, -2*Math.PI],
                    position: [0, 0, 0],
                    easing: 'spring',
                    springConstant: 0.2,
                    springDeceleration: 0.90,
                    springMass: 10,
                    });
            }else {
            
            }
        })
        
      
        return {
            showSmartBar:showSmartBar.get()
        };
      },

    componentDidMount() {
    },

    render() {
        return (
            <div className="smart-bar">
                <Paper zDepth={1}>
  <p>zDepth=1</p>
</Paper>
                
            </div>
        )
    }
})

module.exports = SmartBar;