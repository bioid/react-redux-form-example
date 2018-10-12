import React from "react";
import { connect } from "react-redux";
import { personSelected } from "../actions/people";

class PeopleGrid extends React.Component {

  personClicked(id) {
    this.props.dispatch(personSelected(id));
  }

  selected(id) {
    return id === this.props.personSelected ? "selected" : "";
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
    let headerCells = (
        <React.Fragment>
          <div className="cell header id">id</div>
          <div className="cell header firstName">First Name</div>
          <div className="cell header lastName">Last Name</div>
          <div className="cell header email">Email</div>
        </React.Fragment>
      );
    
    return (
        <div className="peoplegrid">
          {headerCells}
          {peopleCells}
        </div>
    );    
  }
}

function mapStateToProps(state) {
  return {
    people: state.people.people,
    personSelected: state.people.personSelected
  }
};

export default connect(mapStateToProps)(PeopleGrid);