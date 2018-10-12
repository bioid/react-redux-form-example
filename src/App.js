import React, { Component } from "react";
import "./App.css";
import EditPersonForm from "./components/EditPersonForm";
import { connect } from "react-redux";
import { fetchPeople, personSelected, toggleEditing } from "./actions/people";
import RemoteSubmitButton from "./components/RemoteSubmitButton";

class App extends Component {
  componentDidMount() {
    // dispatch an action to fetch our data from
    // the backend and populate the store
    this.props.dispatch(fetchPeople());
  }

  personClicked(id) {
    this.props.dispatch(personSelected(id));
  }

  selected(id) {
    return id === this.props.personSelected ? "selected" : "";
  }

  toggleEditing() {
    this.props.dispatch(toggleEditing());
  }
  render() {
    const peopleCells = this.props.people.map((x, i) => {
      let selected = this.props.personSelected === i ? 'selected' : '';
      return (
        <React.Fragment>
          <div className={`cell id ${selected}`} onClick={e => this.personClicked(x.id)}>
            {x.id}
          </div>
          <div className={`cell firstName ${selected}`} onClick={e => this.personClicked(x.id)}>
            {x.firstName}
          </div>
          <div className={`cell lastName ${selected}`} onClick={e => this.personClicked(x.id)}>
            {x.lastName}
          </div>
          <div className={`cell email ${selected}`} onClick={e => this.personClicked(x.id)}>
            {x.email}
          </div>
        </React.Fragment>
    )});
    let headerCells;
    if (this.props.people.length > 0) {
      headerCells = (
        <React.Fragment>
          <div className="cell header id">id</div>
          <div className="cell header firstName">First Name</div>
          <div className="cell header lastName">Last Name</div>
          <div className="cell header email">Email</div>
        </React.Fragment>
      );
    }
    return (
      <div>
        <div className="peoplegrid">
          {headerCells}
          {peopleCells}
        </div>
        <section>
          <EditPersonForm />
          {this.props.personSelected !== null && (
            <button onClick={e => this.toggleEditing()}>
              {this.props.editing ? "Cancel" : "Edit"}
            </button>
          )}
          {this.props.editing && <RemoteSubmitButton />}
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    people: state.people.people,
    personSelected: state.people.personSelected,
    editing: state.people.editing
  };
}

export default connect(mapStateToProps)(App);
