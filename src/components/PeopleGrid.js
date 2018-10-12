import React from "react";
import { connect } from "react-redux";
import { personSelected } from "../actions/people";

class PeopleGrid extends React.Component {

  personClicked(id) {
    this.props.dispatch(personSelected(id));
  }

  render() {
    const peopleCells = this.props.people.map((x, i) => {
      /*
        We use `selected` below to determine whether or not the current set of
        cells corresponds to the currently selected person, and if so, add the 
        appropriate class so that we get the gray highlights on the whole row. 
      */
      let selected = this.props.personSelected === i ? 'selected' : '';
      return (
        /*
          A note on React.Fragment:
          Normally, JSX elements should either consist of a single element,
          or multiple elements wrapped in a single element at the top level.
          Since we're returning siblings, and we don't want to wrap these divs
          in another div (that would break the grid), we use React.Fragment.

          See the docs for more on fragments:
          https://reactjs.org/docs/fragments.html
        */
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