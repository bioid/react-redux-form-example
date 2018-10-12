import React from "react";
import { connect } from "react-redux";
import { submit } from "redux-form";

/*
  This example demonstrates how a form may be submitted by dispatching 
  a SUBMIT action from an unrelated component or middleware.

  The "Submit" button you see here is not connected to the form component
  in any way; it only dispatches an action via Redux.

  See docs:
  https://redux-form.com/6.6.2/examples/remotesubmit/
*/

const RemoteSubmitButton = ({ dispatch }) => (
  <button
    type="button"
    onClick={() => dispatch(submit("remoteSubmit"))}
    //                              ^^^^^^^^^^^^ name of the form
  >
    Submit
  </button>
);

export default connect()(RemoteSubmitButton);
