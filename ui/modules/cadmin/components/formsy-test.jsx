const FMUI = require('formsy-material-ui');
const { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup, FormsySelect, FormsyText, FormsyTime, FormsyToggle } = FMUI;
const RaisedButton = require('material-ui/lib/raised-button');

const Form = React.createClass({

  getInitialState: function () {
    return {
      canSumbit: false
    };
  },

  errorMessages: {
    wordsError: "Please only use letters"
  },

  selectFieldItems: [
    { payload: 'never', text: 'Never' },
    { payload: 'nightly', text: 'Every Night' },
    { payload: 'weeknights', text: 'Weeknights' }
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
    // Submit your validated form
    console.log("Model: ", model);
  },

  render: function () {
    let { wordsError } = this.errorMessages;

    return (
      <Formsy.Form
        onValid={this.enableButton}
        onInvalid={this.disableButton}
        onValidSubmit={this.submitForm} >

         <FormsyText
          name='name'
          validations='isWords'
          validationError={wordsError}
          required
          hintText="What is your name?"
          value="Bob"
          floatingLabelText="Name" />

        <FormsySelect
          name='frequency'
          required
          floatingLabelText="How often do you?"
          menuItems={this.selectFieldItems}/>

        <FormsyDate
          name='date'
          required
          floatingLabelText="Date" />

        <FormsyTime
          name='time'
          required
          floatingLabelText="Time" />

        <FormsyCheckbox
          name='agree'
          label="Do you agree to disagree?"
          defaultChecked={true} />

        <FormsyToggle
          name='toggle'
          label="Toggle" />

        <FormsyRadioGroup name="shipSpeed" defaultSelected="not_light">
          <FormsyRadio
            value="light"
            label="prepare for light speed" />
          <FormsyRadio
            value="not_light"
            label="light speed too slow" />
          <FormsyRadio
            value="ludicrous"
            label="go to ludicrous speed"
            disabled={true} />
        </FormsyRadioGroup>

        <RaisedButton
          type="submit"
          label="Submit"
          disabled={!this.state.canSubmit} />
      </Formsy.Form>
    );
  }
});


export default Form