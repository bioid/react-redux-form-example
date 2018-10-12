import React from 'react'
import { Field, reduxForm } from 'redux-form'
import submit from './submit'
import { connect } from 'react-redux';

const renderField = ({ input, label, type, meta: { touched, error }, editing }) => {
  let inputElement = <input {...input} placeholder={label} type={type}/>;
  console.log('passed in prop', editing)
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
    initialValues: person,
    editing: state.people.editing 
  };
}

const connectedReduxForm = reduxForm({
    form: 'remoteSubmit',  // a unique identifier for this form
    onSubmit: submit,       // submit function must be passed to onSubmit
    validate,
    enableReinitialize: true
})(RemoteSubmitForm)

export default connect(mapStateToProps)(connectedReduxForm)
