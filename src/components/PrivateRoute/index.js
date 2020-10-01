import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = rest;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.login.isAuthenticated || false,
  };
}

export default connect(mapStateToProps)(PrivateRoute);
