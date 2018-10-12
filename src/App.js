import React, { Component } from "react";
import "./App.css";
import ViewEditPerson from "./components/ViewEditPerson";
import { connect } from "react-redux";
import { fetchPeople } from "./actions/people";
import PeopleGrid from "./components/PeopleGrid";

class App extends Component {
  componentDidMount() {
    // dispatch an action to fetch our data from
    // the backend and populate the store
    this.props.dispatch(fetchPeople());
  }

  render() {
    return (
      <div class="flexcontainer">
        <PeopleGrid />
        <ViewEditPerson />
      </div>
    );
  }
}

export default connect()(App);
