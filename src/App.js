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

  personClicked(event, id) {
    //console.log(`person clicked, ${id}`)
    this.props.dispatch(personSelected(id));
  }

  selected(id) {
    return id === this.props.personSelected ? 'selected' : '';
  }

  toggleEditing() {
    this.props.dispatch(toggleEditing())
  }

  render() {
    const people = this.props.people.map((x,i) => (
      <div key={x.id} onClick={ (e) => this.personClicked(e, x.id) } className={this.selected(x.id)}>
        {x.firstName} 
        {x.lastName} 
        {x.id} 
        {x.email}
      </div>
    ));
    
    return (
      <div>
        <section>
          { people }
        </section>
        <section>
          <EditPersonForm />
          { (this.props.personSelected !== null) && 
            <button onClick={e => this.toggleEditing()}>{this.props.editing ? 'Cancel' : 'Edit'}</button> 
          }
          { this.props.editing && <RemoteSubmitButton /> }
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
