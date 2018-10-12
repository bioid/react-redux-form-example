import React from 'react'
import { Field, reduxForm } from 'redux-form'
import submit from './submit'
import { connect } from 'react-redux';

const renderField = ({ input, label, type, meta: { touched, error }, editing }) => {
  /*
   The `editing` key we are destructuring here is the result of passing `fieldProps`
   to the `props` attribute when declaring the Field below.
   This `editing` variable is then what we use to decide whether to
   show an input or just the value (input.value).
  */
  let inputElement = <input {...input} placeholder={label} type={type}/>;
  return (
    <div>
      <label>{label}</label>
      <div>
        { editing ? inputElement : input.value }
        { touched && error && <span>{ error }</span>}
      </div>
    </div>
  );
}

const RemoteSubmitForm = (props) => {
  const { error, handleSubmit } = props
  let fieldProps = { editing: props.editing };
  /*
    We'll use this `fieldProps` object to pass the current editing state
    into each field. It will be passed through the `props` attribute, 
    and redux-form will merge with the other props at the top level.
  */
  return (
    <form onSubmit={handleSubmit}>
      <Field name="firstName" type="text" component={renderField} label="First Name" props={fieldProps}/>
      <Field name="lastName" type="text" component={renderField} label="Last Name" props={fieldProps}/>
      <Field name="email" type="email" component={renderField} label="Email" props={fieldProps}/>

      {error && <strong>{error}</strong>}
      <div>
        No submit button in the form. The submit button below is a separate unlinked component.
      </div>
    </form>
  )
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
    editing: state.people.editing 
  };
}

const connectedReduxForm = reduxForm({
    form: 'remoteSubmit',  // a unique identifier for this form
    onSubmit: submit,       // submit function must be passed to onSubmit
    validate,
    enableReinitialize: true // When set to true, the form will reinitialize every time the initialValues
})(RemoteSubmitForm)

export default connect(mapStateToProps)(connectedReduxForm)
