import React from 'react'
import { Field, reduxForm } from 'redux-form'
import submit from './submit'
import { connect } from 'react-redux';
import { toggleEditing } from "../actions/people";
import RemoteSubmitButton from './RemoteSubmitButton';

const renderField = ({ input, label, type, meta: { touched, error }, editing }) => {
  /*
   This function takes in all of the associated props for a Field,
   and returns some JSX similar to a render function.

   The `editing` key we are destructuring here is the result of passing `fieldProps`
   to the `props` attribute when declaring the Field below.

   This `editing` variable is what we then use to decide whether to
   show an input or just the value (`input.value`).
  */
  let inputElement = <input {...input} placeholder={label} type={type}/>;
  return (
    <div>
      <label>{label}</label>
      <div>
        { editing ? inputElement : input.value }
        {/*
          What's going on with this && stuff below?
          It's "short-circuiting": 
          https://codeburst.io/javascript-short-circuit-conditionals-bbc13ac3e9eb

          First `touched` is evaluted: If it is truthy, we continue and 
          evaluate `error`. If `error` is truthy, the last operand is evaluated,
          and a <span> is always going to be truthy, so that is what the entire
          expression evaluates to (kind of like a return value).
        */}
        { touched && error && <span>{ error }</span>}
      </div>
    </div>
  );
}

class RemoteSubmitForm extends React.Component {
  toggleEditing() {
    this.props.dispatch(toggleEditing());
  }

  render() {
    const { error, handleSubmit } = this.props;
    let fieldProps = { editing: this.props.editing };
    /*
      We'll use this `fieldProps` object to pass the current editing state
      into each field. It will be passed through the `props` attribute, 
      and redux-form will merge with the other props at the top level.
    */
    return (
      <form onSubmit={handleSubmit} class="bordered">
        <Field name="firstName" type="text" component={renderField} label="First Name" props={fieldProps}/>
        <Field name="lastName" type="text" component={renderField} label="Last Name" props={fieldProps}/>
        <Field name="email" type="email" component={renderField} label="Email" props={fieldProps}/>
  
        {error && <strong>{error}</strong>}

        {this.props.personSelected !== null && (
              <button type="button" onClick={e => this.toggleEditing()}>
                {this.props.editing ? "Cancel" : "Edit"}
              </button>
        )}

        {this.props.editing && <RemoteSubmitButton />}

      </form>
    )
  }
}

function validate(formProps) {  
  const errors = {};

  if (!formProps.firstName) {
    errors.firstName = 'Please enter a first name';
  }

  if (!formProps.lastName) {
    errors.lastName = 'Please enter a last name';
  }

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  return errors;
}

function mapStateToProps(state) {
  let idx = state.people.personSelected,
      person = idx !== null ? state.people.people[idx] : null;
  return { 
    person, 
    initialValues: person, // props.initialValues is used by redux-form to populate the form
                           // this works for us since the keys on our people objects
                           // match up with the `name` attributes on our form Fields.
    editing: state.people.editing,
    personSelected: state.people.personSelected
  };
}

const connectedReduxForm = reduxForm({
    form: 'remoteSubmit',  // a unique identifier for this form
    onSubmit: submit,      // submit function must be passed to onSubmit
    validate,
    enableReinitialize: true // When set to true, the form will reinitialize every time the initialValues
})(RemoteSubmitForm)

export default connect(mapStateToProps)(connectedReduxForm)
