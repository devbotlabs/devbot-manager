if(Meteor.isServer) {
  window = global;
}

const React = require('react');
const SelectField = require('material-ui/lib/select-field');
import ReactMeteorData from '../mixins/meteor-data';
import { DatePicker } from 'material-ui/lib'
import { RouteContext } from 'react-router'
import {Link} from 'react-router'
import moment from 'moment'
let MenuItem = require('material-ui/lib/menus/menu-item');
const FMUI = require('formsy-material-ui');
const { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup, FormsySelect, FormsyText, FormsyTime, FormsyToggle } = FMUI;
const RaisedButton = require('material-ui/lib/raised-button');



//Styles

require('./collection-item-form.styl')

const ItemForm = React.createClass({

 mixins: [ReactMeteorData ],
    
      getMeteorData() {
        
        // do all your reactive data access in this method.
        // you can also use Meteor.subscribe here.
        
        return {
        };
      },


  errorMessages: {
    wordsError: "Please only use letters",
    numericError: "Please provide a number",
    urlError: "Please provide a valid URL"
  },




  enableButton: function () {
    console.log('enable button!!!')
    this.setState({
     canSubmit: true
    });
  },

  disableButton: function (a,b,c) {
    console.log('form is invalid')
    console.log(a,b,c)
  },


    getInitialState: function () {
      return {
        canSubmit: true
      }
    },


  selectFieldItems: [
    { payload: 'never', text: 'Never' },
    { payload: 'nightly',text: 'Every Night' },
    { payload: 'weeknights', text: 'Weeknights' },
    { payload: 'weekends', text: 'Weekends' },
    { payload: 'weekly',text: 'Weekly' }
  ],
  
  

  submitForm: function (model) {
    console.log('deepe submit')
    if(this.props.handleSubmitForm) {
      this.props.handleSubmitForm.apply(this,arguments)
    }
  },


  render: function () {
    let { wordsError, numericError, urlError } = this.errorMessages;
    let formFields =  _.map(this.props._schema,(schema, key)=>{
                        let baseProps = {
                            ref:key,
                            name: key,
                            key:key,
                            
                            label:schema.label,
                            floatingLabelText:schema.label,
                            defaultValue: this.props.Item ? this.props.Item[key] : null
                        }
                        if(!schema.optional) {
                            baseProps.required = true;
                        }
                        if(schema.type.name === 'Daasdasdte') {
                            return <FormsyDate 
                                      key={key}
                                      name="some date"
                                      floatingLabelText={schema.label}
                                        defaultDate={this.props.Item ? this.props.Item[key] : new Date()}

                                      
                                      formatDate={function(date){
                                        return moment(date).format('DD.MM.YY')
                                      
                                      }}
                             />


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
                                        floatingLabelText={schema.label}
                                        menuItems={this.selectFieldItems}
                                        {...baseProps}/>
                            }
                        }else {
                            return <FormsyText
                            floatingLabelText={schema.label}
                            {...baseProps} />
                        }
                    })
      if(this.props._schema) {
        formFields.unshift(
         <FormsyText
              name="_id"
              key="_id"
              value={this.props.Item ? this.props.Item._id : null}
              floatingLabelText="Some ID"
               />
        )
      }              
    return (

      <div>
      
          <Formsy.Form
            className="collection-form"
            onValid={this.enableButton}
        onInvalid={this.disableButton}
        onValidSubmit={this.submitForm}
             >
             {formFields}
            <div className="form-buttons">
                      <Link to={`/cadmin/collection/${this.props.cname}/`}>
                        <RaisedButton
                          onTouchTap={this.props.handleCancel }
                          label="cancel"/>
                </Link>
                

              <RaisedButton
                primary={true}
                type="submit"
                disabled={!this.state.canSubmit}
                label="Save"/>
                {()=>{
                  if(this.props.formType === 'update') {
                  
                    return (<RaisedButton
                  secondary={true}
                  onTouchTap={this.props.handleDeleteItem}
                  label="Delete"/>)
                  }
                }()}

            </div>
      

          </Formsy.Form>
      </div>
          
    );
  }
});

// let deleteDialog = function () {
//     return //Standard Actions


module.exports = ItemForm;

