/** In this file, we create a React component which incorporates components provided by material-ui */
import React from 'react'
import { render } from 'react-dom'
import { createHistory, useBasename } from 'history'
import { Router, Route, IndexRoute, Link, History } from 'react-router'
import App from './app'
import {Card, CardHeader, CardTitle, CardMedia, CardActions, CardText} from 'material-ui/lib/card';
import {Avatar,RaisedButton,FlatButton,Paper} from 'material-ui/lib';


const FMUI = require('formsy-material-ui');
const { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup, FormsySelect, FormsyText, FormsyTime, FormsyToggle } = FMUI;
  const Formsy = require('formsy-react');

require('./settings.styl')
// stylyes

const Settings = React.createClass({
    mixins: [History],
    // childContextTypes: {
    //   muiTheme: React.PropTypes.object
    // },
    //
    // getChildContext(){
    //   return {
    //     muiTheme: Styles.ThemeManager.getMuiTheme(Styles.LightRawTheme)
    //   }
    // },



      getInitialState: function () {
        return {
          canSumbit: false
        };
      },

      errorMessages: {
        wordsError: "Please only use letters",
        numericError: "Please provide a number",
        urlError: "Please provide a valid URL"
      },

      selectFieldItems: [
        { payload: 'never', text: 'Never' },
        { payload: 'nightly', text: 'Every Night' },
        { payload: 'weeknights', text: 'Weeknights' },
        { payload: 'weekends', text: 'Weekends' },
        { payload: 'weekly', text: 'Weekly' }
      ],


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
    console.log("Model: ", model);
    },
    componentDidMount() {
      console.log('Mount');
      console.log(this);

    },
    changeValue(){
        console.log('asd')
    },

    notifyFormError: function (model) {
    console.error('Form error:', model);
    },

  render() {

    return (
        <div className="settings-view">
        <Card>
          <CardTitle title="Settings" subtitle="for user xxx"/>
            <CardHeader
              title="Title"
              subtitle="Subtitle"
              avatar={<Avatar>A</Avatar>}/>

            <CardText>



             <Formsy.Form
                onValid={this.enableButton}
                onInvalid={this.disableButton}
                onValidSubmit={this.submitForm}
                onInvalidSubmit={this.notifyFormError}
                mapping={this.mapInputs} >

                  <FormsyText
                  name='email'
                  onChange={this.changeValue}
                  validations='isEmail'
                  required
                  validationError="This is not a valid email"
                  hintText="What is your email?"
                  floatingLabelText="E-Mail" />


            <FormsySelect
              name='frequency'
              required
              floatingLabelText="How often do you?"
              menuItems={this.selectFieldItems}/>

                <FormsyText
                  name='password'
                  validations='isNumeric'
                  type="password"
                  required
                  validationError="wrong pw"

                  hintText="wood could a woodchuck chuck?"
                  floatingLabelText="password" />

                <RaisedButton
                  type="submit"
                  label="Login"

                  disabled={!this.state.canSubmit} />
              </Formsy.Form>
              </CardText>


                        <CardActions key="cardActions">

                          <FlatButton primary={true} label="Save"/>
                        </CardActions>

        </Card>
        </div>

    );
  },


});

module.exports = Settings;