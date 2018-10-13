import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { fetchPeople } from "./actions/people";
import PeopleGrid from "./components/PeopleGrid";
import ViewEditPerson from "./components/ViewEditPerson";

class App extends Component {
  componentDidMount() {
    // dispatch an action to fetch our data from
    // the backend and populate the store
    this.props.dispatch(fetchPeople());
  }

  render() {
    if (!this.props.loadingPeople)
      return (
        <div className="flexcontainer">
          <PeopleGrid />
          <ViewEditPerson />
        </div>
      );
    else 
      return (
        <div>
          Loading data...
        </div>
      )
  }
}

function mapStateToProps(state) {
  return {
    loadingPeople: state.people.loading
  }
}

export default connect(mapStateToProps)(App);
