/** In this file, we create a React component which incorporates components provided by material-ui */

const RaisedButton = require('material-ui/lib/raised-button');
const Dialog = require('material-ui/lib/dialog');
const Avatar = require('material-ui/lib/avatar');
const FlatButton = require('material-ui/lib/flat-button');
import {Card, CardHeader, CardTitle, CardMedia, CardActions, CardText} from 'material-ui/lib/card';

import {Table, TableRow, TableBody, TableHeader, TableFooter, TableRowColumn, TableHeaderColumn} from 'material-ui/lib/table';
const AppBar = require('./app-bar');
const ThemeManager = require('material-ui/lib/styles/theme-manager');
const LightRawTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');
const Colors = require('material-ui/lib/styles/colors');
const AdminConfig = require('../admin-config');
import ReactMeteorData from '../mixins/meteor-data';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import CollectionToolbar from './collection-toolbar'
import IconModeEdit from 'material-ui/lib/svg-icons/editor/mode-edit'

import IconDelete from 'material-ui/lib/svg-icons/action/delete'
import IconArrowDropDown from 'material-ui/lib/svg-icons/navigation/arrow-drop-down'
import moment from 'moment'
// VelocityTransitionGroup = Object.assign(VelocityTransitionGroup, TableRow)
import {Route, Link} from 'react-router';
import React, {
    Component,
    PropTypes
} from 'react';

let scope = window;
        
        
        if (Meteor.isServer) {
              scope = global;  
   
        }

require('./collection.styl')

const createTableRow = function (item) {
    return (
        <TableRow key={item._id} selected={false}>
            <TableRowColumn key={item._id + Math.random() * 1000}>{item._id}</TableRowColumn>
            {() => {
                let tRows = _.map(this.data._schema, (schema,
                schemakey) => {
                    if (item[schemakey]) {
                        if (schema.type.name === 'Date') {
                            return <TableRowColumn key={Math.random()*10000}>{moment(item[schemakey]).format(AdminConfig.uiconfig.dateFormat)}</TableRowColumn>

                        } else {
                            return <TableRowColumn key={Math.random()*10000}>{item[schemakey]}</TableRowColumn>
                        }
                    } else {
                        return <TableRowColumn key={Math.random()*10000}></TableRowColumn>
                    }
                })
                tRows.push(<TableRowColumn key={Math.random()*10000}>
                    
                    <IconButton 
                        touch={true}
                        linkButton={true}
                        containerElement={<Link to={`/cadmin/collection/${this.props.params.cname}/${item._id}`}/>}
                        >
                        <IconModeEdit/>
                    </IconButton>
                
                    <IconButton touch={true} key={Math.random()*10000} onTouchTap={() => {
                        this.handleDeleteItem
                    }}>
                        <IconDelete/>
                    </IconButton>

                </TableRowColumn>)
                return tRows;

            }
            ()}
        </TableRow>
    )
}

const CollectionView = React.createClass({
    mixins: [
        ReactMeteorData
    ],
    getMeteorData() {
    
        console.log(this.props.params.cname, {
            skip: this.state.limit * (this.state.page - 1),
            limit: this.state.limit,
            sort: this.state.sort
        })
        
        let collectionSub;
        if(Meteor.isClient) {
        
    
         collectionSub = Meteor.subscribe('__cadmin_collection',this.props.params.cname, {
            skip: this.state.limit * (this.state.page - 1),
            limit: this.state.limit,
            sort: this.state.sort
        })
        
        Meteor.subscribe('__cadmin_collection_counter',this.props.params.cname)
        }
        
        
             let fetchedItems = scope[this.props.params.cname].find({}, {
                limit: this.state.limit,
                sort: this.state.sort
            }).fetch()
        let itemCount = fetchedItems.length

        
        
        // do all your reactive data access in this method.
        // you can also use Meteor.subscribe here.
        return {
            subReady: Meteor.isServer ? true : collectionSub.ready(),
            cCounter: Meteor.isServer ? itemCount : Counts.get('collection-counter'),
            pages: Meteor.isServer ? itemCount : (Counts.get('collection-counter')/this.state.limit),
            uiconfig: AdminConfig.uiconfig,
            //    ready: scope.Meteor.subscribe('_adminDashboard',{collection:this.props.params.cname,limit:this.state.limit}),
            Items: fetchedItems,
            _schema: scope[this.props.params.cname].simpleSchema()
                ._schema
        };
    },
    handleEditItem (item, e) {
        e.preventDefault();
        e.stopPropagation();
    },
    handleDeleteItem (e) {
        e.preventDefault();
        e.stopPropagation();
    },
    handleCopyItem (itemId) {
        let item = scope[this.props.params.cname].findOne({_id: itemId });
        delete item._id;
        scope[this.props.params.cname].insert(item,()=>{
        
        })
    },
    handleItemAction (e, menuItem) {
        let selectedRows = this.refs.table_body.state.selectedRows;
        let allRowsSelected = this.refs.table.state.allRowsSelected;
        if(menuItem.props.payload === 'delete') {
            if(selectedRows.length > 0) {
                    _.each(selectedRows,(row)=>{
                        let item = this.data.Items[row];
                        if(!item) {
                            return;
                        }
                        
                        scope[this.props.params.cname].remove({_id:item._id});
                    })
            }else if(allRowsSelected === true) {
                _.each(this.data.Items,(item)=>{
                    scope[this.props.params.cname].remove({_id:item._id})
                })
            }
        
        }else if(menuItem.props.payload === 'copy') {
            if(selectedRows.length > 0) {
                _.each(selectedRows,(row)=>{
                    let item = this.data.Items[row];
                    delete item._id;
                    scope[this.props.params.cname].insert(item);
                })
            }else if(allRowsSelected === true) {
                _.each(this.data.Items,(item)=>{
                    delete item._id;
                    scope[this.props.params.cname].insert(item)
                })
            }
        }
    },
    componentWillReceiveProps: function(nextProps) {
        if(nextProps.location.query.page !== this.state.page) {
            this.setState({
                page:nextProps.location.query.page
            })
        }
    },
    // State

    getInitialState () {
        //console.log(this.props)
        let skip;
        let limit;
        let page;
        
        if(this.props.location.query) {
            let { limit, skip, page } = this.props.location.query;

        }
        
        
        return {
            limit: limit || 10,
            skip: skip || 0,
            page: page || 1,
            _schema: {},
            sort:{
                createdAt:-1
            },
            subReady: Meteor.isClient ? false : true,

            fixedHeader: true,
            fixedFooter: true,
            stripedRows: true,
            showRowHover: true,
            selectable: true,
            multiSelectable: true,
            enableSelectAll: true,
            deselectOnClickaway: false,
            seletedRows: []
        };
    },
    onLimitChange (a, b, c) {
        //this.history.pushState(null, )
    },
    shouldComponentUpdate(){
        
        if(this.data.subReady === true) {
        
            return true
        }else {
        
            return false;
        }
    },

    render() {
        let self = this;
        let showLabels = this.data.uiconfig.showLabels.get()
        
        let pagination = [];

        for (var i = 1; i <= this.data.pages; i++) {
            pagination.push(
                <FlatButton 
                    label={i}
                    linkButton={true}
                    containerElement={<Link to={`/cadmin/collection/${this.props.params.cname}`}  
                        activeClassName="active"
                        className="active"
                        activeStyle={{color:'red'}}
                        query={{ 
                    limit: this.state.limit,
                    skip: this.state.skip,
                    page: i
                    }}  />}
                     />
            );
        }
        
        return (
            <Card key='ajshdg' className="collection-view">
                <div>

                    <CollectionToolbar 
                        key='meyToolbarasd'
                        _schema={self.data._schema}
                        onLimitChange={this.onLimitChange} 
                        ref='toolbar'
                        cname={this.props.params.cname}
                        onItemAction={this.handleItemAction}
                        cCounter={this.data.cCounter}
                    />

                    <Table 
                        key='myTableasdasd' 
                        height={this.state.height} 
                        fixedHeader={this.state.fixedHeader} 
                        fixedFooter={this.state.fixedFooter} 
                        selectable={this.state.selectable} 
                        ref="table" 
                        multiSelectable={this.state.multiSelectable} 
                        >
                        <TableHeader key={Math.random()*10000} enableSelectAll={this.state.enableSelectAll}>
                            <TableRow key={Math.random()*10000}>
                                {()=>{
                                if(typeof this.data._schema._id === 'undefined'){
                                       return <TableHeaderColumn key={Math.random()*10000} >_id</TableHeaderColumn>
                                
                                }
                                
                                }()}
                                {_.map(this.data._schema, (schema, key) => {
                                
                                        return [
                                        <TableHeaderColumn 
                                            key={Math.random()*10000} 
                                            tooltip={showLabels ? key : schema.label}>
                                            { showLabels ? schema.label : key}
                                            <IconButton 
                                                touch={true}
                                                onTouchTap={()=>{
                                                    let sortState = {};
                                                    sortState[key] = this.state.sort[key] ? this.state.sort[key]*-1 : 1;
                                                    this.setState({sort:sortState})
                                                }}
                                                >
                                                <IconArrowDropDown/>
                                                
                                            </IconButton>
                                        
                                        </TableHeaderColumn>
                                        ]
                                    })}
                                <TableHeaderColumn tooltip='The ID' key='commands'>Commands</TableHeaderColumn>

                            </TableRow>
                        </TableHeader>
                        <TableBody 
                            key='tableBody' 
                            ref="table_body"
                            deselectOnClickaway={this.state.deselectOnClickaway} 
                            showRowHover={this.state.showRowHover} 
                            stripedRows={this.state.stripedRows}>

                            {_.map(this.data.Items, (item) => {
                                return (createTableRow.bind(this, item)())
                            })}

                        </TableBody>

                    </Table>
                    <CardActions key="cardActions">
                        <div className="collection-pagination">
                            {pagination}
                        </div>
                    </CardActions>
                </div>

            </Card>

        );
    }
});





export default CollectionView;
