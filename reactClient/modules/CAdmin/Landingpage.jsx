const AppBar = require('material-ui/lib/app-bar');
const Card = require('material-ui/lib/card/card');
const FlatButton = require('material-ui/lib/flat-button');
const CardHeader = require('material-ui/lib/card/card-header');
const CardText = require('material-ui/lib/card/card-text');
const CardTitle = require('material-ui/lib/card/card-title');
import { Link } from 'react-router';


import React, {
    Component,
    PropTypes
} from 'react';



const Landingpage = React.createClass({

    render() {
    
        return (
            <div>
                <AppBar
                    iconElementLeft={<span></span>}
                    iconElementRight={<FlatButton 
                        label="Admin"
                        linkButton={true}
                        containerElement={<Link to="/cadmin" />}
                        >
                    </FlatButton>
                   
                    }
                    //iconElementRight={}
                    title={<span>SpaceCat</span>}
                 />
                <Card>
                <CardTitle title="Landingpage" subtitle=""/>
                <CardText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                </CardText>
                </Card>

            </div>
        )
    }
})

module.exports = Landingpage;