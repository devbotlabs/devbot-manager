const React = require('react');
const Paper = require('material-ui/lib/paper');
const Styles = require('material-ui/lib/styles');
const SelectField = require('material-ui/lib/select-field');
import ReactMeteorData from '../mixins/meteor-data';
import {Card, CardHeader, CardTitle, CardMedia, CardActions, CardText} from 'material-ui/lib/card';
import {LinkIndex} from 'react-router'
import {Link, Router} from 'react-router'
import { DatePicker } from 'material-ui/lib'
import { RouteContext } from 'react-router'

let MenuItem = require('material-ui/lib/menus/menu-item');
const FMUI = require('formsy-material-ui');
const { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup, FormsySelect, FormsyText, FormsyTime, FormsyToggle } = FMUI;
const RaisedButton = require('material-ui/lib/raised-button');
  const Formsy = require('formsy-react');


//Styles
require('./collection-item.styl')

const Form = React.createClass({
    mixins: [ReactMeteorData ],
    
      getMeteorData() {
        Meteor.subscribe('__cadmin_collection', this.props.params.cname, {_id:this.props.params.itemId } )
        
        // do all your reactive data access in this method.
        // you can also use Meteor.subscribe here.
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
    return {
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


  submitForm: function (model) {
    let self = this;
    window[this.props.params.cname].update({_id:model._id},{$set:model},function(e,r){
      if(!e) {
      self.props.history.pushState(null,`/cadmin/collection/${self.props.params.cname}`)
      
      }else {
      }
    })
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
  handleDeleteItem () {
   

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
    let { wordsError, numericError, urlError } = this.errorMessages;
    let self = this;

    return (

        <div className="collection-view-item">
        <Card style={styles.paper}>
    

        <CardText>
          <Formsy.Form
            ref="form"
            name="collection-form"
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.submitForm}
            onInvalidSubmit={this.notifyFormError}
            style={styles.form}
            mapping={this.mapInputs} >


            {function(){

                if(self.data.Item) {

                    let formFields =  _.map(self.data._schema,function(schema, key){
                        let baseProps = {
                            ref:key,
                            name: key,
                            key:key,
                            label:schema.label,
                            defaultValue: self.data.Item[key]
                        }
                        if(!schema.optional) {
                            baseProps.required = true;
                        }
                        if(schema.type.name === 'Date') {
                            return <DatePicker hintText="Portrait Dialog" />


                            return <FormsyDate
                                      floatingLabelText="Date"
                                      type='date'
                                      {...baseProps} />
                        }

                        if(schema.zodform) {
                            if(schema.zodform.type === 'radio') {
                                return <FormsyRadioGroup {...baseProps} >
                                  {_.map(schema.zodform.options,function(option){
                                      return <FormsyRadio
                                              value={option.value}
                                              label={option.name}
                                              key={option.name}
                                              style={{marginBottom:16}}/>
                                  })}
                                </FormsyRadioGroup>

                            }else if(schema.zodform.type === 'select') {
                                return <FormsySelect
                                        hintText="Hint Text"
                                        floatingLabelText={schema.label}
                                        menuItems={self.selectFieldItems}
                                        {...baseProps}/>
                            }
                        }else {
                            return <FormsyText
                            validationError={wordsError}
                            hintText="What is your name?"
                            floatingLabelText={schema.label}
                            {...baseProps} />
                        }
                    })

                    formFields.unshift(<FormsyText
                        hintText="Item Id?"
                        ref='_id'
                        key={self.data.Item._id}
                        name= '_id'
                        value={self.data.Item._id}
                        floatingLabelText="asd" />)

                    return formFields;


                }else {



                }
            }()
            }
            <div className="form-buttons">
                      <Link to={`/cadmin/collection/${self.props.params.cname}/`}>
                        <RaisedButton
                          style={styles.submit}
                          onClick={self.handleGoBack}
                          label="cancel"/>
                </Link>
                

              <RaisedButton
                style={styles.submit}
                primary={true}
                type="submit"
                label="Save"/>
                <RaisedButton
                  style={styles.submit}
                  secondary={true}
                  onClick={self.handleDeleteItem}
                  label="Delete"/>

                

            </div>
      

          </Formsy.Form>
          </CardText>

        </Card>
        </div>
    );
  }
});

// let deleteDialog = function () {
//     return //Standard Actions


module.exports = Form;

