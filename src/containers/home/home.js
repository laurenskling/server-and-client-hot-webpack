import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from "react-helmet";

class Home extends Component {
  render() {
    return (
      <div>
        <Helmet
          title="Homepage"
          />

        This is the homepage, found  pathname:
        { this.props.location.pathname }

        <form method="POST">
          <button type="submit">Try to POST</button>
        </form>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  location: state.routing.locationBeforeTransitions,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
