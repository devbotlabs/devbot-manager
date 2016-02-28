const React = require('react');
const Paper = require('material-ui/lib/paper');
const Styles = require('material-ui/lib/styles');
const SelectField = require('material-ui/lib/select-field');
import ReactMeteorData from '../mixins/meteor-data';
import {Card, CardHeader, CardTitle, CardMedia, CardActions, CardText} from 'material-ui/lib/card';
import {Link, Router} from 'react-router'
import { DatePicker } from 'material-ui/lib'
import { RouteContext } from 'react-router'

let MenuItem = require('material-ui/lib/menus/menu-item');
const RaisedButton = require('material-ui/lib/raised-button');
  const Formsy = require('formsy-react');
  const ItemForm = require('./collection-item-form');
  const TestForm = require('./formsy-test');

//Styles
require('./collection-item.styl')

const Form = React.createClass({
    mixins: [ReactMeteorData ],
    
      getMeteorData() {
        Meteor.subscribe('__cadmin_collection', this.props.params.cname, {_id:this.props.params.itemId } )
        
        let coll = window[this.props.params.cname];
        
        // do all your reactive data access in this method.
        // you can also use Meteor.subscribe here.
        if(!coll) {
        return;
        
        }
        
           return {
          _schema: window[this.props.params.cname].simpleSchema()._schema,
          Item: window[this.props.params.cname].findOne({_id:this.props.params.itemId})
        };
     
      },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext(){
    return {
      muiTheme: Styles.ThemeManager.getMuiTheme(Styles.LightRawTheme)
    }
  },

  getInitialState: function () {
  console.log(this)
    
    return {
      formType: this.props.params.itemId === 'create-entry' ? 'insert' : 'update',
      canSumbit: true
    };
  },

  errorMessages: {
    wordsError: "Please only use letters",
    numericError: "Please provide a number",
    urlError: "Please provide a valid URL"
  },



  styles: {
    paper: {
      width: '100%',
      padding: 20
    },
    submit: {
      marginTop: 32
    }
  },
  validateStuff(value,schema){

  },

  enableButton: function () {
    this.setState({
      canSubmit: true
    });
  },

  disableButton: function () {
    this.setState({
      canSubmit: false
    });
  },


  _handleSubmitForm: function (model) {
    console.log('handle submit')
    console.log(model)
    console.log(this)
    if(this.state.formType === 'update') {
      window[this.props.params.cname].update({_id:model._id},{$set:model},(e,r)=>{
        if(!e) {
        this.props.history.pushState(null,`/cadmin/collection/${this.props.params.cname}`)
        
        }else {
        }
      })
    }else if(this.state.formType === 'insert') {
     window[this.props.params.cname].insert(model,(e,r)=>{
        if(!e) {
        this.props.history.pushState(null,`/cadmin/collection/${this.props.params.cname}`)
        
        }else {
        }
      })
    }
    
  },

  notifyFormError: function (model) {
  },
  changeValue(e) {
        this.setValue(e.currentTarget.value)
  },
  _handleInput: function () {
  },
  componentDidMount:function(){
      let self = this;
    _.each(this.data._schema,function(input,key){
        setTimeout(function(){
            // self.refs[key].setValue(self.data.Item[key])

        },200)
    })
  },
  _handleCancel () {
                  this.props.history.goBack();
  
  },
  _handleDeleteItem () {
   

    window.dialog.title =  `Delete Item: ${this.data.Item._id}`;     
    window.dialog.body =  'Sure you want to delete this item?'; 
    window.dialog.submitLabel =  'delete'; 
      window.dialog.handleSubmit = ()=> {
        window.dialog.show.set(false)
        window[this.props.params.cname].remove({_id:this.data.Item._id},(e,r)=>{
              if(!e) {
                  
                  this.props.history.goBack();
              }else {
                  console.log(e)
              }
          })
      
      }
     window.dialog.show.set(true);    
      
  },

  selectFieldItems: [
    { payload: 'never', text: 'Never' },
    { payload: 'nightly',text: 'Every Night' },
    { payload: 'weeknights', text: 'Weeknights' },
    { payload: 'weekends', text: 'Weekends' },
    { payload: 'weekly',text: 'Weekly' }
  ],

  render: function () {
    let styles = this.styles;
    //let { wordsError, numericError, urlError } = this.errorMessages;
    let self = this;
    return (

        <div className="collection-view-item">
        <Card style={styles.paper}>
    

        <CardText>
          <ItemForm
            cname={this.props.params.cname}
            Item={this.state.formType === 'update' ? this.data.Item : null}
            _schema={this.data._schema}
            handleCancel={this._handleCancel}
            handleDeleteItem={this._handleDeleteItem}
            handleSubmitForm={this._handleSubmitForm}
            formType={this.state.formType}
          >
          </ItemForm>
          
          </CardText>

        </Card>
        </div>
    );
  }
});

// let deleteDialog = function () {
//     return //Standard Actions


module.exports = Form;

